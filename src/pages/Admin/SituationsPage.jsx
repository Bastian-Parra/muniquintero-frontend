import { useEffect, useState } from "react";
import {
  getCategoriesWithSituations,
  deleteSituation,
  updateSituation,
} from "../../api/situations.js";

import { deleteCategory } from "../../api/categories.js";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

// modals
import WelcomeModal from "../../components/modals/WelcomeModal.jsx";
import CategoryModal from "../../components/modals/CategoryModal";
import SituationModal from "../../components/modals/SituationModalCreate.jsx";
import EditSituationModal from "../../components/modals/EditSituationModal.jsx";
import InstituionModal from "../../components/modals/InstitutionModal.jsx";

// dnd
import DropZone from "../../components/Dnd/DropZone.jsx";
import ConfirmationModal from "../../components/modals/ConfirmationModal.jsx";
import SituationsContainer from "../../components/admin/SituationsContainer.jsx";
import SituationsSelection from "../../components/admin/SituationsSelection.jsx";
import InstitutionsContainer from "../../components/admin/InstitutionsContainer.jsx";

// toast
import ToastsTypes from "../../components/toasts/toasts.js";

// styles
import "../../assets/styles/admin.css";
import { getAllInstitutions } from "../../api/institutions.js";

function SituationsPage() {
  const [categories, setCategories] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [selectedSituations, setSelectedSituations] = useState([]);
  const [selectedSituationsDetails, setSelectedSituationsDetails] = useState(
    []
  );
  const [openCategories, setOpenCategories] = useState({});
  const [error, setError] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSituationModalOpen, setIsSituationModalOpen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentSituation, setCurrentSituation] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showDeleteAllConfirmation, setShowDeleteAllConfirmation] =
    useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(() => {
    return localStorage.getItem("hideWelcomeModal") !== "true";
  });
  const [isInstitutionModalOpen, setIsInstitutionModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const res = await getCategoriesWithSituations();
      setCategories(res.data);
    } catch (error) {
      setError("Error fetching categories with situations");
    }
  };

  const fetchInstitutions = async () => {
    try {
      const res = await getAllInstitutions();
      setInstitutions(res.data);
    } catch (error) {
      setError("Error fetching institutions");
    }
  };

  const handleNeverShowWelcome = () => {
    localStorage.setItem("hideWelcomeModal", "true");
    setShowWelcomeModal(false);
  };

  const toggleSituationSelection = (situation) => {
    setSelectedSituations(
      (prev) =>
        prev.includes(situation.id)
          ? prev.filter((id) => id !== situation.id) // Desmarcar
          : [...prev, situation.id] // Marcar
    );

    setSelectedSituationsDetails(
      (prev) =>
        prev.some((s) => s.id === situation.id)
          ? prev.filter((s) => s.id !== situation.id) // Quitar
          : [...prev, situation] // Agregar
    );
  };

  const confirmDeleteAllSituations = async () => {
    try {
      await Promise.all(
        selectedSituationsDetails.map((situation) =>
          deleteSituation(situation.id)
        )
      );
      setSelectedSituations([]);
      setSelectedSituationsDetails([]);
      fetchData();
      ToastsTypes.SituationsSuccessDeleted();
      setShowDeleteAllConfirmation(false);
    } catch (error) {
      setError("Error al eliminar las situaciones seleccionadas");
      setShowDeleteAllConfirmation(false);
    }
  };

  const toggleCategory = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleSaveEdit = async (situationUpdated) => {
    try {
      console.log(situationUpdated.id, situationUpdated);
      await updateSituation(situationUpdated.id, situationUpdated);
      setSelectedSituationsDetails((prev) =>
        prev.map((s) => (s.id === situationUpdated.id ? situationUpdated : s))
      );

      setIsEditModalOpen(false);
      fetchData();
    } catch (error) {
      setError("Error al actualizar la situación");
    }
  };

  const handleDesSelectSituation = (situation) => {
    setSelectedSituations((prev) => prev.filter((id) => id !== situation.id));

    setSelectedSituationsDetails((prev) =>
      prev.filter((s) => s.id !== situation.id)
    );
  };

  // Función para manejar eliminación desde el modal
  const handleDeleteFromModal = async (situationId) => {
    try {
      await deleteSituation(situationId);
      // Remover de seleccionadas
      setSelectedSituations((prev) => prev.filter((id) => id !== situationId));
      setSelectedSituationsDetails((prev) =>
        prev.filter((s) => s.id !== situationId)
      );
      // Actualizar datos
      fetchData();
      setShowDeleteConfirmation(false);
      setIsEditModalOpen(false);
      ToastsTypes.Success();
    } catch (error) {
      setError("Error al eliminar la situación");
    }
  };

  const handleDeleteAllConfirmation = () => {
    setShowDeleteAllConfirmation(true);
  };

  const handleDeleteSituation = async (situationId) => {
    setCurrentSituation(
      categories
        .flatMap((category) => category.situations)
        .find((situation) => situation.id === situationId)
    );

    setShowDeleteConfirmation(true);
  };

  const handleCreateInstitution = () => {
    setIsInstitutionModalOpen(true);
    fetchInstitutions();
  };

  const handleEditSituation = (situation) => {
    setCurrentSituation(situation);
    setIsEditModalOpen(true);
  };

  const handleDeleteCategory = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return;
    setCategoryToDelete(category);
  };

  const confirmDeleteCategory = async () => {
    if (!categoryToDelete) return;
    try {
      await deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
      ToastsTypes.CategorySuccessDeleted();
      fetchData();
    } catch (error) {
      ToastsTypes.Error();
    }
  };

  useEffect(() => {
    fetchData();
    fetchInstitutions();
    const timer = setTimeout(() => {
      if (localStorage.getItem("hideWelcomeModal") !== "true") {
        setShowWelcomeModal(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="situations-page">
        {showWelcomeModal && (
          <WelcomeModal
            isOpen={showWelcomeModal}
            onClose={() => setShowWelcomeModal(false)}
            onNeverShowAgain={handleNeverShowWelcome}
          />
        )}
        <InstitutionsContainer institutions={institutions} />

        <SituationsContainer
          categories={categories}
          toggleCategory={toggleCategory}
          openCategories={openCategories}
          handleDeleteCategory={handleDeleteCategory}
          selectedSituations={selectedSituations}
          toggleSituationSelection={toggleSituationSelection}
        />

        <DropZone
          onDrop={(situation) => {
            if (!selectedSituations.includes(situation.id)) {
              toggleSituationSelection(situation);
            }
          }}
        >
          <SituationsSelection
            setIsCategoryModalOpen={setIsCategoryModalOpen}
            setIsSituationModalOpen={setIsSituationModalOpen}
            selectedSituationsDetails={selectedSituationsDetails}
            handleDeleteAllConfirmation={handleDeleteAllConfirmation}
            handleDesSelectSituation={handleDesSelectSituation}
            handleEditSituation={handleEditSituation}
            handleDeleteSituation={handleDeleteSituation}
            setIsInstitutionModalOpen={setIsInstitutionModalOpen}
          />
        </DropZone>
      </div>

      {/* MODALS: */}

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryAdded={fetchData}
      />

      <InstituionModal
        isOpen={isInstitutionModalOpen}
        onClose={() => setIsInstitutionModalOpen(false)}
        onInstitutionAdded={fetchInstitutions}
      />

      <EditSituationModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        situation={currentSituation || {}}
        onSave={handleSaveEdit}
        onDelete={handleDeleteFromModal}
      />

      <SituationModal
        isOpen={isSituationModalOpen}
        onClose={() => setIsSituationModalOpen(false)}
        onSituationAdded={fetchData}
        categories={categories}
        selectedCategoryId={selectedCategoryId}
      />

      <ConfirmationModal
        isOpen={!!categoryToDelete}
        onRequestClose={() => setCategoryToDelete(null)}
        title="Confirmar eliminación de categoría"
        message={
          categoryToDelete &&
          categoryToDelete.situations &&
          categoryToDelete.situations.length > 0
            ? "No puedes eliminar una categoría que contiene situaciones. Por favor elimina primero todas las situaciones de esta categoría."
            : `¿Estás seguro de eliminar la categoría "${
                categoryToDelete ? categoryToDelete.name : ""
              }"?`
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        showButtons={
          categoryToDelete &&
          categoryToDelete.situations &&
          categoryToDelete.situations.length > 0
            ? false
            : true
        }
        onConfirm={() => {
          if (
            categoryToDelete &&
            (!categoryToDelete.situations ||
              categoryToDelete.situations.length === 0)
          ) {
            confirmDeleteCategory();
          } else {
            setCategoryToDelete(null);
          }
        }}
      />

      <ConfirmationModal
        isOpen={showDeleteAllConfirmation}
        onRequestClose={() => setShowDeleteAllConfirmation(false)}
        title="Confirmar eliminación múltiple"
        message={`¿Estás seguro de que deseas eliminar las ${selectedSituationsDetails.length} situaciones seleccionadas?`}
        confirmText="Eliminar todas"
        cancelText="Cancelar"
        onConfirm={confirmDeleteAllSituations}
      />

      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onRequestClose={() => setShowDeleteConfirmation(false)}
        title="Confirmar eliminación"
        message={
          "¿Estás seguro de que deseas eliminar la situacion: " +
          (currentSituation ? currentSituation.name : "") +
          "?"
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={() => handleDeleteFromModal(currentSituation.id)}
      />
    </DndProvider>
  );
}

export default SituationsPage;
