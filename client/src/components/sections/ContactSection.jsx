import { useState } from 'react';
import { Section } from '../layout/Section.jsx';
import { ContactForm } from './ContactForm.jsx';
import { Button } from '../ui/Button.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';

function EmailAddress({ email }) {
  const [copied, setCopied] = useState(false);

  const copy = async (event) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // copying can be refused; select the address so it can be copied by hand
      window.getSelection()?.selectAllChildren(event.currentTarget.previousElementSibling);
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

  return (
    <Section id="contact" title="Get in touch">
      <div className="grid gap-x-[72px] gap-y-8 md:grid-cols-[5fr_6fr]">
        <div className="flex min-w-0 flex-col items-start gap-[18px] text-text-secondary">
          <p>Send a message here or email me directly.</p>
          {profile?.contactEmail && <EmailAddress email={profile.contactEmail} />}
          {profile?.resumeUrl && (
            <Button as="a" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" variant="outline">
              Read resume
            </Button>
          )}
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
