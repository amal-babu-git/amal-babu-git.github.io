// Refreshes src/data/github-contributions.json, the copy the site falls back
// to when it's built without a GitHub token (local builds, or an API outage).
// Run with: npm run contributions
// Uses $GITHUB_TOKEN if set, otherwise the GitHub CLI's login (gh auth token).

import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fetchContributions, serializeContributions } from "../src/utils/github-contributions.mjs";

const token =
	process.env.GITHUB_TOKEN || execSync("gh auth token", { encoding: "utf8" }).trim();
const contributions = await fetchContributions(token);
const target = new URL("../src/data/github-contributions.json", import.meta.url);
writeFileSync(target, serializeContributions(contributions));
console.log(`Saved ${contributions.total} contributions to ${target.pathname}`);
