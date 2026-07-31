const focusAreas = [
  {
    number: "01",
    title: "Spatial intelligence",
    text: "Learning representations that connect people, places, and the physical systems around them.",
    className: "focus-card focus-card--city",
  },
  {
    number: "02",
    title: "Geospatial AI",
    text: "Building responsible machine learning methods for complex, large-scale spatial data.",
    className: "focus-card focus-card--terrain",
  },
  {
    number: "03",
    title: "Human-centered systems",
    text: "Turning spatial models into useful tools for science, planning, and everyday decisions.",
    className: "focus-card focus-card--people",
  },
];

const updates = [
  {
    date: "LAB NOTE · 06.18.26",
    title: "A new home for spatial intelligence research",
    text: "TWINS Lab launches at Southern Illinois University Carbondale.",
  },
  {
    date: "RESEARCH · 05.02.26",
    title: "Learning across scales",
    text: "How our group connects local observations with regional spatial patterns.",
  },
  {
    date: "OPPORTUNITY · 04.14.26",
    title: "We are building the team",
    text: "We welcome students interested in AI, maps, and spatial computing.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="TWINS Lab home">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
          </span>
          <span>TWINS LAB</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#research">Research</a>
          <a href="#about">About</a>
          <a href="#updates">Updates</a>
          <a className="nav-cta" href="#join">
            Join us <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-map" aria-hidden="true">
          <span className="contour contour-one" />
          <span className="contour contour-two" />
          <span className="route route-one" />
          <span className="route route-two" />
          <span className="route route-three" />
          <span className="map-point point-one" />
          <span className="map-point point-two" />
          <span className="map-label label-one">37.7273 N / 89.2168 W</span>
          <span className="map-label label-two">SPATIAL FIELD · 01</span>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Towards Intelligent Spatial Computing</p>
          <h1>
            Intelligence
            <br />
            <em>has a place.</em>
          </h1>
          <p className="hero-description">
            TWINS is a research lab exploring how artificial intelligence can
            understand, model, and shape the spatial world.
          </p>
          <a className="text-link" href="#about">
            Discover our work <span aria-hidden="true">↓</span>
          </a>
        </div>

        <p className="hero-index" aria-hidden="true">
          01 / 04
        </p>
      </section>

      <section className="intro section-shell" id="about">
        <p className="section-kicker">About TWINS</p>
        <div className="intro-copy">
          <h2>
            We study the relationship between <span>intelligence</span> and{" "}
            <span>space.</span>
          </h2>
          <div className="intro-detail">
            <p>
              Our research sits at the intersection of artificial intelligence,
              machine learning, geographic information science, and spatial
              computing.
            </p>
            <p>
              We develop methods that help machines reason about where things
              are, how they relate, and why location matters.
            </p>
          </div>
        </div>
      </section>

      <section className="research section-shell" id="research">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Research directions</p>
            <h2>Questions grounded in the world.</h2>
          </div>
          <p>
            From foundational models to practical systems, our work moves
            between theory, data, and real places.
          </p>
        </div>

        <div className="focus-grid">
          {focusAreas.map((area) => (
            <article className={area.className} key={area.title}>
              <div className="focus-visual" aria-hidden="true">
                <span>{area.number}</span>
              </div>
              <div className="focus-copy">
                <h3>{area.title}</h3>
                <p>{area.text}</p>
                <span className="card-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </article>
          ))}
        </div>
        <p className="image-note">
          Image placeholders shown — project photography can be added later.
        </p>
      </section>

      <section className="statement">
        <div className="statement-grid" aria-hidden="true" />
        <p className="section-kicker">Our perspective</p>
        <blockquote>
          “Space is not just a coordinate.
          <br />
          It is <em>context.</em>”
        </blockquote>
        <p>
          Better spatial context can make AI more useful, more explainable, and
          more connected to the realities it is meant to serve.
        </p>
      </section>

      <section className="updates section-shell" id="updates">
        <div className="section-heading updates-heading">
          <div>
            <p className="section-kicker">From the lab</p>
            <h2>Latest updates</h2>
          </div>
        </div>
        <div className="update-list">
          {updates.map((update, index) => (
            <article key={update.title}>
              <p>{update.date}</p>
              <h3>{update.title}</h3>
              <p>{update.text}</p>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="join" id="join">
        <div>
          <p className="section-kicker">Work with us</p>
          <h2>Curious minds welcome.</h2>
        </div>
        <div className="join-copy">
          <p>
            We are interested in meeting students and collaborators who want to
            build thoughtful, ambitious spatial technology.
          </p>
          <a href="mailto:twinslab@siu.edu">
            twinslab@siu.edu <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
          </span>
          <span>TWINS LAB</span>
        </a>
        <p>
          School of Computing
          <br />
          Southern Illinois University Carbondale
        </p>
        <p>© 2026 TWINS Lab</p>
      </footer>
    </main>
  );
}
