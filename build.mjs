import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

await readFile(join(root, "index.html"), "utf8");
await readFile(join(root, "src", "main.js"), "utf8");
await readFile(join(root, "src", "styles.css"), "utf8");

await cp(join(root, "index.html"), join(dist, "index.html"));
await cp(join(root, "src"), join(dist, "src"), { recursive: true });

const publicConfig = {
  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
};

await writeFile(join(dist, "src", "labura-config.json"), JSON.stringify(publicConfig, null, 2));

console.log("Build OK. Static site generated in dist/.");
