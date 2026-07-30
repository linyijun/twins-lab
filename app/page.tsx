const research = [
  { number: "01", title: "Spatial Perception", description: "Learning representations that connect geometry, semantics, and motion across the physical world.", tags: ["3D Vision", "Scene Understanding"], visual: "perception" },
  { number: "02", title: "Embodied Reasoning", description: "Building agents that reason about space, uncertainty, and action before they move.", tags: ["Robot Learning", "World Models"], visual: "reasoning" },
  { number: "03", title: "Human × Machine", description: "Creating intelligent spatial interfaces that help people explore, design, and collaborate.", tags: ["Mixed Reality", "Human–AI"], visual: "interaction" },
];

const people = [
  { name: "Alex Chen", role: "Principal Investigator", initials: "AC", color: "blue" },
  { name: "Maya Singh", role: "PhD Researcher · Spatial AI", initials: "MS", color: "coral" },
  { name: "Noah Williams", role: "PhD Researcher · Robotics", initials: "NW", color: "lime" },
  { name: "Iris Park", role: "Research Engineer · 3D Vision", initials: "IP", color: "violet" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Twins lab home">
          <span className="brand-mark" aria-hidden="true"><i /><i /></span>
          <span>TWINS</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#research">Research</a><a href="#people">People</a><a href="#contact">Contact</a>
        </nav>
        <span className="header-index">34.0224° N<br />118.2851° W</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>01</span> Intelligence has a shape</p>
          <h1>Towards<br /><em>Spatial</em><br />Intelligence</h1>
          <p className="hero-intro">We build intelligent systems that perceive, reason about, and interact with the spatial world.</p>
        </div>
        <div className="hero-study" aria-label="Abstract spatial coordinate study">
          <div className="axis axis-x" /><div className="axis axis-y" />
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="twin twin-a"><span>A</span></div><div className="twin twin-b"><span>B</span></div>
          <div className="coordinate coordinate-a">x 24.7<br />y 18.3</div>
          <div className="coordinate coordinate-b">Δ 06.4</div>
          <p className="study-label">A study in relation<br />and relative position</p>
        </div>
        <a className="scroll-cue" href="#research">Explore our work <span aria-hidden="true">↓</span></a>
      </section>

      <section className="manifesto">
        <p className="section-kicker">Our premise</p>
        <p className="manifesto-statement">Intelligence is not only about <em>what</em> things are. It is about understanding <em>where</em> they are, how they relate, and what could happen next.</p>
        <div className="manifesto-note"><span>TWINS / 2026</span><p>We work across computer vision, robotics, machine learning, and human–computer interaction.</p></div>
      </section>

      <section className="research section-shell" id="research">
        <div className="section-heading">
          <p className="section-kicker">Selected directions</p><h2>Research</h2>
          <p>Three connected ways of teaching machines to understand space.</p>
        </div>
        <div className="research-grid">
          {research.map((item) => (
            <article className="research-card" key={item.title}>
              <div className={`research-visual ${item.visual}`} aria-hidden="true">
                <span className="visual-number">{item.number}</span><i className="shape shape-one" /><i className="shape shape-two" /><i className="shape shape-three" />
              </div>
              <div className="research-copy">
                <p className="card-number">R / {item.number}</p><h3>{item.title}</h3><p>{item.description}</p>
                <ul aria-label={`${item.title} topics`}>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="people section-shell" id="people">
        <div className="section-heading people-heading">
          <p className="section-kicker">The lab</p><h2>People</h2>
          <p>We are researchers, builders, and designers working toward machines that understand the world we share.</p>
        </div>
        <div className="people-grid">
          {people.map((person, index) => (
            <article className="person" key={person.name}>
              <div className={`portrait portrait-${person.color}`}><span aria-hidden="true">{person.initials}</span><i className="portrait-orbit" aria-hidden="true" /></div>
              <div className="person-meta"><span>0{index + 1}</span><div><h3>{person.name}</h3><p>{person.role}</p></div></div>
            </article>
          ))}
        </div>
        <p className="dummy-note">Names and roles shown here are placeholder content.</p>
      </section>

      <section className="contact" id="contact">
        <p className="section-kicker">Open positions</p><h2>Come think<br />in space with us.</h2>
        <a href="mailto:hello@twins-lab.example">hello@twins-lab.example <span aria-hidden="true">↗</span></a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><i /><i /></span><span>TWINS</span></a>
        <p>Towards Spatial Intelligence</p><p>Prototype site · 2026</p>
      </footer>
    </main>
  );
}
