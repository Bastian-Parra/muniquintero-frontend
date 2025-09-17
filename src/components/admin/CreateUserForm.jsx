function CreateUserForm({
  handleCreateUser,
  newUser,
  handleCreateChange,
  createErrors,
  isLoading,
}) {
  return (
    <>
      <div className="create-user-section">
        <form onSubmit={handleCreateUser} className="create-user-form">
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="username"
              value={newUser.username}
              onChange={handleCreateChange}
              placeholder="ej. cemco@example.com"
              required
              disabled={isLoading}
              className={createErrors.username ? "error" : ""}
            />
            {createErrors.username && (
              <span className="error-message">{createErrors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label>Rol</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleCreateChange}
              disabled={isLoading}
            >
              <option value="CEMCO">CEMCO</option>
              <option value="SUPERVISOR">SUPERVISOR</option>
            </select>
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={newUser.password}
              onChange={handleCreateChange}
              required
              disabled={isLoading}
              className={createErrors.password ? "error" : ""}
            />
            {createErrors.password && (
              <span className="error-message">{createErrors.password}</span>
            )}
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creando..." : "Crear Cuenta"}
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateUserForm;
