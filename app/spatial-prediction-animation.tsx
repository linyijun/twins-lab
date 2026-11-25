"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

const land = "M75 680 228 288Q238 266 260 269L902 318Q933 321 919 353L778 796Q771 818 745 817L96 747Q63 744 75 680Z";
const palette = ["#b8ebd3", "#91d9cc", "#b6e5df", "#d5c5ed", "#f5d3b8", "#e9e0ba", "#c8e7be"];

// Fixed, overlapping organic regions make the final surface a local prediction
// field. Their geometry never changes; only their reveal order does.
const patches = Array.from({ length: 49 }, (_, index) => {
  const column = index % 7;
  const row = Math.floor(index / 7);
  const x = 65 + column * 142 + Math.sin(index * 2.4) * 46;
  const y = 255 + row * 96 + Math.cos(index * 1.7) * 35;
  const width = 126 + (index * 19 % 53);
  const height = 81 + (index * 13 % 38);
  const order = index * 19 % 49;
  return {
    d: `M${x - width} ${y + 6} C${x - width - 30} ${y - height * .6},${x - 30} ${y - height * .48},${x - 18} ${y - height} C${x + 12} ${y - height - 30},${x + width * .55} ${y - height * .48},${x + width} ${y - height * .34} C${x + width + 45} ${y},${x + width * .58} ${y + height * .36},${x + width * .8} ${y + height * .7} C${x + width * .8} ${y + height + 32},${x + 24} ${y + height * .53},${x - 8} ${y + height} C${x - 40} ${y + height + 24},${x - width * .55} ${y + height * .47},${x - width} ${y + 6}Z`,
    color: palette[(index * 3 + row) % palette.length],
    begin: 1 + order / 49 * 3.5,
  };
});

