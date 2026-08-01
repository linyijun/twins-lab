import researchRaw from "../../content/research.md?raw";
import { entries } from "../../lib/content";
import { Footer, Header, PageHero } from "../components";
const projects = entries(researchRaw);
export default function Research(){return <><Header/><main><PageHero eyebrow="Our work" title="Research projects"><p>We build spatially intelligent methods and systems, then put them to work on consequential problems.</p></PageHero><section className="project-list wrap">{projects.map((p,i)=><article className="project" key={p.title}><div className={`project-image project-image-${i+1}`} role="img" aria-label={`Placeholder for ${p.title}`}/><div><span className="project-num">{String(i+1).padStart(2,"0")}</span><h2>{p.title}</h2><div className="project-links">{(p.fields.links||"").split(", ").filter(Boolean).map(l=>{const [label,href]=l.split("|");return <a href={href} key={label}>[{label}]</a>})}</div><p>{p.body}</p></div></article>)}</section></main><Footer/></>}
