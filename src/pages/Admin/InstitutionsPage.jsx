import { getAllInstitutions } from "../../api/institutions";
import "../../assets/styles/institutions.css";
import { useState, useEffect } from "react";

function InstitutionsPage() {
  const [institutions, setInstitutions] = useState([]);
  const [error, setError] = useState(null);

  const fetchInstitutions = async () => {
    try {
      const res = await getAllInstitutions();
      setInstitutions(res.data);
    } catch (error) {
      console.log(error);
      setError("Error al mostrar las instituciones", error);
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  return (
    <div className="institutions-container">
      <div className="institutions">
        <ul>
          {institutions.map((inst) => (
            <li key={inst.id}>{inst.name}</li>
          ))}
        </ul>
      </div>
      <div className="institutions actions">
       sadashudasj
      </div>
    </div>
  );
}

export default InstitutionsPage;
