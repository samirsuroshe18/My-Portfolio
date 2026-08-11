export function SectionHeader({ title, description, align = 'center' }) {
  const alignClasses = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <div className={`mb-12 flex flex-col gap-3 ${alignClasses}`}>
      <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
        {title}
        <span
          className={`mt-2 block h-1 w-14 rounded-full bg-gradient-to-r from-primary to-primary-2 ${align === 'center' ? 'mx-auto' : ''}`}
        />
      </h2>
      {description && <p className="max-w-2xl text-base text-text-secondary">{description}</p>}
    </div>
  );
}
