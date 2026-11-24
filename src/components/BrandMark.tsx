interface BrandMarkProps {
  variant?: 'light' | 'dark';
  size?: 'header' | 'prominent';
  showDescriptor?: boolean;
}

export function BrandMark({
  variant = 'dark',
  size = 'header',
  showDescriptor = false,
}: BrandMarkProps) {
  const isLight = variant === 'light';
  const primaryText = isLight ? 'text-[#F3EDE2]' : 'text-[#34483D]';
  const mutedText = isLight ? 'text-[#F3EDE2]/75' : 'text-[#34483D]/75';
  const accentText = 'text-[#B9785C]';
  const strokePrimary = isLight ? '#F3EDE2' : '#34483D';

  const iconSize = size === 'prominent' ? 'w-11 h-11' : 'w-8 h-8 sm:w-9 sm:h-9';
  const titleSize =
    size === 'prominent'
      ? 'text-3xl sm:text-4xl'
      : 'text-xl sm:text-2xl';
  const subSize =
    size === 'prominent'
      ? 'text-[11px] sm:text-xs tracking-[0.24em]'
      : 'text-[9.5px] sm:text-[10.5px] tracking-[0.22em]';

  return (
    <div className="inline-flex items-center gap-3 shrink-0">
      {/* Minimal architectural hospitality arch monogram */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`${iconSize} shrink-0`}
      >
        <rect
          x="1.5"
          y="1.5"
          width="37"
          height="37"
          stroke={strokePrimary}
          strokeOpacity="0.3"
          strokeWidth="1.2"
        />
        <path
          d="M11 32V18C11 12.4772 15.0294 8 20 8C24.9706 8 29 12.4772 29 18V32"
          stroke={strokePrimary}
          strokeWidth="1.6"
        />
        <path
          d="M15.5 19.5L20 27.5L24.5 19.5"
          stroke="#B9785C"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className={`font-display font-semibold tracking-tight whitespace-nowrap ${titleSize} ${primaryText}`}
        >
          Vvichelae
        </span>
        <span
          className={`font-sans font-semibold uppercase whitespace-nowrap mt-1 ${subSize} ${accentText}`}
        >
          STAYS &amp; SUITES
        </span>
        {showDescriptor && (
          <span
            className={`font-sans text-[11px] sm:text-xs italic mt-1.5 whitespace-nowrap ${mutedText}`}
          >
            Serviced Apartments • Short-Let Living
          </span>
        )}
      </div>
    </div>
  );
}
