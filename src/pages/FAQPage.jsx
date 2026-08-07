import './FAQPage.css';

const FAQS = [
  { question: 'What age groups do you teach?', answer: 'Answer coming soon.' },
  { question: 'What is project based learning?', answer: 'Answer coming soon.' },
  { question: 'How long is a lesson?', answer: 'Answer coming soon.' },
];

export function FAQPage() {
  return (
    <section className="faq">
      <h1>Frequently Asked Questions</h1>
      <dl>
        {FAQS.map((faq) => (
          <div key={faq.question} className="faq-item">
            <dt>{faq.question}</dt>
            <dd>{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
