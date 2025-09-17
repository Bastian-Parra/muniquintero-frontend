import { useState } from "react";
import "../../assets/styles/modals.css";

function EditUserForm({ user, onSave, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    username: user.username,
    password: "",
    confirmPassword: "",
    is_active: typeof user.is_active === "number" ? user.is_active : 1,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'isActive') {
      setFormData((prev) => ({
        ...prev,
        is_active: value === "true" ? 1 : 0,
      }))
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username)) {
      newErrors.username = "Correo electrónico inválido";
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const dataToSend = {
      username: formData.username,
      is_active: formData.is_active,
    };

    if (formData.password) {
      dataToSend.password = formData.password;
    }

    console.log(dataToSend)

    onSave(dataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-user-form">
      <div className="form-group">
        <label>Rol:</label>
        <div className="static-field">{user.role}</div>
      </div>

      <div className="form-group">
        <label>Correo Electrónico:</label>
        <input
          type="email"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={isLoading}
          className={errors.username ? "error" : ""}
        />
        {errors.username && (
          <span className="error-message">{errors.username}</span>
        )}
      </div>

      <div className="form-group">
        <label>Nueva Contraseña (dejar en blanco para no cambiar):</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.password ? "error" : ""}
        />
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      {formData.password && (
        <div className="form-group">
          <label>Confirmar Nueva Contraseña:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.confirmPassword ? "error" : ""}
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>
      )}

      <div className="form-group">
        <label>Permitir Acceso a la Cuenta:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="isActive"
              value="true"
              onChange={handleChange}
              checked={formData.is_active === 1}
              disabled={isLoading}
              className={errors.is_active ? "error" : ""}
            />
            Activa
          </label>
          <label>
            <input
              type="radio"
              name="isActive"
              value="false"
              onChange={handleChange}
              checked={formData.is_active === 0}
              disabled={isLoading}
              className={errors.is_active ? "error" : ""}
            />
            Inactiva
          </label>
        </div>
        {errors.isActive && (
          <span className="error-message">{errors.is_active}</span>
        )}
      </div>

      <div className="modal-actions">
        <button
          type="button"
          className="modal-btn cancel"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="modal-btn confirm"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Guardando...
            </>
          ) : (
            "Guardar Cambios"
          )}
        </button>
      </div>
    </form>
  );
}

export default EditUserForm;
