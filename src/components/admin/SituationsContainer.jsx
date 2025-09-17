import DraggableSituation from "../../components/Dnd/DraggableSituation.jsx";
import { TrashIcon } from "../../components/icons/AdminIcons.jsx";

function SituationsContainer({
  categories,
  toggleCategory,
  openCategories,
  handleDeleteCategory,
  selectedSituations,
  toggleSituationSelection,
}) {
  return (
    <div className="situations-admin-container">
    <h1 className="title-situation">Categorias y Situaciones Creadas</h1>
    {categories.map((category) => (
      <div key={category.id} className="situation-card">
        <div className="situations-title-container">
          <h2 onClick={() => toggleCategory(category.id)}>
            {category.name}
            <span
              style={{
                transform: openCategories[category.id]
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            >
              ▼
            </span>
          </h2>
          <button onClick={() => handleDeleteCategory(category.id)}>
            <TrashIcon />
          </button>
        </div>
        {openCategories[category.id] && (
          <ul>
            {category.situations.map((situation) => (
              <DraggableSituation key={situation.id} situation={situation}>
                <li
                  key={situation.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedSituations.includes(situation.id)}
                    onChange={() => toggleSituationSelection(situation)}
                    style={{ marginRight: "10px" }}
                  />
                  {situation.name}
                </li>
              </DraggableSituation>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
  )
}

export default SituationsContainer;
