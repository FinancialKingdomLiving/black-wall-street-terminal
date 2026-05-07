import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

function TradingViewChart() {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "OANDA:XAUUSD",
      interval: "15",
      timezone: "America/New_York",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });

    container.current.appendChild(script);
  }, []);

  return <div className="tradingview-widget-container" ref={container} />;
}

function App() {
  const [accountSize, setAccountSize] = useState("50000");
  const [riskPercent, setRiskPercent] = useState("0.5");
  const [stopLoss, setStopLoss] = useState("35");

  const [symbol, setSymbol] = useState("XAU/USD");
  const [setup, setSetup] = useState("Liquidity sweep + VWAP reclaim");
  const [emotion, setEmotion] = useState("Patient");
  const [notes, setNotes] = useState("");
  const [journal, setJournal] = useState(() => {
    const saved = localStorage.getItem("bwst_journal");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("bwst_journal", JSON.stringify(journal));
  }, [journal]);

  const risk = useMemo(() => {
    const account = Number(accountSize) || 0;
    const percent = Number(riskPercent) || 0;
    const stop = Number(stopLoss) || 1;
    const dollars = account * (percent / 100);
    const positionGuide = dollars / stop;

    return {
      dollars: dollars.toFixed(2),
      positionGuide: positionGuide.toFixed(2),
    };
  }, [accountSize, riskPercent, stopLoss]);

  const addJournalEntry = () => {
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      symbol,
      setup,
      emotion,
      notes: notes || "No notes added.",
      riskDollars: risk.dollars,
    };

    setJournal([entry, ...journal]);
    setNotes("");
  };

  const clearJournal = () => {
    setJournal([]);
  };

  const tickerItems = [
    { symbol: "XAU/USD", label: "Gold", price: "Live Chart", change: "ACTIVE" },
    { symbol: "BTC/USD", label: "Bitcoin", price: "Crypto", change: "+ WATCH" },
    { symbol: "DXY", label: "Dollar Index", price: "Macro", change: "KEY" },
    { symbol: "SPY", label: "S&P 500 ETF", price: "Options", change: "+ FLOW" },
    { symbol: "QQQ", label: "Nasdaq ETF", price: "Tech", change: "+ MOMENTUM" },
    { symbol: "VIX", label: "Fear Index", price: "Volatility", change: "RISK" },
    { symbol: "MNQ", label: "Micro Nasdaq", price: "Futures", change: "SESSION" },
    { symbol: "EUR/USD", label: "Forex", price: "London / NY", change: "FX" },
  ];

  const markets = [
    { name: "XAU/USD", status: "Gold focus", move: "+0.82%" },
    { name: "BTC/USD", status: "Crypto watch", move: "-0.31%" },
    { name: "MNQ", status: "Futures", move: "+0.18%" },
    { name: "SPY", status: "Options", move: "+0.24%" },
    { name: "QQQ", status: "Tech index", move: "+0.41%" },
    { name: "EUR/USD", status: "Forex pair", move: "-0.12%" },
  ];

  const modules = [
    "Trading Platform",
    "Education Hub",
    "Wealth Dashboard",
    "AI Finance Assistant",
    "Crypto / Futures / Options",
    "Business Intelligence",
    "Community Network",
    "Economic Learning Ecosystem",
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">B.W.S.T</div>

        <nav className="nav-menu">
          {[
            "Dashboard",
            "Markets",
            "Risk Room",
            "Trade Journal",
            "Education",
            "AI Assistant",
            "Wealth",
            "Community",
          ].map((item) => (
            <a key={item}>{item}</a>
          ))}
        </nav>

        <div className="sidebar-card">
          <p>Terminal Status</p>
          <strong>ONLINE</strong>
        </div>
      </aside>

      <main className="main">
        <div className="ticker-bar">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <div className="ticker-item" key={`${item.symbol}-${index}`}>
                <strong>{item.symbol}</strong>
                <span>{item.label}</span>
                <em>{item.price}</em>
                <b>{item.change}</b>
              </div>
            ))}
          </div>
        </div>

        <section className="hero">
          <div>
            <p className="eyebrow">ECONOMIC COMMAND CENTER</p>
            <h1>The Black Wall Street Terminal</h1>
            <p className="hero-text">
              A financial operating system for trading, wealth building, AI
              finance, business intelligence, crypto, futures, options,
              education, and community economics.
            </p>
          </div>

          <div className="hero-actions">
            <button className="gold">Enter Terminal</button>
            <button>Open Markets</button>
            <button>AI Trade Review</button>
          </div>
        </section>

        <section className="terminal-grid">
          <div className="chart-panel">
            <div className="panel-head">
              <div>
                <h2>XAU/USD Live Chart</h2>
                <p>TradingView chart engine connected</p>
              </div>
              <span>MARKET ACTIVE</span>
            </div>

            <div className="chart-box">
              <TradingViewChart />
            </div>
          </div>

          <div className="intel-panel">
            <h2>AI Market Desk</h2>

            <div className="intel-card">
              <strong>Market Bias</strong>
              <p>
                Wait for liquidity sweep, reclaim, confirmation, and risk
                clarity. No chasing candles like they owe you money.
              </p>
            </div>

            <div className="intel-card">
              <strong>Risk Rule</strong>
              <p>
                Define stop loss before entry. Position size comes after risk,
                not before. The account must survive the ego.
              </p>
            </div>

            <div className="intel-card">
              <strong>Session Focus</strong>
              <p>
                Watch London handoff, NY open liquidity, VWAP reclaim, and
                volume confirmation.
              </p>
            </div>
          </div>
        </section>

        <section className="tools-grid">
          <div className="risk-panel">
            <div className="panel-head">
              <div>
                <h2>Risk Calculator</h2>
                <p>Know the damage before you enter the trade.</p>
              </div>
            </div>

            <div className="form-grid">
              <label>
                Account Size
                <input
                  value={accountSize}
                  onChange={(e) => setAccountSize(e.target.value)}
                />
              </label>

              <label>
                Risk %
                <input
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(e.target.value)}
                />
              </label>

              <label>
                Stop Loss Distance
                <input
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                />
              </label>
            </div>

            <div className="risk-results">
              <div>
                <small>MAX RISK</small>
                <strong>${risk.dollars}</strong>
              </div>

              <div>
                <small>POSITION GUIDE</small>
                <strong>{risk.positionGuide}</strong>
              </div>
            </div>
          </div>

          <div className="journal-panel">
            <div className="panel-head">
              <div>
                <h2>Trade Journal</h2>
                <p>Save the lesson before the market humbles you again.</p>
              </div>
            </div>

            <div className="form-grid">
              <label>
                Symbol
                <input
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </label>

              <label>
                Setup
                <input
                  value={setup}
                  onChange={(e) => setSetup(e.target.value)}
                />
              </label>

              <label>
                Emotion
                <input
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value)}
                />
              </label>
            </div>

            <label className="notes-label">
              Trade Notes
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Entry reason, mistake, confirmation, lesson..."
              />
            </label>

            <div className="journal-actions">
              <button className="gold" onClick={addJournalEntry}>
                Save Journal Entry
              </button>

              <button onClick={clearJournal}>Clear Journal</button>
            </div>

            <div className="journal-list">
              {journal.length === 0 ? (
                <p className="empty-journal">No journal entries yet.</p>
              ) : (
                journal.map((entry) => (
                  <div className="journal-entry" key={entry.id}>
                    <div>
                      <strong>{entry.symbol}</strong>
                      <span>{entry.date}</span>
                    </div>

                    <p>
                      <b>Setup:</b> {entry.setup}
                    </p>

                    <p>
                      <b>Emotion:</b> {entry.emotion}
                    </p>

                    <p>
                      <b>Risk:</b> ${entry.riskDollars}
                    </p>

                    <p>{entry.notes}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="market-grid">
          {markets.map((market) => (
            <div className="market-card" key={market.name}>
              <small>MARKET</small>
              <h3>{market.name}</h3>
              <p>{market.status}</p>
              <span>{market.move}</span>
            </div>
          ))}
        </section>

        <section className="module-grid">
          {modules.map((module) => (
            <div className="module-card" key={module}>
              <h3>{module}</h3>
              <p>Built into the Black Wall Street Terminal ecosystem.</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;