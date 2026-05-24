export const Icon = ({ name, size = 16 }) => {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    check: <path d="m5 12 5 5 9-11" />,
    x: <><path d="m6 6 12 12" /><path d="m6 18 12-12" /></>,
    chevdown: <path d="m6 9 6 6 6-6" />,
    chevright: <path d="m9 6 6 6-6 6" />,
    chevleft: <path d="m15 6-6 6 6 6" />,
    sparkle: <path d="M12 3v4 M12 17v4 M3 12h4 M17 12h4 M5.6 5.6l2.8 2.8 M15.6 15.6l2.8 2.8 M18.4 5.6l-2.8 2.8 M8.4 15.6l-2.8 2.8" />,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></>,
    users: <><circle cx="9" cy="8" r="4" /><path d="M2 21c0-4 3-7 7-7s7 3 7 7" /><path d="M16 4a4 4 0 0 1 0 8" /><path d="M22 21c0-3-2-5-5-6" /></>,
    map: <><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7Z" /><circle cx="12" cy="9" r="2.5" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
    building: <><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 7 9-7" /></>,
    bell: <><path d="M6 8a6 6 0 1 1 12 0c0 5 2 7 2 7H4s2-2 2-7Z" /><path d="M10 21a2 2 0 0 0 4 0" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></>,
    filter: <path d="M3 5h18l-7 9v6l-4-2v-4Z" />,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" /></>,
    bookmark: <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4Z" />,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
    trend: <><path d="M3 17 9 11l4 4 8-8" /><path d="M14 4h7v7" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M4.5 19.5l2-2M17.5 6.5l2-2" /></>,
    moon: <path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10Z" />,
    chart: <><path d="M3 21h18" /><rect x="5" y="13" width="3" height="6" /><rect x="11" y="9" width="3" height="10" /><rect x="17" y="5" width="3" height="14" /></>,
    inbox: <><path d="M3 12l3-7h12l3 7v7H3Z" /><path d="M3 12h5l1 3h6l1-3h5" /></>,
    flag: <><path d="M5 3v18" /><path d="M5 4h13l-2 4 2 4H5" /></>,
    link: <><path d="M10 14a4 4 0 0 0 5.5 0l3-3a4 4 0 0 0-5.5-5.5l-1 1" /><path d="M14 10a4 4 0 0 0-5.5 0l-3 3a4 4 0 0 0 5.5 5.5l1-1" /></>,
    copy: <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>,
  };
  return <svg {...props} aria-hidden="true">{paths[name]}</svg>;
};

export const Avatar = ({ name, size = 36, variant = 1, square = false }) => {
  const initials = name ? name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase() : "?";
  return (
    <span
      className={`avatar avatar-grad-${((variant - 1) % 6) + 1}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.38),
        borderRadius: square ? Math.max(6, size * 0.18) : "50%",
      }}
    >{initials}</span>
  );
};

export const InvitationBadge = () => (
  <span className="invite-badge" title="Helm is invite-only">
    By Invitation Only
  </span>
);

export const Brand = ({ onClick }) => (
  <button className="brand" onClick={onClick} style={{ border: 0, background: "transparent", color: "inherit", cursor: "pointer", padding: 0 }}>
    <span className="brand-mark" aria-hidden="true" />
    <span>Helm</span>
  </button>
);

export function TopNav({ view, onNav, signedIn, onOpenInvite, onSignIn, onSignOut, theme, onToggleTheme }) {
  const navItems = signedIn ? [
    { id: "dashboard", label: "Mandates" },
    { id: "browse", label: "Candidates" },
    { id: "intel", label: "Intel" },
  ] : [];
  return (
    <header className="nav">
      <div className="nav-left">
        <Brand onClick={() => onNav(signedIn ? "dashboard" : "landing")} />
        {signedIn && (
          <nav className="nav-links">
            {navItems.map(item => (
              <button
                key={item.id}
                className="nav-link"
                aria-current={view === item.id ? "page" : undefined}
                onClick={() => onNav(item.id)}
              >{item.label}</button>
            ))}
          </nav>
        )}
      </div>
      <div className="nav-right">
        <InvitationBadge />
        <button className="btn btn-icon btn-ghost" onClick={onToggleTheme} aria-label="Toggle theme">
          <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
        </button>
        {signedIn ? (
          <>
            <button className="btn btn-icon btn-ghost" aria-label="Inbox"><Icon name="inbox" /></button>
            <button className="btn btn-secondary btn-sm" onClick={onOpenInvite}>
              <Icon name="plus" size={14} /> Invite candidate
            </button>
            <button className="btn btn-icon btn-ghost" onClick={onSignOut} aria-label="Account">
              <Avatar name="Ed Russo" variant={3} size={28} />
            </button>
          </>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={onSignIn}>
            Recruiter sign-in <Icon name="arrow" size={14} />
          </button>
        )}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Brand />
        <span className="mute2">© 2026 Helm Operating Co.</span>
      </div>
      <div style={{ display: "flex", gap: 18 }}>
        <span className="mute2">Membership · Code of conduct · Privacy</span>
      </div>
    </footer>
  );
}
