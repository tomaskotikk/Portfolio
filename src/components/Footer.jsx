import { ArrowUp, Heart } from 'lucide-react';
import { personal } from '../assets/data/portfolio';
import { scrollTo } from '../lib/motion';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons';
import Magnetic from './Magnetic';

export default function Footer({ lang }) {
  return (
    <footer className="footer">
      <div className="container">
        <span className="footer__big" aria-hidden="true">
          Tomáš Kotík
        </span>
        <div className="footer__row">
          <span className="footer__copy">© {new Date().getFullYear()} Tomáš Kotík</span>
          <span className="footer__made">
            {lang === 'cs' ? 'Vyrobeno s' : 'Made with'} <Heart size={14} className="heart" /> {lang === 'cs' ? 've Zlíně' : 'in Zlín'}
          </span>
          <div className="footer__right">
            <a href={personal.links.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
              <GithubIcon size={16} />
            </a>
            <a href={personal.links.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn">
              <LinkedinIcon size={16} />
            </a>
            <a href={personal.links.instagram} target="_blank" rel="noreferrer" className="icon-btn" aria-label="Instagram">
              <InstagramIcon size={16} />
            </a>
            <Magnetic>
              <button className="icon-btn icon-btn--solid" onClick={() => scrollTo(0)} aria-label={lang === 'cs' ? 'Nahoru' : 'Back to top'}>
                <ArrowUp size={16} />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
