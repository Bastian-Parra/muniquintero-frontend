import React from "react";

const ImportResults = ({ result, onReset }) => {
  return (
    <div className="results-section">
      <h3>Resultados de la Importación</h3>
      <div className="result-card success">
        <p>✅ {result.message}</p>
        <p>Registros importados: {result.importedCount || 0}</p>
      </div>

      {result.errors && result.errors.length > 0 && (
        <div className="result-card errors">
          <h4>Errores encontrados ({result.errors.length}):</h4>
          <div className="errors-list">
            {result.errors.slice(0, 5).map((error, index) => (
              <div key={index} className="error-item">
                <p><strong>Fila {error.row}:</strong> {error.error}</p>
                {error.data && (
                  <pre>{JSON.stringify(error.data, null, 2)}</pre>
                )}
              </div>
            ))}
            {result.errors.length > 5 && (
              <p>... y {result.errors.length - 5} errores más</p>
            )}
          </div>
        </div>
      )}

      <button onClick={onReset} className="btn-reset">
        Importar otro archivo
      </button>
    </div>
  );
};

export default ImportResults;