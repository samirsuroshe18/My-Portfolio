import { useState } from 'react';

export function GitHubActivityGraph({ username, chartUrl, profileUrl }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-text-secondary">Couldn't load GitHub activity right now.</p>
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary">
          View @{username} on GitHub →
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card p-6 shadow-glow">
      <img src={chartUrl} alt={`${username}'s GitHub contribution graph`} className="mx-auto min-w-[600px]" loading="lazy" onError={() => setErrored(true)} />
      <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block text-center text-sm font-semibold text-primary">
        View full profile on GitHub →
      </a>
    </div>
  );
}
