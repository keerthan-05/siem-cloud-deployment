import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

const Sparkline = ({ data, color = "#3B82F6" }) => {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "none",
            borderRadius: "6px",
            color: "#f9fafb",
            fontSize: "12px",
          }}
          labelStyle={{ display: "none" }}
          cursor={{ stroke: "#9ca3af", strokeDasharray: "3 3" }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill="url(#sparklineGradient)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Sparkline;
