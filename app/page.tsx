const research = [
  {
    icon: "⌖",
    title: "Spatial Perception",
    description:
      "We study how machines can understand objects, places, geometry, and motion from visual observations.",
    topics: ["3D vision", "Scene understanding"],
  },
  {
    icon: "◎",
    title: "Embodied Reasoning",
    description:
      "We build agents that reason about space and action so they can operate reliably in the physical world.",
    topics: ["Robot learning", "World models"],
  },
  {
    icon: "◇",
    title: "Human–AI Interaction",
    description:
      "We design spatial tools that help people explore information, create environments, and collaborate.",
    topics: ["Mixed reality", "Interactive systems"],
  },
];

const updates = [
  { date: "Jun 12, 2026", text: "Our work on spatial world models was accepted to SpatialAI 2026." },
  { date: "Apr 03, 2026", text: "TWINS Lab is officially launched. Welcome to our new research home." },
  { date: "Jan 18, 2026", text: "We are recruiting PhD students and research interns for Fall 2026." },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand" href="#top" aria-label="TWINS Lab home">
            <span className="brand-symbol" aria-hidden="true">T</span>
            <span>TWINS Lab</span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#research">Research</a>
            <a href="#people">People</a>
            <a href="#updates">Updates</a>
            <a href="#contact">Join us</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-mark" aria-hidden="true">
          <span className="plane plane-back">T</span>
          <span className="plane plane-front">T</span>
        </div>
        <h1>Towards Spatial Intelligence</h1>
        <p className="hero-copy">
          TWINS is a research lab working at the intersection of computer
          vision, robotics, machine learning, and human–computer interaction.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#research">Explore our research</a>
          <a className="button button-secondary" href="#contact">Join the lab</a>
        </div>
      </section>

      <section className="section" id="research">
        <div className="section-heading">
          <div>
            <p className="overline">What we work on</p>
            <h2>Research</h2>
          </div>
        </div>
        <div className="research-grid">
          {research.map((item) => (
            <article className="research-card" key={item.title}>
              <span className="research-icon" aria-hidden="true">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul aria-label={`${item.title} topics`}>
                {item.topics.map((topic) => <li key={topic}>{topic}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-tinted" id="people">
        <div className="section-heading">
          <div>
            <p className="overline">Who we are</p>
            <h2>People</h2>
          </div>
        </div>
        <div className="people-group">
          <h3>Lab Director</h3>
          <div className="people-grid">
            <article className="person-card">
              <div className="avatar" aria-hidden="true">AC</div>
              <div>
                <h4>Alex Chen</h4>
                <p>Lab Director</p>
              </div>
            </article>
          </div>
        </div>
        <div className="people-group">
          <h3>PhD Students</h3>
          <div className="empty-people">
            <p>No PhD students yet.</p>
            <a href="#contact">We are recruiting →</a>
          </div>
        </div>
        <p className="placeholder-note">Director name is sample content for layout preview.</p>
      </section>

      <section className="section" id="updates">
        <div className="section-heading compact-heading">
          <div>
            <p className="overline">From the lab</p>
            <h2>Latest updates</h2>
          </div>
        </div>
        <div className="updates-list">
          {updates.map((update) => (
            <article className="update-row" key={update.date}>
              <time>{update.date}</time>
              <p>{update.text}</p>
              <span aria-hidden="true">→</span>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div>
          <p className="overline">Work with us</p>
          <h2>Interested in spatial intelligence?</h2>
          <p>
            We welcome students and collaborators from different disciplines.
            Tell us what you are curious about.
          </p>
        </div>
        <a className="button button-primary" href="mailto:hello@twins-lab.example">
          Get in touch
        </a>
      </section>

      <footer>
        <div className="footer-main">
          <a className="brand" href="#top">
            <span className="brand-symbol" aria-hidden="true">T</span>
            <span>TWINS Lab</span>
          </a>
          <p>Towards Spatial Intelligence</p>
        </div>
        <div className="footer-meta">
          <p>Sample website · 2026</p>
          <p>hello@twins-lab.example</p>
        </div>
      </footer>
    </main>
  );
}
