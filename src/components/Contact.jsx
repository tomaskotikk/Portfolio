import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, MapPin, MessageSquare, Send } from 'lucide-react';
import { personal } from '../assets/data/portfolio';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from './BrandIcons';
import SectionHead from './SectionHead';
import Magnetic from './Magnetic';

const t = {
  cs: {
    label: 'Kontakt',
    title: 'Postavme spolu',
    highlight: 'něco dobrého.',
    lead: 'Hledáte vývojáře na stáž, juniorní pozici nebo web na zakázku? Ozvěte se.',
    copy: 'Kopírovat',
    copied: 'Zkopírováno',
    mail: 'E-mail',
    loc: 'Lokalita',
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
    formTitle: 'Napište mi',
  },
  en: {
    label: 'Contact',
    title: "Let's build",
    highlight: 'something good.',
    lead: 'Looking for an intern, a junior developer or a custom website? Get in touch.',
    copy: 'Copy',
    copied: 'Copied',
    mail: 'E-mail',
    loc: 'Location',
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
    formTitle: 'Send a message',
  },
};

const socials = [
  [LinkedinIcon, 'LinkedIn', personal.links.linkedin, 'linkedin'],
  [GithubIcon, 'GitHub', personal.links.github, 'github'],
  [InstagramIcon, 'Instagram', personal.links.instagram, 'instagram'],
  [FacebookIcon, 'Facebook', personal.links.facebook, 'facebook'],
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
        <SectionHead icon={MessageSquare} label={tx.label} title={tx.title} highlight={tx.highlight} lead={tx.lead} lang={lang} />

        <div className="contact__grid">
          <div className="contact__left">
            <div className="tile spot contact-card" data-reveal>
              <span className="tile__icon">
                <Mail size={18} />
              </span>
              <div className="contact-card__text">
                <span className="tile__label">{tx.mail}</span>
                <a href={`mailto:${personal.email}`} className="contact-card__value">
                  {personal.email}
                </a>
              </div>
              <button className="icon-btn" onClick={copy} aria-label={tx.copy} title={copied ? tx.copied : tx.copy}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
              <span className="sr-live" aria-live="polite">
                {copied ? tx.copied : ''}
              </span>
            </div>
            <div className="tile spot contact-card" data-reveal data-delay="0.05">
              <span className="tile__icon">
                <MapPin size={18} />
              </span>
              <div className="contact-card__text">
                <span className="tile__label">{tx.loc}</span>
                <span className="contact-card__value">{personal.location[lang]}</span>
              </div>
            </div>
            <div className="socials" data-reveal data-delay="0.1">
              {socials.map(([Icon, name, href, key]) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" className={`tile spot social social--${key}`}>
                  <Icon size={20} />
                  <span>{name}</span>
                  <ArrowUpRight size={16} className="social__arrow" />
                </a>
              ))}
            </div>
          </div>

          <form className="tile form" onSubmit={submit} data-reveal data-delay="0.1">
            <h3>
              <Send size={18} /> {tx.formTitle}
            </h3>
            <label>
              <span>{tx.name}</span>
              <input required name="name" placeholder={tx.namePh} autoComplete="name" {...field('name')} />
            </label>
            <label>
              <span>{tx.email}</span>
              <input required type="email" name="email" placeholder={tx.emailPh} autoComplete="email" {...field('email')} />
            </label>
            <label>
              <span>{tx.message}</span>
              <textarea required name="message" rows={4} placeholder={tx.msgPh} {...field('message')} />
            </label>
            <div className="form__foot">
              <Magnetic>
                <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? tx.sending : tx.send}
                  <Send size={16} />
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
