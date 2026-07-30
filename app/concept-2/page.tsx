import type { Metadata } from "next";
import styles from "./concept-2.module.css";

export const metadata: Metadata = {
  title: "TWINS LAB — Light Concept",
  description:
    "Towards Intelligent Spatial Computing at Southern Illinois University Carbondale.",
  openGraph: {
    images: [{ url: "/og-light.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-light.png"],
  },
};

const navigation = ["Research", "People", "Updates", "Join Us"];

const roads = [
  { className: styles.roadOne },
  { className: styles.roadTwo },
  { className: styles.roadThree },
  { className: styles.roadFour },
  { className: styles.roadFive },
];

export default function ConceptTwo() {
  return (
    <main className={styles.page}>
      <div className={styles.map} aria-hidden="true">
        <div className={styles.grid} />
        {roads.map((road, index) => (
          <span className={`${styles.road} ${road.className}`} key={index} />
        ))}
        <span className={`${styles.river} ${styles.riverOne}`} />
        <span className={`${styles.river} ${styles.riverTwo}`} />
        <span className={`${styles.connector} ${styles.connectorOne}`} />
        <span className={`${styles.connector} ${styles.connectorTwo}`} />
        <span className={`${styles.node} ${styles.nodeOne}`} />
        <span className={`${styles.node} ${styles.nodeTwo}`} />
        <span className={`${styles.node} ${styles.nodeThree}`} />
      </div>

      <header className={styles.utility}>
        <p>Spatial intelligence · SIU Carbondale</p>
        <a href="/">View previous concept ↗</a>
      </header>

      <section className={styles.hero}>
        <p className={`${styles.coordinate} ${styles.coordinateNorth}`}>
          37.7142° N
        </p>
        <p className={`${styles.coordinate} ${styles.coordinateWest}`}>
          89.2170° W
        </p>

        <div className={styles.titlePlate}>
          <p className={styles.eyebrow}>Towards Intelligent Spatial Computing</p>
          <h1>TWINS LAB</h1>
          <p className={styles.intro}>
            TWINS is a research lab working at the intersection of AI, machine
            learning, and spatial sciences.
          </p>
        </div>
      </section>

      <nav className={styles.navigation} aria-label="Primary navigation">
        {navigation.map((item, index) => (
          <a href={`#${item.toLowerCase().replace(" ", "-")}`} key={item}>
            <span>0{index + 1}</span>
            {item}
          </a>
        ))}
      </nav>

      <footer className={styles.footer}>
        <p>Southern Illinois University Carbondale</p>
        <p>School of Computing</p>
        <p>Carbondale, Illinois</p>
      </footer>
    </main>
  );
}
