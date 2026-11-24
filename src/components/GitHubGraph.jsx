import { useEffect, useMemo, useState } from 'react';
import { GithubIcon } from './BrandIcons';

const USER = 'tomaskotikk';
const API = `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`;

const t = {
  cs: {
    title: 'Aktivita na GitHubu',
    total: (n) => `${n} příspěvků za poslední rok`,
    loading: 'Načítám aktivitu…',
    error: 'Aktivitu se nepodařilo načíst.',
    less: 'Méně',
    more: 'Více',
    months: ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'],
    days: ['Po', '', 'St', '', 'Pá', '', ''],
    tip: (n, d) => `${n} ${n === 1 ? 'příspěvek' : n >= 2 && n <= 4 ? 'příspěvky' : 'příspěvků'} · ${d}`,
    locale: 'cs-CZ',
    profile: 'Profil',
  },
  en: {
    title: 'GitHub activity',
    total: (n) => `${n} contributions in the last year`,
    loading: 'Loading activity…',
    error: 'Could not load activity.',
    less: 'Less',
    more: 'More',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Mon', '', 'Wed', '', 'Fri', '', ''],
    tip: (n, d) => `${n} contribution${n === 1 ? '' : 's'} · ${d}`,
    locale: 'en-GB',
    profile: 'Profile',
  },
};

// Group days into Monday-first week columns
function toWeeks(days) {
  const weeks = [];
  let week = [];
  days.forEach((d, i) => {
    const dow = (new Date(d.date + 'T00:00:00').getDay() + 6) % 7;
    if (i === 0) for (let k = 0; k < dow; k++) week.push(null);
    week.push(d);
    if (dow === 6) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length) weeks.push(week);
  return weeks;
}

export default function GitHubGraph({ lang }) {
  const tx = t[lang];
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(API, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => setData(j))
      .catch((e) => e?.name !== 'AbortError' && setFailed(true));
    return () => ctrl.abort();
  }, []);

  const weeks = useMemo(() => (data ? toWeeks(data.contributions) : []), [data]);
  const total = data ? Object.values(data.total)[0] : 0;

  const monthLabels = weeks.map((w, i) => {
    const first = w.find((d) => d && d.date.slice(8) <= '07');
    if (!first) return null;
    const m = parseInt(first.date.slice(5, 7), 10) - 1;
    const prev = i > 0 && weeks[i - 1].find(Boolean);
    return !prev || prev.date.slice(5, 7) !== first.date.slice(5, 7) ? tx.months[m] : null;
  });

  return (
    <div className="ghg" data-reveal>
      <div className="ghg__head">
        <span className="mono stack__title">{tx.title}</span>
        <a href={`https://github.com/${USER}`} target="_blank" rel="noreferrer" className="ghg__link mono">
          <GithubIcon size={14} /> {tx.profile}
        </a>
      </div>

      <div className="ghg__card">
        <p className="ghg__total">{data ? tx.total(total) : failed ? tx.error : tx.loading}</p>

        {data && (
          <div className="ghg__scroll">
            <div className="ghg__grid" style={{ '--weeks': weeks.length }}>
              <div className="ghg__months">
                {monthLabels.map((m, i) => (
                  <span key={i}>{m}</span>
                ))}
              </div>
              <div className="ghg__days mono">
                {tx.days.map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>
              <div className="ghg__cells">
                {weeks.map((w, wi) => (
                  <div className="ghg__week" key={wi}>
                    {Array.from({ length: 7 }, (_, di) => {
                      const d = w[di];
                      if (!d) return <span key={di} className="ghg__cell is-empty" />;
                      const date = new Date(d.date + 'T00:00:00').toLocaleDateString(tx.locale, { day: 'numeric', month: 'long', year: 'numeric' });
                      return <span key={di} className="ghg__cell" data-l={d.level} title={tx.tip(d.count, date)} />;
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="ghg__legend mono">
          {tx.less}
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className="ghg__cell" data-l={l} />
          ))}
          {tx.more}
        </div>
      </div>
    </div>
  );
}
