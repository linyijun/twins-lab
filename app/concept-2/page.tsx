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

const navigation = ["Research", "Team", "Updates", "Join Us"];

export default function ConceptTwo() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.primaryRow}>
          <p className={styles.identity}>TWINS LAB · SIU CARBONDALE</p>
          <nav className={styles.navigation} aria-label="Primary navigation">
            {navigation.map((item) => (
              <a href={`#${item.toLowerCase().replace(" ", "-")}`} key={item}>
                {item}
              </a>
            ))}
          </nav>
        </div>
        <p className={styles.statement}>
          TWINS is a research lab working at the intersection of AI, machine
          learning, and spatial sciences.
        </p>
      </header>

      <section className={styles.hero} aria-labelledby="concept-title">
        <div className={styles.preview}>
          <h1 id="concept-title" className={styles.visuallyHidden}>
            TWINS LAB
          </h1>
          <p className={styles.visuallyHidden}>
            Towards Intelligent Spatial Computing
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>Southern Illinois University Carbondale</p>
        <div>
          <span>School of Computing</span>
          <a href="/">Previous concept ↗</a>
        </div>
      </footer>
    </main>
  );
}
