/** Presentational SVG children. Render each inside an SVG with viewBox="0 0 400 300". */

const ink = "#202625";

export function MovingDigitsScene() {
  const two = "M3 20C3-12 72-13 74 21C77 47 19 64 0 99H78";
  const seven = "M0 0H82L24 103";
  return <g aria-hidden="true">
    <rect width="400" height="300" fill="#f5f8f7" />
    <path d="M0 75H400M0 150H400M0 225H400M80 0V300M160 0V300M240 0V300M320 0V300" fill="none" stroke="#e1e8e5" strokeWidth="2" />
    <g className="st-motion st-digit-two" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={two} stroke={ink} strokeWidth="37" />
      <path d={two} stroke="#c8b4e5" strokeWidth="25" />
    </g>
    <g className="st-motion st-digit-seven" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={seven} stroke={ink} strokeWidth="35" />
      <path d={seven} stroke="#91d9cc" strokeWidth="23" />
    </g>
  </g>;
}

function Walker({ shirt }: { shirt: string }) {
  return <g transform="scale(1.25)" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="0" cy="22" rx="12" ry="4" fill="#596b7130" stroke="none" />
    <path d="M-3 8-5 20M3 8 6 20" fill="none" strokeWidth="7" />
    <path d="M-3 8-5 20M3 8 6 20" fill="none" stroke="#5b789c" strokeWidth="4" />
    <path d="M-6-1-11 8M6-1 11 7" fill="none" />
    <rect x="-7" y="-5" width="14" height="16" rx="4" fill={shirt} />
    <circle cx="0" cy="-14" r="7" fill="#f1c9a6" />
    <path d="M-7-16Q0-24 7-16" fill="#65554c" strokeWidth="2" />
  </g>;
}

export function HumanMobilityScene() {
  return <g aria-hidden="true">
    <rect width="400" height="300" fill="#e7ecee" />
    <g fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="10 10">
      <path d="M120 0V300M285 0V300M0 150H400" />
    </g>
    <g stroke={ink} strokeWidth="4" strokeLinejoin="round">
      <rect x="20" y="20" width="72" height="90" rx="9" fill="#c5e4bd" />
      <rect x="149" y="20" width="108" height="90" rx="9" fill="#d7c5e6" />
      <rect x="313" y="20" width="67" height="90" rx="9" fill="#f5d3b8" />
      <rect x="20" y="190" width="72" height="90" rx="9" fill="#f5d3b8" />
      <rect x="149" y="190" width="108" height="90" rx="9" fill="#c5e4bd" />
      <rect x="313" y="190" width="67" height="90" rx="9" fill="#d7c5e6" />
    </g>
    <g fill="none" stroke="#7e9d83" strokeWidth="4" strokeLinecap="round">
      <path d="M37 84Q53 40 77 48M169 252Q202 203 239 224" />
    </g>
    <g fill="#edf4f1" stroke={ink} strokeWidth="3">
      <rect x="165" y="36" width="33" height="26" rx="3" />
      <rect x="210" y="69" width="30" height="25" rx="3" />
      <rect x="327" y="37" width="37" height="48" rx="3" />
      <rect x="34" y="209" width="43" height="48" rx="3" />
      <rect x="328" y="211" width="37" height="46" rx="3" />
    </g>
    <g className="st-motion st-walker-one"><Walker shirt="#91d9cc" /></g>
    <g className="st-motion st-walker-two"><Walker shirt="#d1b9e5" /></g>
    <g className="st-motion st-walker-three"><Walker shirt="#efc49f" /></g>
    <g className="st-motion st-walker-four"><Walker shirt="#aacfe7" /></g>
  </g>;
}

function Cloud() {
  return <path d="M-52 19C-83 19-88-17-58-29C-63-58-22-72-3-46C20-68 57-43 50-19C83-11 84 24 54 25Z" fill="#fbfefd" stroke={ink} strokeWidth="5" strokeLinejoin="round" />;
}

