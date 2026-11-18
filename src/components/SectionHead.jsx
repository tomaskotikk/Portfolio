/** Section heading: icon pill label, title with an optional gradient-highlighted phrase, and a short lead. */
export default function SectionHead({ icon: Icon, label, title, highlight, lead, lang, center = false }) {
  return (
    <div className={`shead ${center ? 'shead--center' : ''}`}>
      <span className="pill" data-reveal>
        {Icon && <Icon size={14} strokeWidth={2.2} />}
        {label}
      </span>
      <h2 className="shead__title" data-split key={lang}>
        {title} {highlight && <span className="grad">{highlight}</span>}
      </h2>
      {lead && (
        <p className="shead__lead" data-reveal data-delay="0.1">
          {lead}
        </p>
      )}
    </div>
  );
}
