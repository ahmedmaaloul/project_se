import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
          <Nav className="me-auto">
            {console.log(user)}
            {user ? (
              <>
                {user.admin && <Button onClick={() => navigate('/product-dashboard')}>Product Dashboard</Button>}
                {!user.admin && <Button onClick={() => navigate('/cart')}>Cart</Button>}
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate('/signin')}>Login</Button>
                <Button onClick={() => navigate('/signup')}>Signup</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
