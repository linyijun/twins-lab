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

function TrafficCar({ color }: { color: string }) {
  return <g stroke={ink} strokeWidth="3" strokeLinejoin="round">
    <rect x="-14" y="-16" width="10" height="6" rx="2" fill={ink} />
    <rect x="10" y="-16" width="10" height="6" rx="2" fill={ink} />
    <rect x="-14" y="10" width="10" height="6" rx="2" fill={ink} />
    <rect x="10" y="10" width="10" height="6" rx="2" fill={ink} />
    <rect x="-25" y="-12" width="52" height="24" rx="8" fill={color} />
    <path d="M-12-9H7L13-6V6L7 9H-12L-17 6V-6Z" fill="#e7f5f7" strokeWidth="2" />
    <path d="M7-9V9M-11-9V9" fill="none" strokeWidth="2" />
    <path d="M23-7V-3M23 3V7" fill="none" stroke="#fffdf5" strokeWidth="3" strokeLinecap="round" />
  </g>;
}

export function TrafficVolumeScene() {
  const colors = ["#c8b4e5", "#f5d3b8", "#91d9cc", "#b6d9e9", "#c5e4bd", "#e9d6ad"];
  const car = (index: number, westbound: boolean) => <g
    key={index}
    className={`st-motion st-traffic-car ${westbound ? "st-traffic-west" : "st-traffic-east"}`}
    data-extra={index !== 2 && index !== 5}
    style={{ animationDelay: `${-index * 8 / 6}s`, transform: `translate(${25 + index * 70}px,0)` }}
  >
    <g transform={westbound ? "rotate(180)" : undefined}>
      <TrafficCar color={colors[index]} />
    </g>
  </g>;
  return <g aria-hidden="true">
    <rect width="400" height="300" fill="#dcebd9" />
    <g fill="#f5f6ef" stroke={ink} strokeWidth="4" strokeLinejoin="round">
      <rect x="24" y="19" width="73" height="48" rx="5" />
      <rect x="132" y="13" width="93" height="54" rx="5" fill="#d7c5e6" />
      <rect x="274" y="19" width="97" height="48" rx="5" fill="#f5d3b8" />
      <rect x="24" y="240" width="94" height="42" rx="5" fill="#f5d3b8" />
      <rect x="155" y="240" width="73" height="48" rx="5" />
      <rect x="277" y="240" width="94" height="42" rx="5" fill="#d7c5e6" />
    </g>
    <g fill="#b4d6df" stroke={ink} strokeWidth="2.5">
      <path d="M38 31h17v22H38ZM66 31h17v22H66ZM146 28h22v25h-22ZM187 28h22v25h-22ZM289 32h25v21h-25ZM334 32h23v21h-23Z" />
      <path d="M40 252h24v18H40ZM80 252h24v18H80ZM170 253h18v21h-18ZM201 253h15v21h-15ZM294 252h24v18h-24ZM334 252h21v18h-21Z" />
    </g>
    <path d="M0 88H400V218H0Z" fill="#e6ebed" />
    <path d="M0 88H400M0 218H400" fill="none" stroke={ink} strokeWidth="5" />
    <path d="M0 153H400" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="20 15" />
    <path d="M0 99H400M0 207H400" fill="none" stroke="#fff" strokeWidth="2.5" />
    {[false, true].map(westbound => <g key={String(westbound)} transform={`translate(0,${westbound ? 184 : 121})`}>
      {[2, 5].map(index => car(index, westbound))}
      <g className="st-motion st-traffic-volume st-traffic-extra">
        {[0, 1, 3, 4].map(index => car(index, westbound))}
      </g>
    </g>)}
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
.st-traffic-east{animation-name:st-traffic-east}
.st-traffic-west{animation-name:st-traffic-west}
@keyframes st-traffic-east{from{transform:translate(-100px,0)}to{transform:translate(500px,0)}}
@keyframes st-traffic-west{from{transform:translate(500px,0)}to{transform:translate(-100px,0)}}
.st-traffic-volume{animation-name:st-traffic-volume;opacity:1}
@keyframes st-traffic-volume{0%,12.5%,100%{opacity:0}31.25%,65%{opacity:1}87.5%{opacity:0}}
`;
