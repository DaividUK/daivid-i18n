import { cp } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

await cp(resolve(root, "src", "messages"), resolve(root, "dist", "messages"), {
  recursive: true,
});
