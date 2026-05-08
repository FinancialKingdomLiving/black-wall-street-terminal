import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "./lib/supabase";
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
  const [clock, setClock] = useState(new Date());
  const [user, setUser] = useState(null);

  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  const [accountSize, setAccountSize] = useState("50000");
  const [riskPercent, setRiskPercent] = useState("0.5");
  const [stopLoss, setStopLoss] = useState("35");

  const [symbol, setSymbol] = useState("XAU/USD");
  const [setup, setSetup] = useState("Liquidity sweep + VWAP reclaim");
  const [emotion, setEmotion] = useState("Patient");
  const [notes, setNotes] = useState("");
  const [journal, setJournal] = useState([]);

  const [watchSymbol, setWatchSymbol] = useState("XAU/USD");
  const [watchType, setWatchType] = useState("Gold / Forex");
  const [watchNotes, setWatchNotes] = useState("Watch London into NY liquidity.");
  const [watchlist, setWatchlist] = useState([]);

  const [asset, setAsset] = useState("BTC");
  const [assetType, setAssetType] = useState("Crypto");
  const [quantity, setQuantity] = useState("0.01");
  const [avgPrice, setAvgPrice] = useState("65000");
  const [assetNotes, setAssetNotes] = useState("Long-term wealth tracker.");
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      loadJournal();
      loadWatchlist();
      loadPortfolio();
    }
  }, [user]);

  const sessionName = useMemo(() => {
    const hour = clock.getHours();
    if (hour >= 20 || hour < 3) return "Asia Session";
    if (hour >= 3 && hour < 8) return "London Session";
    if (hour >= 8 && hour < 12) return "New York Open";
    if (hour >= 12 && hour < 16) return "New York Midday";
    return "After Hours";
  }, [clock]);

  const risk = useMemo(() => {
    const account = Number(accountSize) || 0;
    const percent = Number(riskPercent) || 0;
    const stop = Number(stopLoss) || 1;
    const dollars = account * (percent / 100);

    return {
      dollars: dollars.toFixed(2),
      positionGuide: (dollars / stop).toFixed(2),
    };
  }, [accountSize, riskPercent, stopLoss]);

  const portfolioValue = useMemo(() => {
    return portfolio
      .reduce((total, item) => {
        return total + Number(item.quantity || 0) * Number(item.avg_price || 0);
      }, 0)
      .toFixed(2);
  }, [portfolio]);

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email: authEmail,
      password: authPassword,
    });

    if (error) alert(error.message);
    else alert("Account created. Check email if confirmation is required.");
  };

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword,
    });

    if (error) alert(error.message);
    else alert("Signed in.");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setJournal([]);
    setWatchlist([]);
    setPortfolio([]);
  };

  const loadJournal = async () => {
    const { data, error } = await supabase
      .from("trade_journal")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) alert(error.message);
    else setJournal(data || []);
  };

  const saveTrade = async () => {
    if (!user) {
      alert("Sign in first.");
      return;
    }

    const { error } = await supabase.from("trade_journal").insert([
      {
        user_id: user.id,
        symbol,
        setup,
        emotion,
        notes,
        risk_dollars: Number(risk.dollars),
      },
    ]);

    if (error) alert(error.message);
    else {
      alert("Trade saved.");
      setNotes("");
      loadJournal();
    }
  };

  const loadWatchlist = async () => {
    const { data, error } = await supabase
      .from("watchlists")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) alert(error.message);
    else setWatchlist(data || []);
  };

  const saveWatchlist = async () => {
    if (!user) {
      alert("Sign in first.");
      return;
    }

    const { error } = await supabase.from("watchlists").insert([
      {
        user_id: user.id,
        symbol: watchSymbol,
        market_type: watchType,
        notes: watchNotes,
      },
    ]);

    if (error) alert(error.message);
    else {
      alert("Watchlist item saved.");
      setWatchNotes("");
      loadWatchlist();
    }
  };

  const loadPortfolio = async () => {
    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) alert(error.message);
    else setPortfolio(data || []);
  };

  const saveAsset = async () => {
    if (!user) {
      alert("Sign in first.");
      return;
    }

    const { error } = await supabase.from("portfolios").insert([
      {
        user_id: user.id,
        asset,
        asset_type: assetType,
        quantity: Number(quantity),
        avg_price: Number(avgPrice),
        notes: assetNotes,
      },
    ]);

    if (error) alert(error.message);
    else {
      alert("Portfolio asset saved.");
      setAssetNotes("");
      loadPortfolio();
    }
  };

  const tickerItems = ["XAU/USD", "BTC/USD", "DXY", "SPY", "QQQ", "VIX", "MNQ", "EUR/USD"];

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
            "Watchlist",
            "Portfolio",
            "AI Assistant",
            "Community",
          ].map((item) => (
            <a key={item}>{item}</a>
          ))}
        </nav>

        <div className="sidebar-card">
          <p>Terminal Status</p>
          <strong>ONLINE</strong>
        </div>

        <div className="sidebar-card">
          <p>Active Session</p>
          <strong>{sessionName}</strong>
        </div>
      </aside>

      <main className="main">
        <div className="ticker-bar">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <div className="ticker-item" key={`${item}-${index}`}>
                <strong>{item}</strong>
                <span>Market Watch</span>
                <em>Terminal Feed</em>
                <b>ACTIVE</b>
              </div>
            ))}
          </div>
        </div>

        <section className="top-command">
          <div>
            <p className="eyebrow">LIVE COMMAND DESK</p>
            <h2>{clock.toLocaleTimeString()}</h2>
            <p>{user ? `Signed in as ${user.email}` : "Not signed in yet"}</p>
          </div>
          <div className="session-pill">{sessionName}</div>
        </section>

        <section className="hero">
          <div>
            <p className="eyebrow">ECONOMIC COMMAND CENTER</p>
            <h1>The Black Wall Street Terminal</h1>
            <p className="hero-text">
              Trading, wealth building, AI finance, business intelligence, crypto,
              futures, options, education, and community economics.
            </p>
          </div>
        </section>

        <section className="metrics-grid">
          <div className="metric-card">
            <small>CLOUD JOURNAL</small>
            <strong>{journal.length}</strong>
          </div>

          <div className="metric-card">
            <small>WATCHLIST</small>
            <strong>{watchlist.length}</strong>
          </div>

          <div className="metric-card">
            <small>PORTFOLIO ASSETS</small>
            <strong>{portfolio.length}</strong>
          </div>

          <div className="metric-card">
            <small>PORTFOLIO VALUE</small>
            <strong>${portfolioValue}</strong>
          </div>
        </section>

        <section className="tools-grid">
          <div className="risk-panel">
            <div className="panel-head">
              <div>
                <h2>Supabase Login</h2>
                <p>Create an account so your data saves to the cloud.</p>
              </div>
            </div>

            <div className="form-grid">
              <label>
                Email
                <input value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                />
              </label>
            </div>

            <div className="journal-actions">
              <button className="gold" onClick={signUp}>Sign Up</button>
              <button onClick={signIn}>Sign In</button>
              <button onClick={signOut}>Sign Out</button>
            </div>
          </div>

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
                <input value={accountSize} onChange={(e) => setAccountSize(e.target.value)} />
              </label>

              <label>
                Risk %
                <input value={riskPercent} onChange={(e) => setRiskPercent(e.target.value)} />
              </label>

              <label>
                Stop Loss Distance
                <input value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} />
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
              <p>Wait for liquidity sweep, reclaim, confirmation, and risk clarity.</p>
            </div>
            <div className="intel-card">
              <strong>Risk Rule</strong>
              <p>Define stop loss before entry. The account must survive the ego.</p>
            </div>
            <div className="intel-card">
              <strong>Next Build</strong>
              <p>AI coach, trade grading, portfolio analytics, and community rooms.</p>
            </div>
          </div>
        </section>

        <section className="tools-grid">
          <div className="journal-panel">
            <div className="panel-head">
              <div>
                <h2>Cloud Watchlist</h2>
                <p>Save markets you are stalking.</p>
              </div>
            </div>

            <div className="form-grid">
              <label>
                Symbol
                <input value={watchSymbol} onChange={(e) => setWatchSymbol(e.target.value)} />
              </label>

              <label>
                Market Type
                <input value={watchType} onChange={(e) => setWatchType(e.target.value)} />
              </label>
            </div>

            <label className="notes-label">
              Notes
              <textarea value={watchNotes} onChange={(e) => setWatchNotes(e.target.value)} />
            </label>

            <div className="journal-actions">
              <button className="gold" onClick={saveWatchlist}>Save Watchlist Item</button>
              <button onClick={loadWatchlist}>Reload Watchlist</button>
            </div>

            <div className="journal-list">
              {watchlist.length === 0 ? (
                <p className="empty-journal">No watchlist items yet.</p>
              ) : (
                watchlist.map((item) => (
                  <div className="journal-entry" key={item.id}>
                    <div>
                      <strong>{item.symbol}</strong>
                      <span>{item.market_type}</span>
                    </div>
                    <p>{item.notes}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="journal-panel">
            <div className="panel-head">
              <div>
                <h2>Portfolio Tracker</h2>
                <p>Track assets, crypto, futures goals, and wealth positions.</p>
              </div>
            </div>

            <div className="form-grid">
              <label>
                Asset
                <input value={asset} onChange={(e) => setAsset(e.target.value)} />
              </label>

              <label>
                Asset Type
                <input value={assetType} onChange={(e) => setAssetType(e.target.value)} />
              </label>

              <label>
                Quantity
                <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </label>

              <label>
                Average Price
                <input value={avgPrice} onChange={(e) => setAvgPrice(e.target.value)} />
              </label>
            </div>

            <label className="notes-label">
              Notes
              <textarea value={assetNotes} onChange={(e) => setAssetNotes(e.target.value)} />
            </label>

            <div className="journal-actions">
              <button className="gold" onClick={saveAsset}>Save Asset</button>
              <button onClick={loadPortfolio}>Reload Portfolio</button>
            </div>

            <div className="journal-list">
              {portfolio.length === 0 ? (
                <p className="empty-journal">No portfolio assets yet.</p>
              ) : (
                portfolio.map((item) => (
                  <div className="journal-entry" key={item.id}>
                    <div>
                      <strong>{item.asset}</strong>
                      <span>{item.asset_type}</span>
                    </div>
                    <p><b>Quantity:</b> {item.quantity}</p>
                    <p><b>Avg Price:</b> ${item.avg_price}</p>
                    <p><b>Value:</b> ${(Number(item.quantity) * Number(item.avg_price)).toFixed(2)}</p>
                    <p>{item.notes}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="journal-panel">
          <div className="panel-head">
            <div>
              <h2>Cloud Trade Journal</h2>
              <p>Saved to Supabase after login.</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              Symbol
              <input value={symbol} onChange={(e) => setSymbol(e.target.value)} />
            </label>

            <label>
              Setup
              <input value={setup} onChange={(e) => setSetup(e.target.value)} />
            </label>

            <label>
              Emotion
              <input value={emotion} onChange={(e) => setEmotion(e.target.value)} />
            </label>
          </div>

          <label className="notes-label">
            Trade Notes
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>

          <div className="journal-actions">
            <button className="gold" onClick={saveTrade}>Save Trade To Supabase</button>
            <button onClick={loadJournal}>Reload Journal</button>
          </div>

          <div className="journal-list">
            {journal.length === 0 ? (
              <p className="empty-journal">No cloud journal entries yet.</p>
            ) : (
              journal.map((entry) => (
                <div className="journal-entry" key={entry.id}>
                  <div>
                    <strong>{entry.symbol}</strong>
                    <span>{new Date(entry.created_at).toLocaleString()}</span>
                  </div>
                  <p><b>Setup:</b> {entry.setup}</p>
                  <p><b>Emotion:</b> {entry.emotion}</p>
                  <p><b>Risk:</b> ${entry.risk_dollars}</p>
                  <p>{entry.notes}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;