import { Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { HomePage } from './pages/HomePage';
import { OurMissionPage } from './pages/OurMissionPage';
import { OurTeamPage } from './pages/OurTeamPage';
import { FAQPage } from './pages/FAQPage';
import { GalleryPage } from './pages/GalleryPage';
import { StartAChapterPage } from './pages/StartAChapterPage';
import { PlaceholderPage } from './components/PlaceholderPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/our-mission" element={<OurMissionPage />} />
        <Route path="/our-team" element={<OurTeamPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/our-chapters" element={<PlaceholderPage title="Our Chapters" />} />
        <Route path="/programs" element={<PlaceholderPage title="Programs" />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/start-a-chapter" element={<StartAChapterPage />} />
        <Route path="/volunteer" element={<PlaceholderPage title="Volunteer" />} />
        <Route path="/sponsor" element={<PlaceholderPage title="Sponsor Us" />} />
        <Route
          path="/request-a-visit"
          element={<PlaceholderPage title="Request a Visit" />}
        />
        <Route path="/donate" element={<PlaceholderPage title="Donate Now" />} />
        <Route
          path="/contact"
          element={
            <PlaceholderPage title="Contact">
              <p>
                600 S San Gabriel Blvd, San Gabriel, CA 91776
                <br />
                contact@justscience.org
              </p>
            </PlaceholderPage>
          }
        />
        <Route
          path="/volunteer-hours"
          element={<PlaceholderPage title="Volunteer Hours" />}
        />
      </Route>
    </Routes>
  );
}

export default App;
