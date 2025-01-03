import React from 'react';
import NavigationSidebar from '@/components/NavigationSidebar';

// Main layout component that provides the basic structure for all pages
const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <NavigationSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;
