import { useEffect, useRef } from 'react';
import { calendarWeeks } from '../../utils/portfolio.js';

const LEVEL_CLASS = ['bg-contrib-0', 'bg-contrib-1', 'bg-contrib-2', 'bg-contrib-3', 'bg-contrib-4'];
const LEVEL_TEXT = ['No contributions', 'A few contributions', 'Some contributions', 'Many contributions', 'Most contributions'];
// rows are Sunday to Saturday; GitHub labels every other one
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const CELL = 'h-[11px] w-[11px] rounded-[2px]';

/** The contribution calendar drawn the way GitHub draws it, from { date, level } days. */
export function ContributionCalendar({ days, total, username }) {
  const scroller = useRef(null);
  const { weeks, months } = calendarWeeks(days);

  // on a narrow screen the calendar scrolls sideways; start at the most recent weeks
  useEffect(() => {
    if (scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth;
  }, [weeks.length]);

  const summary = total != null ? `${total.toLocaleString('en-US')} contributions in the last year` : 'Contributions in the last year';

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[0.95rem] text-text-secondary">{summary}</p>

      <div ref={scroller} className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div role="img" aria-label={`${summary} for ${username}`} className="flex w-max gap-2 text-[0.72rem] leading-none text-text-secondary">
          <div aria-hidden="true" className="mt-[18px] grid grid-rows-7 gap-[3px]">
            {DAY_LABELS.map((label, index) => (
              <span key={index} className="flex h-[11px] items-center">
                {label}
              </span>
            ))}
          </div>

          <div aria-hidden="true">
            <div className="relative mb-[4px] h-[14px]">
              {months.map((month) => (
                <span key={`${month.label}-${month.column}`} className="absolute top-0" style={{ left: month.column * 14 }}>
                  {month.label}
                </span>
              ))}
            </div>
            <div className="flex gap-[3px]">
              {weeks.map((week, column) => (
                <div key={column} className="grid grid-rows-7 gap-[3px]">
                  {week.map((day, row) =>
                    day ? (
                      <span key={day.date} title={`${LEVEL_TEXT[day.level]} on ${day.date}`} className={`${CELL} ${LEVEL_CLASS[day.level]}`} />
                    ) : (
                      <span key={row} className={CELL} />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="flex items-center gap-[3px] text-[0.72rem] text-text-secondary">
        <span className="mr-1">Less</span>
        {LEVEL_CLASS.map((level) => (
          <span key={level} className={`${CELL} ${level}`} />
        ))}
        <span className="ml-1">More</span>
      </div>
    </div>
  );
}
