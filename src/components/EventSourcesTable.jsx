import React from 'react';

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
    <div className="bg-card rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-primary-light">
        <h3 className="text-lg font-medium text-gray-900">Top Alert Sources</h3>
      </div>
      <div className="overflow-y-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="hidden" />
          <tbody className="divide-y divide-gray-100">
            {sourceData.map((item, idx) => (
              <tr
                key={idx}
                className={`hover:bg-primary-light/10 ${idx % 2 === 0 ? 'bg-background' : ''}`}
              >
                <td className="px-6 py-4 text-sm text-gray-900">{item.source}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-primary-light text-primary rounded-full">
                    {item.count}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventSourcesTable;
