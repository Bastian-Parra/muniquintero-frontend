import * as XLSX from 'xlsx';
import { convertDate } from "./ConvertTime.js";
import capitalizeFirstLetter from "./capitalizeFirstLetter.js";

export const generateEXCEL = ({ sortedReports }) => {
  const workbook = XLSX.utils.book_new();
  
  // Datos para Excel
  const excelData = sortedReports.map((report) => ({
    "Fecha": convertDate(report.report_date),
    "Hora Llamada": report.call_time,
    "Turno": capitalizeFirstLetter(report.shift.toLowerCase()),
    "Situación": capitalizeFirstLetter(report.situation.toLowerCase()),
    "Ubicación": capitalizeFirstLetter(report.location.toLowerCase()),
    "Institución Derivada": capitalizeFirstLetter(report.derived_report),
  }));

  // Convertir a hoja de trabajo
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  
  // Ajustar anchos de columnas
  worksheet['!cols'] = [
    { wch: 12 }, // Fecha
    { wch: 10 }, // Hora Llamada
    { wch: 10 }, // Turno
    { wch: 25 }, // Situación
    { wch: 25 }, // Ubicación
    { wch: 20 }  // Institución Derivada
  ];
  
  // Añadir hoja al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reportes");
  
  // Añadir hoja de metadatos
  const metadata = [
    ["Información del Reporte"],
    [""],
    ["Fecha de generación", new Date().toLocaleDateString('es-CL')],
    ["Hora de generación", new Date().toLocaleTimeString('es-CL')],
    ["Total de reportes", sortedReports.length],
    [""],
    ["Este archivo fue generado automáticamente por el sistema"]
  ];
  
  const metadataSheet = XLSX.utils.aoa_to_sheet(metadata);
  XLSX.utils.book_append_sheet(workbook, metadataSheet, "Información");
  
  // Generar nombre de archivo
  const now = new Date();
  const fileName = `reportes_${now.toISOString().split('T')[0]}.xlsx`;
  
  // Descargar
  XLSX.writeFile(workbook, fileName);
};