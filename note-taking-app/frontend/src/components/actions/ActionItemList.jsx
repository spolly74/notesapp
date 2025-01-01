import React, { useState } from 'react';
import { ChevronDown, Plus, Download } from 'lucide-react';
import ActionItemCard from './ActionItemCard';
import ActionItemForm from './ActionItemForm';

// filepath: frontend/src/components/actions/ActionItemList.jsx
const ActionItemList = () => {
  const [actionItems, setActionItems] = useState([
    {
      id: 1,
      title: 'Update API docs',
      description: 'Update the API documentation with new endpoints',
      dueDate: '2025-01-02',
      effortLevel: 'M',
      status: 'TODO'
    },
    {
      id: 2,
      title: 'Review feedback',
      description: 'Go through user feedback from latest release',
      dueDate: '2025-01-05',
      effortLevel: 'S',
      status: 'TODO'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');

  const handleSave = (formData) => {
    if (selectedItem) {
      setActionItems(actionItems.map(item =>
        item.id === selectedItem.id ? { ...formData, id: item.id } : item
      ));
    } else {
      setActionItems([...actionItems, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
    setSelectedItem(null);
  };

  const handleStatusChange = (itemId, newStatus) => {
    setActionItems(actionItems.map(item =>
      item.id === itemId ? { ...item, status: newStatus } : item
    ));
  };

  const exportToCsv = () => {
    const headers = ['Title', 'Description', 'Due Date', 'Effort Level', 'Status'];
    const csvContent = [
      headers.join(','),
      ...actionItems.map(item => [
        item.title,
        item.description,
        item.dueDate,
        item.effortLevel,
        item.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'action-items.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredItems = actionItems.filter(item => {
    if (filterStatus === 'ALL') return true;
    return item.status === filterStatus;
  });

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">Action Items</h2>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm border-none bg-gray-100 rounded px-2 py-1"
          >
            <option value="ALL">All</option>
            <option value="TODO">To Do</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={exportToCsv}
            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"
            title="Export to CSV"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setSelectedItem(null);
              setShowForm(true);
            }}
            className="flex items-center px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Item
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-4">
          <ActionItemForm
            initialData={selectedItem}
            onSave={handleSave}
            onClose={() => {
              setShowForm(false);
              setSelectedItem(null);
            }}
          />
        </div>
      )}

      <div className="space-y-2 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No action items found
          </div>
        ) : (
          filteredItems.map(item => (
            <ActionItemCard
              key={item.id}
              {...item}
              onStatusChange={(newStatus) => handleStatusChange(item.id, newStatus)}
              onClick={() => {
                setSelectedItem(item);
                setShowForm(true);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ActionItemList;