export function RainfallScene() {
  return <g aria-hidden="true">
    <rect width="400" height="300" fill="#eef8fb" />
    <path d="M0 237Q73 175 155 228Q211 191 262 226Q325 174 400 229V300H0Z" fill="#c8e7be" stroke={ink} strokeWidth="4" strokeLinejoin="round" />
    <path d="M0 264Q89 225 169 265Q283 214 400 258V300H0Z" fill="#a9d9bd" />
    <path d="M0 264Q89 225 169 265Q283 214 400 258" fill="none" stroke="#709a7d" strokeWidth="3" />
    <g stroke={ink} strokeWidth="4" strokeLinejoin="round">
      <path d="M278 246V216H312V246Z" fill="#f5d3b8" />
      <path d="m272 217 23-22 23 22Z" fill="#c6b7df" />
      <rect x="290" y="226" width="10" height="20" fill="#eef8fb" />
    </g>
    <g className="st-motion st-distant-cloud">
      <g transform="scale(.64)"><Cloud /></g>
    </g>
    <g className="st-motion st-rain-cloud">
      <g stroke="#357a99" strokeWidth="2.5" strokeLinejoin="round" fill="#8cd0e5">
        {[-53, -24, 6, 36, 64].map((x, index) => <g key={x} transform={`translate(${x} ${42 + index % 2 * 14})`}>
          <path className={`st-motion st-raindrop st-drop-${index}`} d="M0-7C-2-3-7 3-7 7a7 7 0 0 0 14 0C7 3 2-3 0-7Z" />
        </g>)}
      </g>
      <Cloud />
    </g>
    <g className="st-motion st-rain-puddle" fill="#b4dfec" stroke="#73b1c9" strokeWidth="2.5">
      <ellipse cx="114" cy="264" rx="31" ry="7" />
      <ellipse cx="210" cy="244" rx="22" ry="5" />
    </g>
  </g>;
}

/** Parent controls playback/reduced motion through the shared .st-motion class. */
export const SCENE_ANIMATION_CSS = `
.st-motion{animation-iteration-count:infinite;animation-timing-function:linear;animation-duration:8s}
.st-digit-two{animation-name:st-digit-two;transform:translate(45px,65px) rotate(-8deg)}
.st-digit-seven{animation-name:st-digit-seven;transform:translate(265px,135px) rotate(8deg)}
@keyframes st-digit-two{
  0%,100%{transform:translate(45px,65px) rotate(-8deg)}
  25%{transform:translate(210px,150px) rotate(5deg)}
  50%{transform:translate(265px,45px) rotate(-5deg)}
  75%{transform:translate(85px,160px) rotate(5deg)}
}
@keyframes st-digit-seven{
  0%,100%{transform:translate(265px,135px) rotate(8deg)}
  25%{transform:translate(170px,45px) rotate(-6deg)}
  50%{transform:translate(45px,135px) rotate(5deg)}
  75%{transform:translate(225px,150px) rotate(-8deg)}
}
.st-walker-one{animation-name:st-walk-one;transform:translate(120px,55px)}
.st-walker-two{animation-name:st-walk-two;transform:translate(285px,245px)}
.st-walker-three{animation-name:st-walk-three;transform:translate(355px,150px)}
.st-walker-four{animation-name:st-walk-four;transform:translate(40px,150px)}
@keyframes st-walk-one{0%,100%{transform:translate(120px,55px)}25%,75%{transform:translate(120px,150px)}50%{transform:translate(220px,150px)}}
@keyframes st-walk-two{0%,100%{transform:translate(285px,245px)}25%,75%{transform:translate(285px,150px)}50%{transform:translate(170px,150px)}}
@keyframes st-walk-three{0%,100%{transform:translate(355px,150px)}25%,75%{transform:translate(285px,150px)}50%{transform:translate(285px,55px)}}
@keyframes st-walk-four{0%,100%{transform:translate(40px,150px)}25%,75%{transform:translate(120px,150px)}50%{transform:translate(120px,245px)}}
.st-rain-cloud{animation-name:st-rain-cloud;transform:translate(115px,100px)}
.st-distant-cloud{animation-name:st-distant-cloud;transform:translate(285px,65px)}
@keyframes st-rain-cloud{0%,100%{transform:translate(115px,100px)}50%{transform:translate(270px,100px)}}
@keyframes st-distant-cloud{0%,100%{transform:translate(285px,65px)}50%{transform:translate(135px,65px)}}
.st-raindrop{animation-name:st-rain-fall;animation-duration:2s;opacity:.9}
.st-drop-0{animation-delay:-.2s}.st-drop-1{animation-delay:-1.2s}.st-drop-2{animation-delay:-.7s}.st-drop-3{animation-delay:-1.7s}.st-drop-4{animation-delay:-.4s}
@keyframes st-rain-fall{0%{transform:translate(0,0);opacity:0}12%{opacity:1}82%{opacity:1}100%{transform:translate(-13px,70px);opacity:0}}
.st-rain-puddle{animation-name:st-rain-puddle;opacity:.65}
@keyframes st-rain-puddle{0%,100%{opacity:.4}50%{opacity:1}}
`;
