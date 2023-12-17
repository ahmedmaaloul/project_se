import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/signup';
import SignIn from './components/signin';
// Import other components as needed

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: '80vh' }}> {/* Content area */}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {/* Add other routes here */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
