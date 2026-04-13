import { useState, useEffect, useRef } from "react";
import axios from "axios";

const COLORS = {
  primary: "#0a0e1a",
  secondary: "#111827",
  card: "#161d2e",
  accent: "#00d4ff",
  accentGreen: "#00ff88",
  accentOrange: "#ff6b00",
  accentRed: "#ff3366",
  accentPurple: "#7c3aed",
  text: "#e2e8f0",
  muted: "#64748b",
  border: "rgba(0,212,255,0.15)",
};

const style = (obj) => obj;

/* ─── GLOBAL STYLES ─── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Exo+2:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0a0e1a; color: #e2e8f0; font-family: 'Exo 2', sans-serif; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0a0e1a; }
    ::-webkit-scrollbar-thumb { background: #00d4ff44; border-radius: 3px; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    @keyframes flow { 0%{stroke-dashoffset:100} 100%{stroke-dashoffset:0} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes glow { 0%,100%{box-shadow:0 0 10px #00d4ff33} 50%{box-shadow:0 0 25px #00d4ff88,0 0 50px #00d4ff22} }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes countUp { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
    @keyframes slideIn { from{transform:translateX(-30px);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .fade-up { animation: fadeUp 0.6s ease forwards; }
    .glow-box { animation: glow 2s ease-in-out infinite; }
    .btn-primary {
      background: linear-gradient(135deg, #00d4ff22, #00d4ff11);
      border: 1px solid #00d4ff55;
      color: #00d4ff;
      padding: 10px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Exo 2', sans-serif;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
      letter-spacing: 0.5px;
    }
    .btn-primary:hover { background: linear-gradient(135deg, #00d4ff44, #00d4ff22); border-color: #00d4ff; transform: translateY(-1px); }
    .btn-danger {
      background: linear-gradient(135deg, #ff336622, #ff336611);
      border: 1px solid #ff336655;
      color: #ff3366;
      padding: 8px 18px;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Exo 2', sans-serif;
      font-size: 13px;
      transition: all 0.2s;
    }
    .btn-danger:hover { background: #ff336633; }
    .btn-success {
      background: linear-gradient(135deg, #00ff8822, #00ff8811);
      border: 1px solid #00ff8855;
      color: #00ff88;
      padding: 8px 18px;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Exo 2', sans-serif;
      font-size: 13px;
      transition: all 0.2s;
    }
    .btn-success:hover { background: #00ff8833; }
    .card {
      background: #161d2e;
      border: 1px solid rgba(0,212,255,0.12);
      border-radius: 16px;
      padding: 24px;
      transition: border-color 0.2s, transform 0.2s;
    }
    .card:hover { border-color: rgba(0,212,255,0.3); }
    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    input, select {
      background: #0d1422;
      border: 1px solid rgba(0,212,255,0.2);
      color: #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      font-family: 'Exo 2', sans-serif;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }
    input:focus, select:focus { border-color: #00d4ff; }
    select option { background: #161d2e; }
    table { width: 100%; border-collapse: collapse; }
    th { font-size: 11px; font-weight: 600; letter-spacing: 1px; color: #64748b; text-transform: uppercase; padding: 12px 16px; text-align: left; border-bottom: 1px solid rgba(0,212,255,0.1); }
    td { padding: 14px 16px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.04); }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: rgba(0,212,255,0.03); }
  `}</style>
);

/* ─── NAVBAR ─── */
function Navbar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "⬡" },
    { id: "signals", label: "Signals", icon: "⬡" },
    { id: "incidents", label: "Incidents", icon: "⬡" },
    { id: "analytics", label: "Analytics", icon: "⬡" },
    { id: "map", label: "Live Map", icon: "⬡" },
    { id: "violations", label: "Violations", icon: "⬡" },
  ];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "rgba(10,14,26,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,212,255,0.1)", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setPage("dashboard")}>
        <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #00d4ff, #0070ff)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🚦</div>
        <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 16, fontWeight: 700, color: "#00d4ff", letterSpacing: 1 }}>TRAFFICX</span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setPage(item.id)} style={{ background: page === item.id ? "rgba(0,212,255,0.12)" : "transparent", border: page === item.id ? "1px solid rgba(0,212,255,0.3)" : "1px solid transparent", color: page === item.id ? "#00d4ff" : "#94a3b8", padding: "7px 16px", borderRadius: 8, cursor: "pointer", fontFamily: "'Exo 2', sans-serif", fontSize: 13, fontWeight: 500, transition: "all 0.2s" }}>
            {item.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 8, height: 8, background: "#00ff88", borderRadius: "50%", animation: "pulse 2s infinite" }} />
        <span style={{ fontSize: 12, color: "#64748b" }}>LIVE</span>
        <div style={{ width: 34, height: 34, background: "linear-gradient(135deg, #7c3aed33, #7c3aed11)", border: "1px solid #7c3aed44", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer" }}>👤</div>
      </div>
    </nav>
  );
}

/* ─── STAT CARD ─── */
function StatCard({ label, value, sub, color = "#00d4ff", icon, trend }) {
  return (
    <div className="card" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: color + "08", borderRadius: "0 16px 0 80px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: 11, color: "#64748b", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{label}</p>
          <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 28, fontWeight: 700, color, lineHeight: 1 }}>{value}</p>
          {sub && <p style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>{sub}</p>}
          {trend !== undefined && (
            <p style={{ fontSize: 12, color: trend >= 0 ? "#00ff88" : "#ff3366", marginTop: 6 }}>
              {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}% vs yesterday
            </p>
          )}
        </div>
        <div style={{ fontSize: 28, opacity: 0.6 }}>{icon}</div>
      </div>
    </div>
  );
}

/* ─── MINI CHART ─── */
function Sparkline({ data, color = "#00d4ff", height = 50 }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 200;
    const y = height - ((v - min) / (max - min || 1)) * (height - 8) - 4;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 200 ${height}`} style={{ width: "100%", height }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,${height} ${pts} 200,${height}`} fill={color + "18"} stroke="none" />
    </svg>
  );
}

