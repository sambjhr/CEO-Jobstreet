// browse.jsx — search + filter the candidate register

function Browse({ onNav }) {
  const [query, setQuery] = React.useState("");
  const [industries, setIndustries] = React.useState(new Set());
  const [stages, setStages] = React.useState(new Set());
  const [regions, setRegions] = React.useState(new Set());
  const [status, setStatus] = React.useState(new Set());
  const [sort, setSort] = React.useState("relevance");

  const toggle = (set, setter, value) => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    setter(next);
  };
  const clearAll = () => {
    setQuery(""); setIndustries(new Set()); setStages(new Set());
    setRegions(new Set()); setStatus(new Set());
  };

  // Count candidates matching each filter facet
  const counts = React.useMemo(() => {
    const ind = {}, stg = {}, reg = {}, sta = {};
    window.CANDIDATES.forEach(c => {
      c.industries.forEach(i => ind[i] = (ind[i] || 0) + 1);
      c.stages.forEach(s => stg[s] = (stg[s] || 0) + 1);
      reg[c.region] = (reg[c.region] || 0) + 1;
      sta[c.status] = (sta[c.status] || 0) + 1;
    });
    return { ind, stg, reg, sta };
  }, []);

  const filtered = React.useMemo(() => {
    let list = window.CANDIDATES.filter(c => {
      if (industries.size && !c.industries.some(i => industries.has(i))) return false;
      if (stages.size && !c.stages.some(s => stages.has(s))) return false;
      if (regions.size && !regions.has(c.region)) return false;
      if (status.size && !status.has(c.status)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${c.name} ${c.title} ${c.summary} ${c.location} ${c.industries.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (sort === "years") list.sort((a, b) => b.yearsAsCEO - a.yearsAsCEO);
    else if (sort === "recent") list.sort((a, b) => b.invitedOn.localeCompare(a.invitedOn));
    return list;
  }, [query, industries, stages, regions, status, sort]);

  const activeFilterCount = industries.size + stages.size + regions.size + status.size + (query ? 1 : 0);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>THE REGISTER</div>
          <h1 className="display" style={{ fontSize: 36, margin: "0 0 6px" }}>Candidates</h1>
          <p className="muted" style={{ margin: 0, fontSize: 15 }}>
            <b style={{ color: "var(--text)", fontVariantNumeric: "tabular-nums" }}>{window.CANDIDATES.length}</b> vetted CEO members in the register. All introductions are member-approved before contact details release.
          </p>
        </div>
      </div>

      <div className="browse-grid">
        {/* Filters */}
        <aside>
          <div className="filter-section">
            <div className="filter-title">Industry</div>
            <div className="filter-list">
              {Object.entries(counts.ind).sort((a, b) => b[1] - a[1]).map(([name, count]) => (
                <button
                  key={name}
                  className="filter-item"
                  aria-pressed={industries.has(name)}
                  onClick={() => toggle(industries, setIndustries, name)}
                >
                  <span>{name}</span>
                  <span className="filter-item-count">{count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-title">Company stage</div>
            <div className="filter-list">
              {window.STAGES.filter(s => counts.stg[s.id]).map(s => (
                <button
                  key={s.id}
                  className="filter-item"
                  aria-pressed={stages.has(s.id)}
                  onClick={() => toggle(stages, setStages, s.id)}
                >
                  <span>{s.label}</span>
                  <span className="filter-item-count">{counts.stg[s.id]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-title">Region</div>
            <div className="filter-list">
              {window.REGIONS.filter(r => counts.reg[r]).map(r => (
                <button
                  key={r}
                  className="filter-item"
                  aria-pressed={regions.has(r)}
                  onClick={() => toggle(regions, setRegions, r)}
                >
                  <span>{r}</span>
                  <span className="filter-item-count">{counts.reg[r]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-title">Availability</div>
            <div className="filter-list">
              {Object.keys(counts.sta).map(s => (
                <button
                  key={s}
                  className="filter-item"
                  aria-pressed={status.has(s)}
                  onClick={() => toggle(status, setStatus, s)}
                >
                  <span>{s}</span>
                  <span className="filter-item-count">{counts.sta[s]}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          {/* Search + sort bar */}
          <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "center" }}>
            <div className="search-wrap" style={{ flex: 1 }}>
              <Icon name="search" size={16} />
              <input
                className="search-input"
                placeholder="Search by name, industry, prior company, location…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <select className="input" style={{ width: 180, padding: "10px 12px" }} value={sort} onChange={e => setSort(e.target.value)}>
              <option value="relevance">Sort: Relevance</option>
              <option value="years">Sort: Most years as CEO</option>
              <option value="recent">Sort: Recently joined</option>
            </select>
          </div>

          {/* Active filter pills */}
          {activeFilterCount > 0 && (
            <div className="active-filters">
              <span className="mute2" style={{ fontSize: 12, marginRight: 4 }}>{filtered.length} of {window.CANDIDATES.length}</span>
              {query && (
                <button className="pill-clear" onClick={() => setQuery("")}>
                  “{query}” <span className="pill-clear-x"><Icon name="x" size={9} /></span>
                </button>
              )}
              {[...industries].map(v => (
                <button key={v} className="pill-clear" onClick={() => toggle(industries, setIndustries, v)}>
                  {v} <span className="pill-clear-x"><Icon name="x" size={9} /></span>
                </button>
              ))}
              {[...stages].map(v => {
                const s = window.STAGES.find(x => x.id === v);
                return (
                  <button key={v} className="pill-clear" onClick={() => toggle(stages, setStages, v)}>
                    {s?.label} <span className="pill-clear-x"><Icon name="x" size={9} /></span>
                  </button>
                );
              })}
              {[...regions].map(v => (
                <button key={v} className="pill-clear" onClick={() => toggle(regions, setRegions, v)}>
                  {v} <span className="pill-clear-x"><Icon name="x" size={9} /></span>
                </button>
              ))}
              {[...status].map(v => (
                <button key={v} className="pill-clear" onClick={() => toggle(status, setStatus, v)}>
                  {v} <span className="pill-clear-x"><Icon name="x" size={9} /></span>
                </button>
              ))}
              <button className="btn btn-ghost btn-sm" onClick={clearAll} style={{ marginLeft: 4 }}>Clear all</button>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="card empty-state">
              <p className="empty-state-title">No candidates match.</p>
              <p className="mute2" style={{ margin: 0 }}>Try fewer filters, or broaden the industry or region.</p>
              <button className="btn btn-secondary btn-sm" style={{ marginTop: 16 }} onClick={clearAll}>Clear all filters</button>
            </div>
          ) : (
            <div className="candidates-list">
              {filtered.map(c => (
                <CandidateRow key={c.id} c={c} onClick={() => onNav("profile", c.id)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Browse });
