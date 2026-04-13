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

  // Initialize smooth scroll
  useLenis();

  return (
    <>
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Intro splash screen */}
      <AnimatePresence>
        {!introComplete && (
          <IntroScreen onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      {/* Main site */}
      {introComplete && (
        <>
          <SceneBackground />
          <Navbar />
          <main>
            <Hero />
            <About />
            <AcademicFoundation />
            <Portfolio />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
