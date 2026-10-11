import { useState } from 'react';
import { ContactForm } from './ContactForm.jsx';
import { Button } from '../ui/Button.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';

function EmailAddress({ email }) {
  const [copied, setCopied] = useState(false);

  const copy = async (event) => {
    // read before awaiting: the event's target is cleared once the handler yields
    const address = event.currentTarget.previousElementSibling;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // copying can be refused; select the address so it can be copied by hand
      window.getSelection()?.selectAllChildren(address);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 text-[1.1rem] font-semibold text-text-primary">
      <span className="[overflow-wrap:anywhere]">{email}</span>
      <button
        onClick={copy}
        className="cursor-pointer rounded-md border border-border px-2.5 py-0.5 text-[0.85rem] font-semibold transition-colors hover:border-text-secondary"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export function ContactSection() {
  const { data } = usePortfolioData('profile');
  const profile = data?.profile;

  // The heading sits inside the left column, so on wide screens the form starts level with it
  // instead of below it. On phones the two stack: heading and contact details, then the form.
  return (
    <section id="contact" className="grid min-w-0 scroll-mt-28 gap-x-[72px] gap-y-8 sm:scroll-mt-24 md:grid-cols-[5fr_6fr]">
      <div className="flex min-w-0 flex-col items-start gap-[18px] text-text-secondary">
        <h2 className="mb-1.5 font-serif text-[clamp(2.1rem,4vw,2.9rem)] leading-[1.05] tracking-[-0.01em] text-text-primary">Get in touch</h2>
        <p>Send a message here or email me directly.</p>
        {profile?.contactEmail && <EmailAddress email={profile.contactEmail} />}
        {profile?.resumeUrl && (
          <Button as="a" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" variant="outline">
            Read resume
          </Button>
        )}
      </div>
      <ContactForm />
    </section>
  );
}
