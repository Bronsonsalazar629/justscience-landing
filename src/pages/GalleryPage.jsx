import './GalleryPage.css';

const PLACEHOLDER_COUNT = 6;

export function GalleryPage() {
  return (
    <section className="gallery">
      <h1>Gallery</h1>
      <div className="gallery-grid" aria-label="Project gallery placeholder">
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <div key={i} className="gallery-item" />
        ))}
      </div>
    </section>
  );
}
