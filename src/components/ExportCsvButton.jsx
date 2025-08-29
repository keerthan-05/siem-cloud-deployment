import React from "react";
import { Download } from "lucide-react";

const ExportCsvButton = ({ data, filename = "export" }) => {
  const exportToCsv = () => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const rows = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")
      ),
    ].join("\n");

    // Add UTF-8 BOM for Excel compatibility
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").split("T").join("_").slice(0, -1);
    link.href = url;
    link.download = `${filename}_${timestamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const disabled = !data || data.length === 0;

  return (
    <button
      onClick={exportToCsv}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition ${
        !disabled
          ? "bg-green-500 hover:bg-green-600 text-white"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      <Download className="w-4 h-4" />
      <span>Export CSV</span>
    </button>
  );
};

export default ExportCsvButton;
