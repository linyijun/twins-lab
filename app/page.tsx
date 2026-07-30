const navigation = ["Research", "People", "Updates", "Join Us"];

export default function Home() {
  return (
    <main className="landing">
      <section className="hero">
        <div className="spatial-field" aria-hidden="true">
          <span className="grid-line line-x-one" />
          <span className="grid-line line-x-two" />
          <span className="grid-line line-y-one" />
          <span className="grid-line line-y-two" />
          <span className="node node-one" />
          <span className="node node-two" />
          <span className="node node-three" />
          <span className="node node-four" />
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="coordinate coordinate-one">X 24.80 / Y 16.33</span>
          <span className="coordinate coordinate-two">Δ 08.47</span>
        </div>

        <div className="hero-content">
          <p className="lab-index">Research Lab · Est. 2026</p>
          <h1>TWINS LAB</h1>
          <p className="subtitle">Towards Intelligent Spatial Computing</p>
          <p className="description">
            TWINS is a research lab working at the intersection of computer
            vision, robotics, machine learning, and human–computer interaction.
          </p>
          <nav aria-label="Future website sections">
            {navigation.map((item, index) => (
              <span key={item}>
                <small>0{index + 1}</small>
                {item}
              </span>
            ))}
          </nav>
        </div>
      </section>

      <footer>
        <p>Southern Illinois University Carbondale</p>
        <p>School of Computing</p>
        <p>Carbondale, Illinois</p>
      </footer>
    </main>
  );
}
