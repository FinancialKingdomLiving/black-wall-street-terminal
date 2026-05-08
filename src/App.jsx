import { useState } from "react";
import "./App.css";

const pages = [
  "Home",
  "About",
  "Mission",
  "Education",
  "Tools",
  "Ecosystem",
  "Contact",
  "Terminal",
];

function App() {
  const [page, setPage] = useState("Home");

  return (
    <div className="website">
      <header className="topbar">
        <button className="brand" onClick={() => setPage("Home")}>
          BWST
        </button>

        <nav>
          {pages.map((item) => (
            <button
              key={item}
              className={page === item ? "active" : ""}
              onClick={() => setPage(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {page === "Home" && <Home setPage={setPage} />}
      {page === "About" && <About />}
      {page === "Mission" && <Mission />}
      {page === "Education" && <Education />}
      {page === "Tools" && <Tools />}
      {page === "Ecosystem" && <Ecosystem />}
      {page === "Contact" && <Contact />}
      {page === "Terminal" && <TerminalPreview />}

      <footer className="footer">
        <div>
          <strong>Black Wall Street Terminal</strong>
          <p>Private wealth intelligence. Economic discipline. Ownership culture.</p>
        </div>
        <p>Educational platform. Not financial advice.</p>
      </footer>
    </div>
  );
}

function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

function Home({ setPage }) {
  return (
    <>
      <section className="home-hero">
        <div>
          <p className="eyebrow">PRIVATE WEALTH INTELLIGENCE PLATFORM</p>
          <h1>The Black Wall Street Terminal</h1>
          <p>
            A premium platform being built for trading intelligence, investing,
            wealth education, business ownership, financial discipline, and
            economic sovereignty.
          </p>

          <div className="actions">
            <button onClick={() => setPage("Terminal")}>View Terminal Preview</button>
            <button className="outline" onClick={() => setPage("Mission")}>
              Read The Mission
            </button>
          </div>
        </div>

        <div className="hero-panel">
          <div className="terminal-top">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="gold-line">BLACK WALL STREET TERMINAL</p>
          <p>MARKET INTELLIGENCE: STRUCTURE FIRST</p>
          <p>WEALTH MODE: DISCIPLINE</p>
          <p>ECONOMIC FOCUS: OWNERSHIP</p>

          <div className="mini-grid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </section>

      <section className="intro-strip">
        <h2>This is not another signal room.</h2>
        <p>
          The goal is to build a serious wealth command center — part trading
          desk, part education hub, part economic operating system.
        </p>
      </section>

      <section className="feature-grid">
        <Feature
          number="01"
          title="Trading Intelligence"
          text="Market structure, risk management, trade journaling, watchlists, and analysis tools."
        />
        <Feature
          number="02"
          title="Wealth Education"
          text="Clear lessons on investing, credit, insurance, business, ownership, and money discipline."
        />
        <Feature
          number="03"
          title="Business Ownership"
          text="Future intelligence tools for builders, entrepreneurs, creators, and independent operators."
        />
        <Feature
          number="04"
          title="Economic Sovereignty"
          text="A platform focused on legacy, ownership, strategy, community economics, and execution."
        />
      </section>
    </>
  );
}

function Feature({ number, title, text }) {
  return (
    <article className="feature-card">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function About() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT THE PLATFORM"
        title="A wealth intelligence system for serious builders."
        text="Black Wall Street Terminal is being built to combine market education, trading discipline, economic history, business ownership, and financial tools into one premium digital platform."
      />

      <section className="content-grid">
        <div className="content-card">
          <h2>What it is</h2>
          <p>
            A structured platform for people who want to understand markets,
            money, business, investing, and ownership without being fed hype,
            scams, or shallow guru talk.
          </p>
        </div>

        <div className="content-card">
          <h2>What it is not</h2>
          <p>
            It is not a flashy crypto casino, a cluttered dashboard dump, or a
            fake luxury sales funnel. The design direction is private,
            serious, spacious, and institutional.
          </p>
        </div>
      </section>
    </>
  );
}

function Mission() {
  return (
    <>
      <PageHero
        eyebrow="MISSION"
        title="Market intelligence. Wealth discipline. Economic sovereignty."
        text="The mission is to help people think clearly about money, markets, ownership, risk, and long-term economic power."
      />

      <section className="statement-block">
        <h2>The deeper purpose</h2>
        <p>
          Black Wall Street Terminal is about more than charts. It is about
          restoring financial seriousness, studying systems, building
          ownership, and creating a culture where information becomes action.
        </p>
      </section>

      <section className="feature-grid">
        <Feature
          number="A"
          title="Discipline"
          text="No emotional clicking. No gambling dressed up as trading. Risk first."
        />
        <Feature
          number="B"
          title="Ownership"
          text="Build assets, businesses, knowledge, and systems that do not disappear overnight."
        />
        <Feature
          number="C"
          title="Education"
          text="Teach people how money, markets, business, and financial protection actually work."
        />
        <Feature
          number="D"
          title="Legacy"
          text="Use economic knowledge to build stronger families, communities, and futures."
        />
      </section>
    </>
  );
}

function Education() {
  const topics = [
    "Trading Basics",
    "Risk Management",
    "Options Education",
    "Forex & Futures",
    "Crypto Literacy",
    "Investing Foundations",
    "Business Ownership",
    "Insurance & Protection",
    "Credit & Capital",
    "Black Economic History",
  ];

  return (
    <>
      <PageHero
        eyebrow="EDUCATION"
        title="A school for wealth, markets, and ownership."
        text="The education section will hold lessons, guides, study paths, and practical explanations for people learning how to move with discipline."
      />

      <section className="topic-list">
        {topics.map((topic) => (
          <div key={topic}>{topic}</div>
        ))}
      </section>
    </>
  );
}

function Tools() {
  return (
    <>
      <PageHero
        eyebrow="TOOLS PREVIEW"
        title="Tools belong in the terminal, not dumped on the homepage."
        text="The public website explains the platform. The private terminal will hold the actual calculators, journals, dashboards, AI tools, and market systems."
      />

      <section className="content-grid three">
        <div className="content-card">
          <h2>Risk Calculator</h2>
          <p>Position sizing, max risk, stop loss planning, and discipline tracking.</p>
        </div>

        <div className="content-card">
          <h2>Cloud Journal</h2>
          <p>Save trades, review emotions, study mistakes, and track execution.</p>
        </div>

        <div className="content-card">
          <h2>Portfolio Tracker</h2>
          <p>Track assets, crypto, investing positions, and long-term wealth data.</p>
        </div>
      </section>
    </>
  );
}

function Ecosystem() {
  return (
    <>
      <PageHero
        eyebrow="ECOSYSTEM"
        title="One design language. Multiple serious platforms."
        text="Black Wall Street Terminal is part of a larger ecosystem of education, herbs, Torah study, leadership, and wealth intelligence."
      />

      <section className="ecosystem-list">
        <Eco title="Black Wall Street Terminal" text="Wealth, markets, trading, ownership, and economic intelligence." />
        <Eco title="Hood Alchemist Savior" text="Herbal knowledge, gardening, natural healing, and plant education." />
        <Eco title="Torah Tongue Study Hall" text="Biblical Hebrew, Torah education, language study, and spiritual discipline." />
        <Eco title="LeadNowOK" text="Leadership, execution, productivity, and personal development." />
      </section>
    </>
  );
}

function Eco({ title, text }) {
  return (
    <div className="eco-card">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT / WAITLIST"
        title="Request early access."
        text="The platform is being stabilized into a premium preview first. The private terminal will open after the structure is clean and deployment usage is controlled."
      />

      <section className="contact-card">
        <h2>Join the waitlist</h2>
        <p>
          Email: financialkingdomliving@gmail.com
        </p>
        <button>Request Access</button>
      </section>
    </>
  );
}

function TerminalPreview() {
  return (
    <>
      <PageHero
        eyebrow="PRIVATE TERMINAL PREVIEW"
        title="The dashboard is being moved behind the right door."
        text="The live tools will live inside a private terminal experience instead of overwhelming the public homepage."
      />

      <section className="terminal-preview">
        <div className="terminal-window">
          <div className="terminal-top">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="terminal-row gold">BWST PRIVATE TERMINAL</div>
          <div className="terminal-row">TRADING DESK — COMING ONLINE</div>
          <div className="terminal-row">RISK ROOM — STRUCTURE FIRST</div>
          <div className="terminal-row">WEALTH DASHBOARD — PRIVATE ACCESS</div>
          <div className="terminal-row">AI FINANCE ASSISTANT — FUTURE BUILD</div>

          <div className="dashboard-preview-grid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className="wide"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;