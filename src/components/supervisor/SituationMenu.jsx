import { useEffect, useState } from "react";
import { getCategoriesWithSituations } from "../../api/situations";

const SituationMenu = ({ onSituationSelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSituation, setSelectedSituation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getCategoriesWithSituations();

        // Ordenar categorías alfabéticamente por nombre
        const sortedCategories = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setCategories(sortedCategories);
        setError(null);
      } catch (err) {
        setError("Error al cargar las categorías");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedSituation("");
    onSituationSelect("");
  };

  const handleSituationChange = (e) => {
    const situationId = e.target.value;
    setSelectedSituation(situationId);

    // Encontrar la situación seleccionada para enviar el nombre
    const category = categories.find((cat) => cat.id == selectedCategory);
    if (category) {
      const situation = category.situations.find(
        (sit) => sit.id == situationId
      );
      if (situation) {
        onSituationSelect(situation.name);
      }
    }
  };

  const getCurrentSituations = () => {
    if (!selectedCategory) return [];
    const category = categories.find((cat) => cat.id == selectedCategory);
    return category ? category.situations : [];
  };

  if (loading) {
    return (
      <div className="situations-select-container">Cargando categorías...</div>
    );
  }

  if (error) {
    return <div className="situations-select-container">{error}</div>;
  }

  return (
    <div className="situations-select-container">
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        disabled={loading}
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <>
          <select
            value={selectedSituation}
            onChange={handleSituationChange}
            disabled={getCurrentSituations().length === 0}
          >
            <option value="">Selecciona una situación</option>
            {getCurrentSituations().map((situation) => (
              <option key={situation.id} value={situation.id}>
                {situation.name}
              </option>
            ))}
          </select>

          {getCurrentSituations().length === 0 && (
            <p className="no-situations-message">
              No hay situaciones disponibles para esta categoría.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default SituationMenu;
