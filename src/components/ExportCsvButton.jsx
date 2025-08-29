import React from 'react';

const ExportCsvButton = ({ data, filename = 'export' }) => {
  const exportToCsv = () => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(data);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => 
          JSON.stringify(row[header] || '')
        ).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCsv}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center space-x-2"
    >
      <span>📊</span>
      <span>Export CSV</span>
    </button>
  );
};

export default ExportCsvButton;
