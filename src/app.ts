import express from "express";

import { filterLane, payload, rules, signals, summary, verification } from "./services/trafficFilterService";
import {
  renderDocs,
  renderFilterLane,
  renderOverview,
  renderThreatSignals,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5262);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/filter-lane", (_req, res) => res.type("html").send(renderFilterLane()));
app.get("/threat-signals", (_req, res) => res.type("html").send(renderThreatSignals()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/filter-lane", (_req, res) => res.json(filterLane()));
app.get("/api/rules", (_req, res) => res.json(rules()));
app.get("/api/threat-signals", (_req, res) => res.json(signals()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`Fraud Click Filter listening on http://127.0.0.1:${port}`);
  });
}

export default app;
