import { Icon, Avatar } from './shared';

export function Landing({ onSignIn }) {
  return (
    <div>
      {/* Hero */}
      <section className="landing-hero">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span className="eyebrow">EXECUTIVE SEARCH — INVITATION ONLY</span>
        </div>
        <h1 className="landing-headline">
          A private register of <em>operating</em> CEOs.
        </h1>
        <p className="landing-sub">
          Helm connects executive recruiters and search committees with vetted CEO talent.
          Candidates do not apply — they are introduced through trusted operators, funds, and
          chairpersons. Membership is referred, vetted, and small by design.
        </p>
        <div className="landing-cta">
          <button className="btn btn-primary btn-lg" onClick={onSignIn}>
            Continue as recruiter <Icon name="arrow" size={15} />
          </button>
          <button className="btn btn-secondary btn-lg">
            <Icon name="lock" size={15} /> I have an invitation code
          </button>
        </div>

        <div style={{ marginTop: 56, display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
          <span className="eyebrow">REGISTER · MAY 2026</span>
          <div style={{ display: "flex", gap: 24 }}>
            <Stat number="412" label="Vetted CEO members" />
            <Stat number="64" label="Active search mandates" />
            <Stat number="17" label="Markets covered" />
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* How it works */}
      <section className="section">
        <div className="section-eyebrow">
          <span className="eyebrow">HOW IT WORKS</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          <Step
            num="01"
            title="Membership by referral"
            body="Each candidate joins through a confidential referral from a fund partner, board chair, or current member. No self-registration. No public profile."
          />
          <Step
            num="02"
            title="A short vetting window"
            body="Helm research verifies operating history, board references, and exit details. Typical vetting is 18 working days end-to-end."
          />
          <Step
            num="03"
            title="Recruiter-led introductions"
            body="Recruiters open a mandate, shortlist privately, and request introductions. Members decide whether to engage on each individual brief."
          />
        </div>
      </section>

      {/* Quote / authority */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="card" style={{ padding: "44px 48px" }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>FROM THE BENCH</div>
          <p style={{
            fontFamily: "var(--font-serif)",
            fontSize: 28,
            lineHeight: 1.3,
            margin: 0,
            letterSpacing: "-0.01em",
            maxWidth: "32ch",
          }}>
            "The cost of a wrong CEO hire is not the search fee — it is two years of organizational drift. Helm exists to make those two years recoverable."
          </p>
          <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar name="Ed Russo" variant={2} size={36} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>Edward Russo</div>
              <div className="mute2" style={{ fontSize: 13 }}>Founding Partner, Helm</div>
            </div>
          </div>
        </div>
      </section>

      {/* Member composition */}
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="section-eyebrow">
          <span className="eyebrow">REGISTER COMPOSITION</span>
          <span className="mute2" style={{ fontSize: 13 }}>Distribution of current members, May 2026</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <DistributionCard
            title="By company stage"
            rows={[
              { label: "Public / IPO", v: 24 },
              { label: "Late stage / Pre-IPO", v: 28 },
              { label: "Scaleup (Series C–D)", v: 22 },
              { label: "Series A–B", v: 11 },
              { label: "PE-backed / MNC", v: 15 },
            ]}
          />
          <DistributionCard
            title="By industry"
            rows={[
              { label: "SaaS / Enterprise Software", v: 22 },
              { label: "FinTech", v: 18 },
              { label: "Consumer & Retail", v: 16 },
              { label: "Industrials & Logistics", v: 14 },
              { label: "Healthcare & Biotech", v: 12 },
              { label: "Energy & Climate", v: 10 },
              { label: "Other", v: 8 },
            ]}
          />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section">
        <div style={{
          padding: "56px 48px",
          background: "var(--text)",
          color: "var(--bg)",
          borderRadius: "var(--radius-lg)",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          gap: 32,
        }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em", margin: "0 0 8px", color: "var(--bg)" }}>
              For executive search firms and committees.
            </h2>
            <p style={{ color: "color-mix(in srgb, var(--bg) 78%, transparent)", margin: 0, fontSize: 15, maxWidth: "50ch" }}>
              We work with a small number of search partners. If you operate a retained executive practice and want access to the register, request an introduction.
            </p>
          </div>
          <button className="btn btn-lg" style={{ background: "var(--bg)", color: "var(--text)" }} onClick={onSignIn}>
            Request access <Icon name="arrow" size={15} />
          </button>
        </div>
      </section>
    </div>
  );
}

const Stat = ({ number, label }) => (
  <div>
    <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{number}</div>
    <div className="mute2" style={{ fontSize: 12 }}>{label}</div>
  </div>
);

const Step = ({ num, title, body }) => (
  <div style={{ padding: "32px 28px", background: "var(--surface)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
      <span className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>{num}</span>
      <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em", margin: "0 0 8px" }}>{title}</h3>
    <p className="muted" style={{ fontSize: 14, margin: 0, lineHeight: 1.55 }}>{body}</p>
  </div>
);

const DistributionCard = ({ title, rows }) => {
  const max = Math.max(...rows.map(r => r.v));
  return (
    <div className="card" style={{ padding: "24px 26px" }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {rows.map(r => (
          <div key={r.label}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
              <span>{r.label}</span>
              <span className="mute2" style={{ fontVariantNumeric: "tabular-nums" }}>{r.v}%</span>
            </div>
            <div style={{ height: 5, background: "var(--surface-2)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(r.v / max) * 100}%`, background: "var(--text)", borderRadius: 999 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
