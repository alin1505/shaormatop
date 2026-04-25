const CRITERIA = [
  { key: "taste",     label: "Gust",           weight: "25%" },
  { key: "ratio",     label: "Cantitate/Preț", weight: "25%" },
  { key: "quality",   label: "Calitate Individuala a produselor",       weight: "20%" },
  { key: "diversity", label: "Diversitate",    weight: "15%" },
  { key: "service",   label: "Serviciu",       weight: "15%" },
];

function scoreClass(score) {
  if (score >= 9) return "score-9";
  if (score >= 8) return "score-8";
  if (score >= 7) return "score-7";
  if (score >= 6) return "score-6";
  if (score >= 5) return "score-5";
  return "score-low";
}

export default function DetailPage({ place, rank, onBack, onEdit, onDelete }) {
  const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;

  return (
    <div>
      <button className="detail-back" onClick={onBack}>
        ← Înapoi la clasament
      </button>

      <div className="detail-header">
        <div>
          <div className="detail-rank">
            {medal ? `${medal} ` : ""}Locul #{rank} în clasament
          </div>
          <div className="section-label">Shaormerie</div>
          <h1 className="page-title">{place.name}</h1>
        </div>
        <div className={`score-badge large ${scoreClass(place.score)}`}>
          {place.score.toFixed(1)}
          <span style={{ fontSize: "0.9rem", marginLeft: "4px", opacity: 0.6 }}>/10</span>
        </div>
      </div>

      {place.photos?.length > 0 && (
        <div className="detail-gallery">
          {place.photos.map((src, i) => (
            <img key={i} src={src} alt={`${place.name} ${i + 1}`} className="detail-img" />
          ))}
        </div>
      )}

      {place.description && (
        <div className="detail-description">
          "{place.description}"
        </div>
      )}

      <div className="section-label" style={{ marginBottom: "0.8rem" }}>Criterii de evaluare</div>
      <div className="criteria-grid">
        {CRITERIA.map(({ key, label, weight }) => {
          const val = place.criteria[key];
          return (
            <div key={key} className="criteria-card">
              <div className="criteria-label">{label} · {weight}</div>
              <div className="criteria-value">{val}<span style={{ fontSize: "1rem", opacity: 0.5 }}>/10</span></div>
              <div className="criteria-bar">
                <div className="criteria-bar-fill" style={{ width: `${val * 10}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="detail-actions">
       
      </div>
    </div>
  );
}
