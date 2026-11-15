// Native aperture timeline/reversal regression; no browser, WebGL or network.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";

const source = fs.readFileSync(new URL("../src/pages/OceanPage.tsx", import.meta.url), "utf8");
const ast = ts.createSourceFile("OceanPage.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const names = new Set(["oceanRevealFrames", "oceanRevealTiming"]);
const constants = ast.statements.filter((node) => ts.isVariableStatement(node) && node.declarationList.declarations.some((entry) => names.has(entry.name.getText(ast))));
const reverse = ast.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === "reverseOceanAperture");
assert.equal(constants.length, 2); assert.ok(reverse);
const api = {};
vm.runInNewContext(ts.transpileModule(`${constants.map((node) => node.getText(ast)).join("\n")}\n${reverse.getText(ast)}\nexports.frames=oceanRevealFrames; exports.timing=oceanRevealTiming; exports.reverse=reverseOceanAperture;`, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { exports: api });

assert.equal(api.timing.duration, 3000);
assert.equal(api.timing.delay, 1500);
assert.equal(api.timing.easing, "linear", "global easing must not compress the medium/pinch stages");
assert.equal(api.timing.fill, "both");
assert.deepEqual(Array.from(api.frames, (frame) => [frame.transform, frame.offset]), [["scale(0)", 0], ["scale(1.7)", .5], ["scale(.92)", .72], ["scale(9)", .88], ["scale(9)", 1]]);
assert.ok(api.frames.slice(0, -1).every((frame) => frame.easing === "ease"), "historical CSS easing applies separately to every segment");
assert.deepEqual(Array.from(api.frames, (frame) => api.timing.delay + frame.offset * api.timing.duration), [1500, 3000, 3660, 4140, 4500]);

function animationAt(time) {
  const state = { delay: 1500, plays: 0, pauses: 0, updates: 0 };
  let finish, fail;
  const finished = new Promise((resolve, reject) => { finish = resolve; fail = reject; });
  const animation = {
    currentTime: time, playbackRate: 1, finished,
    effect: { getTiming: () => ({ delay: state.delay, duration: 3000 }), updateTiming: ({ delay }) => { state.delay = delay; state.updates++; } },
    play: () => state.plays++, pause: () => state.pauses++,
  };
  return { animation, state, finish, fail };
}

for (const time of [0, 700, 1500]) {
  const { animation, state } = animationAt(time);
  assert.equal(api.reverse(animation), null, "exit during entry anticipation is already closed and does not wait blank");
  assert.equal(animation.currentTime, 0); assert.equal(animation.playbackRate, -1);
  assert.equal(state.plays, 0); assert.equal(state.pauses, 1); assert.equal(state.delay, 0);
}
for (const time of [1900, 3000, 3660, 4140, 4500]) {
  const { animation, state, finish } = animationAt(time);
  const originalPose = time - state.delay;
  let settled = false;
  const pending = api.reverse(animation).then(() => { settled = true; });
  assert.equal(animation.currentTime - state.delay, originalPose, "removing entry delay keeps exactly the same visible pose");
  assert.equal(animation.playbackRate, -1); assert.equal(state.delay, 0);
  assert.ok(animation.currentTime <= 3000, "reverse contains the active timeline only, without 1.5s trailing blank closure");
  await Promise.resolve(); assert.equal(settled, false, "route remains mounted until actual reverse completion");
  const second = api.reverse(animation);
  assert.equal(animation.playbackRate, -1, "retargeting keeps playback negative, never toggles reverse direction");
  assert.equal(animation.currentTime, originalPose, "retargeting does not subtract the entry delay twice");
  assert.equal(state.updates, 1);
  const reversedPose = animation.currentTime;
  animation.playbackRate = Math.abs(animation.playbackRate || 1); animation.play();
  assert.equal(animation.currentTime, reversedPose, "cancel/resume continues from the same pose without reintroducing anticipation");
  finish(); await pending; await second; assert.equal(settled, true);
}
{
  const { animation, fail } = animationAt(4500);
  const pending = api.reverse(animation);
  fail(new Error("animation cancelled"));
  await assert.doesNotReject(pending, "cleanup cancellation cannot leave route waiting or reject an unhandled promise");
}
assert.match(source, /element\.animate\(oceanRevealFrames, oceanRevealTiming\)/);
assert.match(source, /if \(!exitingRef\.current && animation\.playbackRate > 0\) setReady\(true\)/);
assert.match(source, /animation\.playbackRate = Math\.abs\(animation\.playbackRate \|\| 1\)/);
assert.equal((source.match(/>Exit<\/button>/g) ?? []).length, 2, "Ocean intro and exploration alone use the requested Exit label");
assert.doesNotMatch(source.slice(source.indexOf("const oceanRevealFrames"), source.indexOf("export default")), /opacity|fade/);
console.log("PASS: historical 3s + 1.5s anticipation, per-segment easing, medium/pinch/full/hold timings, pose-preserving symmetric reverse, no blank exit delay, retarget/cancel guards and Ocean-only Exit labels (no browser/network).");
