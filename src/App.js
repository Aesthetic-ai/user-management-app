// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Make sure you have a Home component
import UserDetailPage from './pages/UserDetailPage';
import AddUserForm from './components/AddUserForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:userId" element={<UserDetailPage />} />
        <Route path="/add-user" element={<AddUserForm />} />
      </Routes>
    </Router>
  );
};

export default App;
