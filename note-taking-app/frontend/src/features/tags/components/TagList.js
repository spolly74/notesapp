// src/features/tags/components/TagList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags, selectAllTags, selectTagStatus, selectTagError } from '../tagsSlice';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { ErrorAlert } from '../../../components/common/ErrorAlert';
import { TagItem } from './TagItem';
import { CreateTagForm } from './CreateTagForm';

export const TagList = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectAllTags);
  const status = useSelector(selectTagStatus);
  const error = useSelector(selectTagError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTags());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Tags</h2>
      <CreateTagForm />
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <TagItem key={tag._id} tag={tag} />
        ))}
      </div>
    </div>
  );
};

// src/features/tags/components/TagItem.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTag, updateTag } from '../tagsSlice';
import { Button } from '../../../components/common/Button';

export const TagItem = ({ tag }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(tag.name);
  const [color, setColor] = useState(tag.color);

  const handleUpdate = () => {
    dispatch(updateTag({
      id: tag._id,
      name,
      color
    }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      dispatch(deleteTag(tag._id));
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-2 py-1 border rounded"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8"
        />
        <Button onClick={handleUpdate}>Save</Button>
        <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
      </div>
    );
  }

  return (
    <div
      className="flex items-center space-x-2 px-3 py-1 rounded-full"
      style={{ backgroundColor: `${tag.color}20`, borderColor: tag.color }}
    >
      <span className="text-sm font-medium" style={{ color: tag.color }}>
        {tag.name}
      </span>
      <button onClick={() => setIsEditing(true)} className="text-gray-500 hover:text-gray-700">
        ✎
      </button>
      <button onClick={handleDelete} className="text-gray-500 hover:text-gray-700">
        ×
      </button>
    </div>
  );
};

// src/features/tags/components/CreateTagForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTag } from '../tagsSlice';
import { Button } from '../../../components/common/Button';

export const CreateTagForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3B82F6'); // Default blue color

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(createTag({ name, color }));
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New tag name"
        className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-10 h-10"
      />
      <Button type="submit" disabled={!name.trim()}>
        Create Tag
      </Button>
    </form>
  );
};