/* ─── TRAFFIC LIGHT ─── */
function TrafficLight({ state, compact }) {
  const lights = ["red", "yellow", "green"];
  const activeColor = { red: "#ff3366", yellow: "#ffcc00", green: "#00ff88" };
  return (
    <div style={{ display: "flex", flexDirection: compact ? "row" : "column", gap: compact ? 6 : 8, alignItems: "center" }}>
      {lights.map(l => (
        <div key={l} style={{
          width: compact ? 12 : 22, height: compact ? 12 : 22, borderRadius: "50%",
          background: state === l ? activeColor[l] : "#1a2236",
          boxShadow: state === l ? `0 0 12px ${activeColor[l]}` : "none",
          transition: "all 0.3s",
          border: `1px solid ${state === l ? activeColor[l] + "88" : "#2a3448"}`
        }} />
      ))}
    </div>
  );
}

/* ─── INTERSECTION VISUALIZER ─── */
function IntersectionViz({ signals }) {
  return (
    <svg viewBox="0 0 320 320" style={{ width: "100%", maxWidth: 320, display: "block", margin: "0 auto" }}>
      {/* Roads */}
      <rect x="0" y="130" width="320" height="60" fill="#1a2236" />
      <rect x="130" y="0" width="60" height="320" fill="#1a2236" />
      {/* Center intersection */}
      <rect x="130" y="130" width="60" height="60" fill="#1e2a3e" />
      {/* Road markings */}
      {[20, 70, 180, 260].map((x, i) => <rect key={i} x={x} y="158" width="30" height="4" fill="#ffffff22" rx="2" />)}
      {[20, 70, 180, 260].map((y, i) => <rect key={i + 4} x="158" y={y} width="4" height="30" fill="#ffffff22" rx="2" />)}
      {/* Traffic lights at each corner */}
      {signals.slice(0, 4).map((sig, i) => {
        const pos = [{x:105,y:105},{x:215,y:105},{x:105,y:215},{x:215,y:215}];
        const colors = { red: "#ff3366", yellow: "#ffcc00", green: "#00ff88" };
        return (
          <g key={i}>
            <rect x={pos[i].x - 8} y={pos[i].y - 18} width="16" height="36" rx="4" fill="#0d1422" stroke="#2a3448" strokeWidth="1" />
            {["red","yellow","green"].map((c,j) => (
              <circle key={c} cx={pos[i].x} cy={pos[i].y - 12 + j * 12} r="4"
                fill={sig.state === c ? colors[c] : "#1a2236"}
                style={{ filter: sig.state === c ? `drop-shadow(0 0 4px ${colors[c]})` : "none" }}
              />
            ))}
            <text x={pos[i].x} y={pos[i].y + 26} textAnchor="middle" fontSize="8" fill="#64748b">{sig.id}</text>
          </g>
        );
      })}
      {/* Vehicle flow indicators */}
      <text x="160" y="155" textAnchor="middle" fontSize="10" fill="#00d4ff88">⬆</text>
      <text x="160" y="175" textAnchor="middle" fontSize="10" fill="#00d4ff88">⬇</text>
      <text x="148" y="164" textAnchor="middle" fontSize="10" fill="#00d4ff88">⬅</text>
      <text x="174" y="164" textAnchor="middle" fontSize="10" fill="#00d4ff88">➡</text>
    </svg>
  );
}

