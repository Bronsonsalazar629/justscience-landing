import { motion } from 'framer-motion';
import './Button.css';

export function Button({ variant = 'primary', children, onClick, href }) {
  const className = `btn btn-${variant}`;
  const content =
    variant === 'liquid' ? (
      <>
        <span className="btn-liquid-fill" aria-hidden="true" />
        <span className="btn-liquid-label">{children}</span>
      </>
    ) : (
      children
    );

  if (href) {
    return (
      <motion.a
        href={href}
        className={className}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.button>
  );
}
