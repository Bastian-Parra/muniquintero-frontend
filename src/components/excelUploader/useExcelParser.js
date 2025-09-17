import { useState } from "react";
import { readExcelFile } from "../../api/export.js"

export default function useExcelParser() {
  const [file, setFile] = useState(null)
  const [previewData, setPreviewData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    setFile(file)

    const data = await parseExcelForPreview(file)
    setPreviewData(data)
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    try {
      await readExcelFile(file)
    } catch (error) {
      setLoading(false)
    }
  }

  return { file, previewData, handleFileChange, handleUpload, loading }
}