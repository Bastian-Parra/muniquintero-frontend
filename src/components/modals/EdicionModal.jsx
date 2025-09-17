import { useEffect } from "react";

function EdicionModal({ title, children, onClose, size = "md" }) {
  // Tamaños del modal
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className={`modal-container ${sizeClasses[size]}`}>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default EdicionModal;