function Station({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`} stroke="#151515" strokeWidth="6" strokeLinejoin="round">
    <path d="M-8 0V-41H8V0" fill="#8b8d88" />
    <rect x="-26" y="-5" width="52" height="15" rx="2" fill="#73756f" />
    <rect x="-33" y="-100" width="66" height="62" rx="3" fill="#f7fbf7" />
    <path d="M-33-87H33M-33-74H33M-33-61H33M-33-48H33" strokeWidth="4" />
    <path d="m-43-102 43-25 43 25Z" fill="#e6f5f3" />
  </g>;
}

function Tree({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="#151515" strokeWidth="6" strokeLinejoin="round">
    <path d="M-10-55V8H12V-55" fill="#c7a880" />
    <path d="M-34-57C-64-57-66-89-46-102C-57-124-33-145-13-133C-7-161 27-155 31-133C58-138 73-111 55-94C74-72 46-47 23-58C8-43-17-44-34-57Z" fill="#b8dca8" />
  </g>;
}

export function SpatialPredictionAnimation() {
  const id = useId().replace(/:/g, "");
  const frame = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(preference.matches);
    syncPreference();
    preference.addEventListener("change", syncPreference);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setStarted(true);
    }, { threshold: 0.2 });
    if (frame.current) observer.observe(frame.current);
    return () => {
      preference.removeEventListener("change", syncPreference);
      observer.disconnect();
    };
  }, []);

  return <div
    ref={frame}
    className="spatial-prediction-animation"
    data-started={started}
    data-paused={paused || !visible}
  >
    <svg viewBox="0 0 1000 1000" role="img" aria-labelledby={`${id}-title ${id}-description`}>
      <title id={`${id}-title`}>Spatial prediction from sparse observations</title>
      <desc id={`${id}-description`}>Three measuring stations stand on a landscape. Scattered areas gradually fill with mint, aqua, lavender, and peach colors until the entire land has a predicted value. The landscape, river, hills, trees, and stations stay in place.</desc>
      <defs>
        <clipPath id={`${id}-land`}><path d={land} /></clipPath>
      </defs>
      <g stroke="#151515" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round">
        <path d="M75 687V753Q73 778 100 783L741 860Q765 863 780 838L921 390Q927 375 924 335L777 801Q771 818 746 817L97 747Q67 745 75 687Z" fill="#d7c5e6" />
        <path d={land} fill="#f4f4e6" />
      </g>
      <g clipPath={`url(#${id}-land)`}>
        <path className="prediction-ground" d={land} fill="#b8ebd3" />
        {patches.map((patch, index) => <path
          key={index}
          className="prediction-patch"
          d={patch.d}
          fill={patch.color}
          style={{ animationName: `prediction-local-fill-${index}` } as CSSProperties}
        />)}
        {/* The three small initial observed areas remain visible throughout. */}
        <path d="M316 430q-25-26 7-43 28-16 61 8 20 23-13 39-29 15-55-4Z" fill="#91d9cc" />
        <path d="M228 671q-24-19 0-38 31-20 63 5 15 25-19 37-27 9-44-4Z" fill="#d5c5ed" />
        <path transform="translate(70 62)" d="M681 574q-29-17-7-40 29-20 61 4 21 24-9 39-24 11-45-3Z" fill="#f5d3b8" />
        <path d="M668 291C667 346 601 355 611 399C620 434 666 452 638 494C610 537 478 534 434 601C399 656 412 668 352 724L300 825L489 843C454 775 449 738 494 694C537 653 665 643 696 579C731 510 651 474 680 434C700 407 758 365 758 295Z" fill="#ace4f0" stroke="#151515" strokeWidth="7" strokeLinejoin="round" />
      </g>
      <path d={land} fill="none" stroke="#151515" strokeWidth="7" strokeLinejoin="round" />
      <g stroke="#151515" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round">
        <path d="M364 270Q424 135 514 280" fill="#b9dca8" />
        <path d="M206 291Q292 71 415 274" fill="#b2dda7" />
        <path d="M206 291Q312 265 415 274" fill="none" stroke="#65936a" strokeWidth="4" />
        <path d="M712 302Q795 111 899 323" fill="#b7dba6" />
        <path d="M712 302Q799 322 899 323" fill="none" stroke="#65936a" strokeWidth="4" />
      </g>
      <g fill="#80af89">
        <path d="M467 371q-9-24 14-26 2-27 23-22 21 1 23 25 22-9 27 15 9 17-13 18Z" />
        <path d="M531 749q-6-19 13-22 3-24 24-18 15 2 17 19 22-8 29 14 3 11-13 13Z" />
        <path d="M163 600q-15-25-5-29 10-3 14 25 0-33 11-31 9 3-2 30 17-21 24-14 5 8-15 21Z" />
        <path d="M816 450q-15-25-5-29 10-3 14 25 0-33 11-31 9 3-2 30 17-21 24-14 5 8-15 21Z" />
      </g>
      <Tree x={168} y={584} scale={.8} />
      <Station x={351} y={417} />
      <Tree x={847} y={501} scale={.76} />
      <Station x={774} y={620} />
      <Station x={257} y={656} />
      <Tree x={600} y={779} scale={.65} />
    </svg>
    {!reducedMotion && <button
      className="prediction-playback"
      type="button"
      aria-label={paused ? "Resume spatial prediction animation" : "Pause spatial prediction animation"}
      aria-pressed={paused}
      title={paused ? "Resume animation" : "Pause animation"}
      onClick={() => setPaused(value => !value)}
    >
      <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
        {paused ? <path d="m6 3 11 7-11 7Z" fill="currentColor" /> : <path d="M5 4h3v12H5zM12 4h3v12h-3z" fill="currentColor" />}
      </svg>
    </button>}
    <style>{`
      .spatial-prediction-animation{position:relative;width:100%;aspect-ratio:1;isolation:isolate}
      .spatial-prediction-animation>svg{display:block;width:100%;height:100%}
      .spatial-prediction-animation .prediction-patch{opacity:0}
      .spatial-prediction-animation .prediction-ground{opacity:0}
      .spatial-prediction-animation[data-started="true"] .prediction-patch{animation-duration:8s;animation-timing-function:linear;animation-iteration-count:infinite}
      .spatial-prediction-animation[data-started="true"] .prediction-ground{animation:prediction-ground-fill 8s linear infinite}
      .spatial-prediction-animation[data-paused="true"] .prediction-patch,.spatial-prediction-animation[data-paused="true"] .prediction-ground{animation-play-state:paused}
      .prediction-playback{position:absolute;right:10px;bottom:10px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:1px solid #d6d6d6;border-radius:50%;color:#555;background:#ffffffeb;cursor:pointer;padding:0}
      .prediction-playback:hover{color:#111;background:#f5f5f5}
      .prediction-playback:focus-visible{outline:2px solid #555;outline-offset:3px}
      @media(max-width:640px){.prediction-playback{right:0;bottom:-28px}}
      ${patches.map((patch, index) => `@keyframes prediction-local-fill-${index}{0%,${patch.begin / 8 * 100}%{opacity:0}${(patch.begin + .5) / 8 * 100}%,87.5%{opacity:1}100%{opacity:0}}`).join("\n")}
      @keyframes prediction-ground-fill{0%,50%{opacity:0}62.5%,87.5%{opacity:1}100%{opacity:0}}
      @media(prefers-reduced-motion:reduce){.spatial-prediction-animation .prediction-patch,.spatial-prediction-animation .prediction-ground{animation:none!important;opacity:1}.prediction-playback{display:none}}
    `}</style>
  </div>;
}
