import React, { useState } from 'react';
import { ChevronDown, Plus, Download, ArrowUpDown } from 'lucide-react';
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
  const [sortConfig, setSortConfig] = useState({
    key: 'dueDate',
    direction: 'asc'
  });

  // Sorting function
  const sortItems = (items) => {
    return [...items].sort((a, b) => {
      if (sortConfig.key === 'dueDate') {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return sortConfig.direction === 'asc'
          ? dateA - dateB
          : dateB - dateA;
      }

      if (sortConfig.key === 'effortLevel') {
        const effortOrder = { 'S': 1, 'M': 2, 'L': 3 };
        return sortConfig.direction === 'asc'
          ? effortOrder[a.effortLevel] - effortOrder[b.effortLevel]
          : effortOrder[b.effortLevel] - effortOrder[a.effortLevel];
      }

      if (sortConfig.key === 'status') {
        const statusOrder = { 'TODO': 1, 'IN_PROGRESS': 2, 'COMPLETED': 3 };
        return sortConfig.direction === 'asc'
          ? statusOrder[a.status] - statusOrder[b.status]
          : statusOrder[b.status] - statusOrder[a.status];
      }

      // Default title sort
      const valueA = a[sortConfig.key].toLowerCase();
      const valueB = b[sortConfig.key].toLowerCase();
      return sortConfig.direction === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  };

  const handleSort = (key) => {
    setSortConfig(prevSort => ({
      key,
      direction: prevSort.key === key && prevSort.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

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

  const sortedAndFilteredItems = sortItems(filteredItems);

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

      {/* Sort Controls */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleSort('dueDate')}
          className={`flex items-center px-2 py-1 text-sm rounded hover:bg-gray-100 ${
            sortConfig.key === 'dueDate' ? 'bg-gray-100' : ''
          }`}
        >
          Due Date
          <ArrowUpDown className="h-3 w-3 ml-1" />
        </button>
        <button
          onClick={() => handleSort('effortLevel')}
          className={`flex items-center px-2 py-1 text-sm rounded hover:bg-gray-100 ${
            sortConfig.key === 'effortLevel' ? 'bg-gray-100' : ''
          }`}
        >
          Effort
          <ArrowUpDown className="h-3 w-3 ml-1" />
        </button>
        <button
          onClick={() => handleSort('status')}
          className={`flex items-center px-2 py-1 text-sm rounded hover:bg-gray-100 ${
            sortConfig.key === 'status' ? 'bg-gray-100' : ''
          }`}
        >
          Status
          <ArrowUpDown className="h-3 w-3 ml-1" />
        </button>
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
        {sortedAndFilteredItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No action items found
          </div>
        ) : (
          sortedAndFilteredItems.map(item => (
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
