import React from 'react';
import { Folder, Tag, Clock, CheckSquare, MessageSquare, Plus } from 'lucide-react';
import Link from 'next/link';

const NavigationSidebar = () => {
  return (
    <nav className="w-64 bg-white border-r border-gray-200 p-4">
      {/* App title and user section at the top */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Note App</h2>
        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">User Profile</p>
        </div>
      </div>

      {/* Navigation links - each with an icon and label */}
      <div className="space-y-1">
        {[
          { href: '/folders', icon: Folder, label: 'Folders' },
          { href: '/tags', icon: Tag, label: 'Tags' },
          { href: '/recent', icon: Clock, label: 'Recent Notes' },
          { href: '/tasks', icon: CheckSquare, label: 'Action Items' },
          { href: '/chat', icon: MessageSquare, label: 'AI Chat' }
        ].map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* New Note button at the bottom */}
      <button className="mt-8 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <Plus className="w-5 h-5" />
        <span>New Note</span>
      </button>
    </nav>
  );
};

export default NavigationSidebar;
