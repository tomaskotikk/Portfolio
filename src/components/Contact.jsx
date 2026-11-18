import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from './BrandIcons';
import { personal } from '../assets/data/portfolio';
import Magnetic from './Magnetic';

const t = {
  cs: {
    label: 'Kontakt',
    title: (
      <>
        Postavme spolu <em>něco dobrého.</em>
      </>
    ),
    desc: 'Hledáte vývojáře na stáž, juniorní pozici nebo web na zakázku? Ozvěte se.',
    copy: 'Kopírovat e-mail',
    copied: 'Zkopírováno',
    name: 'Jméno',
    email: 'E-mail',
    message: 'Zpráva',
    namePh: 'Jan Novák',
    emailPh: 'jan@firma.cz',
    msgPh: 'Pár slov o projektu nebo pozici…',
    send: 'Odeslat zprávu',
    sending: 'Odesílám…',
    sent: 'Díky, zpráva dorazila. Ozvu se.',
    error: 'Odeslání se nepovedlo. Napište mi prosím přímo na e-mail.',
    subject: 'Nová zpráva z portfolia',
  },
  en: {
    label: 'Contact',
    title: (
      <>
        Let&rsquo;s build <em>something good.</em>
      </>
    ),
    desc: 'Looking for an intern, a junior developer or a custom website? Get in touch.',
    copy: 'Copy e-mail',
    copied: 'Copied',
    name: 'Name',
    email: 'E-mail',
    message: 'Message',
    namePh: 'Jane Smith',
    emailPh: 'jane@company.com',
    msgPh: 'A few words about the project or role…',
    send: 'Send message',
    sending: 'Sending…',
    sent: "Thanks, message received. I'll get back to you.",
    error: 'Sending failed. Please e-mail me directly.',
    subject: 'New message from portfolio',
  },
};

const socials = [
  ['LinkedIn', personal.links.linkedin, LinkedinIcon],
  ['GitHub', personal.links.github, GithubIcon],
  ['Instagram', personal.links.instagram, InstagramIcon],
  ['Facebook', personal.links.facebook, FacebookIcon],
];

export default function Contact({ lang }) {
  const tx = t[lang];
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${personal.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: tx.subject, _template: 'table' }),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="shead__meta">
          <span className="mono">(05)</span>
          <span className="mono">{tx.label}</span>
        </div>
        <h2 className="contact__title" data-split key={lang}>
          {tx.title}
        </h2>

        <div className="contact__grid">
          <div className="contact__left" data-reveal>
            <p className="contact__desc">{tx.desc}</p>
            <div className="contact__mail">
              <a href={`mailto:${personal.email}`} className="contact__email" data-cursor="Mail">
                <Mail className="contact__mail-icon" size={26} strokeWidth={1.6} />
                {personal.email}
              </a>
              <button className="icon-btn" onClick={copy} aria-label={tx.copy} title={tx.copy}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span className="sr-live" aria-live="polite">
                  {copied ? tx.copied : ''}
                </span>
              </button>
            </div>
            <ul className="socials">
              {socials.map(([name, href, Icon]) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noreferrer">
                    <Icon size={15} />
                    {name}
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form className="form" onSubmit={submit} data-reveal data-delay="0.1">
            <label>
              <span className="mono">{tx.name}</span>
              <input required name="name" placeholder={tx.namePh} autoComplete="name" {...field('name')} />
            </label>
            <label>
              <span className="mono">{tx.email}</span>
              <input required type="email" name="email" placeholder={tx.emailPh} autoComplete="email" {...field('email')} />
            </label>
            <label>
              <span className="mono">{tx.message}</span>
              <textarea required name="message" rows={4} placeholder={tx.msgPh} {...field('message')} />
            </label>
            <div className="form__foot">
              <Magnetic>
                <button className="btn btn--accent" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? tx.sending : tx.send}
                  <ArrowUpRight size={16} />
                </button>
              </Magnetic>
              {status === 'sent' && <span className="form__msg">{tx.sent}</span>}
              {status === 'error' && <span className="form__msg form__msg--err">{tx.error}</span>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
