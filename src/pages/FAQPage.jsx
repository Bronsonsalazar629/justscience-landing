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
  return (
    <section className="faq">
      <h1>Frequently Asked Questions</h1>
      <dl>
        {FAQS.map((faq) => (
          <div key={faq.question} className="faq-item">
            <dt>{faq.question}</dt>
            <dd>
              {faq.cta ? (
                <Button variant="primary" href="#/contact">
                  Contact Us
                </Button>
              ) : (
                faq.answer
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
