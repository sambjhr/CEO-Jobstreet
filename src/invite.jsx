import { useState, useEffect } from 'react';
import { Icon } from './shared';
import { CANDIDATES, MANDATES } from './data';

export function InviteModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    relationship: "I was a board member / chair",
    confidence: "Direct operating reference",
    note: "",
    code: "",
  });

  useEffect(() => {
    if (open) { setStep(0); setForm(f => ({ ...f, code: "" })); }
  }, [open]);

  if (!open) return null;

  const totalSteps = 3;
  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const next = () => {
    if (step === 1) {
      const random = Math.random().toString(36).slice(2, 8).toUpperCase();
      setForm(f => ({ ...f, code: `HLM-${random}` }));
    }
    setStep(s => Math.min(totalSteps - 1, s + 1));
  };
  const prev = () => setStep(s => Math.max(0, s - 1));
  const canProceed = step === 0
    ? form.firstName && form.lastName && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)
    : true;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Invite to the register</h2>
            <p className="modal-sub">Helm is invite-only. Your sponsorship is recorded against your partner-tier standing.</p>
          </div>
          <button className="btn btn-icon btn-ghost" onClick={onClose} aria-label="Close"><Icon name="x" /></button>
        </div>
        <div className="modal-body">
          <div className="steps">
            <ModalStep n={1} label="Candidate" on={step >= 0} done={step > 0} />
            <span className="step-line" />
            <ModalStep n={2} label="Sponsorship" on={step >= 1} done={step > 1} />
            <span className="step-line" />
            <ModalStep n={3} label="Send" on={step >= 2} done={step > 2} />
          </div>

          {step === 0 && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div className="form-row" style={{ margin: 0 }}>
                  <label>First name</label>
                  <input className="input" value={form.firstName} onChange={e => update("firstName", e.target.value)} placeholder="Aiko" />
                </div>
                <div className="form-row" style={{ margin: 0 }}>
                  <label>Last name</label>
                  <input className="input" value={form.lastName} onChange={e => update("lastName", e.target.value)} placeholder="Tanaka" />
                </div>
              </div>
              <div className="form-row">
                <label>Personal email</label>
                <input className="input" value={form.email} onChange={e => update("email", e.target.value)} placeholder="a.tanaka@personal.com" type="email" />
                <span className="hint">Use a personal address — invitations to work emails are discarded automatically.</span>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="form-row">
                <label>Your relationship to the candidate</label>
                <select className="input" value={form.relationship} onChange={e => update("relationship", e.target.value)}>
                  <option>I was a board member / chair</option>
                  <option>I co-founded a company with them</option>
                  <option>I invested in their company</option>
                  <option>They reported directly to me</option>
                  <option>I reported directly to them</option>
                  <option>I served on a panel/committee with them</option>
                </select>
              </div>
              <div className="form-row">
                <label>Confidence level</label>
                <select className="input" value={form.confidence} onChange={e => update("confidence", e.target.value)}>
                  <option>Direct operating reference</option>
                  <option>Strong second-hand reference</option>
                  <option>Reputation-only</option>
                </select>
                <span className="hint">Helm research will follow up to verify operating history before the candidate is listed.</span>
              </div>
              <div className="form-row">
                <label>Sponsor's note (private to Helm research)</label>
                <textarea
                  className="input"
                  rows={4}
                  value={form.note}
                  onChange={e => update("note", e.target.value)}
                  placeholder="One paragraph on why this candidate belongs in the register. The candidate will not see this."
                />
              </div>
            </>
          )}

          {step === 2 && (
            <div style={{ textAlign: "center", padding: "12px 0 8px" }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "var(--accent-soft)", color: "var(--accent)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16,
              }}>
                <Icon name="check" size={22} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
                Invitation ready to send
              </h3>
              <p className="muted" style={{ margin: "0 auto 24px", fontSize: 14, maxWidth: 380 }}>
                {form.firstName} {form.lastName} will receive a one-time invitation link tied to your sponsorship. They have 14 days to accept.
              </p>
              <div style={{
                padding: 18,
                border: "1px solid var(--border-strong)",
                borderRadius: "var(--radius)",
                background: "var(--surface-2)",
                textAlign: "left",
              }}>
                <div className="eyebrow" style={{ marginBottom: 10 }}>INVITATION CODE</div>
                <div className="anchor-row" style={{ padding: "10px 12px", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                  <Icon name="lock" size={14} />
                  <span style={{ flex: 1, fontWeight: 500 }}>{form.code}</span>
                  <button className="btn btn-icon btn-ghost" aria-label="Copy"><Icon name="copy" size={14} /></button>
                </div>
                <div className="mute2" style={{ fontSize: 12, marginTop: 10 }}>
                  Sent to <b>{form.email}</b> · Expires in 14 days · Single-use
                </div>
              </div>
              <p className="mute2" style={{ fontSize: 12, marginTop: 16 }}>
                Once accepted, Helm research begins vetting (typically 18 working days). You will be notified at each stage.
              </p>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost btn-sm" onClick={prev} disabled={step === 0} style={{ visibility: step === 0 ? "hidden" : "visible" }}>
            <Icon name="chevleft" size={13} /> Back
          </button>
          {step < totalSteps - 1 ? (
            <button className="btn btn-primary" disabled={!canProceed} onClick={next}>
              {step === 1 ? "Generate invitation" : "Continue"} <Icon name="arrow" size={14} />
            </button>
          ) : (
            <button className="btn btn-primary" onClick={onClose}>
              Done <Icon name="check" size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const ModalStep = ({ n, label, on, done }) => (
  <span className="step" data-on={on ? "" : undefined} data-done={done ? "" : undefined}>
    <span className="step-num">{done ? <Icon name="check" size={11} /> : n}</span>
    {label}
  </span>
);

export function IntroRequestModal({ open, onClose, candidateId }) {
  const c = CANDIDATES.find(x => x.id === candidateId) || CANDIDATES[0];
  const [mandate, setMandate] = useState(MANDATES[0].id);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => { if (open) { setSent(false); setNote(""); } }, [open]);
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{sent ? "Request sent" : "Request introduction"}</h2>
            <p className="modal-sub">
              {sent
                ? `${c.name} will review your brief and respond within 7 days.`
                : `${c.name} will review your mandate brief before contact details release.`}
            </p>
          </div>
          <button className="btn btn-icon btn-ghost" onClick={onClose} aria-label="Close"><Icon name="x" /></button>
        </div>
        <div className="modal-body">
          {sent ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "var(--accent-soft)", color: "var(--accent)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16,
              }}>
                <Icon name="check" size={22} />
              </div>
              <p className="muted" style={{ fontSize: 14, maxWidth: 360, margin: "0 auto" }}>
                You can track this in <b style={{ color: "var(--text)" }}>Mandates → {MANDATES.find(m => m.id === mandate)?.code}</b>. The candidate's decision is binding for this request.
              </p>
            </div>
          ) : (
            <>
              <div className="form-row">
                <label>Mandate</label>
                <select className="input" value={mandate} onChange={e => setMandate(e.target.value)}>
                  {MANDATES.map(m => <option key={m.id} value={m.id}>{m.code} · {m.title}</option>)}
                </select>
              </div>
              <div className="form-row">
                <label>Brief for the candidate</label>
                <textarea
                  className="input"
                  rows={5}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="A short framing of why this mandate may be of interest to them. Be specific about stage, scope, and what makes the role distinctive."
                />
                <span className="hint">The candidate sees this exact text — write as you would a personal note.</span>
              </div>
            </>
          )}
        </div>
        <div className="modal-footer">
          {sent ? (
            <>
              <span />
              <button className="btn btn-primary" onClick={onClose}>Close <Icon name="check" size={14} /></button>
            </>
          ) : (
            <>
              <span className="mute2" style={{ fontSize: 12 }}><Icon name="lock" size={11} /> Brief is shared with {c.name} only</span>
              <button className="btn btn-primary" disabled={note.trim().length < 20} onClick={() => setSent(true)}>
                Send request <Icon name="arrow" size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
