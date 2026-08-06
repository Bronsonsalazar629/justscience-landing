import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LogoStrip } from './components/LogoStrip';
import { AboutSection } from './components/AboutSection';

function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <LogoStrip />
      <hr className="divider" />
      <AboutSection />
    </>
  );
}

export default App;
