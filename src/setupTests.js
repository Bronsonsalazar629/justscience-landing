import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom has no IntersectionObserver; framer-motion's whileInView needs one.
// ponytail: no-op stub, replace with a real polyfill if a test needs to
// simulate actual intersection/visibility behavior.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = IntersectionObserverStub;

afterEach(() => {
  cleanup();
});
