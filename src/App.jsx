import { useState } from "react";
import MainPage from "./pages/MainPage";
import FormulaPage from "./pages/FormulaPage";
import DetailPage from "./pages/DetailPage";
import { data } from "./data/data.js";
import { calcScore } from "./data/calcScore.js";
import "./App.css";

// Pre-calculate scores at build time and sort
const PLACES = data
  .map((p) => ({ ...p, score: calcScore(p.criteria) }))
  .sort((a, b) => b.score - a.score);

export default function App() {
  const [page, setPage] = useState("main"); // main | formula | detail
  const [selectedId, setSelectedId] = useState(null);

  const selected = PLACES.find((p) => p.id === selectedId);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand" onClick={() => setPage("main")}>
          🥙 <span>ShaormaTop</span>
        </div>
        <div className="nav-links">
          <button
            className={`nav-btn ${page === "main" ? "active" : ""}`}
            onClick={() => setPage("main")}
          >
            Clasament
          </button>
          <button
            className={`nav-btn ${page === "formula" ? "active" : ""}`}
            onClick={() => setPage("formula")}
          >
            Formula
          </button>
        </div>
      </nav>

      <main className="main-content">
        {page === "main" && (
          <MainPage
            places={PLACES}
            onSelect={(id) => { setSelectedId(id); setPage("detail"); }}
          />
        )}
        {page === "formula" && <FormulaPage calcScore={calcScore} />}
        {page === "detail" && selected && (
          <DetailPage
            place={selected}
            rank={PLACES.findIndex((p) => p.id === selected.id) + 1}
            onBack={() => setPage("main")}
          />
        )}
      </main>
    </div>
  );
}
