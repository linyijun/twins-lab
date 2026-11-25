import Link from "next/link";

export function Header() {
  return <header className="site-header"><div className="site-header-inner"><Link className="brand" href="/">TWINS LAB @ SIU</Link><nav aria-label="Main navigation"><a href="/#team">Team</a><a href="/#join-us">Join us</a></nav></div></header>;
}

export function Footer() {
  return <footer><div className="footer-inner"><div><p>© 2026 <strong>TWINS Lab.</strong></p><p>Towards Intelligent Spatial Computing.</p></div><div><p>Affiliated:<br/><a href="https://soc.siu.edu/">School of Computing</a><br/>Southern Illinois University</p></div><div><p>Contact:<br/><a href="mailto:yijunlinnn@gmail.com">yijunlinnn@gmail.com</a><br/>Carbondale, Illinois</p></div></div></footer>;
}
