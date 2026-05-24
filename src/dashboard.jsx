import { Icon, Avatar } from './shared';
import { MANDATES, CANDIDATES, ACTIVITY, STAGES } from './data';

export function Dashboard({ onNav, onOpenMandate, onOpenInvite }) {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>SIGNED IN AS · NORTON HALE PARTNERS</div>
          <h1 className="display" style={{ fontSize: 36, margin: "0 0 6px" }}>Good morning, Ed.</h1>
          <p className="muted" style={{ margin: 0, fontSize: 15 }}>
            You have <b style={{ color: "var(--text)" }}>4 active mandates</b>, 2 introductions awaiting reply, and 1 finalist conversation scheduled this week.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary" onClick={onOpenInvite}><Icon name="plus" size={14} /> Invite</button>
          <button className="btn btn-primary"><Icon name="plus" size={14} /> Open mandate</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        <Kpi label="Active mandates" value="4" meta="+1 this quarter" trend="up" />
        <Kpi label="Shortlisted candidates" value="36" meta="across all mandates" />
        <Kpi label="Introductions in motion" value="11" meta="6 awaiting reply" trend="up" />
        <Kpi label="Avg. mandate close" value="74d" meta="vs. 112d industry avg." trend="up" highlight />
      </div>

      {/* Main grid */}
      <div className="dash-section dash-row" style={{ marginTop: 32 }}>
        {/* Mandates */}
        <div>
          <SectionHead title="Active mandates" cta="View all" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {MANDATES.map(m => (
              <MandateCard key={m.id} m={m} onClick={() => onOpenMandate(m.id)} />
            ))}
          </div>
        </div>

        {/* Activity */}
        <div>
          <SectionHead title="Activity" />
          <div className="card" style={{ padding: "8px 18px" }}>
            <div className="activity-list">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="activity">
                  <span className={`activity-dot ${a.dot}`}></span>
                  <div>
                    <b style={{ fontWeight: 500 }}>{a.actor}</b> <span className="muted">{a.text}</span>
                  </div>
                  <span className="activity-time">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Referral card */}
          <div className="card" style={{ padding: "20px 22px", marginTop: 16 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>YOUR REFERRAL POSITION</div>
            <p style={{ margin: "0 0 14px", fontSize: 14, lineHeight: 1.5 }}>
              You have introduced <b>7 members</b> to the register. Your network counts toward the partner-tier threshold.
            </p>
            <div className="anchor-row" style={{ padding: "8px 10px", background: "var(--surface-2)", borderRadius: "var(--radius)" }}>
              <Icon name="link" size={14} />
              <span style={{ flex: 1 }}>helm.app/ref/ehr-2026</span>
              <button className="btn btn-icon btn-ghost" aria-label="Copy"><Icon name="copy" size={14} /></button>
            </div>
            <button className="btn btn-secondary" style={{ marginTop: 12, width: "100%" }} onClick={onOpenInvite}>
              <Icon name="plus" size={14} /> Invite a candidate directly
            </button>
          </div>
        </div>
      </div>

      {/* Suggested candidates */}
      <div className="dash-section">
        <SectionHead
          title="Suggested for MND-201 — Series D Mobility"
          sub="Surfaced from the register based on industry, stage, and prior diligence."
          cta="See full shortlist"
          ctaAction={() => onNav("browse")}
        />
        <div className="candidates-list">
          {CANDIDATES.slice(0, 3).map(c => (
            <CandidateRow key={c.id} c={c} onClick={() => onNav("profile", c.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

const Kpi = ({ label, value, meta, trend, highlight }) => (
  <div className="kpi" style={highlight ? { background: "var(--surface-2)" } : {}}>
    <div className="kpi-label">{label}</div>
    <div className="kpi-value">{value}</div>
    <div className={`kpi-meta ${trend === "up" ? "kpi-up" : trend === "down" ? "kpi-down" : ""}`}>
      {trend === "up" && <Icon name="trend" size={12} />}
      {meta}
    </div>
  </div>
);

const SectionHead = ({ title, sub, cta, ctaAction }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }}>
    <div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em", margin: 0 }}>{title}</h2>
      {sub && <p className="mute2" style={{ fontSize: 13, margin: "4px 0 0" }}>{sub}</p>}
    </div>
    {cta && (
      <button className="btn btn-ghost btn-sm" onClick={ctaAction}>
        {cta} <Icon name="chevright" size={13} />
      </button>
    )}
  </div>
);

const MandateCard = ({ m, onClick }) => (
  <div className="mandate-card card-hover" onClick={onClick}>
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
      <div>
        <div className="mono mute2" style={{ fontSize: 11, marginBottom: 6 }}>{m.code} · {m.daysOpen}d open</div>
        <h3 className="mandate-title">{m.title}</h3>
        <p className="mute2" style={{ fontSize: 13, margin: 0 }}>{m.client}</p>
      </div>
      {m.nda && <span className="chip chip-outline"><Icon name="lock" size={11} /> NDA</span>}
    </div>
    <div className="mandate-stats">
      <span><b>{m.shortlist}</b> shortlisted</span>
      <span><b>{m.introduced}</b> introduced</span>
      <span><b>{m.finalists}</b> finalist</span>
    </div>
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
        <span className="mute2">Mandate progress</span>
        <span className="mute2" style={{ fontVariantNumeric: "tabular-nums" }}>{m.progress}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${m.progress}%` }} />
      </div>
    </div>
  </div>
);

export const CandidateRow = ({ c, onClick, anonymized = false }) => (
  <div className="candidate-row" onClick={onClick}>
    <Avatar name={anonymized ? "??" : c.name} variant={c.avatar} size={48} />
    <div style={{ minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
        <h3 className="candidate-name">{anonymized ? c.code : c.name}</h3>
        <span className="mono mute2" style={{ fontSize: 11 }}>{c.code}</span>
        {c.status === "Open to introductions" && <span className="chip chip-accent chip-dot">Open</span>}
        {c.status === "Selectively considering" && <span className="chip chip-dot">Selective</span>}
        {c.status === "Board-only" && <span className="chip chip-dot">Board-only</span>}
      </div>
      <div className="candidate-meta">
        <span>{c.title}</span>
        <span className="mute2">·</span>
        <span className="mute2">{c.location}</span>
      </div>
      <div className="candidate-tags">
        {c.industries.slice(0, 2).map(i => <span key={i} className="chip">{i}</span>)}
        {c.stages.slice(0, 2).map(s => {
          const stage = STAGES.find(x => x.id === s);
          return <span key={s} className="chip chip-outline">{stage?.label}</span>;
        })}
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ textAlign: "right", marginRight: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text)" }}>{c.yearsAsCEO}y as CEO</div>
        <div className="mute2" style={{ fontSize: 11 }}>{c.yearsLeadership}y leadership</div>
      </div>
      <Icon name="chevright" size={16} />
    </div>
  </div>
);
