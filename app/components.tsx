import { Navigation } from "./navigation";
import { sitePath } from "../lib/site";

export function Header() {
  return <header className="site-header"><div className="site-header-inner"><a className="brand" href={sitePath("/")}>TWINS LAB @ SIU</a><Navigation /></div></header>;
}

export function Footer() {
  return <footer><div className="footer-inner"><div><p>© 2026 TWINS Lab. Towards Intelligent Spatial Computing.</p></div><div><p>Affiliated: School of Computing, Southern Illinois University</p></div></div></footer>;
}
