import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections
import IntroScreen from './components/sections/IntroScreen';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import AcademicFoundation from './components/sections/AcademicFoundation';
import Portfolio from './components/sections/Portfolio';
import Contact from './components/sections/Contact';
import SceneBackground from './components/ui/SceneBackground';

// UI
import ScrollProgress from './components/ui/ScrollProgress';

// Hooks
import useLenis from './hooks/useLenis';

const App = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [language, setLanguage] = useState('cs');

  // Initialize smooth scroll
  useLenis();

  return (
    <>
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Intro splash screen */}
      <AnimatePresence>
        {!introComplete && (
          <IntroScreen
            language={language}
            onComplete={() => setIntroComplete(true)}
          />
        )}
      </AnimatePresence>

      {/* Main site */}
      {introComplete && (
        <>
          <SceneBackground />
          <Navbar language={language} onLanguageChange={setLanguage} />
          <main>
            <Hero language={language} />
            <About language={language} />
            <AcademicFoundation language={language} />
            <Portfolio language={language} />
            <Contact language={language} />
          </main>
          <Footer language={language} />
        </>
      )}
    </>
  );
};

export default App;
