import joinRaw from "../content/join.md?raw";
import teamRaw from "../content/team.md?raw";
import { entries, sections } from "../lib/content";
import { Footer, Header } from "./components";

const groups = sections(teamRaw);
const openings = sections(joinRaw)[0].body.split(/^## /m);

export default function Home() {
  return <>
    <Header />
    <main className="home-content">
      <h1 className="visually-hidden">TWINS Lab — Towards Intelligent Spatial Computing</h1>
      <figure className="lab-banner">
        <img
          src="/twins-hero-spatial-refined.png"
          alt="TWINS Lab — Towards Intelligent Spatial Computing"
          width={1843}
          height={853}
          fetchPriority="high"
        />
      </figure>
      <div className="wrap content-wrap">
      <section id="research" className="about-copy" aria-label="Research overview">
        <p>Welcome to the <strong>TWINS Lab</strong> at <a href="https://siu.edu/">Southern Illinois University Carbondale</a>.</p>
        <p>Our research connects <strong>computer science</strong> and <strong>spatial sciences</strong>.</p>
        <p>We create advanced machine learning algorithms and intelligent systems to tackle real-world challenges by asking:</p>
        <ul>
          <li>How can machines learn reliably from sparse and irregular spatial observations?</li>
          <li>How can intelligent systems understand change across space and time?</li>
          <li>How can we extract useful knowledge from maps, imagery, and multimodal data?</li>
          <li>How can spatial thinking make machine learning more reliable and useful?</li>
        </ul>
        <p>We work across environmental science, remote sensing, public health, digital humanities, and other domains where spatial intelligence can have meaningful impact.</p>
        <p><strong>We are looking for passionate new students to join the team</strong> (<a href="#join-us">more info</a>)!</p>
      </section>
      <section id="team" className="home-section" aria-labelledby="team-title">
        <h2 id="team-title" className="section-title">Group Members</h2>
        {groups.map(group => <div className="team-group" key={group.title}>
          <h3 className="subheading">{group.title}</h3>
          <div className="people-list">
            {entries(group.body).map(person => <article className="person" key={person.title}>
              <img
                className="portrait"
                src={person.fields.photo}
                alt={person.title}
                width={112}
                height={136}
              />
              <div>
                <h4>{person.title}</h4>
                <p>{person.fields.role}</p>
                <span>{person.fields.institute}</span>
                {person.fields.link && <a className="home-link" href={person.fields.link}>Home page</a>}
              </div>
            </article>)}
          </div>
        </div>)}
      </section>
      <section id="join-us" className="home-section" aria-labelledby="join-title">
        <h2 id="join-title" className="section-title">Open positions</h2>
        <p className="section-lead">{openings[0].trim()} To apply, please fill in the <a href="https://docs.google.com/forms/d/1zaKcnVsgSr2NBNopvyJdROB7oCge13VNgUx63fwgR1c/viewform">application form</a>.</p>
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
