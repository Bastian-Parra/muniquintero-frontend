

const roleToIdMap = {
  CENCO: 3,
  SUPERVISOR: 2,
  ADMINISTRADOR: 1,
};

const getRolName = (id_rol) => {
  switch (id_rol) {
    case 1:
      return <span className="role admin">ADMINISTRADOR</span>
    case 2:
      return <span className="role supervisor">SUPERVISOR</span>
    case 3:
      return <span className="role cemco">CEMCO</span>
    default:
      return "Desconocido";
  }
};

function AccountsPage({
  isLoading,
  users,
  handleEditClick,
  handleDeleteClick,
}) {

  return (
    <div className="users-table-section">
      {isLoading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Correo de Acceso</th>
              <th>Estado</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.is_active === 1 ? <span className="isActive true">ACTIVA</span> : <span className="isActive false">INACTIVA</span>}</td>
                <td>{getRolName(user.id_rol)}</td>
                <td className="account-actions">
                  <button onClick={() => handleEditClick(user)}>Modificar</button>
                  <button
                    onClick={() => handleDeleteClick(user)}
                    disabled={user.id_rol === 1}
                    className={user.id_rol === 1 ? "disabled-button" : ""}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AccountsPage;
