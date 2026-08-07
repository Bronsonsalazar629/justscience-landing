import './PlaceholderPage.css';

export function PlaceholderPage({ title, children }) {
  return (
    <section className="placeholder-page">
      <h1>{title}</h1>
      <p>This page is coming soon — check back for updates!</p>
      {children}
    </section>
  );
}