/* ─── DASHBOARD PAGE ─── */
function Dashboard({ signals, incidents, setPage }) {
  const [vehicles, setVehicles] = useState(14280);
  const [congestion, setCongestion] = useState(42);
  const [trafficData, setTrafficData] = useState([45, 52, 38, 61, 55, 70, 65, 80, 74, 68, 73, 78]);
  const [speedData, setSpeedData] = useState([60, 55, 48, 62, 58, 40, 45, 52, 58, 61, 63, 60]);

  useEffect(() => {
    axios.get("http://localhost:8000/analytics/metrics")
      .then(res => {
         setVehicles(res.data.vehicles);
         setCongestion(res.data.congestion);
         setTrafficData(res.data.trafficData);
         setSpeedData(res.data.speedData);
      })
      .catch(console.error);

    const t = setInterval(() => {
      setVehicles(v => v + Math.floor(Math.random() * 6 - 2));
      setCongestion(c => Math.max(10, Math.min(95, c + Math.floor(Math.random() * 10 - 5))));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const activeIncidents = incidents.filter(i => i.status === "Active").length;
  const greenSignals = signals.filter(s => s.state === "green").length;

  return (
    <div style={{ padding: "88px 24px 40px" }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 12, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Overview</p>
        <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 28, fontWeight: 700, color: "#e2e8f0" }}>Traffic Control Center</h1>
        <p style={{ color: "#64748b", marginTop: 6, fontSize: 14 }}>Real-time city traffic monitoring & management</p>
      </div>

      {/* Stat Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }} className="fade-up">
        <StatCard label="Active Vehicles" value={vehicles.toLocaleString()} sub="across all zones" color="#00d4ff" icon="🚗" trend={2.4} />
        <StatCard label="Congestion Index" value={`${congestion}%`} sub={congestion > 60 ? "High Traffic" : congestion > 35 ? "Moderate" : "Light"} color={congestion > 60 ? "#ff3366" : congestion > 35 ? "#ffcc00" : "#00ff88"} icon="📈" trend={-1.2} />
        <StatCard label="Active Incidents" value={activeIncidents} sub={`${incidents.length} total today`} color="#ff6b00" icon="⚠️" trend={5.1} />
        <StatCard label="Signals Online" value={`${greenSignals}/${signals.length}`} sub="intersections managed" color="#00ff88" icon="🚦" />
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 12, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>Hourly Traffic Volume</p>
              <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 20, color: "#00d4ff", marginTop: 4 }}>78K <span style={{ fontSize: 12, fontFamily: "inherit", color: "#64748b" }}>vehicles/hr</span></p>
            </div>
            <span className="badge" style={{ background: "#00d4ff11", color: "#00d4ff", border: "1px solid #00d4ff33" }}>LIVE</span>
          </div>
          <Sparkline data={trafficData} color="#00d4ff" />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            {["8am","9am","10am","11am","12pm"].map(t => <span key={t} style={{ fontSize: 10, color: "#64748b" }}>{t}</span>)}
          </div>
        </div>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 12, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>Avg. Vehicle Speed</p>
              <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 20, color: "#00ff88", marginTop: 4 }}>60 <span style={{ fontSize: 12, fontFamily: "inherit", color: "#64748b" }}>km/hr</span></p>
            </div>
            <span className="badge" style={{ background: "#00ff8811", color: "#00ff88", border: "1px solid #00ff8833" }}>TRACKING</span>
          </div>
          <Sparkline data={speedData} color="#00ff88" />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            {["8am","9am","10am","11am","12pm"].map(t => <span key={t} style={{ fontSize: 10, color: "#64748b" }}>{t}</span>)}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 16 }}>
        {/* Recent incidents */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>Recent Incidents</h3>
            <button className="btn-primary" onClick={() => setPage("incidents")} style={{ fontSize: 12, padding: "6px 14px" }}>View All</button>
          </div>
          <table>
            <thead><tr><th>Location</th><th>Type</th><th>Status</th><th>Time</th></tr></thead>
            <tbody>
              {incidents.slice(0, 4).map(inc => (
                <tr key={inc.id}>
                  <td style={{ fontSize: 13 }}>{inc.location}</td>
                  <td><span className="badge" style={{ background: inc.type === "Accident" ? "#ff336618" : "#ff6b0018", color: inc.type === "Accident" ? "#ff3366" : "#ff6b00", border: `1px solid ${inc.type === "Accident" ? "#ff336633" : "#ff6b0033"}` }}>{inc.type}</span></td>
                  <td><span className="badge" style={{ background: inc.status === "Active" ? "#ff336618" : "#00ff8818", color: inc.status === "Active" ? "#ff3366" : "#00ff88", border: `1px solid ${inc.status === "Active" ? "#ff336633" : "#00ff8833"}` }}>{inc.status}</span></td>
                  <td style={{ color: "#64748b", fontSize: 12 }}>{inc.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Intersection status */}
        <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 16, alignSelf: "flex-start" }}>Main Intersection</h3>
          <IntersectionViz signals={signals} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%", marginTop: 16 }}>
            {signals.slice(0, 4).map(sig => (
              <div key={sig.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#0d1422", borderRadius: 8, border: "1px solid rgba(0,212,255,0.08)" }}>
                <TrafficLight state={sig.state} compact />
                <div>
                  <p style={{ fontSize: 11, color: "#e2e8f0" }}>{sig.id}</p>
                  <p style={{ fontSize: 10, color: "#64748b" }}>{sig.timer}s</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SIGNALS PAGE ─── */
function SignalsPage({ signals, setSignals }) {
  const [selected, setSelected] = useState(null);
  const [autoMode, setAutoMode] = useState(true);

  useEffect(() => {
    if (!autoMode) return;
    const t = setInterval(() => {
      setSignals(prev => prev.map(sig => {
        const cycle = ["green", "yellow", "red"];
        const idx = cycle.indexOf(sig.state);
        const timer = sig.timer - 1;
        if (timer <= 0) {
          return { ...sig, state: cycle[(idx + 1) % 3], timer: [30, 5, 25][(idx + 1) % 3] };
        }
        return { ...sig, timer };
      }));
    }, 1000);
    return () => clearInterval(t);
  }, [autoMode, setSignals]);

  const setState = (id, state) => {
    axios.put(`http://localhost:8080/api/signals/${id}/state`, { state })
      .then(res => {
        if(res.data) setSignals(prev => prev.map(s => s.id === id ? res.data : s));
      })
      .catch(console.error);
  };

  const zones = [...new Set(signals.map(s => s.zone))];

  return (
    <div style={{ padding: "88px 24px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <p style={{ fontSize: 12, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Management</p>
          <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 28, fontWeight: 700 }}>Signal Control</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 13, color: "#64748b" }}>Auto Cycle</span>
          <div onClick={() => setAutoMode(a => !a)} style={{ width: 44, height: 24, background: autoMode ? "#00d4ff22" : "#1a2236", border: `1px solid ${autoMode ? "#00d4ff" : "#2a3448"}`, borderRadius: 12, cursor: "pointer", position: "relative", transition: "all 0.3s" }}>
            <div style={{ position: "absolute", top: 2, left: autoMode ? 22 : 2, width: 18, height: 18, background: autoMode ? "#00d4ff" : "#64748b", borderRadius: "50%", transition: "all 0.3s" }} />
          </div>
        </div>
      </div>

      {/* Zone stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
        {["North","South","East","West"].map(zone => {
          const zoneSigs = signals.filter(s => s.zone === zone);
          const green = zoneSigs.filter(s => s.state === "green").length;
          return (
            <div key={zone} className="card" style={{ textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{zone} Zone</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                <TrafficLight state={zoneSigs[0]?.state || "red"} compact />
              </div>
              <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 18, color: green > 0 ? "#00ff88" : "#ff3366" }}>{green}/{zoneSigs.length}</p>
              <p style={{ fontSize: 11, color: "#64748b" }}>green signals</p>
            </div>
          );
        })}
      </div>

      {/* Signal cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {signals.map(sig => {
          const stateColor = { red: "#ff3366", yellow: "#ffcc00", green: "#00ff88" };
          const isSelected = selected === sig.id;
          return (
            <div key={sig.id} className="card" style={{ cursor: "pointer", border: isSelected ? `1px solid ${stateColor[sig.state]}55` : undefined }} onClick={() => setSelected(isSelected ? null : sig.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 14, color: "#e2e8f0" }}>{sig.id}</p>
                  <p style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{sig.location}</p>
                </div>
                <span className="badge" style={{ background: "#ffffff08", color: "#64748b", border: "1px solid #2a3448" }}>{sig.zone}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", margin: "16px 0" }}>
                <div style={{ background: "#0d1422", padding: "12px 20px", borderRadius: 12, border: "1px solid #2a3448", display: "flex", gap: 12 }}>
                  <TrafficLight state={sig.state} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isSelected ? 12 : 0 }}>
                <span style={{ fontSize: 12, color: "#64748b" }}>Timer</span>
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 16, color: stateColor[sig.state] }}>{sig.timer}s</span>
              </div>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: isSelected ? 12 : 0 }}>Vol: {sig.volume} veh/hr</div>
              {isSelected && !autoMode && (
                <div style={{ borderTop: "1px solid rgba(0,212,255,0.1)", paddingTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["red","yellow","green"].map(s => (
                    <button key={s} onClick={(e) => { e.stopPropagation(); setState(sig.id, s); }}
                      style={{ flex: 1, padding: "6px 0", borderRadius: 6, border: `1px solid ${stateColor[s]}44`, background: sig.state === s ? stateColor[s] + "22" : "transparent", color: stateColor[s], cursor: "pointer", fontSize: 11, fontFamily: "'Exo 2', sans-serif", fontWeight: 600 }}>
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── INCIDENTS PAGE ─── */
function IncidentsPage({ incidents, setIncidents }) {
  const [form, setForm] = useState({ location: "", type: "Accident", severity: "Medium", description: "" });
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const addIncident = () => {
    if (!form.location || !form.description) return;
    axios.post("http://localhost:8080/api/incidents", form)
      .then(res => {
        setIncidents(prev => [res.data, ...prev]);
        setForm({ location: "", type: "Accident", severity: "Medium", description: "" });
        setShowForm(false);
      })
      .catch(console.error);
  };

  const resolve = (id) => {
    axios.put(`http://localhost:8080/api/incidents/${id}/resolve`)
      .then(res => {
        setIncidents(prev => prev.map(i => i.id === id ? res.data : i));
      })
      .catch(console.error);
  };

  const filtered = filter === "All" ? incidents : incidents.filter(i => i.status === filter);
  const sevColor = { Low: "#00ff88", Medium: "#ffcc00", High: "#ff6b00", Critical: "#ff3366" };

  return (
    <div style={{ padding: "88px 24px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <p style={{ fontSize: 12, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Emergency</p>
          <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 28, fontWeight: 700 }}>Incident Management</h1>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(s => !s)}>+ Report Incident</button>
      </div>

      {/* Summary bars */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
        {["All","Active","Under Investigation","Resolved"].map(s => (
          <div key={s} className="card" style={{ cursor: "pointer", border: filter === s ? "1px solid #00d4ff55" : undefined, textAlign: "center" }} onClick={() => setFilter(s)}>
            <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 24, color: s === "Active" ? "#ff3366" : s === "Resolved" ? "#00ff88" : "#00d4ff" }}>
              {s === "All" ? incidents.length : incidents.filter(i => i.status === s).length}
            </p>
            <p style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{s}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: 24, border: "1px solid rgba(0,212,255,0.3)", animation: "fadeUp 0.3s ease" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 20, color: "#00d4ff" }}>Report New Incident</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: "#64748b", display: "block", marginBottom: 6 }}>LOCATION</label>
              <input style={{ width: "100%" }} placeholder="e.g. MG Road & Brigade Rd" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#64748b", display: "block", marginBottom: 6 }}>TYPE</label>
              <select style={{ width: "100%" }} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                {["Accident","Breakdown","Road Block","Flooding","Construction","VIP Movement"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#64748b", display: "block", marginBottom: 6 }}>SEVERITY</label>
              <select style={{ width: "100%" }} value={form.severity} onChange={e => setForm(f => ({ ...f, severity: e.target.value }))}>
                {["Low","Medium","High","Critical"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, color: "#64748b", display: "block", marginBottom: 6 }}>DESCRIPTION</label>
            <input style={{ width: "100%" }} placeholder="Describe the incident..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-primary" onClick={addIncident}>Submit Report</button>
            <button className="btn-danger" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(0,212,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600 }}>Incident Log</h3>
          <span style={{ fontSize: 12, color: "#64748b" }}>{filtered.length} records</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead><tr><th>ID</th><th>Location</th><th>Type</th><th>Severity</th><th>Status</th><th>Time</th><th>Description</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(inc => (
                <tr key={inc.id}>
                  <td style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 12, color: "#64748b" }}>{inc.id}</td>
                  <td style={{ fontSize: 13, fontWeight: 500 }}>{inc.location}</td>
                  <td><span className="badge" style={{ background: "#ff6b0018", color: "#ff6b00", border: "1px solid #ff6b0033" }}>{inc.type}</span></td>
                  <td><span className="badge" style={{ background: sevColor[inc.severity] + "18", color: sevColor[inc.severity], border: `1px solid ${sevColor[inc.severity]}33` }}>{inc.severity}</span></td>
                  <td><span className="badge" style={{ background: inc.status === "Active" ? "#ff336618" : inc.status === "Resolved" ? "#00ff8818" : "#ffcc0018", color: inc.status === "Active" ? "#ff3366" : inc.status === "Resolved" ? "#00ff88" : "#ffcc00", border: `1px solid ${inc.status === "Active" ? "#ff336633" : inc.status === "Resolved" ? "#00ff8833" : "#ffcc0033"}` }}>{inc.status}</span></td>
                  <td style={{ color: "#64748b", fontSize: 12 }}>{inc.time}</td>
                  <td style={{ fontSize: 12, color: "#64748b", maxWidth: 160 }}>{inc.description}</td>
                  <td>
                    {inc.status !== "Resolved" && (
                      <button className="btn-success" onClick={() => resolve(inc.id)} style={{ fontSize: 11, padding: "5px 12px" }}>Resolve</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── ANALYTICS PAGE ─── */
function AnalyticsPage() {
  const [hours, setHours] = useState(["6AM","7AM","8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM"]);
  const [vol, setVol] = useState([1200,2800,4200,5800,4100,3800,4500,4800,4200,4600,5900,6200,5400,4800,3200,2100]);
  const maxVol = Math.max(...(vol.length ? vol : [1]));
  const [zones, setZones] = useState([
    { name: "North Zone", congestion: 68, speed: 42, accidents: 3, color: "#00d4ff" },
    { name: "South Zone", congestion: 45, speed: 58, accidents: 1, color: "#00ff88" },
    { name: "East Zone", congestion: 82, speed: 28, accidents: 5, color: "#ff3366" },
    { name: "West Zone", congestion: 31, speed: 65, accidents: 0, color: "#ffcc00" },
  ]);
  const [weekData, setWeekData] = useState([
    { day: "Mon", peak: 82, off: 34 },
    { day: "Tue", peak: 76, off: 28 },
    { day: "Wed", peak: 88, off: 31 },
    { day: "Thu", peak: 71, off: 25 },
    { day: "Fri", peak: 95, off: 38 },
    { day: "Sat", peak: 62, off: 22 },
    { day: "Sun", peak: 45, off: 18 },
  ]);
  const [routePerformance, setRoutePerformance] = useState([
    { route: "NH-44 Corridor", speed: 65, cong: 28, time: "22 min", inc: 0, perf: 94 },
    { route: "Ring Road East", speed: 42, cong: 61, time: "38 min", inc: 2, perf: 67 },
    { route: "MG Road", speed: 28, cong: 85, time: "55 min", inc: 4, perf: 32 },
    { route: "Outer Ring Road", speed: 72, cong: 19, time: "18 min", inc: 0, perf: 98 },
    { route: "Brigade Road", speed: 18, cong: 92, time: "70 min", inc: 6, perf: 14 },
  ]);

  useEffect(() => {
    axios.get("http://localhost:8000/analytics/hourly-traffic").then(res => {
      setHours(res.data.hours); setVol(res.data.volumes);
    }).catch(console.error);
    axios.get("http://localhost:8000/analytics/zone-performance").then(res => setZones(res.data)).catch(console.error);
    axios.get("http://localhost:8000/analytics/route-performance").then(res => setRoutePerformance(res.data)).catch(console.error);
    axios.get("http://localhost:8000/analytics/weekly-congestion").then(res => setWeekData(res.data)).catch(console.error);
  }, []);

  return (
    <div style={{ padding: "88px 24px 40px" }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 12, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Insights</p>
        <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 28, fontWeight: 700 }}>Traffic Analytics</h1>
      </div>

      {/* Zone performance */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {zones.map(z => (
          <div key={z.name} className="card">
            <p style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>{z.name}</p>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "#64748b" }}>Congestion</span>
                <span style={{ fontSize: 11, color: z.color }}>{z.congestion}%</span>
              </div>
              <div style={{ height: 6, background: "#1a2236", borderRadius: 3 }}>
                <div style={{ height: "100%", width: `${z.congestion}%`, background: z.color, borderRadius: 3, transition: "width 1s ease" }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 20, fontFamily: "'Orbitron', sans-serif", color: z.color }}>{z.speed}</p>
                <p style={{ fontSize: 10, color: "#64748b" }}>km/hr avg</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 20, fontFamily: "'Orbitron', sans-serif", color: z.accidents > 3 ? "#ff3366" : z.accidents > 0 ? "#ff6b00" : "#00ff88" }}>{z.accidents}</p>
                <p style={{ fontSize: 10, color: "#64748b" }}>incidents</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 28 }}>
        {/* Hourly bar chart */}
        <div className="card">
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>Hourly Traffic Volume</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 160 }}>
            {vol.map((v, i) => {
              const h = (v / maxVol) * 140;
              const isPeak = v > 5000;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", height: h, background: isPeak ? "linear-gradient(to top, #ff6b00, #ff6b0088)" : "linear-gradient(to top, #00d4ff, #00d4ff44)", borderRadius: "3px 3px 0 0", transition: "height 0.5s ease", minWidth: 8 }} title={`${v} vehicles`} />
                  <span style={{ fontSize: 8, color: "#64748b", transform: "rotate(-45deg)", transformOrigin: "center", whiteSpace: "nowrap" }}>{hours[i]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly comparison */}
        <div className="card">
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>Weekly Congestion</h3>
          {weekData.map(d => (
            <div key={d.day} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#e2e8f0", width: 32 }}>{d.day}</span>
                <span style={{ fontSize: 11, color: "#64748b" }}>Peak: {d.peak}%</span>
              </div>
              <div style={{ height: 8, background: "#1a2236", borderRadius: 4, position: "relative" }}>
                <div style={{ height: "100%", width: `${d.peak}%`, background: `linear-gradient(to right, #00d4ff44, ${d.peak > 85 ? "#ff3366" : d.peak > 70 ? "#ff6b00" : "#00d4ff"})`, borderRadius: 4 }} />
                <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${d.off}%`, background: "#00ff8833", borderRadius: 4 }} />
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 10, height: 10, background: "#00d4ff", borderRadius: 2 }} /><span style={{ fontSize: 11, color: "#64748b" }}>Peak</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 10, height: 10, background: "#00ff8833", borderRadius: 2 }} /><span style={{ fontSize: 11, color: "#64748b" }}>Off-peak</span></div>
          </div>
        </div>
      </div>

      {/* Route performance */}
      <div className="card">
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>Route Performance Index</h3>
        <table>
          <thead><tr><th>Route</th><th>Avg Speed</th><th>Congestion</th><th>Travel Time</th><th>Incidents</th><th>Performance</th></tr></thead>
          <tbody>
            {routePerformance.map(r => (
              <tr key={r.route}>
                <td style={{ fontWeight: 500 }}>{r.route}</td>
                <td style={{ color: r.speed > 50 ? "#00ff88" : r.speed > 30 ? "#ffcc00" : "#ff3366", fontFamily: "'Orbitron', sans-serif", fontSize: 13 }}>{r.speed} km/hr</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 60, height: 6, background: "#1a2236", borderRadius: 3 }}>
                      <div style={{ height: "100%", width: `${r.cong}%`, background: r.cong > 70 ? "#ff3366" : r.cong > 50 ? "#ff6b00" : "#00ff88", borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{r.cong}%</span>
                  </div>
                </td>
                <td style={{ color: "#64748b", fontSize: 13 }}>{r.time}</td>
                <td><span style={{ color: r.inc > 3 ? "#ff3366" : r.inc > 0 ? "#ff6b00" : "#00ff88", fontFamily: "'Orbitron', sans-serif", fontSize: 13 }}>{r.inc}</span></td>
                <td>
                  <span className="badge" style={{ background: r.perf > 80 ? "#00ff8818" : r.perf > 50 ? "#ffcc0018" : "#ff336618", color: r.perf > 80 ? "#00ff88" : r.perf > 50 ? "#ffcc00" : "#ff3366", border: `1px solid ${r.perf > 80 ? "#00ff8833" : r.perf > 50 ? "#ffcc0033" : "#ff336633"}` }}>
                    {r.perf}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── LIVE MAP PAGE ─── */
function LiveMapPage({ signals, incidents }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const mapNodes = [
    { id: "N1", x: 160, y: 80, type: "signal", label: "North Gate", state: signals[0]?.state || "green" },
    { id: "N2", x: 340, y: 120, type: "signal", label: "Tech Park", state: signals[1]?.state || "red" },
    { id: "N3", x: 500, y: 80, type: "signal", label: "Airport Rd", state: signals[2]?.state || "green" },
    { id: "N4", x: 80, y: 200, type: "signal", label: "West End", state: signals[3]?.state || "yellow" },
    { id: "N5", x: 280, y: 220, type: "junction", label: "City Center", state: "busy" },
    { id: "N6", x: 460, y: 200, type: "signal", label: "East Blvd", state: signals[4]?.state || "green" },
    { id: "N7", x: 620, y: 160, type: "signal", label: "Highway 44", state: signals[5]?.state || "green" },
    { id: "N8", x: 160, y: 330, type: "signal", label: "South Mkt", state: signals[6]?.state || "red" },
    { id: "N9", x: 380, y: 340, type: "incident", label: "Accident!", state: "red" },
    { id: "N10", x: 560, y: 300, type: "signal", label: "Ring Rd", state: signals[7]?.state || "green" },
    { id: "N11", x: 240, y: 400, type: "signal", label: "Stadium Rd", state: signals[0]?.state || "yellow" },
    { id: "N12", x: 480, y: 420, type: "signal", label: "South End", state: signals[1]?.state || "green" },
  ];
  const edges = [
    ["N1","N2"],["N2","N3"],["N3","N7"],["N4","N5"],["N5","N6"],["N6","N7"],["N4","N8"],
    ["N1","N5"],["N2","N5"],["N5","N9"],["N9","N10"],["N8","N11"],["N11","N9"],["N9","N12"],["N10","N12"],["N6","N10"],
  ];
  const nodeColor = (n) => {
    if (n.type === "incident") return "#ff3366";
    if (n.type === "junction") return "#7c3aed";
    return { green: "#00ff88", yellow: "#ffcc00", red: "#ff3366" }[n.state] || "#00d4ff";
  };

  return (
    <div style={{ padding: "88px 24px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 12, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Visualization</p>
          <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 28, fontWeight: 700 }}>Live Traffic Map</h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["All","Signals","Incidents","Junctions"].map(f => (
            <button key={f} onClick={() => setSelectedFilter(f)} style={{ padding: "7px 16px", borderRadius: 8, border: `1px solid ${selectedFilter === f ? "#00d4ff55" : "rgba(0,212,255,0.15)"}`, background: selectedFilter === f ? "rgba(0,212,255,0.1)" : "transparent", color: selectedFilter === f ? "#00d4ff" : "#64748b", cursor: "pointer", fontSize: 12, fontFamily: "'Exo 2', sans-serif" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }}>
        {/* Map SVG */}
        <div className="card" style={{ padding: 16, position: "relative" }}>
          <svg viewBox="0 0 720 500" style={{ width: "100%", height: "auto" }}>
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,212,255,0.05)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="720" height="500" fill="url(#grid)" />

            {/* Zone backgrounds */}
            <rect x="20" y="20" width="320" height="220" rx="12" fill="rgba(0,212,255,0.02)" stroke="rgba(0,212,255,0.06)" strokeWidth="1" />
            <rect x="360" y="20" width="340" height="220" rx="12" fill="rgba(0,255,136,0.02)" stroke="rgba(0,255,136,0.06)" strokeWidth="1" />
            <rect x="20" y="260" width="340" height="220" rx="12" fill="rgba(255,107,0,0.02)" stroke="rgba(255,107,0,0.06)" strokeWidth="1" />
            <rect x="380" y="260" width="320" height="220" rx="12" fill="rgba(124,58,237,0.02)" stroke="rgba(124,58,237,0.06)" strokeWidth="1" />

            <text x="30" y="42" fontSize="11" fill="rgba(0,212,255,0.3)" fontFamily="Orbitron">NORTH ZONE</text>
            <text x="370" y="42" fontSize="11" fill="rgba(0,255,136,0.3)" fontFamily="Orbitron">EAST ZONE</text>
            <text x="30" y="278" fontSize="11" fill="rgba(255,107,0,0.3)" fontFamily="Orbitron">WEST ZONE</text>
            <text x="390" y="278" fontSize="11" fill="rgba(124,58,237,0.3)" fontFamily="Orbitron">SOUTH ZONE</text>

            {/* Edges */}
            {edges.map(([a, b], i) => {
              const na = mapNodes.find(n => n.id === a), nb = mapNodes.find(n => n.id === b);
              if (!na || !nb) return null;
              return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="rgba(0,212,255,0.2)" strokeWidth="1.5" strokeDasharray="4,4" />;
            })}

            {/* Nodes */}
            {mapNodes.map(n => {
              const c = nodeColor(n);
              const isHovered = hoveredNode === n.id;
              return (
                <g key={n.id} style={{ cursor: "pointer" }} onMouseEnter={() => setHoveredNode(n.id)} onMouseLeave={() => setHoveredNode(null)}>
                  <circle cx={n.x} cy={n.y} r={isHovered ? 14 : 10} fill={c + "22"} stroke={c} strokeWidth={isHovered ? 2 : 1.5} style={{ filter: `drop-shadow(0 0 6px ${c})`, transition: "all 0.2s" }} />
                  <circle cx={n.x} cy={n.y} r={isHovered ? 6 : 4} fill={c} style={{ transition: "all 0.2s" }} />
                  {n.type === "incident" && (
                    <text x={n.x} y={n.y - 3} textAnchor="middle" fontSize="10" fill="#ff3366" fontWeight="700" style={{ animation: "blink 1s infinite" }}>!</text>
                  )}
                  <text x={n.x} y={n.y + 24} textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="Exo 2">{n.label}</text>
                </g>
              );
            })}
          </svg>

          {/* Hover tooltip */}
          {hoveredNode && (() => {
            const n = mapNodes.find(m => m.id === hoveredNode);
            return n ? (
              <div style={{ position: "absolute", top: 20, left: 20, background: "#0d1422", border: "1px solid rgba(0,212,255,0.3)", borderRadius: 8, padding: "10px 14px" }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{n.label}</p>
                <p style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Type: {n.type}</p>
                <p style={{ fontSize: 11, color: nodeColor(n), marginTop: 2 }}>Status: {n.state.toUpperCase()}</p>
              </div>
            ) : null;
          })()}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="card">
            <h3 style={{ fontSize: 12, color: "#64748b", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>Legend</h3>
            {[
              { color: "#00ff88", label: "Green Signal" },
              { color: "#ffcc00", label: "Yellow Signal" },
              { color: "#ff3366", label: "Red / Incident" },
              { color: "#7c3aed", label: "Major Junction" },
            ].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.color, boxShadow: `0 0 6px ${l.color}` }} />
                <span style={{ fontSize: 12, color: "#94a3b8" }}>{l.label}</span>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 style={{ fontSize: 12, color: "#64748b", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>Live Status</h3>
            {[
              { label: "Total Nodes", value: mapNodes.length, color: "#00d4ff" },
              { label: "Active Signals", value: mapNodes.filter(n => n.type === "signal").length, color: "#00ff88" },
              { label: "Incidents", value: mapNodes.filter(n => n.type === "incident").length, color: "#ff3366" },
              { label: "Congested", value: mapNodes.filter(n => n.state === "red").length, color: "#ff6b00" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>{s.label}</span>
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 14, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 style={{ fontSize: 12, color: "#64748b", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>Recent Alerts</h3>
            {incidents.slice(0, 3).map(inc => (
              <div key={inc.id} style={{ marginBottom: 12, padding: "8px 12px", background: "#0d1422", borderRadius: 8, borderLeft: "2px solid #ff3366" }}>
                <p style={{ fontSize: 12, color: "#e2e8f0" }}>{inc.location}</p>
                <p style={{ fontSize: 10, color: "#64748b", marginTop: 3 }}>{inc.type} • {inc.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── VIOLATIONS PAGE ─── */
function ViolationsPage() {
  const [violations, setViolations] = useState([
    { id: "V-001", plate: "KA03 MX 4521", type: "Signal Jump", location: "MG Road Junction", speed: 0, fine: 1000, status: "Pending", time: "09:14", camera: "CAM-04" },
    { id: "V-002", plate: "MH12 AB 7890", type: "Overspeeding", location: "NH-44 Km 24", speed: 98, fine: 2000, status: "Paid", time: "08:52", camera: "CAM-11" },
    { id: "V-003", plate: "DL01 CA 3344", type: "Wrong Side", location: "Brigade Rd", speed: 0, fine: 1500, status: "Pending", time: "10:01", camera: "CAM-02" },
    { id: "V-004", plate: "TN09 XZ 6677", type: "Overspeeding", location: "Outer Ring Rd", speed: 112, fine: 3000, status: "Disputed", time: "07:30", camera: "CAM-07" },
    { id: "V-005", plate: "KL07 PQ 2211", type: "No Helmet", location: "North Gate", speed: 0, fine: 500, status: "Paid", time: "11:15", camera: "CAM-01" },
    { id: "V-006", plate: "GJ01 RT 9988", type: "Signal Jump", location: "Airport Rd", speed: 0, fine: 1000, status: "Pending", time: "12:40", camera: "CAM-08" },
  ]);
  const [newViol, setNewViol] = useState({ plate: "", type: "Signal Jump", location: "", speed: "", fine: "", camera: "" });
  const [showAdd, setShowAdd] = useState(false);

  const addViolation = () => {
    if (!newViol.plate || !newViol.location) return;
    const now = new Date();
    setViolations(prev => [{
      id: `V-${String(prev.length + 1).padStart(3, "0")}`,
      ...newViol,
      status: "Pending",
      time: `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`
    }, ...prev]);
    setNewViol({ plate: "", type: "Signal Jump", location: "", speed: "", fine: "", camera: "" });
    setShowAdd(false);
  };

  const statusColor = { Pending: "#ffcc00", Paid: "#00ff88", Disputed: "#ff6b00" };
  const totalFine = violations.filter(v => v.status === "Pending").reduce((a, v) => a + Number(v.fine), 0);

  return (
    <div style={{ padding: "88px 24px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <p style={{ fontSize: 12, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Enforcement</p>
          <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 28, fontWeight: 700 }}>Violations & Fines</h1>
        </div>
        <button className="btn-primary" onClick={() => setShowAdd(s => !s)}>+ Log Violation</button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Violations" value={violations.length} color="#ff6b00" icon="📷" />
        <StatCard label="Pending Fines" value={violations.filter(v => v.status === "Pending").length} color="#ffcc00" icon="⏳" />
        <StatCard label="Revenue Due" value={`₹${(totalFine / 1000).toFixed(1)}K`} color="#ff3366" icon="💰" />
        <StatCard label="Cleared Today" value={violations.filter(v => v.status === "Paid").length} color="#00ff88" icon="✅" />
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="card" style={{ marginBottom: 24, border: "1px solid rgba(255,107,0,0.3)", animation: "fadeUp 0.3s ease" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 20, color: "#ff6b00" }}>Log New Violation</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 12 }}>
            {[
              { label: "VEHICLE PLATE", key: "plate", placeholder: "e.g. KA05 AB 1234" },
              { label: "LOCATION", key: "location", placeholder: "Intersection / Road" },
              { label: "CAMERA ID", key: "camera", placeholder: "e.g. CAM-03" },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: 11, color: "#64748b", display: "block", marginBottom: 6 }}>{f.label}</label>
                <input style={{ width: "100%" }} placeholder={f.placeholder} value={newViol[f.key]} onChange={e => setNewViol(v => ({ ...v, [f.key]: e.target.value }))} />
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 11, color: "#64748b", display: "block", marginBottom: 6 }}>VIOLATION TYPE</label>
              <select style={{ width: "100%" }} value={newViol.type} onChange={e => setNewViol(v => ({ ...v, type: e.target.value }))}>
                {["Signal Jump","Overspeeding","Wrong Side","No Helmet","Illegal Parking","No Seatbelt"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#64748b", display: "block", marginBottom: 6 }}>SPEED (km/hr, if applicable)</label>
              <input type="number" style={{ width: "100%" }} placeholder="0" value={newViol.speed} onChange={e => setNewViol(v => ({ ...v, speed: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#64748b", display: "block", marginBottom: 6 }}>FINE AMOUNT (₹)</label>
              <input type="number" style={{ width: "100%" }} placeholder="e.g. 1000" value={newViol.fine} onChange={e => setNewViol(v => ({ ...v, fine: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-primary" onClick={addViolation}>Log Violation</button>
            <button className="btn-danger" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(0,212,255,0.08)" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600 }}>Violation Records</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead><tr><th>ID</th><th>Plate</th><th>Violation</th><th>Location</th><th>Speed</th><th>Fine (₹)</th><th>Camera</th><th>Status</th><th>Time</th></tr></thead>
            <tbody>
              {violations.map(v => (
                <tr key={v.id}>
                  <td style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 11, color: "#64748b" }}>{v.id}</td>
                  <td style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 13, color: "#00d4ff" }}>{v.plate}</td>
                  <td><span className="badge" style={{ background: "#ff6b0018", color: "#ff6b00", border: "1px solid #ff6b0033" }}>{v.type}</span></td>
                  <td style={{ fontSize: 13 }}>{v.location}</td>
                  <td style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 13, color: Number(v.speed) > 80 ? "#ff3366" : "#64748b" }}>{v.speed > 0 ? `${v.speed} km/h` : "—"}</td>
                  <td style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 13, color: "#ffcc00" }}>₹{Number(v.fine).toLocaleString()}</td>
                  <td style={{ fontSize: 12, color: "#64748b" }}>{v.camera}</td>
                  <td><span className="badge" style={{ background: statusColor[v.status] + "18", color: statusColor[v.status], border: `1px solid ${statusColor[v.status]}33` }}>{v.status}</span></td>
                  <td style={{ color: "#64748b", fontSize: 12 }}>{v.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── APP ROOT ─── */
const INIT_SIGNALS = [
  { id: "SIG-N1", location: "MG Road", zone: "North", state: "green", timer: 22, volume: 1240 },
  { id: "SIG-N2", location: "Brigade Rd", zone: "North", state: "red", timer: 18, volume: 980 },
  { id: "SIG-E1", location: "Airport Rd", zone: "East", state: "green", timer: 27, volume: 1560 },
  { id: "SIG-E2", location: "Tech Park", zone: "East", state: "yellow", timer: 4, volume: 820 },
  { id: "SIG-S1", location: "South Mkt", zone: "South", state: "red", timer: 12, volume: 670 },
  { id: "SIG-S2", location: "Stadium Rd", zone: "South", state: "green", timer: 31, volume: 1100 },
  { id: "SIG-W1", location: "West End", zone: "West", state: "yellow", timer: 3, volume: 750 },
  { id: "SIG-W2", location: "Ring Rd", zone: "West", state: "green", timer: 19, volume: 1420 },
];

const INIT_INCIDENTS = [
  { id: "INC-001", location: "MG Road & Brigade Rd", type: "Accident", severity: "High", status: "Active", time: "09:14", description: "Multi-vehicle collision, 2 lanes blocked" },
  { id: "INC-002", location: "Airport Road Km 12", type: "Breakdown", severity: "Low", status: "Resolved", time: "08:30", description: "Heavy truck breakdown, tow arranged" },
  { id: "INC-003", location: "Outer Ring Road", type: "Road Block", severity: "Medium", status: "Under Investigation", time: "10:05", description: "Tree fallen blocking left lane" },
  { id: "INC-004", location: "Tech Park Junction", type: "Flooding", severity: "High", status: "Active", time: "11:22", description: "Waterlogging after rain, vehicles diverted" },
  { id: "INC-005", location: "Brigade Road", type: "VIP Movement", severity: "Medium", status: "Under Investigation", time: "12:00", description: "VIP convoy expected, signal override active" },
];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [signals, setSignals] = useState(INIT_SIGNALS);
  const [incidents, setIncidents] = useState(INIT_INCIDENTS);

  useEffect(() => {
    axios.get("http://localhost:8080/api/signals")
      .then(res => { if(res.data && res.data.length > 0) setSignals(res.data); })
      .catch(err => console.error("Error fetching signals:", err));
    
    axios.get("http://localhost:8080/api/incidents")
      .then(res => { if(res.data && res.data.length > 0) setIncidents(res.data); })
      .catch(err => console.error("Error fetching incidents:", err));
  }, []);

  const pages = { dashboard: Dashboard, signals: SignalsPage, incidents: IncidentsPage, analytics: AnalyticsPage, map: LiveMapPage, violations: ViolationsPage };
  const PageComponent = pages[page] || Dashboard;

  return (
    <>
      <GlobalStyle />
      <div style={{ minHeight: "100vh", background: "#0a0e1a" }}>
        <Navbar page={page} setPage={setPage} />
        <PageComponent signals={signals} setSignals={setSignals} incidents={incidents} setIncidents={setIncidents} setPage={setPage} />
      </div>
    </>
  );
}
