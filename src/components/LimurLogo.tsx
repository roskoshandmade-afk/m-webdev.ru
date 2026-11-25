interface LimurLogoProps {
  surfaceClass?: string;
}

export function LimurLogo({surfaceClass = 'bg-[#F8FAFC]'}: LimurLogoProps) {
  return (
    <div
      className="inline-flex flex-col items-center select-none"
      aria-label="LI.MUR WEB — веб-дизайн и разработка"
    >
      {/* Sharp rectangular double border (#0F172A) */}
      <div className="border-2 border-[#0F172A] p-1">
        <div
          className={`border border-[#0F172A] px-3.5 pt-1.5 pb-2.5 ${surfaceClass} flex flex-col items-center`}
        >
          <span className="font-logo font-semibold uppercase text-[21px] sm:text-[23px] leading-none tracking-[0.09em] text-[#0F172A]">
            LI.MUR
          </span>
          <span className="font-logo font-semibold uppercase text-[22px] sm:text-[24px] leading-none tracking-[0.16em] text-[#0F172A] mt-0.5">
            WEB
          </span>
        </div>
      </div>

      {/* Calligraphic cursive tagline cleanly overlapping the bottom border */}
      <span
        className={`font-script font-normal text-[18px] sm:text-[20px] leading-none whitespace-nowrap text-[#0F172A] -mt-3 px-1.5 ${surfaceClass}`}
      >
        веб-дизайн и разработка
      </span>
    </div>
  );
}
