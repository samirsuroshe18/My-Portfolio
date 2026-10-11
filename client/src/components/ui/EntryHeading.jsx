import { optimizeImage } from '../../utils/optimizeImage.js';

/** The logo, title and one-line subtitle that open an experience or education entry. */
export function EntryHeading({ logo, title, subtitle }) {
  return (
    <div className="flex items-center gap-3.5">
      {logo && <img src={optimizeImage(logo, 96)} alt="" loading="lazy" decoding="async" className="h-[46px] w-[46px] flex-none rounded-[10px] bg-white object-contain" />}
      <div className="min-w-0">
        <h3 className="text-[1.14rem] font-semibold leading-snug text-text-primary">{title}</h3>
        {subtitle && <p className="text-[0.93rem] text-text-secondary">{subtitle}</p>}
      </div>
    </div>
  );
}
