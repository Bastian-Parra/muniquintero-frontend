import "../../assets/styles/admin.css";
import { getAllUsers } from "../../api/users.js";
import { useEffect, useState } from "react";
import {
  getCategoriesWithSituations,
  deleteSituation,
} from "../../api/situations.js";
import CategoryModal from "../modals/CategoryModal.jsx";
import SituationModal from "../modals/SituationModalCreate.jsx";
import { AddIcon } from "../icons/AdminIcons.jsx";
import { deleteCategory } from "../../api/categories.js";
import BulkEditModal from "../modals/BulkEditModal.jsx";

function ContentAdmin({ selectedOption }) {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openCategories, setOpenCategories] = useState({});
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSituationModalOpen, setIsSituationModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSituations, setSelectedSituations] = useState([]);
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false);
  const [itemsToEdit, setItemsToEdit] = useState({ categories: [], situations: [] });

  const toggleCategory = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const fetchAllUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching all users");
    }
  };

  const fetchAllCategoriesWithSituations = async () => {
    try {
      const res = await getCategoriesWithSituations();
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories with situations");
    }
  };

  const toggleCategorySelection = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleSituationSelection = (situationId) => {
    setSelectedSituations((prev) =>
      prev.includes(situationId)
        ? prev.filter((id) => id !== situationId)
        : [...prev, situationId]
    );
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedSituations.map((id) => deleteSituation(id)));

      await Promise.all(selectedCategories.map((id) => deleteCategory(id)));

      fetchAllCategoriesWithSituations();
      setSelectedCategories([]);
      setSelectedSituations([]);
    } catch (error) {
      console.error("Error deleting selected categories/situations", error);
    }
  };

  const handleEditSelected = () => {
    const selectedItems = {
      categories: categories.filter(c => selectedCategories.includes(c.id)),
      situations: categories.flatMap(c => c.situations).filter(s => selectedSituations.includes(s.id))
    }

    setIsBulkEditModalOpen(true)
    setItemsToEdit(selectedItems)
  }
  useEffect(() => {
    fetchAllUsers();
    fetchAllCategoriesWithSituations();
  }, []);

  return (
    <div className="content-container">
      {selectedOption === "home" && (
        <div className="home-container">
          <h1 className="title-situation">
            Bienvenido al Panel de Administración
          </h1>
          <p className="description-home">
            Aquí puedes gestionar las situaciones y los usuarios de la
            aplicación. Selecciona una opción del menú lateral para comenzar.
            <br />
            <br />
            <strong>¿Cómo añadir una nueva situación?</strong>
            <br />
            Para añadir una nueva situación, primero selecciona una categoría
            existente o crea una nueva categoría.
            <br />
            Luego, haz clic en el botón "Añadir Situación" y completa el
            formulario con los detalles de la situación. Una vez que hayas
            completado el formulario, haz clic en "Guardar" para añadir la
            situación a la categoría seleccionada.
            <br />
            <br />
            <strong>¿Cómo añadir una nueva categoría?</strong>
            <br />
            Para añadir una nueva categoría, haz clic en el botón "Añadir
            Categoria" en la sección de situaciones. Completa el formulario con
            el nombre de la nueva categoría y haz clic en "Guardar". La nueva
            categoría aparecerá en la lista de categorías y podrás añadir
            situaciones a ella.
            <br />
          </p>
        </div>
      )}
      {selectedOption === "situations" && (
        <>
          <div className="situation-container-header">
            <h1 className="title-situation">Situaciones por Categorías</h1>
            <div>
              <button
                className="add-category-btn"
                onClick={() => setIsCategoryModalOpen(true)}
              >
                <AddIcon />
                Añadir Categoria
              </button>
              <button
                className="add-situation-btn"
                onClick={() => setIsSituationModalOpen(true)}
              >
                <AddIcon />
                Añadir Situación
              </button>

              {(selectedCategories.length > 0 ||
                selectedSituations.length > 0) && (
                <>
                  <button
                    className="edit-selected-btn"
                    onClick={handleEditSelected}
                    disabled={
                      !selectedCategories.length && !selectedSituations.length
                    }
                  >
                    Editar Seleccionados
                  </button>
                  <button
                    className="delete-selected-btn"
                    onClick={handleDeleteSelected}
                    disabled={
                      !selectedCategories.length && !selectedSituations.length
                    }
                  >
                    Eliminar Seleccionados
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="situations-container">
            {categories.map((category) => (
              <div key={category.id} className="situation-card">
                <h2
                  onClick={() => toggleCategory(category.id)}
                  style={{
                    color: "#333",
                    fontSize: "20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
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
                {openCategories[category.id] && (
                  <ul>
                    {category.situations.map((situation) => (
                      <li
                        key={situation.id}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSituations.includes(situation.id)}
                          onChange={() =>
                            toggleSituationSelection(situation.id)
                          }
                          style={{ marginRight: "10px" }}
                        />
                        {situation.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </>
      )}{" "}
      {selectedOption === "users" && (
        <div className="users-container">
          <h1 className="title-users">Listado de Usuarios</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Correo Electrónico</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal para agregar categoría */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryAdded={fetchAllCategoriesWithSituations}
      />
      {/* Modal para agregar situación */}
      <SituationModal
        isOpen={isSituationModalOpen}
        onClose={() => setIsSituationModalOpen(false)}
        onSituationAdded={fetchAllCategoriesWithSituations}
        categories={categories}
        selectedCategoryId={selectedCategoryId}
      />
      {isBulkEditModalOpen && (
        <BulkEditModal
          isOpen={isBulkEditModalOpen}
          onClose={() => setIsBulkEditModalOpen(false)}
          items={itemsToEdit}
          onSave={fetchAllCategoriesWithSituations}
        />
      )}
    </div>
  );
}

export default ContentAdmin;
