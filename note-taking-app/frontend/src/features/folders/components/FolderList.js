// src/features/folders/components/FolderList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFolders, selectAllFolders, selectFolderStatus, selectFolderError } from '../foldersSlice';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { ErrorAlert } from '../../../components/common/ErrorAlert';
import { FolderItem } from './FolderItem';
import { CreateFolderForm } from './CreateFolderForm';

export const FolderList = () => {
  const dispatch = useDispatch();
  const folders = useSelector(selectAllFolders);
  const status = useSelector(selectFolderStatus);
  const error = useSelector(selectFolderError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFolders());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Folders</h2>
      <CreateFolderForm />
      <div className="space-y-2">
        {folders.map(folder => (
          <FolderItem key={folder._id} folder={folder} />
        ))}
      </div>
    </div>
  );
};

// src/features/folders/components/FolderItem.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFolder, updateFolder } from '../foldersSlice';
import { Button } from '../../../components/common/Button';

export const FolderItem = ({ folder }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(folder.name);

  const handleUpdate = () => {
    dispatch(updateFolder({
      id: folder._id,
      name,
      path: `/${name.toLowerCase().replace(/\s+/g, '-')}`
    }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this folder?')) {
      dispatch(deleteFolder(folder._id));
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-2 py-1 border rounded"
        />
        <Button onClick={handleUpdate}>Save</Button>
        <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
      <span>{folder.name}</span>
      <div className="space-x-2">
        <Button variant="secondary" onClick={() => setIsEditing(true)}>Edit</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

// src/features/folders/components/CreateFolderForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFolder } from '../foldersSlice';
import { Button } from '../../../components/common/Button';

export const CreateFolderForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(createFolder({
        name,
        path: `/${name.toLowerCase().replace(/\s+/g, '-')}`
      }));
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New folder name"
        className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <Button type="submit" disabled={!name.trim()}>
        Create Folder
      </Button>
    </form>
  );
};
