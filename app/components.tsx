import { Navigation } from "./navigation";

export function Header() {
  return <header className="site-header"><div className="site-header-inner"><a className="brand" href="/">TWINS LAB @ SIU</a><Navigation /></div></header>;
}

export function Footer() {
  return <footer><div className="footer-inner"><div><p>© 2026 TWINS Lab.</p><p>Towards Intelligent Spatial Computing.</p></div><div><p>Affiliated:<br/><a href="https://soc.siu.edu/">School of Computing</a>, Southern Illinois University</p></div></div></footer>;
}
