import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EventsLineChart = ({ data }) => {
  return (
    <div className="chart-container">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Alert Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="alerts" stroke="#EF4444" strokeWidth={2} />
          <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EventsLineChart;
