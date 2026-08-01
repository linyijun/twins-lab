import joinRaw from "../../content/join.md?raw";
import { sections } from "../../lib/content";
import { Footer, Header, PageHero } from "../components";
export default function Join(){const all=sections(joinRaw);const intro=all[0];const parts=intro.body.split(/^## /m);return <><Header/><main className="page-shell"><PageHero eyebrow="Opportunities" title="Open positions"><p>{parts[0].trim()}</p></PageHero><section className="openings">{parts.slice(1).map((part)=>{const [title,...body]=part.trim().split("\n");return <article key={title}><div><h2>{title}</h2><p>{body.join(" ").replace(/\*\*/g,"")}</p>{title==="How to apply"&&<a className="apply" href="mailto:yijunlinnn@gmail.com">Email your application</a>}</div></article>})}</section></main><Footer/></>}
