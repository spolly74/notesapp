// src/components/FolderList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFolders,
  createFolder,
  updateFolder,
  deleteFolder,
  selectAllFolders,
  selectFolderStatus,
  selectFolderError
} from '../../features/folders/foldersSlice';

const FolderList = () => {
  const dispatch = useDispatch();
  const folders = useSelector(selectAllFolders);
  const status = useSelector(selectFolderStatus);
  const error = useSelector(selectFolderError);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFolders());
    }
  }, [status, dispatch]);

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      dispatch(createFolder({
        name: newFolderName,
        path: `/${newFolderName.toLowerCase().replace(/\s+/g, '-')}`
      }));
      setNewFolderName('');
    }
  };

  const handleDeleteFolder = (folderId) => {
    if (window.confirm('Are you sure you want to delete this folder?')) {
      dispatch(deleteFolder(folderId));
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Folders</h2>

      {/* Create new folder form */}
      <form onSubmit={handleCreateFolder}>
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New folder name"
        />
        <button type="submit">Create Folder</button>
      </form>

      {/* Folder list */}
      <ul>
        {folders.map((folder) => (
          <li key={folder._id}>
            {folder.name}
            <button onClick={() => handleDeleteFolder(folder._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderList;
