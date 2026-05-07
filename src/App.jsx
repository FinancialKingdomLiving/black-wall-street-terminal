import { useEffect, useRef } from "react";
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
    {
      title: "Trading Platform",
      text: "Stocks, options, futures, forex, crypto, gold, watchlists, charts, execution planning, and risk control.",
    },
    {
      title: "Education Hub",
      text: "Courses, lessons, quizzes, trade psychology, market structure, insurance, business, and financial literacy.",
    },
    {
      title: "Wealth Dashboard",
      text: "Track income, debt, assets, net worth, insurance, investments, business growth, and legacy planning.",
    },
    {
      title: "AI Finance Assistant",
      text: "Analyze trades, calculate risk, summarize markets, explain options, and coach stronger decisions.",
    },
    {
      title: "Crypto / Futures / Options",
      text: "Command center for BTC, ETH, MNQ, NQ, ES, GC, SPY, QQQ, options flow, and momentum.",
    },
    {
      title: "Business Intelligence",
      text: "Sales tracking, expenses, customer insights, product performance, forecasting, and business analytics.",
    },
    {
      title: "Community Network",
      text: "Trading rooms, accountability groups, leaderboards, mentorship, study circles, and wealth-building community.",
    },
    {
      title: "Economic Learning Ecosystem",
      text: "Ownership, credit, taxes, insurance, investing, Black Wall Street history, and community economics.",
    },
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">B.W.S.T</div>

        <nav className="nav-menu">
          {[
            "Dashboard",
            "Markets",
            "Education",
            "AI Assistant",
            "Wealth",
            "Community",
            "Settings",
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
                clarity. No chasing candles like they owe you child support.
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
              <strong>Next System Build</strong>
              <p>
                Supabase login, trade journal, saved watchlists, portfolios,
                and AI assistant memory.
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
            <div className="module-card" key={module.title}>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;