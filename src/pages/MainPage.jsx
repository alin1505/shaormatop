function scoreClass(score) {
  if (score >= 9) return "score-9";
  if (score >= 8) return "score-8";
  if (score >= 7) return "score-7";
  if (score >= 6) return "score-6";
  if (score >= 5) return "score-5";
  return "score-low";
}

export default function MainPage({ places, onSelect, onAdd }) {
  if (places.length === 0) {
    return (
      <div>
        <div className="main-header">
          <div className="main-header-text">
            <div className="section-label">Clasamentul tău personal</div>
            <h1 className="page-title">Top Shaorma</h1>
          </div>
        </div>
        <div className="empty-state">
          <div className="emoji">🥙</div>
          <h2>Nici o shaormerie adăugată</h2>
          <p>Adaugă prima ta shaormerie preferată și construiește clasamentul!</p>
          
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="main-header">
        <div className="main-header-text">
          <div className="section-label">Clasamentul tău personal</div>
          <h1 className="page-title">Top Shaorma</h1>
          <p>{places.length} {places.length === 1 ? "locație" : "locații"} evaluate</p>
        </div>
        
      </div>

      <div className="places-list">
        {places.map((place, idx) => {
          const rank = idx + 1;
          const rankClass = rank === 1 ? "rank-1" : rank === 2 ? "rank-2" : rank === 3 ? "rank-3" : "";
          const firstImg = place.photos?.[0];

          return (
            <div
              key={place.id}
              className={`place-card ${rankClass}`}
              onClick={() => onSelect(place.id)}
            >
              <div className={`rank-number ${rank > 3 ? "other" : ""}`}>
                {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank}
              </div>

              <div className="place-info">
                <h3>{place.name}</h3>
                {place.description && (
                  <p className="place-desc">{place.description}</p>
                )}
              </div>

              <div className="card-right">
                {firstImg ? (
                  <img src={firstImg} alt={place.name} className="card-thumb" />
                ) : (
                  <div className="card-thumb-placeholder">🥙</div>
                )}
                <div className={`score-badge ${scoreClass(place.score)}`}>
                  {place.score.toFixed(1)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
