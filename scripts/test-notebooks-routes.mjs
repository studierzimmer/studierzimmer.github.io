// Test actual route components with synthetic hooks only: no books, sessions or
// remote content are edited, and no browser or network is used.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = fs.readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
const ast = ts.createSourceFile("App.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const routes = new Map();
const visit = (node) => {
  if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(ast) === "Route") {
    const attributes = node.attributes.properties;
    const path = attributes.find((attribute) => attribute.name?.getText(ast) === "path")?.initializer?.text;
    const element = attributes.find((attribute) => attribute.name?.getText(ast) === "element")?.initializer?.expression;
    if (path) routes.set(path, element);
  }
  ts.forEachChild(node, visit);
};
visit(ast);
for (const path of ["/notebooks", "/notebooks/:slug"]) assert.equal(routes.get(path)?.tagName.getText(ast), "PublicBooksRoute");
for (const path of ["/sketches", "/books"]) {
  const element = routes.get(path);
  assert.equal(element.tagName.getText(ast), "Navigate");
  assert.equal(element.attributes.properties.find((attribute) => attribute.name?.getText(ast) === "to")?.initializer?.text, "/notebooks");
  assert.ok(element.attributes.properties.some((attribute) => attribute.name?.getText(ast) === "replace"));
}
assert.equal(routes.get("/book/:slug").tagName.getText(ast), "LegacyBookRoute");

const declarations = ["PublicBooksRoute", "LegacyBookRoute"].map((name) => ast.statements.find((node) => ts.isVariableStatement(node) && node.declarationList.declarations.some((declaration) => declaration.name.getText(ast) === name))?.getText(ast)).join("\n");
assert.ok(declarations.includes("const LegacyBookRoute"));
const code = ts.transpileModule(`${declarations}\nexports.book = PublicBooksRoute; exports.legacy = LegacyBookRoute;`, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
const calls = [], api = {};
const jsx = (type, props) => ({ type, props });
vm.runInNewContext(code, { exports: api, require: () => ({ jsx, jsxs: jsx }), PublicBookLibrary: "PublicBookLibrary", Navigate: "Navigate", useNavigate: () => (...args) => calls.push(args), useParams: () => ({ slug: "existing book/2026" }) });
const book = api.book();
assert.equal(book.props.initialSlug, "existing book/2026");
book.props.onBookChange("second book/2024");
assert.equal(calls[0][0], "/notebooks/second%20book%2F2024");
assert.equal(calls[0][1].replace, true, "swapping books never adds a redundant browser-history entry");
const legacy = api.legacy();
assert.equal(legacy.props.to, "/notebooks/existing%20book%2F2026");
assert.equal(legacy.props.replace, true, "old shared book URLs remain valid without Back loops");
const choreography = fs.readFileSync(new URL("../src/components/navigation/RouteChoreography.tsx", import.meta.url), "utf8");
assert.match(choreography, /pathname === "\/notebooks"/);
assert.match(choreography, /pathname\.startsWith\("\/notebooks\/"\)/, "canonical book changes retain the already-mounted viewer and page memory");
console.log("PASS: notebooks canonical routes, encoded existing slugs, legacy redirects and retained intra-book route lifecycle (no content/storage/network writes).");
