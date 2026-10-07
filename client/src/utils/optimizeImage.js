const UPLOAD_MARKER = '/image/upload/';

/**
 * Asks Cloudinary for a resized, modern-format (WebP/AVIF) version of an image
 * instead of the original upload. `width` should be about 2x the displayed size.
 * Non-Cloudinary and already-transformed URLs are returned untouched.
 */
export function optimizeImage(url, width) {
  if (!url || !url.includes('res.cloudinary.com')) return url;

  const markerIndex = url.indexOf(UPLOAD_MARKER);
  if (markerIndex === -1) return url;

  const head = url.slice(0, markerIndex + UPLOAD_MARKER.length);
  const tail = url.slice(markerIndex + UPLOAD_MARKER.length);
  const alreadyTransformed = /^[a-z]{1,3}_[^/]+\//.test(tail);
  if (alreadyTransformed) return url;

  const transform = ['f_auto', 'q_auto', width ? `c_limit,w_${width}` : null].filter(Boolean).join(',');
  return `${head}${transform}/${tail}`;
}
