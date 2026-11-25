interface PalmShadowsProps {
  variant: 'hero' | 'services' | 'process' | 'contact';
}

function PalmFrondSvg({className}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 520 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Central arched rachis (stem) */}
      <path
        d="M28 532 C98 418, 212 288, 492 42"
        stroke="#0F172A"
        strokeWidth="6.5"
        strokeLinecap="round"
      />

      {/* Upper-left / outer fan of tapered pinnate leaflets */}
      <path d="M98 430 C64 360, 42 292, 34 218 C60 282, 84 348, 114 410 Z" fill="#0F172A" />
      <path d="M128 394 C88 310, 62 232, 56 146 C86 222, 112 300, 146 374 Z" fill="#0F172A" />
      <path d="M162 356 C118 264, 92 178, 90 88 C122 170, 148 256, 180 336 Z" fill="#0F172A" />
      <path d="M198 318 C154 226, 132 138, 138 50 C166 134, 188 220, 216 300 Z" fill="#0F172A" />
      <path d="M236 280 C196 192, 180 110, 192 26 C214 108, 232 190, 254 264 Z" fill="#0F172A" />
      <path d="M276 242 C242 162, 232 88, 248 16 C264 90, 276 162, 294 226 Z" fill="#0F172A" />
      <path d="M318 204 C290 134, 286 72, 306 12 C318 76, 326 136, 336 188 Z" fill="#0F172A" />
      <path d="M362 164 C342 106, 344 58, 366 10 C374 62, 376 110, 380 150 Z" fill="#0F172A" />
      <path d="M408 122 C396 78, 402 42, 424 10 C426 48, 424 84, 424 110 Z" fill="#0F172A" />
      <path d="M452 80 C448 52, 456 28, 476 10 C474 36, 468 58, 464 70 Z" fill="#0F172A" />

      {/* Lower-right / inner fan of tapered pinnate leaflets */}
      <path d="M84 452 C156 446, 234 454, 314 484 C236 474, 162 468, 96 468 Z" fill="#0F172A" />
      <path d="M118 412 C198 402, 282 406, 368 434 C284 426, 202 424, 132 428 Z" fill="#0F172A" />
      <path d="M154 372 C240 356, 328 358, 418 382 C332 378, 246 378, 170 388 Z" fill="#0F172A" />
      <path d="M192 332 C280 310, 368 308, 456 326 C370 328, 286 332, 208 346 Z" fill="#0F172A" />
      <path d="M232 292 C318 266, 404 260, 488 272 C406 280, 324 288, 248 306 Z" fill="#0F172A" />
      <path d="M272 252 C352 224, 432 214, 508 220 C432 234, 356 244, 288 264 Z" fill="#0F172A" />
      <path d="M314 212 C386 184, 456 170, 516 170 C452 190, 388 202, 330 222 Z" fill="#0F172A" />
      <path d="M358 170 C418 144, 474 130, 518 124 C468 146, 418 160, 372 178 Z" fill="#0F172A" />
      <path d="M402 128 C448 106, 488 94, 516 84 C480 106, 446 118, 416 134 Z" fill="#0F172A" />
      <path d="M446 86 C476 70, 500 60, 516 50 C494 68, 474 78, 456 90 Z" fill="#0F172A" />
    </svg>
  );
}

export function PalmShadows({variant}: PalmShadowsProps) {
  if (variant === 'hero') {
    return (
      <div
        className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0"
        aria-hidden="true"
      >
        {/* Top-left subtle sunlit palm frond shadow */}
        <PalmFrondSvg className="absolute -top-24 -left-24 w-[340px] sm:w-[440px] h-auto text-[#0F172A] opacity-[0.045] blur-[6px] rotate-[115deg]" />

        {/* Bottom-left sweeping coastal frond shadow */}
        <PalmFrondSvg className="absolute -bottom-28 -left-20 w-[360px] sm:w-[480px] h-auto text-[#0F172A] opacity-[0.05] blur-[6px] rotate-[14deg]" />

        {/* Right-edge graceful sunlit palm frond shadow */}
        <PalmFrondSvg className="absolute -top-16 -right-24 sm:-right-20 w-[400px] sm:w-[560px] h-auto text-[#0F172A] opacity-[0.06] blur-[6px] -scale-x-100 -rotate-[18deg]" />
      </div>
    );
  }

  if (variant === 'services') {
    return (
      <div
        className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0"
        aria-hidden="true"
      >
        {/* Soft upper-right coastal frond shadow */}
        <PalmFrondSvg className="absolute -top-20 -right-28 w-[380px] sm:w-[520px] h-auto text-[#0F172A] opacity-[0.045] blur-[6px] -scale-x-100 -rotate-[28deg]" />

        {/* Soft lower-left balancing shadow */}
        <PalmFrondSvg className="absolute -bottom-24 -left-28 w-[360px] sm:w-[460px] h-auto text-[#0F172A] opacity-[0.04] blur-[6px] rotate-[22deg]" />
      </div>
    );
  }

  if (variant === 'process') {
    return (
      <div
        className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0"
        aria-hidden="true"
      >
        {/* Soft top-left sunlit palm shadow */}
        <PalmFrondSvg className="absolute -top-28 -left-24 w-[340px] sm:w-[440px] h-auto text-[#0F172A] opacity-[0.045] blur-[6px] rotate-[108deg]" />

        {/* Soft bottom-right sunlit palm shadow */}
        <PalmFrondSvg className="absolute -bottom-28 -right-24 w-[360px] sm:w-[460px] h-auto text-[#0F172A] opacity-[0.045] blur-[6px] -scale-x-100 rotate-[12deg]" />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Light top-right sunlight shadow behind contact section */}
      <PalmFrondSvg className="absolute -top-24 -right-24 w-[360px] sm:w-[480px] h-auto text-[#0F172A] opacity-[0.045] blur-[6px] -scale-x-100 -rotate-[24deg]" />

      {/* Very soft bottom-left palm shadow */}
      <PalmFrondSvg className="absolute -bottom-28 -left-24 w-[340px] sm:w-[440px] h-auto text-[#0F172A] opacity-[0.04] blur-[6px] rotate-[18deg]" />
    </div>
  );
}
