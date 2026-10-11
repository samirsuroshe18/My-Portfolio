import { useState } from 'react';
import { ContributionCalendar } from './ContributionCalendar.jsx';
import { LinkList } from '../ui/LinkList.jsx';

export function GitHubActivityGraph({ username, chartUrl, profileUrl, calendar }) {
  const [errored, setErrored] = useState(false);
  const hasCalendar = calendar?.days?.length > 0;

  return (
    <div id="github" className="flex scroll-mt-24 flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-[1.14rem] font-semibold text-text-primary">GitHub activity</h3>
        <LinkList links={[{ label: 'Open GitHub profile', href: profileUrl, kind: 'github' }]} />
      </div>

      {hasCalendar && <ContributionCalendar days={calendar.days} total={calendar.total} username={username} />}

      {/* older API responses carry no calendar data; fall back to the chart image */}
      {!hasCalendar && errored && <p className="text-sm text-text-secondary">Couldn't load GitHub activity right now.</p>}
      {!hasCalendar && !errored && (
        <div className="overflow-x-auto pb-1.5">
          {/* the image is drawn for a light page; on the dark theme it is inverted, its hue turned back, and lifted so empty days stay visible */}
          <img
            src={chartUrl}
            alt={`${username}'s GitHub contribution graph`}
            className="min-w-[600px] dark:[filter:invert(1)_hue-rotate(180deg)_brightness(1.9)]"
            loading="lazy"
            onError={() => setErrored(true)}
          />
        </div>
      )}
    </div>
  );
}
