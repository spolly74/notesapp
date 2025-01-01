import React, { useState } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import ActionBar from './components/layout/ActionBar';
import NotePage from './components/notes/NotePage';
import { ChatProvider } from './context/ChatContext';

// filepath: frontend/src/App.jsx
const App = () => {
  const [selectedFolder, setSelectedFolder] = useState('Work');

  return (
    <ChatProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            selectedFolder={selectedFolder}
            onFolderSelect={setSelectedFolder}
          />
          <main className="flex-1 bg-white overflow-y-auto">
            <NotePage />
          </main>
          <ActionBar />
        </div>
      </div>
    </ChatProvider>
  );
};

export default App;
