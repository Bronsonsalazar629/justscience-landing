import { motion } from 'framer-motion';
import './Button.css';

export function Button({ variant = 'primary', children, onClick, href }) {
  const className = `btn btn-${variant}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={className}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
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
      {children}
    </motion.button>
  );
}
