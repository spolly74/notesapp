import React from 'react';
import { FolderList } from '../../features/folders/components/FolderList';
import { TagList } from '../../features/tags/components/TagList';
import { ChatInterface } from '../../features/chat/components/ChatInterface';

export const MainLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-gray-50 p-4 space-y-6">
        <FolderList />
        <TagList />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  );
};
