import { filterRules, threatSignals, trafficEvents } from "../data/sampleTraffic";

export function summary() {
  const dropped = trafficEvents.filter((event) => event.decision === "drop").length;
  const challenged = trafficEvents.filter((event) => event.decision === "challenge").length;
  const clean = trafficEvents.filter((event) => event.decision === "allow").length;
  const spendAtRiskUsd = trafficEvents.reduce((total, event) => total + event.spendAtRiskUsd, 0);

  return {
    eventCount: trafficEvents.length,
    dropped,
    challenged,
    clean,
    spendAtRiskUsd,
    recommendation:
      "Block low-trust branded and affiliate bursts before they distort attribution, inflate CAC, and poison downstream conversion reporting."
  };
}

export function filterLane() {
  return trafficEvents;
}

export function rules() {
  return filterRules;
}

export function signals() {
  return threatSignals;
}

export function verification() {
  return [
    "Traffic decisions are modeled before analytics ingestion so paid efficiency stays tied to real humans.",
    "Rule coverage makes it clear where challenge posture is enough and where hard dropping is the safer revenue choice.",
    "Threat signals connect edge decisions back to spend-at-risk so growth teams can see the commercial cost of dirty traffic."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    traffic: filterLane(),
    rules: rules(),
    signals: signals(),
    verification: verification()
  };
}
