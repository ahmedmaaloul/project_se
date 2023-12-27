// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Container, Alert, FormControl } from 'react-bootstrap';

const Home = ({ currentUser }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Include searchTerm in the API request
        const response = await axios.get(`http://localhost:5000/api/products?search=${searchTerm}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
    fetchCart();
  }, [currentUser, searchTerm]); // Include searchTerm as a dependency

  const fetchCart = async () => {
    if (currentUser) {
      try {
        const response = await axios.get('http://localhost:5000/api/cart/my', {
          headers: { Authorization: localStorage.getItem('token') }
        });
        setCartItems(response.data.items.map(item => item.product._id));
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }
  };

  const addToCart = async (productId) => {
    if (!currentUser) {
      alert('Please login to add items to the cart');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        userId: currentUser.id,
        productId,
        quantity: 1
      }, {
        headers: { Authorization: localStorage.getItem('token') }
      });

      // Fetch the updated cart data after adding the item
      fetchCart();
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const isInCart = (productId) => {
    return cartItems.includes(productId);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <Container>
      <FormControl
        type="text"
        placeholder="Search products..."
        className="mb-4"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {products.length > 0 ? (
        <Row>
          {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Card className="mb-4">
                <Card.Img variant="top" src={`http://localhost:5000/uploads/${product.image}`} />
                <Card.Body>
                  <Card.Title>{product.label}</Card.Title>
                  <Card.Text>€{product.price && product.price.$numberDecimal}</Card.Text>
                  {!currentUser?.admin && (
                    isInCart(product._id) ? 
                      <Button variant="secondary" disabled>In Cart</Button> :
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