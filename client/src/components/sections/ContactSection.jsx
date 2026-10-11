import { useState } from 'react';
import { FaRegEnvelope, FaRegFileLines } from 'react-icons/fa6';
import { ContactForm } from './ContactForm.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';

const detailRow = 'flex items-center gap-2.5 border-t border-border py-3 first:border-t-0 sm:gap-3';
const detailIcon = 'flex-none text-[1rem] text-text-secondary';

function EmailRow({ email }) {
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
    <div className={detailRow}>
      <FaRegEnvelope aria-hidden="true" className={detailIcon} />
      {/* slightly smaller on phones so a typical address stays on one line beside the button */}
      <span className="min-w-0 flex-1 text-[0.86rem] font-semibold text-text-primary [overflow-wrap:anywhere] sm:text-[1rem]">{email}</span>
      <button
        onClick={copy}
        className="flex-none cursor-pointer rounded-md border border-border px-2.5 py-0.5 text-[0.85rem] font-semibold text-text-primary transition-colors hover:border-text-secondary"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export function ContactSection() {
  const { data } = usePortfolioData('profile');
  const profile = data?.profile;
  const hasDetails = profile?.contactEmail || profile?.resumeUrl;

  // The heading sits inside the left column, so on wide screens the form starts level with it
  // instead of below it. On phones the two stack: heading and contact details, then the form.
  return (
    <section id="contact" className="grid min-w-0 scroll-mt-28 gap-x-[72px] gap-y-6 sm:scroll-mt-24 md:grid-cols-[5fr_6fr]">
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-serif text-[clamp(2.1rem,4vw,2.9rem)] leading-[1.05] tracking-[-0.01em] text-text-primary">Get in touch</h2>
          <p className="text-text-secondary">Send a message here or email me directly.</p>
        </div>

        {/* the ways to reach me, grouped as one short list */}
        {hasDetails && (
          <div className="rounded-2xl border border-border px-3.5 sm:px-4">
            {profile.contactEmail && <EmailRow email={profile.contactEmail} />}
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className={`${detailRow} group`}>
                <FaRegFileLines aria-hidden="true" className={detailIcon} />
                <span className="flex-1 font-semibold text-text-primary transition-colors group-hover:text-primary">Read resume</span>
                <span aria-hidden="true" className="text-[0.85rem] text-text-secondary">Opens in a new tab</span>
              </a>
            )}
          </div>
        )}
      </div>
      <ContactForm />
    </section>
  );
}
