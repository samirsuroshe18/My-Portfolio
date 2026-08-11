const MONTH_YEAR = { month: 'short', year: 'numeric' };

export function formatMonthYear(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', MONTH_YEAR);
}

export function formatDateRange(startDate, endDate, isCurrent) {
  const start = formatMonthYear(startDate);
  if (isCurrent) return `${start} - Present`;
  if (!endDate) return start;
  return `${start} - ${formatMonthYear(endDate)}`;
}

export function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
