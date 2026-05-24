import { useState, useEffect } from 'react';
import { TopNav, Footer } from './shared';
import { Landing } from './landing';
import { Dashboard } from './dashboard';
import { Browse } from './browse';
import { Profile } from './profile';
import { InviteModal, IntroRequestModal } from './invite';
import { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSlider } from './tweaks-panel';
import './styles.css';

const TWEAK_DEFAULTS = {
  theme: "light",
  accent: "#1F3FBF",
  type: "sans",
  fontScale: 100,
};

const ACCENT_OPTIONS = ["#1F3FBF", "#0E6E45", "#9C4422"];

const TYPE_OPTIONS = [
  { value: "sans",  label: "Sans"  },
  { value: "serif", label: "Serif" },
  { value: "mixed", label: "Mixed" },
];

function hexToRgba(hex, a) {
  const h = hex.replace("#", "");
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h;
  const n = parseInt(x, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function ComingSoon({ title }) {
  return (
    <div className="page-narrow" style={{ textAlign: "center", paddingTop: 96 }}>
      <div className="eyebrow" style={{ marginBottom: 12 }}>{title.toUpperCase()}</div>
      <h1 className="display" style={{ fontSize: 40, margin: "0 0 12px" }}>In private beta.</h1>
      <p className="muted" style={{ fontSize: 16, margin: "0 auto", maxWidth: "44ch" }}>
        Market-intelligence briefs for active mandates are rolling out to partner-tier members through Q3 2026.
      </p>
    </div>
  );
}

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState({ view: "landing", id: null });
  const [signedIn, setSignedIn] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);
  const [introCandidate, setIntroCandidate] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.theme);
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--accent-soft", hexToRgba(t.accent, t.theme === "dark" ? 0.16 : 0.08));
    const sans = '"Geist", ui-sans-serif, system-ui, -apple-system, sans-serif';
    const serif = '"Instrument Serif", ui-serif, Georgia, serif';
    if (t.type === "serif") {
      document.documentElement.style.setProperty("--font-body", serif);
      document.documentElement.style.setProperty("--font-display", serif);
    } else if (t.type === "mixed") {
      document.documentElement.style.setProperty("--font-body", sans);
      document.documentElement.style.setProperty("--font-display", serif);
    } else {
      document.documentElement.style.setProperty("--font-body", sans);
      document.documentElement.style.setProperty("--font-display", sans);
    }
    document.documentElement.style.setProperty("--fs-base", `${(15 * t.fontScale / 100).toFixed(2)}px`);
  }, [t.theme, t.accent, t.type, t.fontScale]);

  const nav = (view, id = null) => {
    setRoute({ view, id });
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const onSignIn = () => { setSignedIn(true); nav("dashboard"); };
  const onSignOut = () => { setSignedIn(false); nav("landing"); };
  const toggleTheme = () => setTweak("theme", t.theme === "dark" ? "light" : "dark");
  const openIntroFor = (candidateId) => { setIntroCandidate(candidateId); setIntroOpen(true); };

  const showFooter = !signedIn || route.view === "landing";

  return (
    <div className="app">
      <TopNav
        view={route.view}
        onNav={(v) => nav(v)}
        signedIn={signedIn}
        onOpenInvite={() => setInviteOpen(true)}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        theme={t.theme}
        onToggleTheme={toggleTheme}
      />

      <main style={{ flex: 1 }}>
        {!signedIn && route.view === "landing" && <Landing onSignIn={onSignIn} />}
        {signedIn && route.view === "dashboard" && (
          <Dashboard
            onNav={nav}
            onOpenMandate={() => nav("dashboard")}
            onOpenInvite={() => setInviteOpen(true)}
          />
        )}
        {signedIn && route.view === "browse" && <Browse onNav={nav} />}
        {signedIn && route.view === "profile" && (
          <Profile id={route.id} onNav={nav} onOpenIntro={() => openIntroFor(route.id)} />
        )}
        {signedIn && route.view === "intel" && <ComingSoon title="Intel" />}
      </main>

      {showFooter && <Footer />}

      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
      <IntroRequestModal open={introOpen} onClose={() => setIntroOpen(false)} candidateId={introCandidate} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakRadio
          label="Mode"
          value={t.theme}
          options={["light", "dark"]}
          onChange={(v) => setTweak("theme", v)}
        />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakSection label="Typography" />
        <TweakRadio
          label="Pairing"
          value={t.type}
          options={TYPE_OPTIONS}
          onChange={(v) => setTweak("type", v)}
        />
        <TweakSlider
          label="Font size"
          value={t.fontScale}
          min={90}
          max={115}
          step={1}
          unit="%"
          onChange={(v) => setTweak("fontScale", v)}
        />
      </TweaksPanel>
    </div>
  );
}
