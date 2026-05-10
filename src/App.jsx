import { useMemo, useState } from "react";
import "./App.css";

const tracks = {
  Foundation: {
    subtitle: "Market Literacy",
    pitch: "For beginners who need structure before strategy.",
    modules: [
      {
        code: "FND-01",
        title: "What Trading Really Is",
        outcome: "Separate structured trading from gambling.",
        thesis:
          "Trading is not guessing. Trading is structured decision-making under risk.",
        study:
          "A disciplined trader studies price, waits for a setup, defines risk, executes with controlled size, and reviews the result. The goal is not to win every trade. The goal is to protect capital and improve decision quality.",
        mistake:
          "Most beginners ask how much they can make before asking how much they can lose. That is casino thinking.",
        work: ["Pick one market.", "Define your risk.", "Observe without entering.", "Write what price is doing."],
      },
      {
        code: "FND-02",
        title: "Candlestick Reading",
        outcome: "Read buyer and seller pressure.",
        thesis:
          "Candles are the written record of price behavior.",
        study:
          "Bodies show commitment. Wicks show rejection. Large bodies show participation. Small bodies show hesitation. Candles matter most when combined with location, trend, and structure.",
        mistake:
          "One candle by itself does not make a trade. Context is king.",
        work: ["Mark bullish candles.", "Mark bearish candles.", "Study long wicks.", "Write the reaction."],
      },
      {
        code: "FND-03",
        title: "Support & Resistance",
        outcome: "Identify important price zones.",
        thesis:
          "Support and resistance are areas where price has memory.",
        study:
          "Support is where buyers may defend price. Resistance is where sellers may defend price. These are zones, not magic lines. Price can pierce, retest, reject, or consolidate around them.",
        mistake:
          "Drawing one skinny line and worshiping it is how traders get played.",
        work: ["Mark support zones.", "Mark resistance zones.", "Watch reaction.", "Do not force entry."],
      },
    ],
  },
  Structure: {
    subtitle: "Market Structure",
    pitch: "For students ready to read trend, liquidity, and sessions.",
    modules: [
      {
        code: "STR-01",
        title: "Market Structure",
        outcome: "Understand highs, lows, trend, and breaks.",
        thesis:
          "Structure shows who controls price: buyers, sellers, or neither side.",
        study:
          "Uptrends form higher highs and higher lows. Downtrends form lower highs and lower lows. Ranges move sideways between boundaries. Breaks matter, but reaction after the break matters more.",
        mistake:
          "A breakout with no follow-through is often bait.",
        work: ["Mark swing highs.", "Mark swing lows.", "Find structure break.", "Watch the retest."],
      },
      {
        code: "STR-02",
        title: "Liquidity",
        outcome: "Understand where stops and orders rest.",
        thesis:
          "Liquidity is where orders are waiting.",
        study:
          "Stops often rest above old highs and below old lows. Price may run those zones, trigger orders, and reverse. That is why confirmation matters after a sweep.",
        mistake:
          "Buying only because price broke a high can put you directly in the trap.",
        work: ["Find an old high.", "Find an old low.", "Mark stop zones.", "Watch sweep and reclaim."],
      },
      {
        code: "STR-03",
        title: "Session Timing",
        outcome: "Study Asia, London, and New York behavior.",
        thesis:
          "Time of day affects volatility and quality of movement.",
        study:
          "Asia often builds range. London often expands. New York can continue, reverse, or deliver heavy volatility. A trader who ignores sessions trades blind.",
        mistake:
          "Trading dead hours like New York open makes frustration expensive.",
        work: ["Mark sessions.", "Watch two sessions.", "Track clean movement.", "Write session notes."],
      },
    ],
  },
  Execution: {
    subtitle: "Advanced Execution",
    pitch: "For traders learning confirmation, review, and discipline.",
    modules: [
      {
        code: "EXE-01",
        title: "Liquidity Sweep Framework",
        outcome: "Understand sweep, reclaim, confirmation, and execution.",
        thesis:
          "The sweep is not the trade. The reclaim is where the decision begins.",
        study:
          "A sweep happens when price runs a high or low, triggers orders, and fails to continue. The disciplined trader waits for reclaim, confirmation, and defined risk.",
        mistake:
          "Entering the sweep too early means you volunteered as liquidity.",
        work: ["Mark liquidity.", "Wait for sweep.", "Wait for reclaim.", "Record confirmation."],
      },
      {
        code: "EXE-02",
        title: "Multi-Timeframe Alignment",
        outcome: "Use higher timeframe bias and lower timeframe entry.",
        thesis:
          "Higher timeframe gives context. Lower timeframe refines execution.",
        study:
          "Use the 4H for direction, 15M for setup, and 5M for entry behavior. Lower timeframes should not overrule the larger story.",
        mistake:
          "The 1-minute chart can make a grown man panic over noise.",
        work: ["Check 4H bias.", "Find 15M setup.", "Watch 5M entry.", "Only trade alignment."],
      },
      {
        code: "EXE-03",
        title: "Execution Grading",
        outcome: "Grade process, not just profit.",
        thesis:
          "A winning trade can be bad. A losing trade can be well executed.",
        study:
          "Review preparation, entry, stop placement, position size, patience, exit, and emotional control. Profit is the result. Process is the system.",
        mistake:
          "Profit can lie. Process tells the truth.",
        work: ["Review last trade.", "Grade entry.", "Grade risk.", "Write one fix."],
      },
    ],
  },
};

