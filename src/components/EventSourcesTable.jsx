import React from "react";
import { Database } from "lucide-react"; // nice icon for sources

const EventSourcesTable = ({ alerts }) => {
  const sourceCounts = alerts.reduce((acc, alert) => {
    acc[alert.source] = (acc[alert.source] || 0) + 1;
    return acc;
  }, {});

  const sourceData = Object.entries(sourceCounts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <Database className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Top Alert Sources
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-y-auto max-h-96">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
            <tr>
              <th className="px-6 py-3 text-left font-medium">#</th>
              <th className="px-6 py-3 text-left font-medium">Source</th>
              <th className="px-6 py-3 text-left font-medium">Count</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sourceData.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {idx + 1}
                </td>
                <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">
                  {item.source}
                </td>
                <td className="px-6 py-3">
                  <span className="inline-flex px-2.5 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full">
                    {item.count}
                  </span>
                </td>
              </tr>
            ))}
            {sourceData.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventSourcesTable;
