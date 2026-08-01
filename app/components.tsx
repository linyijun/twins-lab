import Link from "next/link";

export function Header() {
  return <header className="site-header"><div className="site-header-inner"><Link className="brand" href="/">TWINS LAB @ SIU</Link><nav aria-label="Main navigation"><Link href="/research">Research</Link><Link href="/team">Team</Link><Link href="/join-us">Join us</Link></nav></div></header>;
}

export function Footer() {
  return <footer><div className="footer-inner"><div><p>© 2026 <strong>TWINS Lab.</strong></p><p>Towards Intelligent Spatial Computing.</p></div><div><p>Affiliated:<br/><a href="https://soc.siu.edu/">School of Computing</a><br/>Southern Illinois University</p></div><div><p>Contact:<br/><a href="mailto:yijunlinnn@gmail.com">yijunlinnn@gmail.com</a><br/>Carbondale, Illinois</p></div></div></footer>;
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <><h1 className="page-title">{title}</h1>{children && <div className="page-lead">{children}</div>}</>;
}
