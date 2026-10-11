import { useEffect, useRef } from 'react';
import { calendarWeeks } from '../../utils/portfolio.js';

const LEVEL_CLASS = ['bg-contrib-0', 'bg-contrib-1', 'bg-contrib-2', 'bg-contrib-3', 'bg-contrib-4'];
const LEVEL_TEXT = ['No contributions', 'A few contributions', 'Some contributions', 'Many contributions', 'Most contributions'];
// rows are Sunday to Saturday; GitHub labels every other one
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const GAP = 3;
const MIN_CELL = 11;

/**
 * The contribution calendar drawn the way GitHub draws it, from { date, level } days.
 * The week columns share the available width, so on a wide screen the calendar runs edge to
 * edge; they never shrink below GitHub's own cell size, so on a phone it scrolls sideways.
 */
export function ContributionCalendar({ days, total, username }) {
  const scroller = useRef(null);
  const { weeks, months } = calendarWeeks(days);

  // when it scrolls, start at the most recent weeks
  useEffect(() => {
    if (scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth;
  }, [weeks.length]);

  const summary = total != null ? `${total.toLocaleString('en-US')} contributions in the last year` : 'Contributions in the last year';
  const columns = { gridTemplateColumns: `repeat(${weeks.length}, minmax(${MIN_CELL}px, 1fr))`, columnGap: GAP };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[0.95rem] text-text-secondary">{summary}</p>

      <div ref={scroller} className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          role="img"
          aria-label={`${summary} for ${username}`}
          className="grid w-full min-w-max grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-1 text-[0.72rem] leading-none text-text-secondary"
        >
          <span aria-hidden="true" />
          <div aria-hidden="true" className="relative h-[14px]">
            {months.map((month) => (
              // a column starts at column * (track + gap), and track + gap is (100% + gap) / columns
              <span
                key={`${month.label}-${month.column}`}
                className="absolute top-0"
                style={{ left: `calc(${month.column} * (100% + ${GAP}px) / ${weeks.length})` }}
              >
                {month.label}
              </span>
            ))}
          </div>

          <div aria-hidden="true" className="grid grid-rows-7" style={{ rowGap: GAP }}>
            {DAY_LABELS.map((label, index) => (
              <span key={index} className="flex items-center">
                {label}
              </span>
            ))}
          </div>
          <div aria-hidden="true" className="grid" style={columns}>
            {weeks.map((week, column) => (
              <div key={column} className="grid grid-rows-7" style={{ rowGap: GAP }}>
                {week.map((day, row) =>
                  day ? (
                    <span key={day.date} title={`${LEVEL_TEXT[day.level]} on ${day.date}`} className={`aspect-square w-full rounded-[2px] ${LEVEL_CLASS[day.level]}`} />
                  ) : (
                    <span key={row} className="aspect-square w-full" />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="flex items-center gap-[3px] text-[0.72rem] text-text-secondary">
        <span className="mr-1">Less</span>
        {LEVEL_CLASS.map((level) => (
          <span key={level} className={`h-[11px] w-[11px] rounded-[2px] ${level}`} />
        ))}
        <span className="ml-1">More</span>
      </div>
    </div>
  );
}
