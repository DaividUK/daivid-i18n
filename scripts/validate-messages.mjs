import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const locales = ["en", "es", "pt"];

function collectPaths(obj, prefix = "") {
  const paths = [];
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const next = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      paths.push(...collectPaths(value, next));
    } else {
      paths.push(next);
    }
  }
  return paths;
}

async function load(locale) {
  const file = resolve(root, "src", "messages", `${locale}.json`);
  const text = await readFile(file, "utf8");
  return JSON.parse(text);
}

const base = await load("en");
const basePaths = new Set(collectPaths(base));

let hasErrors = false;
for (const locale of locales) {
  if (locale === "en") continue;
  const data = await load(locale);
  const paths = new Set(collectPaths(data));

  const missing = [...basePaths].filter((p) => !paths.has(p));
  const extra = [...paths].filter((p) => !basePaths.has(p));

  if (missing.length || extra.length) {
    hasErrors = true;
    if (missing.length) {
      console.error(`[${locale}] missing keys:`);
      for (const key of missing) console.error(`  - ${key}`);
    }
    if (extra.length) {
      console.error(`[${locale}] extra keys:`);
      for (const key of extra) console.error(`  - ${key}`);
    }
  }
}

if (hasErrors) process.exit(1);
console.log("All locale message keys match 'en'.");
