import toast, { ToastIcon } from "react-hot-toast"

const ToastsTypes = {
  NotifyNoCategory() {
    toast.error("El nombre de la categoría es obligatorio.")
  },

  CategorySuccessCreated() {
    toast.success("Categoría creada exitosamente.")
  },

  CategorySuccessDeleted() {
    toast.success("Categoria eliminada correctamente.")
  },

  Success() {
    toast.success("La operación se llevó a cabo exitosamente.")
  },

  Error() {
    toast.error("La operación no se pudo llevar a cabo.")
  },

  RequiredAllInputs() {
    toast.error("Todos los campos son obligatorios.")
  },

  SituationSuccessCreated() {
    toast.success("Situacion agregada exitosamente.")
  },

  SituationsSuccessDeleted() {
    toast.success("Las situaciones se eliminaron exitosamente.")
  },

  AccountSuccessCreated() {
    toast.success("Cuenta creada exitosamente.")
  },

  AccountSuccessDeleted() {
    toast.success("Cuenta eliminada exitosamente.")
  },

  AccountSuccessUpdated() {
    toast.success("Cuenta actualizada exitosamente.")
  },

  DynamicError(error) {
    toast.error(error)
  },

  Welcome() {
    toast.success("Inicio de sesión exitoso. ¡Bienvenido/a!")
  }
} 

export default ToastsTypes