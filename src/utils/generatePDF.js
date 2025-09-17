import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { convertDate } from "./ConvertTime.js";
import capitalizeFirstLetter from "./capitalizeFirstLetter.js"

import "jspdf-autotable";

export const generatePDF = ({ sortedReports }) => {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text(
    "Reportes Filtrados:" + new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    14,
    22
  );

  const filteredData = sortedReports.map((report) => [
    convertDate(report.report_date),
    report.call_time,
    capitalizeFirstLetter(report.shift.toLowerCase()),
    capitalizeFirstLetter(report.situation.toLowerCase()),
    capitalizeFirstLetter(report.location.toLowerCase()),
    capitalizeFirstLetter(report.derived_report),
  ]);

  const columns = [
    "Fecha",
    "Hora Llamada",
    "Turno",
    "Situación",
    "Ubicación",
    "Institución Derivada",
  ];

  autoTable(doc, {
    head: [columns],
    body: filteredData,
    startY: 30,
    theme: "grid",
    styles: { fontSize: 10, halign: "center", fontColor: "#000" },
    headStyles: { fillColor: "303030" },
    columnStyles: {
      0: { halign: "center" },
      1: { halign: "center" },
      2: { halign: "center" },
      3: { halign: "center" },
      4: { halign: "center" },
      5: { halign: "center" },
    },
  });

  doc.save(`reports.pdf`);
};
