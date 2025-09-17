// imports
import { useEffect, useState } from "react";
import ContainerSection from "../../components/ContainerSection";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  createUser,
} from "../../api/users";
import "../../assets/styles/accounts.css";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import EditUserForm from "../../components/admin/EditUserForm";
import BaseModal from "../../components/modals/BaseModal";
import CreateUserForm from "../../components/admin/CreateUserForm";
import AccountsTable from "../../components/admin/AccountsTable.jsx";
import ToastsTypes from "../../components/toasts/toasts.js";

function AccountsPage() {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createErrors, setCreateErrors] = useState({});

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "CENCO",
    id_rol: 3,
  });

  const roleToIdMap = {
    ADMIN: 1,
    SUPERVISOR: 2,
    CENCO: 3,
  };

  const fetchAllUsers = async () => {
    setIsLoading(true);
    try {
      const res = await getAllUsers();
      setUsers(res.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching all users:", error);
      setError("Error al cargar los usuarios. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedUserData) => {
    setIsLoading(true);
    try {
      await updateUser(currentUser.id, updatedUserData);
      setUsers(
        users.map((user) =>
          user.id === currentUser.id ? { ...user, ...updatedUserData } : user
        )
      );
      setIsEditModalOpen(false);
      ToastsTypes.AccountSuccessUpdated();
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Error al actualizar el usuario. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (user) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      await deleteUser(currentUser.id);
      setUsers(users.filter((user) => user.id !== currentUser.id));
      setIsDeleteModalOpen(false);
      ToastsTypes.AccountSuccessDeleted();
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error al eliminar el usuario. Intente nuevamente.");
      setIsDeleteModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validación
    const errors = {};
    if (!newUser.username) ToastsTypes.DynamicError("Correo es requerido.");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.username))
      ToastsTypes.DynamicError("Correo es inválido.");
    if (!newUser.password) errors.password = "Contraseña es requerida";
    else if (newUser.password.length < 8)
      ToastsTypes.DynamicError(
        "La contraseña debe ser minimo de 8 caracteres."
      );

    setCreateErrors(errors);
    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await createUser({
        username: newUser.username,
        password: newUser.password,
        role: newUser.role,
        id_rol: roleToIdMap[newUser.role],
        department_id: newUser.department_id || null,
        is_active: 1,
      });

      setUsers([...users, res.data]);
      setNewUser({
        username: "",
        password: "",
        role: "CEMCO",
        id_rol: 1,
        is_active: 1,
      });
      ToastsTypes.AccountSuccessCreated();
      setCreateErrors({});
    } catch (error) {
      console.error("Error creating user:", error);
      setError(error.response?.data?.message || "Error al crear usuario");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <ContainerSection className="users-content">
        <CreateUserForm
          handleCreateChange={handleCreateChange}
          newUser={newUser}
          handleCreateUser={handleCreateUser}
          createErrors={createErrors}
          isLoading={isLoading}
        />

        <AccountsTable
          isLoading={isLoading}
          users={users}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />

      {/* Modal de Edición de Usuario */}
      <BaseModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        title={"Editar Usuario"}
        className="modal-content-base"
        showClose={true}
      >
        {currentUser && (
          <EditUserForm
            user={currentUser}
            onSave={handleSaveEdit}
            onCancel={() => setIsEditModalOpen(false)}
            isLoading={isLoading}
          />
        )}
      </BaseModal>

      {/* Modal de Confirmación para Eliminar */}
      {isDeleteModalOpen && currentUser && (
        <ConfirmationModal
          title="Confirmar Eliminación"
          message={`¿Estás seguro que deseas eliminar al usuario ${currentUser.username}?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
          isLoading={isLoading}
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          confirmText="Eliminar"
          cancelText="Cancelar"
        />
      )}
    </ContainerSection>
  );
}

export default AccountsPage;
