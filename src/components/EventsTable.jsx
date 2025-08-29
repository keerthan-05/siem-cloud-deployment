import React from 'react';

const EventsTable = ({ alerts }) => {
  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-error bg-error-light';
      case 'medium': return 'text-warning bg-warning-light';
      case 'low': return 'text-success bg-success-light';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-primary-light">
        <h3 className="text-lg font-medium text-gray-900">Recent Security Events</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="hidden" />
          <tbody className="divide-y divide-gray-100">
            {alerts.map((alert, idx) => (
              <tr
                key={alert.id || idx}
                className={`hover:bg-primary-light/10 ${idx % 2 === 0 ? 'bg-background' : ''}`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(alert.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.source}</td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{alert.message}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.status || 'Open'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsTable;
