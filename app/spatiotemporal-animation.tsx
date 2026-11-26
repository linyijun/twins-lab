"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import seaTemperature from "../content/sea-temperature-frames.json";
import { HumanMobilityScene, MovingDigitsScene, TrafficVolumeScene, SCENE_ANIMATION_CSS } from "./spatiotemporal-scenes";

const seaDurationMs = seaTemperature.durationsMs.reduce((sum, duration) => sum + duration, 0);
let elapsedMs = 0;
const seaFrameRules = seaTemperature.durationsMs.map((duration, index) => {
  const start = elapsedMs / seaDurationMs * 100;
  elapsedMs += duration;
  const end = elapsedMs / seaDurationMs * 100;
  return `@keyframes st-sea-frame-${index}{0%{opacity:${index === 0 ? 1 : 0}}${start > 0 ? `${start - .001}%{opacity:0}${start}%{opacity:1}` : ""}${end - .001}%{opacity:1}${end < 100 ? `${end}%{opacity:0}100%{opacity:0}` : "100%{opacity:1}"}}`;
}).join("\n");

function SeaTemperatureScene() {
  return <g>
    <rect width="400" height="300" fill="#a5d9e4" />
    {seaTemperature.frames.map((bands, index) => <g
      key={index}
      className="st-motion st-sea-frame"
      data-frame={index}
      style={{ animationName: `st-sea-frame-${index}` } as CSSProperties}
    >
      {bands.map((band, bandIndex) => <path key={bandIndex} d={band.path} fill={band.color} stroke={band.color} strokeWidth=".8" fillRule="evenodd" />)}
    </g>)}
    <g fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".8">
      <path d="M40 44q10 10 20 0t20 0t20 0M235 215q10 10 20 0t20 0t20 0M280 56q10 10 20 0t20 0" />
    </g>
    <g transform="translate(35 224)" stroke="#253c43" strokeWidth="3.5" strokeLinejoin="round">
      <path d="M-8-35a8 8 0 0 1 16 0v33a15 15 0 1 1-16 0Z" fill="#fff" />
      <path d="M0-22V5" stroke="#e99884" strokeWidth="7" strokeLinecap="round" />
      <circle cy="10" r="8" fill="#e99884" stroke="none" />
    </g>
  </g>;
}

function ScenePanel({ x, y, label, clipId, children }: { x: number; y: number; label: string; clipId: string; children: ReactNode }) {
  return <g transform={`translate(${x} ${y})`} role="group" aria-label={label}>
    <rect className="st-panel-background" width="450" height="400" fill="#fff" />
    <defs><clipPath id={clipId}><rect width="400" height="300" /></clipPath></defs>
    <g transform="scale(1.125)" clipPath={`url(#${clipId})`}>{children}</g>
    <text x="225" y="378" textAnchor="middle" fill="#202625" fontFamily="Avenir Next, Trebuchet MS, sans-serif" fontWeight="400" fontSize="34">{label}</text>
  </g>;
}

export function SpatiotemporalAnimation() {
  const id = useId().replace(/:/g, "");
  const frame = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(preference.matches);
    syncPreference();
    preference.addEventListener("change", syncPreference);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 });
    if (frame.current) observer.observe(frame.current);
    return () => { preference.removeEventListener("change", syncPreference); observer.disconnect(); };
  }, []);

  return <div ref={frame} className="spatiotemporal-animation" data-paused={paused || !visible || reducedMotion}>
    <svg viewBox="0 0 1000 1000" role="img" aria-labelledby={`${id}-title ${id}-description`}>
      <title id={`${id}-title`}>Four spatiotemporal modeling scenarios</title>
      <desc id={`${id}-description`}>Four adjoining cartoon scenes move together: evolving sea-surface temperature patterns adapted from the original SVPNet animation, changing traffic volume on a road, people traveling through city streets, and two moving digits.</desc>
      <defs><clipPath id={`${id}-panels`}><rect x="50" y="90" width="900" height="800" rx="20" /></clipPath></defs>
      <rect x="56" y="97" width="900" height="800" rx="20" fill="#d7c5e6" />
      <g clipPath={`url(#${id}-panels)`}>
        <ScenePanel x={50} y={90} label="Sea surface temp." clipId={`${id}-sea`}><SeaTemperatureScene /></ScenePanel>
        <ScenePanel x={500} y={90} label="Traffic volume" clipId={`${id}-traffic`}><TrafficVolumeScene /></ScenePanel>
        <ScenePanel x={50} y={490} label="Human mobility" clipId={`${id}-mobility`}><HumanMobilityScene /></ScenePanel>
        <ScenePanel x={500} y={490} label="Moving digits" clipId={`${id}-digits`}><MovingDigitsScene /></ScenePanel>
      </g>
      <rect x="50" y="90" width="900" height="800" rx="20" fill="none" stroke="#202625" strokeWidth="5" />
      <path d="M500 90V890M50 490H950" fill="none" stroke="#202625" strokeWidth="3" />
    </svg>
    {!reducedMotion && <button type="button" className="spatiotemporal-playback"
      aria-label={paused ? "Resume spatiotemporal animations" : "Pause spatiotemporal animations"}
      aria-pressed={paused} title={paused ? "Resume animations" : "Pause animations"}
      onClick={() => setPaused(value => !value)}>
      <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
        {paused ? <path d="m6 3 11 7-11 7Z" fill="currentColor" /> : <path d="M5 4h3v12H5zM12 4h3v12h-3z" fill="currentColor" />}
      </svg>
    </button>}
    <style>{`
      .spatiotemporal-animation{position:relative;width:100%;max-width:280px;margin-inline:auto;aspect-ratio:1;isolation:isolate}
      .spatiotemporal-animation>svg{display:block;width:100%;height:100%}
      .spatiotemporal-animation[data-paused="true"] .st-motion{animation-play-state:paused!important}
      .spatiotemporal-animation .st-sea-frame{opacity:0;animation-duration:${seaDurationMs * 2 / 1000}s;animation-timing-function:steps(1,end);animation-iteration-count:infinite}
      .spatiotemporal-playback{position:absolute;right:10px;bottom:-4px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:1px solid #d6d6d6;border-radius:50%;color:#555;background:#ffffffeb;cursor:pointer;padding:0}
      .spatiotemporal-playback:hover{color:#111;background:var(--pink)}
      .spatiotemporal-playback:focus-visible{outline:2px solid #555;outline-offset:3px}
      @media(max-width:640px){.research-project[data-animation="spatiotemporal"]{grid-template-columns:1fr}.spatiotemporal-animation{margin:0 auto 12px}}
      @media(prefers-reduced-motion:reduce){.spatiotemporal-animation .st-motion{animation:none!important}.spatiotemporal-animation .st-sea-frame{opacity:0!important}.spatiotemporal-animation .st-sea-frame[data-frame="0"]{opacity:1!important}.spatiotemporal-playback{display:none}}
      ${seaFrameRules}
      ${SCENE_ANIMATION_CSS}
    `}</style>
  </div>;
}
