import './Logo.css';

const LETTERS = [
  { char: 'S', color: 'var(--color-logo-1)' },
  { char: 'T', color: 'var(--color-logo-2)' },
  { char: 'E', color: 'var(--color-logo-3)' },
  { char: 'M', color: 'var(--color-logo-4)' },
  { char: 's', color: 'var(--color-text-primary)' },
  { char: 't', color: 'var(--color-text-primary)' },
  { char: 'e', color: 'var(--color-text-primary)' },
  { char: 'r', color: 'var(--color-text-primary)' },
  { char: 's', color: 'var(--color-text-primary)' },
];

export function Logo() {
  return (
    <span className="logo" aria-label="STEMsters">
      {LETTERS.map((letter, i) => (
        <span key={i} style={{ color: letter.color }}>
          {letter.char}
        </span>
      ))}
    </span>
  );
}
