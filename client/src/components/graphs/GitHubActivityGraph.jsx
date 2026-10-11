import { useState } from 'react';
import { LinkList } from '../ui/LinkList.jsx';

export function GitHubActivityGraph({ username, chartUrl, profileUrl }) {
  const [errored, setErrored] = useState(false);

  return (
    <div id="github" className="flex scroll-mt-24 flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-[1.14rem] font-semibold text-text-primary">GitHub activity, last 12 months</h3>
        <LinkList links={[{ label: 'Open GitHub profile', href: profileUrl, kind: 'github' }]} />
      </div>

      {errored ? (
        <p className="text-sm text-text-secondary">Couldn't load GitHub activity right now.</p>
      ) : (
        <>
          <div className="overflow-x-auto pb-1.5">
            {/* the chart is drawn for a light page; on the dark theme it is inverted, its hue turned back, and lifted so empty days stay visible */}
            <img
              src={chartUrl}
              alt={`${username}'s GitHub contribution graph`}
              className="min-w-[600px] dark:[filter:invert(1)_hue-rotate(180deg)_brightness(1.9)]"
              loading="lazy"
              onError={() => setErrored(true)}
            />
          </div>
          <p className="text-sm text-text-secondary">Public activity for {username}. Darker means more contributions.</p>
        </>
      )}
    </div>
  );
}
