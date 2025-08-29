import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const Sparkline = ({ data, color = '#3B82F6' }) => {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={data}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Sparkline;
