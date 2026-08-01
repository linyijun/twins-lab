import researchRaw from "../../content/research.md?raw";
import { entries } from "../../lib/content";
import { Footer, Header, PageHero } from "../components";
const projects = entries(researchRaw);
export default function Research(){return <><Header/><main className="page-shell"><PageHero eyebrow="Our work" title="Research Projects"><p>Our work develops intelligent methods for spatial data and applies them to real-world scientific challenges.</p></PageHero><section className="project-list">{projects.map((p,i)=><article className="project" key={p.title}><div className={`project-image project-image-${i+1}`} role="img" aria-label={`Placeholder for ${p.title}`}/><div><h2>{p.title}</h2><div className="project-links">{(p.fields.links||"").split(", ").filter(Boolean).map(l=>{const [label,href]=l.split("|");return <a href={href} key={label}>[{label}]</a>})}</div><p>{p.body}</p></div></article>)}</section></main><Footer/></>}
