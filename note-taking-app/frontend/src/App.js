// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import FolderList from './components/FolderList';
// Import other components

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <FolderList />
        {/* Other components */}
      </div>
    </Provider>
  );
}

export default App;
