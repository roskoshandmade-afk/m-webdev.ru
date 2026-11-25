export function MWebLogo() {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      {/* Left icon: dark-slate rounded-square badge with geometric M + cobalt digital pointer accent */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-9 h-9 shrink-0"
        aria-hidden="true"
      >
        <rect width="36" height="36" rx="10" fill="#0F172A" />
        {/* Crisp geometric M monogram leaving right-leg foot for cobalt pixel pointer */}
        <path
          d="M9.5 26.5V10.5H13.1L18 18.4L22.9 10.5H26.5V20.5H23.1V16.1L19.4 21.8H16.6L12.9 16.1V26.5H9.5Z"
          fill="#F8FAFC"
        />
        {/* Cobalt-blue digital pointer / pixel accent terminating right leg of M */}
        <rect x="22.8" y="22.3" width="4.2" height="4.2" rx="1" fill="#2563EB" />
      </svg>

      {/* Right wordmark: bold Manrope uppercase M + cobalt pill underscore + WEB */}
      <span className="font-heading font-extrabold text-[1.28rem] leading-none tracking-[-0.03em] text-[#0F172A] inline-flex items-baseline">
        <span>M</span>
        <span
          className="inline-block w-[11px] h-[3.25px] rounded-full bg-[#2563EB] mx-[2px] translate-y-[1px]"
          aria-hidden="true"
        />
        <span className="sr-only">_</span>
        <span>WEB</span>
      </span>
    </span>
  );
}
