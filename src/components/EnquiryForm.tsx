import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { AGE_OPTIONS, CAMPUS_OPTIONS, ENQUIRY_ENDPOINT } from '../data/site';
import type { CampusChoice } from './EnquiryContext';
import { EASE } from './motion';

interface Values { parent: string; child: string; phone: string; campus: CampusChoice; age: string; message: string }
type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.parent.trim().length < 2) e.parent = 'Please enter the parent’s name';
  if (v.child.trim().length < 2) e.child = 'Please enter the child’s name';
  const digits = v.phone.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  if (!/^[6-9]\d{9}$/.test(digits)) e.phone = 'Enter a valid 10-digit Indian mobile number';
  if (!v.age) e.age = 'Select your child’s age';
  if (v.message.length > 500) e.message = 'Please keep the message under 500 characters';
  return e;
}

async function submit(v: Values) {
  const payload = { ...v, submittedAt: new Date().toISOString(), source: location.href };
  if (ENQUIRY_ENDPOINT) {
    const res = await fetch(ENQUIRY_ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Request failed');
    return;
  }
  // No endpoint configured: queue locally so nothing is lost until one is set.
  try {
    const q = JSON.parse(localStorage.getItem('aps-enquiries') || '[]');
    q.push(payload);
    localStorage.setItem('aps-enquiries', JSON.stringify(q));
  } catch { /* ignore */ }
  await new Promise((r) => setTimeout(r, 700));
}

const field = 'peer w-full rounded-2xl border border-ink/10 bg-white/80 px-4 pb-2.5 pt-6 text-base text-ink outline-none transition focus:border-wm focus:bg-white focus:shadow-[0_0_0_4px_rgba(244,91,101,.15)]';
const label = 'pointer-events-none absolute left-4 top-2 text-[11px] font-semibold uppercase tracking-widest text-ink-soft';

export function EnquiryForm({ initialCampus = 'not-sure' }: { initialCampus?: CampusChoice }) {
  const [v, setV] = useState<Values>({ parent: '', child: '', phone: '', campus: initialCampus, age: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(v);
    setErrors(e);
    if (Object.keys(e).length) {
      (document.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus();
      return;
    }
    setState('sending');
    try {
      await submit(v);
      setState('done');
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        confetti({ particleCount: 90, spread: 80, origin: { y: .65 }, colors: ['#F45B65', '#FF8E9B', '#75B86A', '#285B40', '#FFF9F1'], disableForReducedMotion: true });
      }
    } catch { setState('error'); }
  };

  const Err = ({ k }: { k: keyof Values }) => (
    <AnimatePresence>
      {errors[k] && (
        <motion.p id={`${k}-err`} role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 pl-1 text-sm font-medium text-wm-dark">
          {errors[k]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  if (state === 'done') {
    return (
      <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, ease: EASE }} className="grid min-h-[420px] place-items-center text-center" role="status">
        <div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12, delay: .15 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-leaf text-white">
            <Check className="h-10 w-10" strokeWidth={3} />
          </motion.div>
          <h3 className="mt-6 text-4xl text-ink">Thank you, {v.parent.split(' ')[0]}!</h3>
          <p className="mx-auto mt-3 max-w-xs text-ink-soft">We’ve noted your interest for {v.child} and will be in touch soon.</p>
          <button onClick={() => { setV({ parent: '', child: '', phone: '', campus: initialCampus, age: '', message: '' }); setState('idle'); }} className="mt-6 text-sm font-semibold text-wm underline underline-offset-4">Send another enquiry</button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4" aria-describedby="form-status">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="relative">
            <input id="parent" name="parent" autoComplete="name" value={v.parent} onChange={(e) => set('parent', e.target.value)} placeholder=" " className={field} aria-invalid={!!errors.parent} aria-describedby={errors.parent ? 'parent-err' : undefined} />
            <label htmlFor="parent" className={label}>Parent name</label>
          </div>
          <Err k="parent" />
        </div>
        <div>
          <div className="relative">
            <input id="child" name="child" value={v.child} onChange={(e) => set('child', e.target.value)} placeholder=" " className={field} aria-invalid={!!errors.child} aria-describedby={errors.child ? 'child-err' : undefined} />
            <label htmlFor="child" className={label}>Child name</label>
          </div>
          <Err k="child" />
        </div>
      </div>

      <div>
        <div className="relative">
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={(e) => set('phone', e.target.value)} placeholder=" " className={field} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-err' : undefined} />
          <label htmlFor="phone" className={label}>Phone number</label>
        </div>
        <Err k="phone" />
      </div>

      <fieldset>
        <legend className="mb-2 pl-1 text-[11px] font-semibold uppercase tracking-widest text-ink-soft">Interested campus</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {CAMPUS_OPTIONS.map((o) => {
            const on = v.campus === o.value;
            return (
              <label key={o.value} className={`relative cursor-pointer rounded-2xl border px-4 py-3 transition focus-within:ring-4 focus-within:ring-wm/20 ${on ? 'border-transparent text-white' : 'border-ink/10 bg-white/70 hover:bg-white'}`}>
                {on && <motion.span layoutId={`campus-pill-${initialCampus}`} className="absolute inset-0 rounded-2xl bg-wm" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                <input type="radio" name="campus" value={o.value} checked={on} onChange={() => set('campus', o.value)} className="sr-only" />
                <span className="relative block font-display text-lg font-semibold leading-tight">{o.label}</span>
                <span className={`relative block text-xs ${on ? 'text-white/80' : 'text-ink-soft'}`}>{o.sub}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 pl-1 text-[11px] font-semibold uppercase tracking-widest text-ink-soft">Child’s age (years)</legend>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-invalid={!!errors.age}>
          {AGE_OPTIONS.map((a) => {
            const on = v.age === a;
            return (
              <label key={a} className={`relative cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition focus-within:ring-4 focus-within:ring-leaf/30 ${on ? 'border-leaf-deep bg-leaf-deep text-white' : 'border-ink/10 bg-white/70 hover:bg-white'}`}>
                <input type="radio" name="age" value={a} checked={on} onChange={() => set('age', a)} className="sr-only" />
                {a}
              </label>
            );
          })}
        </div>
        <Err k="age" />
      </fieldset>

      <div>
        <div className="relative">
          <textarea id="message" name="message" rows={3} value={v.message} onChange={(e) => set('message', e.target.value)} placeholder=" " className={`${field} resize-none`} aria-invalid={!!errors.message} />
          <label htmlFor="message" className={label}>Message (optional)</label>
        </div>
        <Err k="message" />
      </div>

      <button type="submit" disabled={state === 'sending'} className="group relative flex w-full items-center justify-between overflow-hidden rounded-full bg-ink px-7 py-4 font-display text-lg font-semibold text-cream transition disabled:opacity-70">
        <span className="absolute inset-0 origin-left scale-x-0 bg-wm transition-transform duration-500 ease-out group-hover:scale-x-100" />
        <span className="relative">{state === 'sending' ? 'Sending…' : 'Send enquiry'}</span>
        <span className="relative grid h-9 w-9 place-items-center rounded-full bg-cream text-ink transition group-hover:translate-x-1">
          {state === 'sending' ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
        </span>
      </button>
      <p id="form-status" role="status" className="min-h-5 text-center text-sm text-wm-dark">
        {state === 'error' && 'Something went wrong. Please try again in a moment.'}
      </p>
    </form>
  );
}
