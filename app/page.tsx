import joinRaw from "../content/join.md?raw";
import researchRaw from "../content/research.md?raw";
import teamRaw from "../content/team.md?raw";
import { entries, sections } from "../lib/content";
import { sitePath } from "../lib/site";
import { Footer, Header } from "./components";
import { SpatialPredictionAnimation } from "./spatial-prediction-animation";
import { SpatiotemporalAnimation } from "./spatiotemporal-animation";
import { HistoricalMapAnimation } from "./historical-map-animation";

const groups = sections(teamRaw);
const projects = sections(researchRaw).flatMap(group => entries(group.body));
const openings = sections(joinRaw)[0].body.split(/^## /m);

function CitationLinks({ text }: { text: string }) {
  const links = /\[([^\[\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const content = [];
  let position = 0;

  for (const match of text.matchAll(links)) {
    content.push(text.slice(position, match.index));
    content.push(<a key={match.index} href={match[2]}>{match[1]}</a>);
    position = match.index! + match[0].length;
  }

  content.push(text.slice(position));
  return <>{content}</>;
}

function ResearchDescription({ text }: { text: string }) {
  return <>{text.split(/\n\s*\n/).map((paragraph, index) => {
    const citations = /\[((?:\[[^\[\]]+\]\(https?:\/\/[^\s)]+\)(?:\s*[,;]\s*)?)+)\]/g;
    const content = [];
    let position = 0;

    for (const match of paragraph.matchAll(citations)) {
      content.push(paragraph.slice(position, match.index));
      content.push(<span className="research-citation" key={match.index}>[<CitationLinks text={match[1]} />]</span>);
      position = match.index! + match[0].length;
    }

    content.push(paragraph.slice(position));
    return <p key={index}>{content}</p>;
  })}</>;
}

export default function Home() {
  return <>
    <Header />
    <main className="home-content">
      <h1 className="visually-hidden">TWINS Lab — Towards Intelligent Spatial Computing</h1>
      <figure className="wrap lab-banner">
        <img
          src={sitePath("/twins-hero-spatial-lowered.png")}
          alt="TWINS Lab — Towards Intelligent Spatial Computing"
          width={1843}
          height={853}
          fetchPriority="high"
        />
      </figure>
      <div className="wrap content-wrap">
      <section id="about" className="about-copy" aria-label="Research overview">
        <p>Welcome to the <strong>TWINS Lab</strong> at <a href="https://siu.edu/">Southern Illinois University Carbondale</a>. Our research connects <strong className="research-emphasis">computer science</strong> and <strong className="research-emphasis">spatial sciences</strong>. We create advanced machine learning algorithms and intelligent systems to tackle real-world challenges by asking:</p>
        <ul>
          <li>How can machines learn reliably from sparse and irregular spatial observations?</li>
          <li>How can intelligent systems understand change across space and time?</li>
          <li>How can we extract useful knowledge from maps, imagery, and multimodal data?</li>
          <li>How can spatial thinking make machine learning more reliable and useful?</li>
        </ul>
        <p>We work across environmental science, soil science, remote sensing, public health, digital humanities, and other domains where spatial intelligence can have meaningful impact.</p>
        <p><strong>We are looking for passionate new students to join the team</strong> (<a href="#join-us">more info</a>)!</p>
      </section>
      <section id="research" className="home-section" aria-labelledby="research-title">
        <h2 id="research-title" className="section-title">What we are doing?</h2>
        <div className="project-list">
          {projects.map(project => <article className="research-project" data-animation={project.fields.animation} key={project.title}>
            <div className="project-copy">
              <h3>{project.title}</h3>
              <ResearchDescription text={project.body} />
            </div>
            <div className="project-visual" data-animated={Boolean(project.fields.animation) || project.fields.image?.endsWith(".gif")}>
              {project.fields.animation === "spatial-prediction" ? <SpatialPredictionAnimation /> : project.fields.animation === "spatiotemporal" ? <SpatiotemporalAnimation /> : project.fields.animation === "historical-map" ? <HistoricalMapAnimation /> : <a className="project-figure-link" href={sitePath(project.fields.image)} target="_blank" rel="noreferrer" aria-label={`View ${project.title} figure at full size`}>
                <img className="project-figure" src={sitePath(project.fields.image)} alt={project.fields.alt} width={Number(project.fields.width)} height={Number(project.fields.height)} loading="lazy" />
              </a>}
            </div>
          </article>)}
        </div>
      </section>
      <section id="team" className="home-section" aria-labelledby="team-title">
        <h2 id="team-title" className="section-title">Group Members</h2>
        {groups.map(group => <div className="team-group" key={group.title}>
          <h3 className={group.title === "Lab Directors" ? "visually-hidden" : "team-group-title"}>{group.title}</h3>
          <div className="people-list">
            {entries(group.body).map(person => <article className="person" key={person.title}>
              <img
                className="portrait"
                src={sitePath(person.fields.photo)}
                alt={person.title}
                width={112}
                height={112}
              />
              <div>
                <h4>{person.fields.link ? <a href={person.fields.link}>{person.title}</a> : person.title}</h4>
                <p>{person.fields.role}</p>
                <span>{person.fields.institute}</span>
              </div>
            </article>)}
          </div>
        </div>)}
      </section>
      <section id="join-us" className="home-section" aria-labelledby="join-title">
        <h2 id="join-title" className="section-title">Join us</h2>
        <p className="section-lead">{openings[0].trim()} To apply, email the lab director with your resume and a short description of your research interests.</p>
        <div className="openings">
          {openings.slice(1).map(part => {
            const [title, ...body] = part.trim().split("\n");
            return <article key={title}>
              <p><strong>{title}.</strong>{" "}{body.join(" ").replace(/\*\*/g, "")}</p>
            </article>;
          })}
        </div>
      </section>
      </div>
    </main>
    <Footer />
  </>;
}
