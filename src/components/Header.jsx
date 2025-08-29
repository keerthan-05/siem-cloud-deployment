import React, { useEffect, useState } from "react";
import { Shield } from "lucide-react";

const Header = ({ onLogout }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Title */}
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              SIEM Dashboard
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6 text-gray-600 dark:text-gray-300">
            <span className="text-sm">
              Last updated: {time.toLocaleTimeString()}
            </span>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg shadow transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
