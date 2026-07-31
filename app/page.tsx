export default function Home() {
  return (
    <main className="landing">
      <section className="hero">
        <div className="map-layer" aria-hidden="true">
          <span className="map-road road-one" />
          <span className="map-road road-two" />
          <span className="map-road road-three" />
          <span className="map-road road-four" />
          <span className="map-road road-five" />
          <span className="map-road road-six" />
          <span className="map-road road-seven" />
          <span className="map-road road-eight" />
          <span className="map-curve curve-one" />
          <span className="map-curve curve-two" />
          <span className="map-curve curve-three" />
          <span className="map-curve curve-four" />
          <span className="map-curve curve-five" />
          <span className="map-curve curve-six" />
          <span className="map-river river-one" />
          <span className="map-river river-two" />
          <span className="map-river river-three" />
          <span className="map-coordinate map-coordinate-one">
            37.7749° N, 122.4194° W
          </span>
          <span className="map-coordinate map-coordinate-two">
            40.7128° N, 74.0060° W
          </span>
          <span className="map-coordinate map-coordinate-three">
            34.0522° N, 118.2437° W
          </span>
        </div>
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
          <h1>TWINS LAB</h1>
          <p className="subtitle">Towards Intelligent Spatial Computing</p>
          <p className="description">
            TWINS is a research lab working at the intersection of AI, machine
            learning, and spatial sciences.
          </p>
          <a className="explore-button" href="#university">
            Explore More
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <footer id="university">
        <p>Southern Illinois University Carbondale</p>
        <p>School of Computing</p>
        <p>Carbondale, Illinois</p>
      </footer>
    </main>
  );
}
