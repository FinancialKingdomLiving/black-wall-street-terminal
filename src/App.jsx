export default function App() {
  const modules = [
    { title: "Trading Platform", desc: "Stocks, options, futures, forex, crypto, gold, watchlists, charts, and execution planning." },
    { title: "Education Hub", desc: "Courses, lessons, quizzes, trading psychology, market structure, and financial literacy." },
    { title: "Wealth Dashboard", desc: "Track income, debt, net worth, assets, insurance, investments, and business growth." },
    { title: "AI Finance Assistant", desc: "Ask questions, break down trades, explain risk, summarize markets, and coach decisions." },
    { title: "Crypto / Futures / Options", desc: "Command center for BTC, ETH, MNQ, NQ, ES, GC, SPY, QQQ, and options flow." },
    { title: "Business Intelligence", desc: "Sales tracking, expenses, customer insights, product performance, and business forecasting." },
    { title: "Community Network", desc: "Trading rooms, accountability groups, leaderboards, mentorship, and financial study circles." },
    { title: "Economic Learning Ecosystem", desc: "Ownership, credit, taxes, insurance, investing, Black Wall Street history, and legacy building." },
  ];

  const markets = ["XAU/USD", "BTC/USD", "MNQ", "NQ", "SPY", "QQQ", "EUR/USD", "ETH/USD"];

  return (
    <div style={{ minHeight: "100vh", background: "#030712", color: "white", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex" }}>
        <aside style={{ width: "260px", minHeight: "100vh", background: "#050816", borderRight: "1px solid #1f2937", padding: "25px" }}>
          <h2 style={{ color: "#d4af37", fontSize: "22px", marginBottom: "30px" }}>B.W.S.T.</h2>

          {["Dashboard", "Markets", "Education", "AI Assistant", "Wealth", "Community", "Settings"].map((item) => (
            <div key={item} style={{ padding: "14px 10px", color: "#d1d5db", borderBottom: "1px solid #111827" }}>
              {item}
            </div>
          ))}
        </aside>

        <main style={{ flex: 1, padding: "35px" }}>
          <section style={{ background: "linear-gradient(135deg, #111827, #050816)", border: "1px solid #2a2a2a", borderRadius: "28px", padding: "40px", marginBottom: "30px" }}>
            <p style={{ color: "#d4af37", letterSpacing: "3px", fontSize: "13px", fontWeight: "bold" }}>
              ECONOMIC COMMAND CENTER
            </p>

            <h1 style={{ fontSize: "58px", color: "#d4af37", margin: "10px 0" }}>
              The Black Wall Street Terminal
            </h1>

            <p style={{ fontSize: "21px", color: "#cbd5e1", maxWidth: "1000px", lineHeight: "1.6" }}>
              A financial operating system for trading, wealth building, AI finance, business intelligence,
              crypto, futures, options, education, and community economics.
            </p>

            <div style={{ display: "flex", gap: "15px", marginTop: "30px", flexWrap: "wrap" }}>
              <button style={buttonGold}>Enter Terminal</button>
              <button style={buttonDark}>Open Market Lab</button>
              <button style={buttonDark}>AI Trade Review</button>
            </div>
          </section>

          <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "15px", marginBottom: "30px" }}>
            {markets.map((m) => (
              <div key={m} style={marketCard}>
                <p style={{ color: "#94a3b8", fontSize: "13px" }}>MARKET</p>
                <h3 style={{ color: "#facc15", fontSize: "24px" }}>{m}</h3>
                <p style={{ color: "#22c55e" }}>Live data ready</p>
              </div>
            ))}
          </section>

          <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "22px" }}>
            {modules.map((mod) => (
              <div key={mod.title} style={moduleCard}>
                <h2 style={{ color: "#facc15", fontSize: "22px" }}>{mod.title}</h2>
                <p style={{ color: "#cbd5e1", lineHeight: "1.6" }}>{mod.desc}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

const buttonGold = {
  background: "#d4af37",
  color: "#050816",
  border: "none",
  padding: "15px 24px",
  borderRadius: "14px",
  fontWeight: "bold",
  cursor: "pointer",
};

const buttonDark = {
  background: "#111827",
  color: "white",
  border: "1px solid #374151",
  padding: "15px 24px",
  borderRadius: "14px",
  fontWeight: "bold",
  cursor: "pointer",
};

const marketCard = {
  background: "#111827",
  border: "1px solid #293241",
  borderRadius: "20px",
  padding: "20px",
};

const moduleCard = {
  background: "#111827",
  border: "1px solid #293241",
  borderRadius: "22px",
  padding: "25px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
};