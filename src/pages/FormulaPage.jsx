import { useState } from "react";

const CRITERIA = [
  { key: "taste",     label: "Gust",           weight: 0.25, color: "#e03d20" },
  { key: "ratio",     label: "Cantitate/Preț", weight: 0.25, color: "#f0a500" },
  { key: "quality",   label: "Calitate Individuala a Produselor",       weight: 0.20, color: "#4caf76" },
  { key: "diversity", label: "Diversitate",    weight: 0.15, color: "#7b9eff" },
  { key: "service",   label: "Serviciu",       weight: 0.15, color: "#c47bef" },
];

function scoreClass(s) {
  if (s >= 9) return "score-9";
  if (s >= 8) return "score-8";
  if (s >= 7) return "score-7";
  if (s >= 6) return "score-6";
  if (s >= 5) return "score-5";
  return "score-low";
}

export default function FormulaPage({ calcScore }) {
  const [vals, setVals] = useState({ taste: 7, ratio: 8, quality: 7, diversity: 6, service: 9 });

  const score = calcScore(vals);

  return (
    <div className="formula-page">
      <div className="section-label">Metodologie</div>
      <h1 className="page-title" style={{ marginBottom: "0.5rem" }}>Formula de notare</h1>
      <p style={{ color: "var(--text-dim)", lineHeight: 1.7 }}>
        Fiecare shaormerie e evaluată pe 5 criterii cu ponderi diferite,
        rezultând un scor final de la 1 la 10.
      </p>

      <div className="formula-box">
        <div className="formula-text">
          <em>Scor</em> = <strong>Gust</strong> × 0.25 &nbsp;+&nbsp;
          <strong>Cantitate/Preț</strong> × 0.25 &nbsp;+&nbsp;
          <strong>Calitate Individuala</strong> × 0.20 &nbsp;+&nbsp;
          <strong>Diversitate</strong> × 0.15 &nbsp;+&nbsp;
          <strong>Serviciu</strong> × 0.15
        </div>
      </div>

      <table className="criteria-table">
        <thead>
          <tr>
            <th>Criteriu</th>
            <th>Descriere</th>
            <th>Pondere</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>🌶️ Gust</td>
            <td>Aroma, echilibrul condimentelor, senzația generală la gust</td>
            <td>25%</td>
          </tr>
          <tr>
            <td>⚖️ Cantitate / Preț</td>
            <td>Cât de mult primești raportat la prețul plătit</td>
            <td>25%</td>
          </tr>
          <tr>
            <td>🥗 Calitate</td>
            <td>Prospețimea și calitatea fiecărui ingredient în parte</td>
            <td>20%</td>
          </tr>
          <tr>
            <td>🗂️ Diversitate</td>
            <td>Varietatea opțiunilor disponibile în meniu</td>
            <td>15%</td>
          </tr>
          <tr>
            <td>😊 Serviciu</td>
            <td>Viteza, amabilitatea și experiența generală</td>
            <td>15%</td>
          </tr>
        </tbody>
      </table>

      {/* Interactive calculator */}
      <div className="try-section">
        <div className="try-title">🧪 Testează formula</div>
        <p style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginBottom: "1.25rem" }}>
          Mișcă slidere-le și vezi cum se calculează scorul în timp real.
        </p>

        <div className="try-sliders">
          {CRITERIA.map(({ key, label, weight, color }) => (
            <div key={key} className="try-slider-row">
              <span className="try-slider-label">
                {label}
                <span style={{ color: "var(--text-dim)", fontSize: "0.72rem", marginLeft: "4px" }}>
                  ×{weight}
                </span>
              </span>
              <input
                type="range"
                min="1" max="10" step="0.5"
                className="slider-input"
                value={vals[key]}
                style={{ "--thumb-color": color }}
                onChange={(e) => setVals((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
              />
              <span className="slider-val" style={{ color }}>{vals[key]}</span>
            </div>
          ))}
        </div>

        <div className="try-result">
          <div>
            <div className="try-result-label">Scor final</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>
              {CRITERIA.map(({ key, weight }) => `${vals[key]}×${weight}`).join(" + ")} = {score.toFixed(2)}
            </div>
          </div>
          <div className={`score-badge large ${scoreClass(score)}`}>
            {score.toFixed(1)}
          </div>
        </div>

        {/* Interpretation */}
        <div style={{ marginTop: "1rem", padding: "0.8rem 1rem", borderRadius: "6px", background: "var(--surface)", border: "1px solid var(--border)", fontSize: "0.85rem", color: "var(--cream-dim)" }}>
          {score >= 9 && "🔥 Legendar. O shaormărie de vis, merită orice drum!"}
          {score >= 8 && score < 9 && "⭐ Excelent. O recomand cu toată inima."}
          {score >= 7 && score < 8 && "👍 Bun solid. Mereu o alegere sigură."}
          {score >= 6 && score < 7 && "😐 Ok, dar îmi doresc mai mult."}
          {score >= 5 && score < 6 && "⚠️ Mediocru. Mă duc doar dacă nu am altă opțiune."}
          {score < 5 && "❌ Nu recomand. Dezamăgire totală."}
        </div>
      </div>
    </div>
  );
}
