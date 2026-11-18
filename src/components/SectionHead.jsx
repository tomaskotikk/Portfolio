export default function SectionHead({ index, label, title, lang, aside }) {
  return (
    <div className="shead">
      <div className="shead__meta">
        <span className="mono">({index})</span>
        <span className="mono">{label}</span>
      </div>
      <h2 className="shead__title" data-split key={lang}>
        {title}
      </h2>
      {aside && (
        <p className="shead__aside" data-reveal>
          {aside}
        </p>
      )}
      <hr className="rule" data-line />
    </div>
  );
}
