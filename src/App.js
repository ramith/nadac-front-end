import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchByDescription from './SearchByDescription';
import Login from './Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<SearchByDescription />} />
      </Routes>
    </div>
  );
}

export default App;