import { describe, expect, it } from "vitest";

import { payload, rules, signals, summary } from "./services/trafficFilterService";

describe("fraud-click-filter", () => {
  it("summary exposes spend protection posture", () => {
    const result = summary();

    expect(result.eventCount).toBeGreaterThan(0);
    expect(result.spendAtRiskUsd).toBeGreaterThan(0);
    expect(result.recommendation).toContain("attribution");
  });

  it("rules and signals stay commercially legible", () => {
    expect(rules().length).toBeGreaterThan(1);
    expect(signals().some((signal) => signal.title.includes("click"))).toBe(true);
  });

  it("payload bundles the full surface", () => {
    const result = payload();

    expect(result.dashboard.eventCount).toBe(result.traffic.length);
    expect(result.rules.length).toBeGreaterThan(0);
    expect(result.signals.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});
