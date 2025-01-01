import React from 'react';
import { Clock, CheckCircle, Circle } from 'lucide-react';

// filepath: frontend/src/components/actions/ActionItemCard.jsx
const ActionItemCard = ({
  title,
  description,
  dueDate,
  effortLevel,
  status,
  onStatusChange,
  onClick
}) => {
  const getEffortColor = (effort) => {
    switch(effort) {
      case 'S': return 'bg-green-100 text-green-800';
      case 'M': return 'bg-yellow-100 text-yellow-800';
      case 'L': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    const today = new Date();
    const dueDate = new Date(date);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (dueDate.toDateString() === today.toDateString()) return 'Today';
    if (dueDate.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return dueDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div
      className="p-3 bg-white rounded border border-gray-200 hover:border-gray-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange(status === 'COMPLETED' ? 'TODO' : 'COMPLETED');
            }}
            className="mt-1"
          >
            {status === 'COMPLETED' ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <Circle className="h-4 w-4 text-gray-400" />
            )}
          </button>
          <div>
            <h3 className={`text-sm font-medium ${status === 'COMPLETED' ? 'line-through text-gray-500' : ''}`}>
              {title}
            </h3>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getEffortColor(effortLevel)}`}>
          {effortLevel}
        </span>
      </div>
      <div className="flex items-center mt-2 text-xs text-gray-500">
        <Clock className="h-3 w-3 mr-1" />
        <span>Due {formatDate(dueDate)}</span>
      </div>
    </div>
  );
};

export default ActionItemCard;
