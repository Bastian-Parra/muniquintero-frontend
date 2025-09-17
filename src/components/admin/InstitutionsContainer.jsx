import "../../assets/styles/institutions.css";

function InstitutionsContainer({ institutions }) {
  return (
    <>
      <div className="institutions-container">
        <h1 className="title-situation">Instituciones Creadas</h1>
        {institutions.map((institution) => (
          <div className="institution-card" key={institution.id}>
            <div>
              <p>{institution.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default InstitutionsContainer;