const markets = [
  ["Stocks", "Ownership Market", "Moderate", "Company ownership, sectors, earnings, dividends, indexes, and long-term accumulation."],
  ["Options", "Derivative Contract", "High", "Calls, puts, premium, expiration, volatility, time decay, and Greeks."],
  ["Futures", "Leveraged Contract", "High", "Tick value, contract size, margin, prop firm rules, and volatility."],
  ["Forex", "Currency Market", "Moderate to High", "Pairs, pips, lots, spreads, sessions, macro news, and liquidity."],
  ["Crypto", "Digital Asset Market", "High", "Bitcoin cycles, altcoins, wallets, exchanges, volatility, and security."],
  ["Gold / XAUUSD", "Macro Volatility", "Very High", "Liquidity, dollar strength, news, fear, sessions, and patience."],
];

const principles = [
  "Risk before reward",
  "No stop loss, no trade",
  "One market first",
  "One setup first",
  "Journal everything",
  "Respect session timing",
  "Trade structure, not excitement",
  "Capital preservation first",
];

function App() {
  const [page, setPage] = useState("Home");
  const [track, setTrack] = useState("Foundation");
  const [moduleIndex, setModuleIndex] = useState(0);
  const [marketIndex, setMarketIndex] = useState(5);
  const [checks, setChecks] = useState({});
  const [grade, setGrade] = useState(5);

  const activeTrack = tracks[track];
  const activeModule = activeTrack.modules[moduleIndex];

  const completion = useMemo(() => {
    const done = activeModule.work.filter((_, i) => checks[`${track}-${moduleIndex}-${i}`]).length;
    return Math.round((done / activeModule.work.length) * 100);
  }, [checks, track, moduleIndex, activeModule]);

  function go(next) {
    setPage(next);
    window.scrollTo(0, 0);
  }

  function openModule(name, index = 0) {
    setTrack(name);
    setModuleIndex(index);
    setPage("Module");
    window.scrollTo(0, 0);
  }

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={() => go("Home")}>BWST</button>
        <nav>
          {["Home", "Institute", "Markets", "Risk", "Psychology", "Terminal", "Waitlist"].map((item) => (
            <button key={item} className={page === item ? "active" : ""} onClick={() => go(item)}>
              {item}
            </button>
          ))}
        </nav>
      </header>

      {page === "Home" && <Home openModule={openModule} go={go} />}
      {page === "Institute" && <Institute track={track} setTrack={setTrack} openModule={openModule} />}
      {page === "Module" && (
        <Module
          track={track}
          setTrack={setTrack}
          moduleIndex={moduleIndex}
          setModuleIndex={setModuleIndex}
          activeTrack={activeTrack}
          activeModule={activeModule}
          checks={checks}
          setChecks={setChecks}
          completion={completion}
          grade={grade}
          setGrade={setGrade}
        />
      )}
      {page === "Markets" && <Markets marketIndex={marketIndex} setMarketIndex={setMarketIndex} />}
      {page === "Risk" && <Risk />}
      {page === "Psychology" && <Psychology />}
      {page === "Terminal" && <Terminal />}
      {page === "Waitlist" && <Waitlist />}

      <footer className="footer">
        <strong>Black Wall Street Terminal</strong>
        <span>Private Wealth Intelligence • Trading Education • Economic Discipline</span>
      </footer>
    </div>
  );
}

