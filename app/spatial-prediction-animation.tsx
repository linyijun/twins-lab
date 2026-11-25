"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { ANIMATION_SECONDS, BASE_PATH, GRID_CELLS, LAND_PATH, OBSERVATION_SITES } from "./spatial-prediction-grid";

function ObservationPin({ x, y, number }: { x: number; y: number; number: number }) {
  return <g transform={`translate(${x} ${y})`} role="img" aria-label={`Field observation ${number}`} stroke="#202625" strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round">
    <title>{`Field observation ${number}`}</title>
    <path d="M0 0C-10-19-43-43-43-70a43 43 0 1 1 86 0C43-43 10-19 0 0Z" fill="#fcfefd" />
    <path d="M-30-71Q0-100 30-71Q0-42-30-71Z" fill="#fff" strokeWidth="4" />
    <circle cx="0" cy="-71" r="12" fill="#91d9cc" strokeWidth="3.5" />
    <circle cx="0" cy="-71" r="5" fill="#202625" stroke="none" />
    <circle cx="3" cy="-75" r="2" fill="#fff" stroke="none" />
    <circle cx="0" cy="0" r="3" fill="#202625" stroke="none" />
  </g>;
}

function MountainRidge({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="#202625" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
    <path d="M-100 10-42-81-14-47 35-133 128 25Q23 31-100 10Z" fill="#bfd8bf" />
    <path d="M35-133 48-36 128 25 14 16Z" fill="#95b79e" stroke="none" />
    <path d="M-42-81-22-21-4 16M35-133 12-47 14 16" fill="none" stroke="#688b74" strokeWidth="4" />
    <path d="M18-101 35-133 57-95 39-107 30-91Z" fill="#e1e9d6" stroke="none" />
    <path d="M-100 10-42-81-14-47 35-133 128 25Q23 31-100 10Z" fill="none" />
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
    <svg viewBox="0 130 1000 760" role="img" aria-labelledby={`${id}-title ${id}-description`}>
      <title id={`${id}-title`}>Spatial prediction from sparse observations</title>
      <desc id={`${id}-description`}>Three eye-shaped map pins identify field observations on a land grid. Mountain ridges, foreground hills, and contour lines show the terrain. Starting from the observed cells, colors gradually fill nearby cells, then more distant cells. Equally distant cells fill together. The river, terrain, grid, and observation markers stay fixed.</desc>
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
        <g stroke="#668b74" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
          <path d="M111 733Q134 689 163 694Q184 656 213 696Q233 709 252 746Q183 756 111 733Z" fill="#b4d1b8" fillOpacity=".45" />
          <path d="M129 731Q153 706 180 715Q204 701 230 739M151 736Q184 726 211 741" fill="none" opacity=".8" />
          <path d="M532 768Q566 732 602 739Q641 709 682 775M551 773Q578 752 608 758Q640 741 663 778M577 778Q608 764 636 779" fill="none" opacity=".7" />
        </g>
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
      <MountainRidge x={330} y={282} scale={.9} />
      <MountainRidge x={820} y={317} scale={.7} />
      {OBSERVATION_SITES.map((site, index) => <ObservationPin key={site.id} x={site.x} y={site.y} number={index + 1} />)}
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
      .spatial-prediction-animation{position:relative;width:100%;aspect-ratio:1000 / 760;isolation:isolate}
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
