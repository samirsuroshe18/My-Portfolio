import { useEffect, useState } from 'react';
import { Button } from '../ui/Button.jsx';
import { Spinner } from '../ui/Spinner.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';

function useTypewriter(words) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words?.length) return;
    const current = words[wordIndex % words.length];
    const speed = deleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), 1200);
        return;
      }
      if (deleting && text === '') {
        setDeleting(false);
        setWordIndex((i) => i + 1);
        return;
      }
      setText(current.slice(0, deleting ? text.length - 1 : text.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return text;
}

export function HeroSection() {
  const { data, loading } = usePortfolioData('profile');
  const profile = data?.profile;
  const typedRole = useTypewriter(profile?.roles);

  if (loading) return <Spinner className="min-h-[60vh]" />;
  if (!profile) return null;

  return (
    <section id="about" className="relative overflow-hidden pb-20 pt-16 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(133,76,230,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,0,200,0.12),transparent_45%)]" />

      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">{profile.availability}</p>
          <h1 className="text-4xl font-bold leading-tight text-text-primary sm:text-5xl">
            Hi, I'm <span className="text-primary">{profile.name}</span>
          </h1>
          <p className="mt-3 min-h-[2.5rem] text-xl font-medium text-text-secondary sm:text-2xl">
            I am a <span className="text-primary">{typedRole}</span>
            <span className="animate-pulse text-primary">|</span>
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary">{profile.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {profile.resumeUrl && (
              <Button as="a" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" size="lg">
                Check Resume
              </Button>
            )}
            <Button as="a" href="#contact" variant="outline" size="lg">
              Get In Touch
            </Button>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-gradient-to-br from-primary to-primary-2 opacity-30 blur-2xl" />
            {profile.avatarUrl && (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="h-64 w-64 rounded-full border-4 border-primary/60 object-cover shadow-2xl sm:h-80 sm:w-80"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