function Home({ openModule, go }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">PRIVATE WEALTH INTELLIGENCE PLATFORM</p>
          <h1>Black Wall Street Terminal</h1>
          <p>
            A premium trading and wealth education institute built for disciplined adults,
            serious builders, market students, and ownership-minded people.
          </p>
          <div className="actions">
            <button onClick={() => openModule("Foundation", 0)}>Enter The Institute</button>
            <button className="outline" onClick={() => go("Terminal")}>Preview Terminal</button>
          </div>
        </div>

        <div className="terminal-box hero-terminal">
          <div className="terminal-top"><span></span><span></span><span></span></div>
          <div className="chart-panel">
            <div className="price-path"></div>
            <div className="zone top">Resistance</div>
            <div className="zone bottom">Support</div>
            <div className="dashline one"></div>
            <div className="dashline two"></div>
          </div>
          <div className="terminal-line gold">BWST OPERATING MODEL</div>
          <div className="terminal-line">FOUNDATION → STRUCTURE → EXECUTION</div>
          <div className="terminal-line">CAPITAL PRESERVATION BEFORE SCALE</div>
        </div>
      </section>

      <section className="proof-strip">
        <div><strong>03</strong><span>Training Tracks</span></div>
        <div><strong>09</strong><span>Core Modules</span></div>
        <div><strong>06</strong><span>Market Classes</span></div>
        <div><strong>100%</strong><span>Discipline First</span></div>
      </section>

      <section className="statement">
        <p className="eyebrow">THE STANDARD</p>
        <h2>Not a signal room. Not a guru funnel. A serious wealth command school.</h2>
        <p>
          This platform teaches people how markets behave, how risk destroys accounts,
          how capital is protected, and how ownership thinking is built.
        </p>
      </section>

      <section className="track-grid">
        {Object.keys(tracks).map((name) => (
          <article className="track-card" key={name} onClick={() => openModule(name, 0)}>
            <span>{tracks[name].subtitle}</span>
            <h2>{name}</h2>
            <p>{tracks[name].pitch}</p>
            <button>Open Track</button>
          </article>
        ))}
      </section>
    </>
  );
}

function Institute({ track, setTrack, openModule }) {
  return (
    <>
      <PageTitle eyebrow="INSTITUTE MAP" title="Choose a track. Study the modules. Apply the work." text="This is built like a real training room, not a random landing page." />

      <section className="track-tabs">
        {Object.keys(tracks).map((name) => (
          <button key={name} className={track === name ? "active" : ""} onClick={() => setTrack(name)}>
            {name}
          </button>
        ))}
      </section>

      <section className="track-brief">
        <div>
          <p className="eyebrow">{tracks[track].subtitle}</p>
          <h2>{track} Track</h2>
          <p>{tracks[track].summary}</p>
        </div>
        <div className="seal">
          <strong>{tracks[track].modules.length}</strong>
          <span>Modules</span>
        </div>
      </section>

      <section className="module-grid">
        {tracks[track].modules.map((m, i) => (
          <article className="module-card" key={m.code}>
            <span>{m.code}</span>
            <h2>{m.title}</h2>
            <p>{m.outcome}</p>
            <button onClick={() => openModule(track, i)}>Open Module</button>
          </article>
        ))}
      </section>
    </>
  );
}

function Module({ track, setTrack, moduleIndex, setModuleIndex, activeTrack, activeModule, checks, setChecks, completion, grade, setGrade }) {
  return (
    <>
      <PageTitle eyebrow={`${track} • ${activeModule.code}`} title={activeModule.title} text={activeModule.outcome} />

      <section className="track-tabs tight">
        {Object.keys(tracks).map((name) => (
          <button key={name} className={track === name ? "active" : ""} onClick={() => { setTrack(name); setModuleIndex(0); }}>
            {name}
          </button>
        ))}
      </section>

      <section className="track-tabs tight">
        {activeTrack.modules.map((m, i) => (
          <button key={m.code} className={moduleIndex === i ? "active" : ""} onClick={() => setModuleIndex(i)}>
            {m.code}
          </button>
        ))}
      </section>

      <section className="workspace">
        <article className="lesson-panel">
          <div className="lesson-visual">
            <div className="price-path small"></div>
            <div className="tag context">Context</div>
            <div className="tag risk">Risk</div>
            <div className="tag execute">Execution</div>
          </div>

          <p className="eyebrow">CORE THESIS</p>
          <h2>{activeModule.thesis}</h2>
          <p>{activeModule.study}</p>

          <div className="mistake-box">
            <p className="eyebrow">COMMON MISTAKE</p>
            <p>{activeModule.mistake}</p>
          </div>
        </article>

        <aside className="assignment-panel">
          <p className="eyebrow">FIELD ASSIGNMENT</p>
          <h2>{completion}% Complete</h2>

          <div className="progress"><div style={{ width: `${completion}%` }} /></div>

          <div className="checklist">
            {activeModule.work.map((item, i) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={!!checks[`${track}-${moduleIndex}-${i}`]}
                  onChange={(e) =>
                    setChecks({ ...checks, [`${track}-${moduleIndex}-${i}`]: e.target.checked })
                  }
                />
                {item}
              </label>
            ))}
          </div>

          <div className="grade-box">
            <p>Understanding Level</p>
            <input type="range" min="0" max="10" value={grade} onChange={(e) => setGrade(e.target.value)} />
            <strong>{grade}/10</strong>
          </div>
        </aside>
      </section>
    </>
  );
}

