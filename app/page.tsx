import joinRaw from "../content/join.md?raw";
import teamRaw from "../content/team.md?raw";
import { entries, sections } from "../lib/content";
import { Footer, Header } from "./components";

const groups = sections(teamRaw);
const openings = sections(joinRaw)[0].body.split(/^## /m);

export default function Home() {
  return <>
    <Header />
    <main className="home-content wrap">
      <h1>TOWARDS INTELLIGENT SPATIAL COMPUTING (TWINS)</h1>
      <p className="welcome">Welcome to the <strong>TWINS Lab</strong> at <a href="https://siu.edu/">Southern Illinois University Carbondale</a>.</p>
      <section className="carousel" aria-label="Lab photo carousel">
        <div className="carousel-slide carousel-slide-1"><span className="carousel-caption">Spatial intelligence</span></div>
        <div className="carousel-slide carousel-slide-2"><span className="carousel-caption">Learning from maps</span></div>
        <div className="carousel-slide carousel-slide-3"><span className="carousel-caption">Science with impact</span></div>
        <div className="dots" aria-hidden="true"><i /><i /><i /></div>
      </section>
      <section className="about-copy">
        <p>Our research focuses on applied machine learning and data science, thriving at the intersection of <strong>computer science</strong> and <strong>spatial sciences</strong>. We create advanced machine learning algorithms and intelligent systems to tackle real-world challenges by asking:</p>
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
          <div className="people-grid">
            {entries(group.body).map((person, index) => <article className="person" key={person.title}>
              <div
                className={`portrait ${person.fields.photo?.includes("student") ? `student-${index + 1}` : ""}`}
                style={person.fields.photo && !person.fields.photo.includes("student") ? { backgroundImage: `url(${person.fields.photo})` } : undefined}
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
        <p className="section-lead">{openings[0].trim()}</p>
        <div className="openings">
          {openings.slice(1).map(part => {
            const [title, ...body] = part.trim().split("\n");
            return <article key={title}>
              <h3>{title}</h3>
              <p>{body.join(" ").replace(/\*\*/g, "")}</p>
              {title === "How to apply" && <a className="apply" href="mailto:yijunlinnn@gmail.com">Email your application</a>}
            </article>;
          })}
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
