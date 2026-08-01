import newsRaw from "../content/news.md?raw";
import { Footer, Header } from "./components";
import { entries } from "../lib/content";

const news = entries(newsRaw);

export default function Home() {
  return <><Header/><main>
    <section className="home-hero">
      <div className="hero-title"><p>TOWARDS INTELLIGENT</p><h1>SPATIAL<br/>COMPUTING <i>(TWINS)</i></h1></div>
      <div className="photo-nav" aria-label="Lab image highlights">
        <div className="slide slide-a"><span>01 / 03</span><b>Intelligence grounded in place.</b></div>
        <div className="slide slide-b"><span>02 / 03</span><b>Learning across space and time.</b></div>
        <div className="slide slide-c"><span>03 / 03</span><b>From data to real-world impact.</b></div>
      </div>
    </section>
    <section className="mission wrap"><p className="section-label">What we do</p><h2>Our research focuses on applied machine learning and data science, thriving at the intersection of <strong>computer science</strong> and <strong>spatial sciences</strong>.</h2><p>We create advanced machine learning algorithms and intelligent systems to tackle real-world challenges by embedding spatial thinking into how machines learn, predict, and reason.</p></section>
    <section className="themes wrap"><article><span>01</span><h3>Spatial prediction</h3><p>Reliable learning from sparse and irregular observations.</p></article><article><span>02</span><h3>Spatiotemporal forecasting</h3><p>Understanding dynamic systems across place and time.</p></article><article><span>03</span><h3>Knowledge extraction</h3><p>Connecting meaning across maps, text, and imagery.</p></article></section>
    <section className="news wrap"><div className="section-head"><p className="section-label">News</p><h2>From the lab</h2></div><div className="news-list">{news.map((item)=><article key={item.title}><time>{item.title}</time><p>{item.body}</p></article>)}</div></section>
  </main><Footer/></>;
}
