import React from 'react';
import { Folder, Plus } from 'lucide-react';

// filepath: frontend/src/components/layout/Sidebar.jsx
const Sidebar = ({ selectedFolder, onFolderSelect }) => {
  return (
    <aside className="w-48 bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-sm">Folders</h2>
          <button className="p-1 hover:bg-gray-200 rounded">
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-1">
          {['Work', 'Projects', 'Meetings'].map((folder) => (
            <button
              key={folder}
              onClick={() => onFolderSelect(folder)}
              className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-200 flex items-center ${
                selectedFolder === folder ? 'bg-gray-200' : ''
              }`}
            >
              <Folder className="h-4 w-4 mr-2" />
              {folder}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-sm">Tags</h2>
          <button className="p-1 hover:bg-gray-200 rounded">
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {['urgent', 'feature', 'review'].map((tag) => (
            <button
              key={tag}
              className="px-2 py-1 text-xs bg-gray-200 rounded-full hover:bg-gray-300"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
