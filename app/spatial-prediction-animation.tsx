"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { ANIMATION_SECONDS, BASE_PATH, GRID_CELLS, LAND_PATH, OBSERVATION_SITES } from "./spatial-prediction-grid";

function Sensor({ x, y, number }: { x: number; y: number; number: number }) {
  return <g transform={`translate(${x} ${y})`} role="img" aria-label={`Observation site ${number}`} stroke="#202625" strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round">
    <title>{`Observation site ${number}`}</title>
    <ellipse cx="0" cy="0" rx="17" ry="6" fill="#f8fbfa" />
    <path d="M0-51V-16M0-25-14 0M0-25 14 0M0-25V0" fill="none" />
    <circle cx="0" cy="0" r="3.5" fill="#202625" stroke="none" />
    <rect x="-28" y="-103" width="56" height="53" rx="6" fill="#fcfefd" />
    <rect x="-21" y="-93" width="42" height="24" rx="2" fill="#d6f1f5" strokeWidth="3" />
    <path d="M-16-81h7l4-6 6 13 5-10 4 3h6" fill="none" stroke="#287b9b" strokeWidth="3" />
    <circle cx="14" cy="-59" r="2.5" fill="#287b9b" stroke="none" />
    <path d="M14-104V-125" fill="none" />
    <circle cx="14" cy="-128" r="3" fill="#202625" />
    <path d="M25-132q7 5 0 11M31-139q16 12 0 25" fill="none" stroke="#287b9b" strokeWidth="3" />
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
      <desc id={`${id}-description`}>Three instrument sensors mark observed cells on a land grid. Starting from these observations, colors gradually spread to nearby cells, then more distant cells, until the entire grid has predicted values. Equally distant cells fill together. The river, terrain, grid, and sensors stay fixed.</desc>
      <defs>
        <clipPath id={`${id}-land`}><path d={LAND_PATH} /></clipPath>
      </defs>
      <g stroke="#151515" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round">
        <path d={BASE_PATH} fill="#d7c5e6" />
        <path d={LAND_PATH} fill="#f7f8f2" />
      </g>
      <g clipPath={`url(#${id}-land)`}>
        {GRID_CELLS.map(cell => <path
          key={`color-${cell.id}`}
          className={cell.observed ? "prediction-observed" : "prediction-cell"}
          d={cell.path}
          fill={cell.color}
          data-cell={cell.id}
          data-distance={cell.distance}
          data-observed={cell.observed}
          style={cell.observed ? undefined : { animationName: `prediction-grid-fill-${cell.id}` } as CSSProperties}
        />)}
        <g fill="none" stroke="#7e918b" strokeWidth="1.8" strokeLinejoin="round" opacity=".75">
          {GRID_CELLS.map(cell => <path key={`grid-${cell.id}`} d={cell.path} />)}
        </g>
        <path d="M668 291C667 346 601 355 611 399C620 434 666 452 638 494C610 537 478 534 434 601C399 656 412 668 352 724L300 825L489 843C454 775 449 738 494 694C537 653 665 643 696 579C731 510 651 474 680 434C700 407 758 365 758 295Z" fill="#ace4f0" stroke="#151515" strokeWidth="7" strokeLinejoin="round" />
        {GRID_CELLS.filter(cell => cell.observed).map(cell => <path
          key={`observed-${cell.id}`}
          d={cell.path}
          fill={cell.color}
          stroke="#263b38"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />)}
      </g>
      <path d={LAND_PATH} fill="none" stroke="#151515" strokeWidth="7" strokeLinejoin="round" />
      <g stroke="#151515" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M242 285Q292 180 370 294Q300 280 242 285Z" fill="#c8e7be" />
        <path d="M760 320Q819 221 898 329Q825 325 760 320Z" fill="#c8e7be" />
      </g>
      {OBSERVATION_SITES.map((site, index) => <Sensor key={site.id} x={site.x} y={site.y} number={index + 1} />)}
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
      .spatial-prediction-animation .prediction-cell{opacity:0}
      .spatial-prediction-animation[data-started="true"] .prediction-cell{animation-duration:${ANIMATION_SECONDS}s;animation-timing-function:linear;animation-iteration-count:infinite}
      .spatial-prediction-animation[data-paused="true"] .prediction-cell{animation-play-state:paused}
      .prediction-playback{position:absolute;right:10px;bottom:10px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:1px solid #d6d6d6;border-radius:50%;color:#555;background:#ffffffeb;cursor:pointer;padding:0}
      .prediction-playback:hover{color:#111;background:#f5f5f5}
      .prediction-playback:focus-visible{outline:2px solid #555;outline-offset:3px}
      @media(max-width:640px){.prediction-playback{right:0;bottom:-28px}}
      ${GRID_CELLS.filter(cell => !cell.observed).map(cell => `@keyframes prediction-grid-fill-${cell.id}{0%,${cell.startPercent}%{opacity:0}${cell.endPercent}%,87.5%{opacity:1}100%{opacity:0}}`).join("\n")}
      @media(prefers-reduced-motion:reduce){.spatial-prediction-animation .prediction-cell{animation:none!important;opacity:1}.prediction-playback{display:none}}
    `}</style>
  </div>;
}
