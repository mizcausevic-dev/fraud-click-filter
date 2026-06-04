import fs from "node:fs/promises";
import path from "node:path";

import {
  renderDocs,
  renderFilterLane,
  renderOverview,
  renderThreatSignals,
  renderVerification
} from "../src/services/render";
import { filterLane, payload, rules, signals, summary, verification } from "../src/services/trafficFilterService";

const root = path.resolve(__dirname, "..");
const site = path.join(root, "site");

async function writeFile(target: string, content: string) {
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, content, "utf8");
}

async function writeJson(relativePath: string, value: unknown) {
  await writeFile(path.join(site, relativePath), JSON.stringify(value, null, 2));
}

async function main() {
  await fs.rm(site, { recursive: true, force: true });

  await writeFile(path.join(site, "index.html"), renderOverview());
  await writeFile(path.join(site, "filter-lane", "index.html"), renderFilterLane());
  await writeFile(path.join(site, "threat-signals", "index.html"), renderThreatSignals());
  await writeFile(path.join(site, "verification", "index.html"), renderVerification());
  await writeFile(path.join(site, "docs", "index.html"), renderDocs());

  await writeJson("api/dashboard/summary/index.json", summary());
  await writeJson("api/filter-lane/index.json", filterLane());
  await writeJson("api/rules/index.json", rules());
  await writeJson("api/threat-signals/index.json", signals());
  await writeJson("api/verification/index.json", verification());
  await writeJson("api/sample/index.json", payload());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