function Markets({ marketIndex, setMarketIndex }) {
  const market = markets[marketIndex];

  return (
    <>
      <PageTitle eyebrow="MARKET LIBRARY" title="Different markets require different discipline." text="A serious trader does not treat stocks, options, futures, forex, crypto, and gold the same." />

      <section className="market-grid">
        {markets.map((m, i) => (
          <button key={m[0]} className={marketIndex === i ? "market-card active" : "market-card"} onClick={() => setMarketIndex(i)}>
            <span>{m[1]}</span>
            <strong>{m[0]}</strong>
            <small>{m[2]}</small>
          </button>
        ))}
      </section>

      <section className="market-detail">
        <div className="market-stat"><span>Risk Level</span><strong>{market[2]}</strong></div>
        <div><p className="eyebrow">{market[1]}</p><h2>{market[0]}</h2><p>{market[3]}</p></div>
      </section>
    </>
  );
}

function Risk() {
  return (
    <>
      <PageTitle eyebrow="RISK ROOM" title="Capital preservation comes before growth." text="Risk management is not optional. It is the wall between discipline and foolishness." />
      <section className="risk-grid">
        {principles.map((rule, i) => (
          <div key={rule}><span>{String(i + 1).padStart(2, "0")}</span><p>{rule}</p></div>
        ))}
      </section>
    </>
  );
}

function Psychology() {
  const cards = [
    ["Patience", "Wait for your setup. Do not force the market to entertain you."],
    ["Emotional Control", "If one red trade changes your mood, your size is too big or your plan is too weak."],
    ["Process", "A green trade can be poorly executed. A red trade can be correctly executed."],
    ["Review", "A journal turns repeated mistakes into intelligence."],
  ];

  return (
    <>
      <PageTitle eyebrow="TRADING PSYCHOLOGY" title="The market reveals the trader." text="Strategy without emotional discipline is incomplete." />
      <section className="psych-grid">
        {cards.map(([title, text]) => <article className="psych-card" key={title}><h2>{title}</h2><p>{text}</p></article>)}
      </section>
    </>
  );
}

function Terminal() {
  return (
    <>
      <PageTitle eyebrow="PRIVATE TERMINAL" title="The live tools belong behind the terminal door." text="Dashboards, AI assistants, journals, watchlists, and analytics will live here after the public institute is polished." />
      <section className="terminal-preview">
        <div className="terminal-box big">
          <div className="terminal-top"><span></span><span></span><span></span></div>
          <div className="terminal-line gold">BWST PRIVATE TERMINAL</div>
          <div className="terminal-line">MARKET DESK</div>
          <div className="terminal-line">RISK ROOM</div>
          <div className="terminal-line">EXECUTION REVIEW</div>
          <div className="terminal-grid"><div></div><div></div><div></div><div></div><div className="wide"></div></div>
        </div>
      </section>
    </>
  );
}

function Waitlist() {
  return (
    <>
      <PageTitle eyebrow="EARLY ACCESS" title="Request private access." text="This is the door for early members, serious learners, builders, and future platform users." />
      <section className="waitlist-card">
        <h2>Join the BWST private list</h2>
        <p>For trading education, private terminal updates, wealth tools, and economic intelligence.</p>
        <div className="waitlist-form"><input placeholder="Email address" /><button>Request Access</button></div>
      </section>
    </>
  );
}

function PageTitle({ eyebrow, title, text }) {
  return <section className="page-title"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p></section>;
}

export default App;