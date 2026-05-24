// profile.jsx — detailed CEO candidate profile

function Profile({ id, onNav, onOpenIntro }) {
  const c = window.CANDIDATES.find(x => x.id === id) || window.CANDIDATES[0];
  const [tab, setTab] = React.useState("overview");
  const [saved, setSaved] = React.useState(false);

  return (
    <div className="page" style={{ maxWidth: 1200 }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, fontSize: 13, color: "var(--text-3)" }}>
        <button className="btn btn-ghost btn-sm" onClick={() => onNav("browse")} style={{ padding: "4px 8px" }}>
          <Icon name="chevleft" size={13} /> Candidates
        </button>
        <span>/</span>
        <span className="mono">{c.code}</span>
      </div>

      {/* Header */}
      <div className="profile-header">
        <div className="profile-id-row">
          <Avatar name={c.name} variant={c.avatar} size={72} square />
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span className="mono mute2" style={{ fontSize: 11.5 }}>{c.code}</span>
              {c.status === "Open to introductions" && <span className="chip chip-accent chip-dot">{c.status}</span>}
              {c.status === "Selectively considering" && <span className="chip chip-dot">{c.status}</span>}
              {c.status === "Board-only" && <span className="chip chip-dot">{c.status}</span>}
              <span className="chip chip-outline">
                <Icon name="check" size={11} /> Vetted {fmtDate(c.vettedOn)}
              </span>
            </div>
            <h1 className="profile-name">{c.name}</h1>
            <p className="profile-subtitle">{c.title}</p>
            <div style={{ display: "flex", gap: 18, fontSize: 13.5, color: "var(--text-2)", flexWrap: "wrap" }}>
              <span><Icon name="map" size={13} /> &nbsp;{c.location}</span>
              <span><Icon name="briefcase" size={13} /> &nbsp;{c.yearsAsCEO}y as CEO · {c.yearsLeadership}y leadership</span>
              <span><Icon name="users" size={13} /> &nbsp;Largest team: {c.largestTeam.toLocaleString()}</span>
              <span><Icon name="chart" size={13} /> &nbsp;Largest P&L: {c.largestRevenue}</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn btn-icon btn-secondary" aria-label="Save" onClick={() => setSaved(!saved)}>
              <Icon name={saved ? "check" : "bookmark"} size={15} />
            </button>
            <button className="btn btn-icon btn-secondary" aria-label="Share"><Icon name="share" size={15} /></button>
          </div>
          <button className="btn btn-primary btn-lg" onClick={onOpenIntro}>
            Request introduction <Icon name="arrow" size={14} />
          </button>
          <div className="mute2" style={{ fontSize: 11.5, marginTop: 2 }}>Member reviews each request before contact release</div>
        </div>
      </div>

      {/* Tabs + body */}
      <div className="profile-grid">
        <div>
          <div className="tabs">
            <button className="tab" aria-current={tab === "overview" ? "page" : undefined} onClick={() => setTab("overview")}>Overview</button>
            <button className="tab" aria-current={tab === "experience" ? "page" : undefined} onClick={() => setTab("experience")}>Experience</button>
            <button className="tab" aria-current={tab === "vetting" ? "page" : undefined} onClick={() => setTab("vetting")}>Vetting & references</button>
          </div>

          {tab === "overview" && (
            <>
              <div className="profile-section">
                <div className="profile-section-title">Summary</div>
                <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: 0, color: "var(--text)" }}>{c.summary}</p>
              </div>
              <div className="profile-section">
                <div className="profile-section-title">Operating strengths</div>
                <div>
                  {c.strengths.map(s => (
                    <div key={s.label} className="bar-row">
                      <div>{s.label}</div>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${s.score}%` }} /></div>
                      <div className="bar-num">{s.score}</div>
                    </div>
                  ))}
                </div>
                <p className="mute2" style={{ fontSize: 12, margin: "16px 0 0" }}>
                  Scores reflect Helm research's calibration against board references, peer interviews, and operating history. Recalibrated annually.
                </p>
              </div>
              <ExperienceSection c={c} preview />
            </>
          )}

          {tab === "experience" && <ExperienceSection c={c} />}

          {tab === "vetting" && (
            <>
              <div className="profile-section">
                <div className="profile-section-title">Membership trail</div>
                <dl className="kv">
                  <div className="kv-row"><dt>Referred by</dt><dd>{c.referredBy}</dd></div>
                  <div className="kv-row"><dt>Invited</dt><dd>{fmtDate(c.invitedOn)}</dd></div>
                  <div className="kv-row"><dt>Vetting complete</dt><dd>{fmtDate(c.vettedOn)}</dd></div>
                  <div className="kv-row"><dt>Status</dt><dd>{c.status}</dd></div>
                </dl>
              </div>
              <div className="profile-section">
                <div className="profile-section-title">References (released on introduction)</div>
                <p className="muted" style={{ fontSize: 14, margin: "0 0 16px" }}>
                  Three references are on file. Names and verbatim notes are released after the candidate accepts your introduction request.
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span className="chip"><Icon name="lock" size={11} /> Prior Board Chair</span>
                  <span className="chip"><Icon name="lock" size={11} /> Lead Investor (Series C)</span>
                  <span className="chip"><Icon name="lock" size={11} /> Reporting CFO</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="profile-section">
            <div className="profile-section-title">Compensation expectation</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em" }}>
              ${c.compMin}k – ${c.compMax.toLocaleString()}k <span className="mute2" style={{ fontSize: 13, fontFamily: "var(--font-body)", fontWeight: 400, letterSpacing: 0 }}>base</span>
            </div>
            <div className="mute2" style={{ fontSize: 13.5, marginTop: 4 }}>+ {c.compEq} equity / variable</div>
            <hr className="divider" style={{ margin: "16px 0" }} />
            <dl className="kv">
              <div className="kv-row"><dt>Will relocate</dt><dd>{c.relocate ? "Yes — open" : "No — current city only"}</dd></div>
              <div className="kv-row"><dt>Active boards</dt><dd>{c.boards} non-executive</dd></div>
              <div className="kv-row"><dt>Languages</dt><dd>{c.languages.join(" · ")}</dd></div>
            </dl>
          </div>
          <div className="profile-section">
            <div className="profile-section-title">Track record at a glance</div>
            <div className="stat-grid">
              <Stat2 label="Years as CEO" value={c.yearsAsCEO} sub={`${c.yearsLeadership}y leadership`} />
              <Stat2 label="Largest team" value={c.largestTeam.toLocaleString()} sub="direct or indirect" />
              <Stat2 label="Largest P&L" value={c.largestRevenue} sub="recurring or GMV" />
              <Stat2 label="Board seats" value={c.boards} sub="non-executive" />
            </div>
          </div>
          <div className="profile-section">
            <div className="profile-section-title">Education</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {c.education.map((e, i) => (
                <div key={i}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{e.school}</div>
                  <div className="mute2" style={{ fontSize: 12.5 }}>{e.degree} · {e.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceSection({ c, preview }) {
  const list = preview ? c.experience.slice(0, 2) : c.experience;
  return (
    <div className="profile-section">
      <div className="profile-section-title">Experience{preview && c.experience.length > 2 ? ` · showing 2 of ${c.experience.length}` : ""}</div>
      <div className="timeline">
        {list.map((e, i) => (
          <div key={i} className="timeline-row">
            <div className="timeline-when mono">{e.years}</div>
            <div>
              <div className="timeline-role">{e.role}</div>
              <div className="timeline-co">{e.co} · <span className="mute2">{e.stage}</span></div>
              {e.bullets.length > 0 && (
                <ul className="timeline-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Stat2 = ({ label, value, sub }) => (
  <div className="stat">
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
    {sub && <div className="stat-sub">{sub}</div>}
  </div>
);

function fmtDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[+m - 1]} ${+d}, ${y}`;
}

Object.assign(window, { Profile, fmtDate });
