/**
 * Lets the CDN serve public read endpoints from its edge cache: fresh for 5 minutes,
 * then served stale (while refreshing in the background) for up to a day.
 * Browsers still revalidate every time, and requests carrying an admin token skip the cache.
 */
export function publicCache(req, res, next) {
  if (req.method === 'GET' && !req.headers.authorization) {
    res.set('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400');
  }
  next();
}
