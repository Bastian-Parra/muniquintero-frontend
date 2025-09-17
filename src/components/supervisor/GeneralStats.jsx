function GeneralStats({ dailyCount, weeklyCount, monthlyCount, reportsCount }) {
  return (
    <div className="general-stats">
      <h1>Reportes</h1>
      <div className="stats-container">
        <div className="stat-card">
          <h2>Totales</h2>
          <p>{reportsCount}</p>
        </div>
        <div className="stat-card">
          <h2>Este día</h2>
          <p>{dailyCount}</p>
        </div>
        <div className="stat-card">
          <h2>Esta Semana</h2>
          <p>{weeklyCount}</p>
        </div>
        <div className="stat-card">
          <h2>Este Mes</h2>
          <p>{monthlyCount}</p>
        </div>
      </div>
    </div>
  );
}

export default GeneralStats;
