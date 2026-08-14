import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import './FAQPage.css';

const FAQS = [
  {
    question: 'Who do you teach?',
    answer:
      'Primarily, but not limited to, curious aspirers in elementary/middle school.',
  },
  {
    question: 'How will the students learn?',
    answer:
      'Through simplified demonstrations and personal kits that allow them to collectively engage in the targeted topics.',
  },
  { question: 'How can I get involved?', cta: true },
];

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.section
      className="faq"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h1>Frequently Asked Questions</h1>
      <div className="faq-accordion">
        {FAQS.map((faq, index) => {
          const isOpen = index === openIndex;
          return (
            <div key={faq.question} className="faq-item">
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                {faq.question}
                <span className="faq-icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <div className="faq-answer-inner">
                      {faq.cta ? (
                        <Button variant="primary" href="#/contact">
                          Contact Us
                        </Button>
                      ) : (
                        faq.answer
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
