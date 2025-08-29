import React from "react";
import { ShieldAlert } from "lucide-react";

const EventsTable = ({ alerts }) => {
  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <ShieldAlert className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Recent Security Events
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Timestamp</th>
              <th className="px-6 py-3 text-left font-medium">Severity</th>
              <th className="px-6 py-3 text-left font-medium">Source</th>
              <th className="px-6 py-3 text-left font-medium">Message</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {alerts.length > 0 ? (
              alerts.map((alert, idx) => (
                <tr
                  key={alert.id || idx}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {new Date(alert.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${getSeverityColor(
                        alert.severity
                      )}`}
                    >
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {alert.source}
                  </td>
                  <td className="px-6 py-3 text-gray-700 dark:text-gray-300 max-w-xs truncate">
                    {alert.message}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-500 dark:text-gray-400">
                    {alert.status || "Open"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsTable;
