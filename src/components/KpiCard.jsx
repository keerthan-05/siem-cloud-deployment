import React from "react";
import { motion } from "framer-motion";

// Map colors to Tailwind-safe classes
const colorMap = {
  blue: "bg-blue-500",
  red: "bg-red-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  yellow: "bg-yellow-500",
};

const KpiCard = ({ title, value, icon, color = "blue" }) => {
  const bgColor = colorMap[color] || "bg-blue-500";

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 ease-in-out"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center justify-between">
        {/* Left side: Title + Value */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>

        {/* Right side: Icon bubble */}
        <div
          className={`p-3 rounded-full ${bgColor} text-white flex items-center justify-center shadow`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default KpiCard;
