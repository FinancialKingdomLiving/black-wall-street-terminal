import { useEffect, useRef } from "react";
import "./App.css";

function TradingViewChart() {
  const container = useRef();

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
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
      support_host: "https://www.tradingview.com"
    });

    container.current.appendChild(script);
  }, []);

  return <div className="tradingview-widget-container" ref={container} />;
}

function App() {
  const markets = [
    { name: "XAU/USD", status: "Gold focus", move: "+0.82%" },
    { name: "BTC/USD", status: "Crypto watch", move: "-0.31%" },
    { name: "MNQ", status: "Futures", move: "+0.18%" },
    { name: "SPY", status: "Options", move: "+0.24%" },
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
        {["Dashboard", "Markets", "Education", "AI Assistant", "Wealth", "Community", "Settings"].map(item => (
          <a key={item}>{item}</a>
        ))}
      </aside>

      <main className="main">
        <section className="hero">
          <div>
            <p className="eyebrow">ECONOMIC COMMAND CENTER</p>
            <h1>The Black Wall Street Terminal</h1>
            <p>
              A financial operating system for trading, wealth building, AI finance,
              business intelligence, crypto, futures, options, education, and community economics.
            </p>
          </div>
          <div className="hero-actions">
            <button className="gold">Enter Terminal</button>
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
              <strong>Bias:</strong>
              <p>Wait for liquidity sweep, reclaim, then confirmation. No chasing candles like they owe you money.</p>
            </div>
            <div className="intel-card">
              <strong>Risk Rule:</strong>
              <p>Define stop loss before entry. Position size comes after risk, not before.</p>
            </div>
            <div className="intel-card">
              <strong>Next Build:</strong>
              <p>Supabase login, trade journal, saved watchlists, and AI assistant memory.</p>
            </div>
          </div>
        </section>

        <section className="market-grid">
          {markets.map(market => (
            <div className="market-card" key={market.name}>
              <small>MARKET</small>
              <h3>{market.name}</h3>
              <p>{market.status}</p>
              <span>{market.move}</span>
            </div>
          ))}
        </section>

        <section className="module-grid">
          {modules.map(module => (
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