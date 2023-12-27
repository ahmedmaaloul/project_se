import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Container, Alert } from 'react-bootstrap';

const Home = ({ currentUser }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    if (!currentUser) {
      alert('Please login to add items to the cart');
      return;
    }

    try {
      await axios.post('/api/cart/add', {
        userId: currentUser.id,
        productId: productId,
        quantity: 1
      }, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <Container>
      {products.length > 0 ? (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <Card.Img variant="top" src={`http://localhost:5000/uploads/${product.image}`} />
                <Card.Body>
                  <Card.Title>{product.label}</Card.Title>
                  <Card.Text>€{product.price && product.price.$numberDecimal}</Card.Text>
                  {!currentUser?.admin && (
                    <Button variant="primary" onClick={() => addToCart(product._id)}>Add to Cart</Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">No products available. Check back later!</Alert>
      )}
    </Container>
  );
};

export default Home;
