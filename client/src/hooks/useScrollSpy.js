import { useEffect, useState } from 'react';
import { pickActiveSection } from '../utils/portfolio.js';

/**
 * Tracks which section id the reader is in, for highlighting the active navbar link.
 * Positions are read fresh on every update, so sections that appear after their data
 * loads are picked up; on a page with none of the sections, nothing is active.
 */
export function useScrollSpy(sectionIds) {
  const key = sectionIds.join(',');
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const ids = key.split(',').filter(Boolean);
    let frame = 0;

    const update = () => {
      frame = 0;
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .map((element) => ({ id: element.id, top: element.getBoundingClientRect().top }));
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActiveId(pickActiveSection(sections, window.innerHeight * 0.35, atBottom));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    // content arriving changes where sections sit without any scrolling
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      resizeObserver.disconnect();
    };
  }, [key]);

  return activeId;
}
