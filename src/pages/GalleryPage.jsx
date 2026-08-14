import { useState } from 'react';
import { motion } from 'framer-motion';
import './GalleryPage.css';

const SLIDE_COUNT = 6;
const SLIDES = Array.from({ length: SLIDE_COUNT }, (_, i) => i);

// Keep these in sync with the slide/gap widths in GalleryPage.css.
const SLIDE_WIDTH = 320;
const SLIDE_GAP = 24;
const VIEWPORT_WIDTH = 480;
const STEP = SLIDE_WIDTH + SLIDE_GAP;
const CENTER_OFFSET = (VIEWPORT_WIDTH - SLIDE_WIDTH) / 2;

export function GalleryPage() {
  const [index, setIndex] = useState(0);

  const goTo = (nextIndex) => {
    setIndex((nextIndex + SLIDE_COUNT) % SLIDE_COUNT);
  };

  return (
    <section className="gallery">
      <h1>Gallery</h1>
      <div className="gallery-carousel" aria-label="Project gallery placeholder">
        <button
          type="button"
          className="gallery-nav gallery-nav-prev"
          aria-label="Previous slide"
          onClick={() => goTo(index - 1)}
        >
          ‹
        </button>
        <div className="gallery-viewport">
          <motion.div
            className="gallery-track"
            animate={{ x: CENTER_OFFSET - index * STEP }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {SLIDES.map((slide) => {
              const isActive = slide === index;
              return (
                <motion.div
                  key={slide}
                  className="gallery-item"
                  aria-current={isActive}
                  animate={{
                    opacity: isActive ? 1 : 0.4,
                    scale: isActive ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  {slide + 1}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        <button
          type="button"
          className="gallery-nav gallery-nav-next"
          aria-label="Next slide"
          onClick={() => goTo(index + 1)}
        >
          ›
        </button>
      </div>
      <div className="gallery-pagination" role="tablist">
        {SLIDES.map((slide) => (
          <button
            key={slide}
            type="button"
            role="tab"
            aria-label={`Go to slide ${slide + 1}`}
            aria-selected={slide === index}
            className={`gallery-dot ${slide === index ? 'gallery-dot-active' : ''}`}
            onClick={() => goTo(slide)}
          />
        ))}
      </div>
    </section>
  );
}
