import { rules, signals, summary, verification, filterLane } from "./trafficFilterService";

function layout(title: string, activePath: string, body: string) {
  const nav = [
    { href: "/", label: "Overview" },
    { href: "/filter-lane", label: "Filter Lane" },
    { href: "/threat-signals", label: "Threat Signals" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ]
    .map((item) => {
      const active = item.href === activePath ? "nav-chip active" : "nav-chip";
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root {
        --bg: #081120;
        --shell: #0d1728;
        --panel: #0f1b2d;
        --panel-soft: rgba(18, 32, 53, 0.82);
        --line: rgba(122, 161, 255, 0.16);
        --text: #f3f6ff;
        --muted: #95a5c6;
        --accent: #45b4ff;
        --accent-strong: #726bff;
        --good: #2fd58a;
        --watch: #f5b940;
        --bad: #ff6d84;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", Inter, sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(69, 180, 255, 0.16), transparent 28%),
          radial-gradient(circle at top right, rgba(114, 107, 255, 0.14), transparent 26%),
          linear-gradient(180deg, #06101d 0%, var(--bg) 100%);
      }
      a { color: inherit; text-decoration: none; }
      .shell {
        max-width: 1280px;
        margin: 0 auto;
        padding: 28px 28px 40px;
      }
      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        padding: 16px 18px;
        border: 1px solid var(--line);
        background: rgba(7, 14, 26, 0.82);
        border-radius: 24px;
        box-shadow: 0 16px 60px rgba(0, 0, 0, 0.28);
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .brand-mark {
        width: 42px;
        height: 42px;
        display: grid;
        place-items: center;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
        font-weight: 800;
      }
      .eyebrow {
        margin: 0 0 2px;
        font-size: 12px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #8ec4ff;
      }
      .brand-title {
        margin: 0;
        font-size: 24px;
        font-weight: 700;
      }
      .brand-subtitle {
        margin: 4px 0 0;
        color: var(--muted);
        font-size: 14px;
      }
      nav {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: flex-end;
      }
      .nav-chip {
        padding: 12px 16px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(16, 27, 43, 0.9);
        color: #d7e6ff;
        font-size: 13px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .nav-chip.active {
        background: linear-gradient(135deg, rgba(69, 180, 255, 0.95), rgba(114, 107, 255, 0.92));
        border-color: transparent;
        color: white;
        box-shadow: 0 10px 24px rgba(72, 129, 255, 0.32);
      }
      .hero {
        margin-top: 24px;
        padding: 30px 30px 34px;
        border-radius: 30px;
        border: 1px solid var(--line);
        background: linear-gradient(180deg, rgba(13, 24, 40, 0.95), rgba(9, 19, 33, 0.92));
        box-shadow: 0 20px 70px rgba(0, 0, 0, 0.24);
      }
      .hero h1 {
        margin: 8px 0 10px;
        max-width: 900px;
        font-size: clamp(40px, 4.9vw, 68px);
        line-height: 0.96;
        letter-spacing: -0.04em;
      }
      .hero p {
        max-width: 860px;
        margin: 0;
        font-size: 21px;
        line-height: 1.5;
        color: #b5c7e7;
      }
      .section {
        margin-top: 24px;
        display: grid;
        gap: 20px;
      }
      .metrics {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 16px;
      }
      .panel {
        padding: 22px;
        border-radius: 26px;
        border: 1px solid var(--line);
        background: var(--panel-soft);
      }
      .metric-label {
        color: #8fb6ea;
        letter-spacing: 0.18em;
        font-size: 12px;
        text-transform: uppercase;
      }
      .metric-value {
        margin-top: 14px;
        font-size: 44px;
        font-weight: 750;
        line-height: 1;
      }
      .metric-copy {
        margin-top: 12px;
        font-size: 14px;
        color: var(--muted);
        line-height: 1.5;
      }
      .cols-2 {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 20px;
      }
      .cols-3 {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 14px;
      }
      .table th,
      .table td {
        padding: 14px 10px;
        border-bottom: 1px solid rgba(143, 182, 234, 0.11);
        text-align: left;
        vertical-align: top;
      }
      .table th {
        color: #8fb6ea;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.16em;
      }
      .table td {
        color: #e9f1ff;
        font-size: 14px;
        line-height: 1.45;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
      }
      .healthy { background: rgba(47, 213, 138, 0.14); color: var(--good); }
      .watch { background: rgba(245, 185, 64, 0.14); color: var(--watch); }
      .critical { background: rgba(255, 109, 132, 0.14); color: var(--bad); }
      .section-title {
        margin: 0;
        font-size: 28px;
        line-height: 1.1;
      }
      .section-copy {
        margin: 10px 0 0;
        color: var(--muted);
        font-size: 16px;
        line-height: 1.55;
      }
      ul.clean {
        margin: 16px 0 0;
        padding-left: 18px;
        color: #dbe7fb;
      }
      ul.clean li { margin-top: 10px; line-height: 1.5; }
      .footer-note {
        margin-top: 20px;
        color: #88a5d4;
        font-size: 13px;
        letter-spacing: 0.04em;
      }
      @media (max-width: 1100px) {
        .metrics, .cols-2, .cols-3 { grid-template-columns: 1fr; }
        nav { justify-content: flex-start; }
        .topbar { flex-direction: column; align-items: flex-start; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">FC</div>
          <div>
            <p class="eyebrow">Traffic Integrity</p>
            <h1 class="brand-title">Fraud Click Filter</h1>
            <p class="brand-subtitle">Traffic quality and paid-spend protection at the edge.</p>
          </div>
        </div>
        <nav>${nav}</nav>
      </header>
      ${body}
    </main>
  </body>
</html>`;
}

export function renderOverview() {
  const stats = summary();
  const signalMarkup = signals()
    .map(
      (signal) => `
      <tr>
        <td>${signal.title}</td>
        <td><span class="badge ${signal.severity}">${signal.severity}</span></td>
        <td>${signal.affectedClicks}</td>
        <td>$${signal.spendAtRiskUsd}</td>
        <td>${signal.explanation}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Traffic Quality Control Plane</p>
      <h1>Clean traffic is a revenue system, not just a security setting.</h1>
      <p>Filter low-trust clicks before they waste paid budget, distort attribution, or poison demand quality signals flowing into marketing dashboards and CRM scoring.</p>
    </section>
    <section class="section">
      <div class="metrics">
        <article class="panel">
          <div class="metric-label">Events</div>
          <div class="metric-value">${stats.eventCount}</div>
          <div class="metric-copy">Modeled click events currently moving through the edge filtering lane.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Dropped</div>
          <div class="metric-value">${stats.dropped}</div>
          <div class="metric-copy">Clicks blocked before they pollute analytics or trigger false campaign confidence.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Challenged</div>
          <div class="metric-value">${stats.challenged}</div>
          <div class="metric-copy">Suspicious sessions that still deserve a trust challenge before hard suppression.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Clean</div>
          <div class="metric-value">${stats.clean}</div>
          <div class="metric-copy">Legitimate sessions preserved for real CAC and conversion reporting.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Spend at Risk</div>
          <div class="metric-value">$${stats.spendAtRiskUsd}</div>
          <div class="metric-copy">Budget currently exposed to synthetic or low-trust click behavior.</div>
        </article>
      </div>
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Recommendation</p>
          <h2 class="section-title">What to tighten next</h2>
          <p class="section-copy">${stats.recommendation}</p>
          <p class="footer-note">Best use case: protect paid-search and affiliate channels before bad traffic reaches analytics, attribution, and CRM systems.</p>
        </article>
        <article class="panel">
          <p class="eyebrow">Rule Coverage</p>
          <h2 class="section-title">The three filters that matter first</h2>
          <ul class="clean">
            ${rules()
              .map((rule) => `<li><strong>${rule.name}</strong> — ${rule.impact}</li>`)
              .join("")}
          </ul>
        </article>
      </div>
      <article class="panel">
        <p class="eyebrow">Threat Signals</p>
        <h2 class="section-title">The traffic patterns distorting paid efficiency right now.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Signal</th>
              <th>Severity</th>
              <th>Affected Clicks</th>
              <th>Spend at Risk</th>
              <th>Why it matters</th>
            </tr>
          </thead>
          <tbody>${signalMarkup}</tbody>
        </table>
      </article>
    </section>`;

  return layout("Fraud Click Filter", "/", body);
}

export function renderFilterLane() {
  const eventMarkup = filterLane()
    .map(
      (event) => `
      <tr>
        <td>${event.id}</td>
        <td>${event.campaign}</td>
        <td>${event.source}</td>
        <td><span class="badge ${event.threat}">${event.decision}</span></td>
        <td>${event.ipReputation}</td>
        <td>${event.deviceRisk}</td>
        <td>${event.clickVelocity}</td>
        <td>$${event.spendAtRiskUsd}</td>
        <td>${event.reason}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Filter Lane</p>
      <h1>Every click gets a trust decision before it earns attribution credit.</h1>
      <p>This lane shows the practical choices that protect pipeline reporting: allow healthy traffic, challenge uncertain traffic, and drop the traffic that is clearly burning spend.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Traffic Events</p>
        <h2 class="section-title">Filter posture by campaign and source.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Campaign</th>
              <th>Source</th>
              <th>Decision</th>
              <th>IP Reputation</th>
              <th>Device Risk</th>
              <th>Click Velocity</th>
              <th>Spend at Risk</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>${eventMarkup}</tbody>
        </table>
      </article>
    </section>`;

  return layout("Fraud Click Filter - Filter Lane", "/filter-lane", body);
}

export function renderThreatSignals() {
  const signalCards = signals()
    .map(
      (signal) => `
      <article class="panel">
        <p class="eyebrow">Signal ${signal.id}</p>
        <h2 class="section-title">${signal.title}</h2>
        <p class="section-copy">${signal.explanation}</p>
        <div class="cols-3" style="margin-top:16px;">
          <div>
            <div class="metric-label">Severity</div>
            <div class="metric-value" style="font-size:28px;"><span class="badge ${signal.severity}">${signal.severity}</span></div>
          </div>
          <div>
            <div class="metric-label">Affected Clicks</div>
            <div class="metric-value" style="font-size:34px;">${signal.affectedClicks}</div>
          </div>
          <div>
            <div class="metric-label">Spend at Risk</div>
            <div class="metric-value" style="font-size:34px;">$${signal.spendAtRiskUsd}</div>
          </div>
        </div>
      </article>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Threat Signals</p>
      <h1>Bad traffic patterns should be visible in revenue language, not buried in logs.</h1>
      <p>These signals turn edge-security events into commercial risk language so Growth and RevOps can see why clean traffic matters to CAC, attribution, and conversion coherence.</p>
    </section>
    <section class="section">
      ${signalCards}
    </section>`;

  return layout("Fraud Click Filter - Threat Signals", "/threat-signals", body);
}

export function renderVerification() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Verification</p>
      <h1>This build proves traffic filtering belongs in the revenue stack.</h1>
      <p>The point is not generic bot blocking. The point is protecting reporting truth before paid media and attribution numbers drift away from human demand.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Release Checks</p>
        <h2 class="section-title">What this repo validates</h2>
        <ul class="clean">
          ${verification().map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    </section>`;

  return layout("Fraud Click Filter - Verification", "/verification", body);
}

export function renderDocs() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Docs</p>
      <h1>Modeled as a traffic-integrity control plane for growth teams.</h1>
      <p>This repo sits at the intersection of edge security, paid media protection, and analytics integrity. It is designed to show how infrastructure decisions shape revenue reporting.</p>
    </section>
    <section class="section">
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Routes</p>
          <h2 class="section-title">UI surface</h2>
          <ul class="clean">
            <li><code>/</code> overview and spend-at-risk posture</li>
            <li><code>/filter-lane</code> click-level decisions</li>
            <li><code>/threat-signals</code> signal cards for executive review</li>
            <li><code>/verification</code> release checks and modeling claims</li>
          </ul>
        </article>
        <article class="panel">
          <p class="eyebrow">API</p>
          <h2 class="section-title">Machine-readable outputs</h2>
          <ul class="clean">
            <li><code>/api/dashboard/summary</code></li>
            <li><code>/api/filter-lane</code></li>
            <li><code>/api/rules</code></li>
            <li><code>/api/threat-signals</code></li>
            <li><code>/api/verification</code></li>
            <li><code>/api/sample</code></li>
          </ul>
        </article>
      </div>
    </section>`;

  return layout("Fraud Click Filter - Docs", "/docs", body);
}
