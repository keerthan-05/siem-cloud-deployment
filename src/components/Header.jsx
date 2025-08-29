import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <header className="bg-card shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-semibold text-primary">🛡️ SIEM Dashboard</h1>
          <div className="flex items-center space-x-6 text-gray-600">
            <span className="text-sm">Last updated: {new Date().toLocaleTimeString()}</span>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-error text-white text-sm rounded hover:bg-error-dark transition"
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
