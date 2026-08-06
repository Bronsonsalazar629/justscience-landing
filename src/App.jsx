import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LogoStrip } from './components/LogoStrip';
import { AboutSection } from './components/AboutSection';
import { AcknowledgementsSection } from './components/AcknowledgementsSection';

function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <LogoStrip />
      <hr className="divider" />
      <AboutSection />
      <hr className="divider" />
      <AcknowledgementsSection />
    </>
  );
}

export default App;
