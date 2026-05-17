export type ThreatLevel = "healthy" | "watch" | "critical";
export type SourceType = "paid-search" | "display" | "affiliate" | "organic-social" | "direct";
export type FilterDecision = "allow" | "challenge" | "drop";

export interface TrafficEvent {
  id: string;
  campaign: string;
  source: SourceType;
  decision: FilterDecision;
  threat: ThreatLevel;
  ipReputation: number;
  deviceRisk: number;
  clickVelocity: number;
  spendAtRiskUsd: number;
  reason: string;
}

export interface FilterRule {
  id: string;
  name: string;
  action: FilterDecision;
  coverage: string;
  impact: string;
}

export interface ThreatSignal {
  id: string;
  title: string;
  affectedClicks: number;
  spendAtRiskUsd: number;
  severity: ThreatLevel;
  explanation: string;
}

export const trafficEvents: TrafficEvent[] = [
  {
    id: "CLK-22041",
    campaign: "Brand Defense - Search",
    source: "paid-search",
    decision: "drop",
    threat: "critical",
    ipReputation: 14,
    deviceRisk: 91,
    clickVelocity: 23,
    spendAtRiskUsd: 214,
    reason: "Low-trust IP burst tied to repeated branded clicks with no downstream session depth."
  },
  {
    id: "CLK-22037",
    campaign: "Retargeting - Display",
    source: "display",
    decision: "challenge",
    threat: "watch",
    ipReputation: 42,
    deviceRisk: 66,
    clickVelocity: 12,
    spendAtRiskUsd: 83,
    reason: "Display cluster shows synthetic motion patterns but still deserves a challenge before suppression."
  },
  {
    id: "CLK-22026",
    campaign: "Affiliate Launch Push",
    source: "affiliate",
    decision: "drop",
    threat: "critical",
    ipReputation: 19,
    deviceRisk: 88,
    clickVelocity: 17,
    spendAtRiskUsd: 146,
    reason: "Affiliate surge is generating high click volume with almost zero scroll depth or returning traffic quality."
  },
  {
    id: "CLK-22011",
    campaign: "UGC Creator Burst",
    source: "organic-social",
    decision: "allow",
    threat: "healthy",
    ipReputation: 81,
    deviceRisk: 21,
    clickVelocity: 5,
    spendAtRiskUsd: 0,
    reason: "Healthy creator traffic shows repeat engagement, route depth, and realistic session duration."
  },
  {
    id: "CLK-21998",
    campaign: "Competitor Terms - Search",
    source: "paid-search",
    decision: "challenge",
    threat: "watch",
    ipReputation: 47,
    deviceRisk: 61,
    clickVelocity: 10,
    spendAtRiskUsd: 57,
    reason: "Competitor-term clicks show moderate automation risk and should pass through challenge posture first."
  }
];

export const filterRules: FilterRule[] = [
  {
    id: "RULE-01",
    name: "Known bad reputation subnet block",
    action: "drop",
    coverage: "Paid search and affiliate traffic from repeated low-trust CIDR ranges.",
    impact: "Prevents waste before bot clicks pollute attribution or consume paid budget."
  },
  {
    id: "RULE-02",
    name: "Burst-click behavioral challenge",
    action: "challenge",
    coverage: "Traffic that exceeds click-rate thresholds without corresponding scroll or route depth.",
    impact: "Preserves legitimate traffic while filtering synthetic demand spikes."
  },
  {
    id: "RULE-03",
    name: "Affiliate anomaly suppression",
    action: "drop",
    coverage: "Affiliate traffic with abnormal geo mix, low device trust, and no assisted conversion pattern.",
    impact: "Keeps partner channels clean enough for real CAC and pipeline analysis."
  }
];

export const threatSignals: ThreatSignal[] = [
  {
    id: "SIG-01",
    title: "Branded search click flood",
    affectedClicks: 91,
    spendAtRiskUsd: 742,
    severity: "critical",
    explanation: "Low-trust branded clicks are inflating demand and creating false confidence in branded capture efficiency."
  },
  {
    id: "SIG-02",
    title: "Low-trust affiliate burst",
    affectedClicks: 54,
    spendAtRiskUsd: 416,
    severity: "critical",
    explanation: "Affiliate activity is producing channel volume with weak human signals and no real conversion progression."
  },
  {
    id: "SIG-03",
    title: "Retargeting bot loop",
    affectedClicks: 37,
    spendAtRiskUsd: 188,
    severity: "watch",
    explanation: "Retargeting audiences are being revisited by likely automation, distorting frequency and assisted performance."
  }
];
