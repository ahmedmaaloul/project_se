import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#007bff', color: 'white' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>ToutVente</Link>
            <div>
                <Link to="/signup" style={{ marginRight: '10px', color: 'white', textDecoration: 'none' }}>Sign Up</Link>
                <Link to="/signin" style={{ color: 'white', textDecoration: 'none' }}>Sign In</Link>
            </div>
        </nav>
    );
};

export default Navbar;
