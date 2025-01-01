import React from 'react';
import { Search, User } from 'lucide-react';

// filepath: frontend/src/components/layout/Header.jsx
const Header = () => {
  return (
    <header className="h-12 border-b border-gray-200 bg-gray-50 flex items-center px-4">
      <div className="flex items-center w-48">
        <h1 className="text-lg font-semibold">Note App</h1>
      </div>

      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search notes and actions..."
            className="w-full px-4 py-1.5 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 px-3 py-1.5 rounded-md hover:bg-gray-100">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
