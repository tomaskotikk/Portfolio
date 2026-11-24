import { useEffect, useMemo, useRef, useState } from 'react';
import { GithubIcon } from './BrandIcons';
import { gsap, useGSAP, reduced } from '../lib/motion';

const USER = 'tomaskotikk';
const API = `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`;

const t = {
  cs: {
    title: 'Aktivita na GitHubu',
    loading: 'Načítám aktivitu…',
    error: 'Aktivitu se nepodařilo načíst.',
    less: 'Méně',
    more: 'Více',
    months: ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'],
    days: ['Po', '', 'St', '', 'Pá', '', ''],
    unit: (n) => (n === 1 ? 'příspěvek' : n >= 2 && n <= 4 ? 'příspěvky' : 'příspěvků'),
    stats: { total: 'za poslední rok', streak: 'nejdelší série dní', current: 'aktuální série', best: 'nejvíc za den' },
    locale: 'cs-CZ',
    profile: 'Profil',
  },
  en: {
    title: 'GitHub activity',
    loading: 'Loading activity…',
    error: 'Could not load activity.',
    less: 'Less',
    more: 'More',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Mon', '', 'Wed', '', 'Fri', '', ''],
    unit: (n) => (n === 1 ? 'contribution' : 'contributions'),
    stats: { total: 'in the last year', streak: 'longest streak (days)', current: 'current streak', best: 'best day' },
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

function getStats(days) {
  let longest = 0;
  let run = 0;
  let best = 0;
  days.forEach((d) => {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
    best = Math.max(best, d.count);
  });
  // Current streak: count back from today (today may still be empty)
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else if (i !== days.length - 1) break;
  }
  return { total: days.reduce((s, d) => s + d.count, 0), longest, current, best };
}

export default function GitHubGraph({ lang }) {
  const tx = t[lang];
  const root = useRef(null);
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [tip, setTip] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(API, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => setData(j))
      .catch((e) => e?.name !== 'AbortError' && setFailed(true));
    return () => ctrl.abort();
  }, []);

  const days = data?.contributions ?? [];
  const weeks = useMemo(() => toWeeks(days), [days]);
  const stats = useMemo(() => getStats(days), [days]);

  const monthLabels = weeks.map((w, i) => {
    const first = w.find(Boolean);
    const prev = i > 0 && weeks[i - 1].find(Boolean);
    if (!first || (prev && prev.date.slice(5, 7) === first.date.slice(5, 7))) return null;
    return tx.months[parseInt(first.date.slice(5, 7), 10) - 1];
  });

  // Wave reveal of the cells + count-up of the stats once data arrives
  useGSAP(
    () => {
      if (!data || reduced) return;
      gsap.from('.ghg__cells .ghg__cell:not(.is-empty)', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: { each: 0.0025, from: 'start' },
        scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
      });
      gsap.utils.toArray('.ghg__num').forEach((el) => {
        const end = parseInt(el.dataset.v, 10);
        const o = { v: 0 };
        gsap.to(o, {
          v: end,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => (el.textContent = Math.round(o.v)),
        });
      });
    },
    { scope: root, dependencies: [data] }
  );

  const showTip = (e, d) => {
    const cell = e.currentTarget.getBoundingClientRect();
    const box = root.current.getBoundingClientRect();
    const date = new Date(d.date + 'T00:00:00').toLocaleDateString(tx.locale, { weekday: 'short', day: 'numeric', month: 'long' });
    setTip({ x: cell.left - box.left + cell.width / 2, y: cell.top - box.top, count: d.count, date });
  };

  return (
    <div className="ghg" ref={root} data-reveal>
      <div className="ghg__head">
        <span className="mono stack__title">{tx.title}</span>
        <a href={`https://github.com/${USER}`} target="_blank" rel="noreferrer" className="ghg__link mono">
          <GithubIcon size={14} /> @{USER}
        </a>
      </div>

      <div className="ghg__card">
        {!data && <p className="ghg__state mono">{failed ? tx.error : tx.loading}</p>}

        {data && (
          <>
            <div className="ghg__stats">
              {[
                ['total', stats.total],
                ['streak', stats.longest],
                ['current', stats.current],
                ['best', stats.best],
              ].map(([k, v]) => (
                <div className="ghg__stat" key={k}>
                  <span className="ghg__num" data-v={v}>
                    {v}
                  </span>
                  <span className="mono">{tx.stats[k]}</span>
                </div>
              ))}
            </div>

            <div className="ghg__scroll">
              <div className="ghg__grid" style={{ '--weeks': weeks.length }}>
                <div className="ghg__months mono">
                  {monthLabels.map((m, i) => (
                    <span key={i}>{m}</span>
                  ))}
                </div>
                <div className="ghg__days mono">
                  {tx.days.map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </div>
                <div className="ghg__cells" onMouseLeave={() => setTip(null)}>
                  {weeks.map((w, wi) => (
                    <div className="ghg__week" key={wi}>
                      {Array.from({ length: 7 }, (_, di) => {
                        const d = w[di];
                        if (!d) return <span key={di} className="ghg__cell is-empty" />;
                        return (
                          <span
                            key={di}
                            className="ghg__cell"
                            data-l={d.level}
                            onMouseEnter={(e) => showTip(e, d)}
                            aria-label={`${d.count} ${tx.unit(d.count)}, ${d.date}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ghg__legend mono">
              {tx.less}
              {[0, 1, 2, 3, 4].map((l) => (
                <span key={l} className="ghg__cell" data-l={l} />
              ))}
              {tx.more}
            </div>
          </>
        )}
      </div>

      {tip && (
        <div className="ghg__tip" style={{ left: tip.x, top: tip.y }}>
          <strong>
            {tip.count} {tx.unit(tip.count)}
          </strong>
          <span>{tip.date}</span>
        </div>
      )}
    </div>
  );
}
