import joinRaw from "../content/join.md?raw";
import researchRaw from "../content/research.md?raw";
import publicationGroups from "../content/publications.json";
import teamRaw from "../content/team.md?raw";
import { entries, sections } from "../lib/content";
import { Footer, Header } from "./components";

const groups = sections(teamRaw);
const projects = sections(researchRaw).flatMap(group => entries(group.body)).map(project => ({
  ...project,
  publications: publicationGroups[project.fields.publications as keyof typeof publicationGroups] ?? [],
}));
const openings = sections(joinRaw)[0].body.split(/^## /m);

export default function Home() {
  return <>
    <Header />
    <main className="home-content">
      <h1 className="visually-hidden">TWINS Lab — Towards Intelligent Spatial Computing</h1>
      <figure className="wrap lab-banner">
        <img
          src="/twins-hero-spatial-lowered.png"
          alt="TWINS Lab — Towards Intelligent Spatial Computing"
          width={1843}
          height={853}
          fetchPriority="high"
        />
      </figure>
      <div className="wrap content-wrap">
      <section id="about" className="about-copy" aria-label="Research overview">
        <p>Welcome to the <strong>TWINS Lab</strong> at <a href="https://siu.edu/">Southern Illinois University Carbondale</a>. Our research connects <strong className="research-emphasis">computer science</strong> and <strong className="research-emphasis">spatial sciences</strong>.</p>
        <p>We create advanced machine learning algorithms and intelligent systems to tackle real-world challenges by asking:</p>
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
        <h2 id="research-title" className="section-title">What we are doing</h2>
        <div className="project-list">
          {projects.map(project => <article className="research-project" key={project.title}>
            <a className="project-figure-link" href={project.fields.image} target="_blank" rel="noreferrer" aria-label={`View ${project.title} figure at full size`}>
              <img className="project-figure" src={project.fields.image} alt={project.fields.alt} width={Number(project.fields.width)} height={Number(project.fields.height)} loading="lazy" />
            </a>
            <div>
              <h3>{project.title}</h3>
              <p>{project.body}</p>
            </div>
            <div className="project-publications">
              <h4>Publications</h4>
              <ul className="publication-list">
                {project.publications.map(paper => <li key={paper.url}>
                  <span className="publication-venue">{paper.venue} {paper.year}</span>
                  <a href={paper.url}>{paper.title}</a>
                </li>)}
              </ul>
            </div>
          </article>)}
        </div>
      </section>
      <section id="team" className="home-section" aria-labelledby="team-title">
        <h2 id="team-title" className="section-title">Group Members</h2>
        {groups.map(group => <div className="team-group" key={group.title}>
          <div className="people-list">
            {entries(group.body).map(person => <article className="person" key={person.title}>
              <img
                className="portrait"
                src={person.fields.photo}
                alt={person.title}
                width={112}
                height={112}
              />
              <div>
                <h3>{person.fields.link ? <a href={person.fields.link}>{person.title}</a> : person.title}</h3>
                <p>{person.fields.role}</p>
                <span>{person.fields.institute}</span>
              </div>
            </article>)}
          </div>
        </div>)}
      </section>
      <section id="join-us" className="home-section" aria-labelledby="join-title">
        <h2 id="join-title" className="section-title">Open positions</h2>
        <p className="section-lead">{openings[0].trim()} To apply, email <a href="mailto:yijunlinnn@gmail.com">yijunlinnn@gmail.com</a>. In your email, please include 1) your résumé and 2) a short description of your research interests.</p>
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
