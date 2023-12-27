// components/FooterComponent.js
import React from 'react';
import { Container } from 'react-bootstrap';

const FooterComponent = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-4">
      <Container className="p-4">
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2023 ToutVente
        </div>
      </Container>
    </footer>
  );
};

export default FooterComponent;
