import { useState } from "react";
import BaseModal from "./BaseModal.jsx";

function WelcomeModal({ isOpen, onClose, onNeverShowAgain }) {
  const [checked, setChecked] = useState(false)

  const handleStart = () => {
    if (checked) onNeverShowAgain()
    onClose()
  } 

  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onClose}
      title={"¡Bienvenido al administrador de Situaciones!"}
      className="modal-content-base"
      overlayClassName="modal-base"
      showClose={true}
    >
      <div className="modal-body-base">
        <ul>
          <li>Aquí podrás gestionar todas tus situaciones y categorías.</li>
          <li>
            Para comenzar, selecciona una categoría del menú lateral y luego
            podrás agregar, editar o eliminar situaciones dentro de esa
            categoría.
          </li>
          <li>
            <b>Nota: </b>Puedes agarrar y soltar situaciones al contenedor de la
            derecha para una experiencia más fluida.
          </li>
          <li>
            Si necesitas ayuda, consulta la documentación o contacta al soporte.
          </li>
        </ul>
        <div className="modal-actions">
          <div>
            <label
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              No volver a mostrar
            </label>
          </div>
          <button className="modal-btn confirm" onClick={handleStart}>
            Comenzar
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

export default WelcomeModal;
