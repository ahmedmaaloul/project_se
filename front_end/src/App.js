import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import ProductDashboard from './components/ProductDashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import CreateProductForm from './components/CreateProductForm';
import EditProductForm from './components/EditProductForm';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      localStorage.removeItem('user'); // Remove invalid data
    }
  }, []);

  return (
    <Router>
      <NavbarComponent user={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/signin" element={<SignIn setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<SignUp />} />
        {currentUser?.admin && <Route path="/product-dashboard" element={<ProductDashboard />} />}
        {currentUser?.admin && <Route path="/create-product" element={<CreateProductForm />} />}
        {currentUser?.admin && <Route path="/edit-product/:id" element={<EditProductForm/>}/>}
        {/* Other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
