import { useState } from "react";
import { uploadReportsExcel } from "../../api/reports.js";

export default function ExcelUploader({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("excel", file);
    setStatus("Subiendo...");
    try {
      const res = await uploadReportsExcel(formData)

      setStatus(`Insertados: ${res.data.inserted}, Errores: ${res.data.errors.length}`);
      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      setStatus("Error al subir el archivo");
      console.log(err)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".xlsx,.xls" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Subir Excel</button>
      <div>{status}</div>
    </form>
  );
}