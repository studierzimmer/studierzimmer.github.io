import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";

const args = Object.fromEntries(process.argv.slice(2).map((value) => {
  const equals = value.indexOf("=");
  return [value.slice(2, equals < 0 ? undefined : equals), equals < 0 ? true : value.slice(equals + 1)];
}));
if (args.help) {
  console.log("Node >=22.19; install/use Lighthouse separately.\nnode scripts/audit-lighthouse.mjs --url=http://127.0.0.1:4174 --routes=/,/bio,/sketches --runs=3 --devices=mobile,desktop --out=artifacts/performance/audit\nLIGHTHOUSE_CLI can point to lighthouse/cli/index.js; otherwise lighthouse must be on PATH. All Chrome sessions are isolated temporary profiles.");
  process.exit(0);
}
const origin = new URL(String(args.url || "http://127.0.0.1:4174"));
const routes = String(args.routes || "/").split(",").filter(Boolean);
const devices = String(args.devices || "mobile,desktop").split(",");
const runs = Number(args.runs || 3);
if (!Number.isInteger(runs) || runs < 1 || runs > 5) throw new Error("Use between 1 and 5 runs.");
if (devices.some((device) => !["mobile", "desktop"].includes(device))) throw new Error("Devices must be mobile and/or desktop.");
const output = resolve(String(args.out || `artifacts/performance/${new Date().toISOString().replace(/[:.]/g, "-")}`));
await mkdir(output, { recursive: true });
const categories = ["performance", "accessibility", "best-practices", "seo"];
const metricKeys = ["first-contentful-paint", "largest-contentful-paint", "speed-index", "total-blocking-time", "cumulative-layout-shift", "total-byte-weight"];
const records = [];
const failures = [];

function run(command, parameters) {
  return new Promise((accept, reject) => {
    const child = spawn(command, parameters, { stdio: ["ignore", "inherit", "inherit"], shell: false });
    child.once("error", reject);
    child.once("exit", (code) => code === 0 ? accept() : reject(new Error(`Lighthouse exited with ${code}`)));
  });
}
for (const route of routes) {
  const url = new URL(route, origin);
  if (url.origin !== origin.origin) throw new Error("Every route must belong to the supplied origin.");
  const slug = `${url.pathname}${url.search}`.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home";
  for (const device of devices) {
    for (let index = 1; index <= runs; index += 1) {
      const name = `${slug}-${device}-${index}`;
      const destination = join(output, name);
      const parameters = [url.href, "--quiet", "--output=json", "--output=html", `--output-path=${destination}`, `--only-categories=${categories.join(",")}`, "--chrome-flags=--headless=new --no-first-run --disable-dev-shm-usage"];
      if (device === "desktop") parameters.push("--preset=desktop");
      console.log(`Auditing ${route} · ${device} · ${index}/${runs}`);
      try {
        if (process.env.LIGHTHOUSE_CLI) await run(process.execPath, [process.env.LIGHTHOUSE_CLI, ...parameters]);
        else await run("lighthouse", parameters);
        const report = JSON.parse(await readFile(`${destination}.report.json`, "utf8"));
        if (report.runtimeError) throw new Error(report.runtimeError.message);
        const record = {
          route, device, run: index, version: report.lighthouseVersion, fetchTime: report.fetchTime,
          emulation: report.configSettings.screenEmulation, throttling: report.configSettings.throttling, throttlingMethod: report.configSettings.throttlingMethod,
          scores: Object.fromEntries(categories.map((category) => [category, report.categories[category]?.score ?? null])),
          metrics: Object.fromEntries(metricKeys.map((key) => [key, report.audits[key]?.numericValue ?? null])),
          warnings: report.runWarnings ?? [], report: `${name}.report.html`,
        };
        records.push(record);
        console.log(`  Performance ${Math.round(record.scores.performance * 100)}; LCP ${(record.metrics["largest-contentful-paint"] / 1000).toFixed(2)}s; TBT ${Math.round(record.metrics["total-blocking-time"])}ms`);
      } catch (error) {
        failures.push({ route, device, run: index, error: String(error) });
        console.error(`  FAILED: ${error}`);
      }
    }
  }
}
function median(values) {
  const finite = values.filter((value) => typeof value === "number" && Number.isFinite(value)).sort((a, b) => a - b);
  if (!finite.length) return null;
  const center = Math.floor(finite.length / 2);
  return finite.length % 2 ? finite[center] : (finite[center - 1] + finite[center]) / 2;
}
const groups = routes.flatMap((route) => devices.map((device) => {
  const matching = records.filter((record) => record.route === route && record.device === device);
  return { route, device, runs: matching.length,
    scores: Object.fromEntries(categories.map((key) => [key, median(matching.map((record) => record.scores[key]))])),
    metrics: Object.fromEntries(metricKeys.map((key) => [key, median(matching.map((record) => record.metrics[key]))])),
    performanceRange: matching.length ? [Math.min(...matching.map((record) => record.scores.performance)), Math.max(...matching.map((record) => record.scores.performance))] : [],
  };
}));
const summary = { origin: origin.origin, generatedAt: new Date().toISOString(), mode: "cold isolated Chrome profiles; Lighthouse mobile simulation/desktop lab, not physical-device or field data", groups, records, failures };
await writeFile(join(output, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
const score = (value) => value === null ? "—" : Math.round(value * 100);
const rows = groups.map((group) => `<tr><td>${escape(group.route)}</td><td>${group.device}</td><td>${group.runs}</td>${categories.map((key) => `<td>${score(group.scores[key])}</td>`).join("")}<td>${((group.metrics["largest-contentful-paint"] || 0) / 1000).toFixed(2)}s</td><td>${Math.round(group.metrics["total-blocking-time"] || 0)}ms</td><td>${(group.metrics["cumulative-layout-shift"] || 0).toFixed(3)}</td><td>${Math.round((group.metrics["total-byte-weight"] || 0) / 1024)} KiB</td></tr>`).join("");
await writeFile(join(output, "index.html"), `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Studier Zimmer · performance audit</title><style>body{font:15px/1.6 system-ui;color:#25313b;max-width:1200px;padding:32px;margin:auto;background:#fafaf9}h1{font-size:25px;font-weight:500}table{border-collapse:collapse;width:100%;font-size:13px}td,th{text-align:left;border-bottom:1px solid #ddd;padding:10px;white-space:nowrap}.table{overflow:auto}a{color:inherit}small{color:#64717b}</style><h1>Studier Zimmer · performance audit</h1><p>Cold-profile lab measurements · medians of successful runs. Original media quality is tested separately; no audit-specific rendering or reduced assets are used.</p><small>${escape(summary.generatedAt)} · ${escape(origin.origin)}</small><div class="table"><table><thead><tr><th>Route</th><th>Profile</th><th>Runs</th><th>Performance</th><th>Accessibility</th><th>Best practices</th><th>SEO</th><th>LCP</th><th>TBT</th><th>CLS</th><th>Transferred</th></tr></thead><tbody>${rows}</tbody></table></div><h2>Individual reports</h2><ul>${records.map((record) => `<li><a href="${escape(record.report)}">${escape(record.route)} · ${record.device} · run ${record.run}</a></li>`).join("")}</ul><p>${failures.length} failed runs. These are simulated Chromium lab measurements, not an assertion that every physical iPhone, iPad, Android or Safari installation has been tested.</p></html>`);
console.log(`Reports: ${join(output, "index.html")}`);
if (failures.length) process.exitCode = 1;
