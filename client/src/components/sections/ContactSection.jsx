import { SectionHeader } from '../layout/SectionHeader.jsx';
import { ContactForm } from './ContactForm.jsx';

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader title="Contact" description="Feel free to reach out for opportunities or questions!" />
      <ContactForm />
    </section>
  );
}
