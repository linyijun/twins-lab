"use client";

import { useEffect, useId, useRef, useState } from "react";

const earth = { x: 824, y: 766, radius: 145 };
const linkedMap = { x: 50, y: 95, scale: .8 };
const radians = Math.PI / 180;
function project(longitude: number, latitude: number) {
  const lat = latitude * radians;
  const lon = (longitude + 95) * radians;
  const centerLat = 15 * radians;
  return {
    x: earth.x + earth.radius * Math.cos(lat) * Math.sin(lon),
    y: earth.y - earth.radius * (Math.cos(centerLat) * Math.sin(lat) - Math.sin(centerLat) * Math.cos(lat) * Math.cos(lon)),
  };
}
function continent(points: number[][]) {
  return points.map(([longitude, latitude], index) => {
    const point = project(longitude, latitude);
    return `${index ? "L" : "M"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }).join(" ") + "Z";
}
const northAmerica = continent([[-166,60],[-145,70],[-112,73],[-90,75],[-65,70],[-54,53],[-55,47],[-66,45],[-74,41],[-75,35],[-81,30],[-80,25],[-81,24],[-83,29],[-90,29],[-97,25],[-97,21],[-87,17],[-84,10],[-78,9],[-77,8],[-80,7],[-85,10],[-90,13],[-96,16],[-105,20],[-110,25],[-117,32],[-124,42],[-128,50],[-136,59],[-155,60]]);
const southAmerica = continent([[-78,8],[-71,8],[-60,5],[-50,0],[-35,-5],[-38,-15],[-48,-28],[-54,-35],[-66,-55],[-72,-51],[-75,-35],[-81,-5]]);
// U.S. Census 2026 internal point for Amite City, Louisiana (Tangipahoa Parish):
// https://tigerweb.geo.census.gov/tigerwebmain/Files/acs26/tigerweb_acs26_incplace_la.html
// The globe is an illustrative orthographic projection centered at 95°W, 15°N.
const amite = project(-90.5152858, 30.7321643);
const mapLocation = { x: linkedMap.x + 564 * linkedMap.scale, y: linkedMap.y + 378 * linkedMap.scale };
const connector = `M${mapLocation.x} ${mapLocation.y}C640 420 670 620 ${amite.x} ${amite.y}`;

export function HistoricalMapAnimation() {
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
    }, { threshold: .2 });
    if (frame.current) observer.observe(frame.current);
    return () => {
      preference.removeEventListener("change", syncPreference);
      observer.disconnect();
    };
  }, []);

  return <div ref={frame} className="historical-map-animation" data-started={started} data-paused={paused || !visible}>
    <svg viewBox="0 0 1000 1000" role="img" aria-labelledby={`${id}-title ${id}-description`}>
      <title id={`${id}-title`}>Reading and locating a historical map</title>
      <desc id={`${id}-description`}>A stylized historical map shows Amite City, Pine Grove, Greensburg, and Tangipahoa. Individual words are highlighted, then combined into place names. A connector links Amite City to its location in Louisiana on an illustrated globe of the Americas.</desc>
      <defs>
        <clipPath id={`${id}-map`}><rect width="820" height="700" rx="13" /></clipPath>
        <clipPath id={`${id}-earth`}><circle cx={earth.x} cy={earth.y} r={earth.radius} /></clipPath>
      </defs>
      <g className="hm-motion hm-map" data-stage="map">
        <rect x="8" y="10" width="820" height="700" rx="13" fill="#d8c7e4" />
        <g clipPath={`url(#${id}-map)`}>
          <rect width="820" height="700" fill="#f5f1e6" />
          <g fill="none" stroke="#a8a494" strokeWidth="2.4" opacity=".6">
            <path d="M0 105H820M0 245H820M0 385H820M0 525H820M130 0V700M295 0V700M460 0V700M625 0V700" />
          </g>
          <g fill="none" stroke="#9ba993" strokeWidth="3" opacity=".7">
            <path d="M0 70q70-50 135 0t140 0M20 90q72-45 125 0M15 585q72-64 170-2t130 0M35 609q65-44 140-2M560 590q85-80 230-15M585 613q85-55 215-17" />
          </g>
          <path d="M390-10C430 75 363 112 399 191S442 310 399 380S441 512 409 570S459 652 441 720" fill="none" stroke="#7fb6c2" strokeWidth="15" />
          <path d="M390-10C430 75 363 112 399 191S442 310 399 380S441 512 409 570S459 652 441 720" fill="none" stroke="#b5dee3" strokeWidth="9" />
          <g fill="none" stroke="#6c6b60" strokeWidth="4" strokeLinecap="round">
            <path d="M534-10 535 140 562 266 583 399 610 544 678 710" />
            <path d="M0 355 190 339 353 356 560 344 820 363" />
            <path d="M95-10 127 198 201 342 206 489 272 710" />
          </g>
          <g fill="none" stroke="#817d71" strokeWidth="3" strokeDasharray="11 10">
            <path d="M0 230 140 244 274 219 390 242M0 565 171 554 316 568 422 549M702 0 684 168 718 302 700 478 751 700" />
          </g>
          <g fill="#36382f" fontFamily="Georgia, Times New Roman, serif">
            <text x="78" y="191" fontSize="46" textLength="252" lengthAdjust="spacingAndGlyphs">Greensburg</text>
            <text x="497" y="135" fontSize="40" fontStyle="italic" textLength="280" lengthAdjust="spacingAndGlyphs">Tangipahoa</text>
            <text x="460" y="350" fontSize="48" textLength="150" lengthAdjust="spacingAndGlyphs">Amite</text>
            <text x="626" y="350" fontSize="48" textLength="100" lengthAdjust="spacingAndGlyphs">City</text>
            <text x="150" y="510" fontSize="48" textLength="114" lengthAdjust="spacingAndGlyphs">Pine</text>
            <text x="283" y="510" fontSize="48" textLength="153" lengthAdjust="spacingAndGlyphs">Grove</text>
          </g>
          <g fill="#f5f1e6" stroke="#434a40" strokeWidth="4">
            <circle cx="564" cy="378" r="8" />
            <circle cx="205" cy="535" r="7" />
            <circle cx="135" cy="215" r="7" />
          </g>
          <g className="hm-motion hm-words" data-stage="words" role="group" aria-label="Individual words" fill="#a7d9e730" stroke="#518b9c" strokeWidth="5">
            <rect className="hm-word" x="68" y="150" width="272" height="58" rx="4" />
            <rect className="hm-word" x="487" y="98" width="302" height="51" rx="4" />
            <rect className="hm-word" x="450" y="307" width="164" height="58" rx="4" />
            <rect className="hm-word" x="622" y="307" width="114" height="58" rx="4" />
            <rect className="hm-word" x="140" y="467" width="130" height="58" rx="4" />
            <rect className="hm-word" x="278" y="467" width="168" height="58" rx="4" />
          </g>
          <g className="hm-motion hm-phrase" data-stage="phrase" role="group" aria-label="Linked place names" fill="#b5dfc640" stroke="#527966" strokeWidth="6">
            <rect x="63" y="143" width="282" height="70" rx="7" />
            <rect x="482" y="91" width="312" height="63" rx="7" />
            <rect x="445" y="300" width="297" height="70" rx="7" />
            <rect x="135" y="460" width="317" height="70" rx="7" />
          </g>
        </g>
        <rect width="820" height="700" rx="13" fill="none" stroke="#202625" strokeWidth="7" />
      </g>
      <g className="hm-motion hm-globe" data-stage="globe" role="group" aria-label="Earth with the Americas">
        <circle cx={earth.x} cy={earth.y} r={earth.radius} fill="#b4e2eb" stroke="#202625" strokeWidth="6" />
        <g clipPath={`url(#${id}-earth)`}>
          <g fill="none" stroke="#75b4c6" strokeWidth="2" opacity=".7">
            <ellipse cx={earth.x} cy={earth.y} rx={earth.radius * 99 / 205} ry={earth.radius} />
            <ellipse cx={earth.x} cy={earth.y} rx={earth.radius} ry={earth.radius * 78 / 205} />
            <path d={`M${earth.x - earth.radius} ${earth.y}H${earth.x + earth.radius}M${earth.x} ${earth.y - earth.radius}V${earth.y + earth.radius}`} />
          </g>
          <g fill="#c3dfa9" stroke="#374d3b" strokeWidth="4" strokeLinejoin="round">
            <path d={northAmerica} />
            <path d={southAmerica} />
          </g>
        </g>
      </g>
      <g className="hm-motion hm-link" data-stage="link" role="group" aria-label="Amite City linked to Louisiana">
        <path d={connector} fill="none" stroke="#fff" strokeWidth="12" strokeLinecap="round" />
        <path d={connector} fill="none" stroke="#527966" strokeWidth="6" strokeLinecap="round" strokeDasharray="13 10" />
        <circle cx={mapLocation.x} cy={mapLocation.y} r="7" fill="#527966" />
        <g transform={`translate(${amite.x} ${amite.y}) scale(${earth.radius / 205})`}>
          <path d="M0 0C-7-13-22-27-22-42a22 22 0 0 1 44 0C22-27 7-13 0 0Z" fill="#efc9ac" stroke="#202625" strokeWidth="4" strokeLinejoin="round" />
          <circle cy="-42" r="8" fill="#fff" stroke="#202625" strokeWidth="3" />
          <circle r="4" fill="#202625" />
        </g>
      </g>
      <g fill="#303732" fontFamily="Avenir Next, Trebuchet MS, sans-serif" fontSize="46" fontWeight="700" textAnchor="middle">
        <text className="hm-motion hm-words" data-stage="caption-words" x="500" y="940">Words</text>
        <text className="hm-motion hm-place-caption" data-stage="caption-phrase" x="500" y="940">Place names</text>
        <text className="hm-motion hm-location-caption" data-stage="caption-location" x="500" y="940">Location on Earth</text>
      </g>
    </svg>
    {!reducedMotion && <button className="hm-playback" type="button" aria-label={paused ? "Resume historical map animation" : "Pause historical map animation"} aria-pressed={paused} title={paused ? "Resume animation" : "Pause animation"} onClick={() => setPaused(value => !value)}>
      <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
        {paused ? <path d="m6 3 11 7-11 7Z" fill="currentColor" /> : <path d="M5 4h3v12H5zM12 4h3v12h-3z" fill="currentColor" />}
      </svg>
    </button>}
    <style>{`
      .historical-map-animation{position:relative;width:100%;aspect-ratio:1;isolation:isolate}
      .historical-map-animation>svg{display:block;width:100%;height:100%}
      .hm-map{transform:translate(90px,100px) scale(1);transform-origin:0 0}
      .hm-words,.hm-phrase,.hm-globe,.hm-link,.hm-place-caption,.hm-location-caption{opacity:0}
      .historical-map-animation[data-started="true"] .hm-motion{animation-duration:12s;animation-timing-function:ease-in-out;animation-iteration-count:infinite}
      .historical-map-animation[data-paused="true"] .hm-motion{animation-play-state:paused}
      .hm-map{animation-name:hm-map-position}.hm-words{animation-name:hm-words}.hm-phrase{animation-name:hm-phrase}.hm-globe{animation-name:hm-globe}.hm-link{animation-name:hm-link}.hm-place-caption{animation-name:hm-place-caption}.hm-location-caption{animation-name:hm-location-caption}
      @keyframes hm-map-position{0%,58.333%,100%{transform:translate(90px,100px) scale(1)}69%,95%{transform:translate(${linkedMap.x}px,${linkedMap.y}px) scale(${linkedMap.scale})}}
      @keyframes hm-words{0%,12.5%,37.5%,100%{opacity:0}16.666%,34%{opacity:1}}
      @keyframes hm-phrase{0%,36%,95%,100%{opacity:0}40%,91.666%{opacity:1}}
      @keyframes hm-globe{0%,58.333%,95%,100%{opacity:0}69%,91.666%{opacity:1}}
      @keyframes hm-link{0%,69%,95%,100%{opacity:0}75%,91.666%{opacity:1}}
      @keyframes hm-place-caption{0%,36%,61%,100%{opacity:0}40%,57%{opacity:1}}
      @keyframes hm-location-caption{0%,61%,95%,100%{opacity:0}69%,91.666%{opacity:1}}
      .hm-playback{position:absolute;right:10px;bottom:-8px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:1px solid #d6d6d6;border-radius:50%;color:#555;background:#ffffffeb;cursor:pointer;padding:0}
      .hm-playback:hover{color:#111;background:#f5f5f5}.hm-playback:focus-visible{outline:2px solid #555;outline-offset:3px}
      @media(max-width:640px){.research-project[data-animation="historical-map"]{grid-template-columns:1fr}.historical-map-animation{margin:0 auto 12px}.hm-playback{right:0;bottom:-4px}}
      @media(prefers-reduced-motion:reduce){.historical-map-animation .hm-motion{animation:none!important}.historical-map-animation .hm-map{transform:translate(${linkedMap.x}px,${linkedMap.y}px) scale(${linkedMap.scale})}.historical-map-animation .hm-phrase,.historical-map-animation .hm-globe,.historical-map-animation .hm-link,.historical-map-animation .hm-location-caption{opacity:1}.historical-map-animation .hm-words,.historical-map-animation .hm-place-caption{opacity:0}.hm-playback{display:none}}
    `}</style>
  </div>;
}
