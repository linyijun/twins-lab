import Link from "next/link";

export function Header() {
  return <header className="site-header"><Link className="brand" href="/">TWINS LAB @ SIU</Link><nav aria-label="Main navigation"><Link href="/research">Research</Link><Link href="/team">Team</Link><Link href="/join-us">Join us</Link></nav></header>;
}

export function Footer() {
  return <footer><div><strong>TWINS LAB @ SIU</strong><p>Towards Intelligent Spatial Computing</p></div><div><p>School of Computing<br/>Southern Illinois University Carbondale</p><a href="mailto:yijunlinnn@gmail.com">yijunlinnn@gmail.com</a></div><span>© 2026</span></footer>;
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <section className="page-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children && <div className="page-intro">{children}</div>}</section>;
}
