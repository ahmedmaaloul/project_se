import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Importing the shopping cart icon

const NavbarComponent = ({ user, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/signin');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')}>ToutVente</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                {user.admin && <Button variant="link" onClick={() => navigate('/product-dashboard')} className="text-dark text-decoration-none">Product Dashboard</Button>}
                {!user.admin && (
                  <Button variant="link" onClick={() => navigate('/cart')} className="text-dark text-decoration-none">
                    <FaShoppingCart /> Cart
                  </Button>
                )}
                <Button variant="link" onClick={handleLogout} className="text-dark ">Logout</Button>
              </>
            ) : (
              <>
                <Button variant="link" onClick={() => navigate('/signin')} className="text-dark">Login</Button>
                <Button variant="link" onClick={() => navigate('/signup')} className="text-dark">Signup</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
