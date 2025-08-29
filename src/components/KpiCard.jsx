import React from 'react';

const colorMap = {
  blue: 'primary',
  red: 'error',
  green: 'success',
  purple: 'accent',
  yellow: 'warning'
};

const KpiCard = ({ title, value, icon, color = 'blue' }) => {
  const bgColor = colorMap[color];
  return (
    <div className="bg-card rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-${bgColor} text-white text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
