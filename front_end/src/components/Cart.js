// Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup, Button, Row, Col, Badge } from 'react-bootstrap';

const Cart = ({ currentUser }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, [currentUser]);

  const fetchCart = async () => {
    if (currentUser) {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/my`, {
          headers: { Authorization: localStorage.getItem('token') }
        });
        setCartItems(response.data.items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemove(productId);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/cart/update-quantity', {
        userId: currentUser.id,
        productId,
        quantity: newQuantity
      }, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setCartItems(cartItems.map(item =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.post('http://localhost:5000/api/cart/remove', {
        userId: currentUser.id,
        productId
      }, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setCartItems(cartItems.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * parseFloat(item.product.price.$numberDecimal);
    }, 0);
  };

  const handleBuy = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/generate-invoice', {
        cartItems
      }, {
        responseType: 'blob', 
        headers: { Authorization: localStorage.getItem('token') }
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();

      await clearCart();
      alert('Invoice generated and cart cleared.');
    } catch (error) {
      console.error('Error during the purchase process:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.post('http://localhost:5000/api/cart/clear', {
        userId: currentUser.id
      }, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const total = calculateTotal();

  return (
    <Container>
      <h2>Your Cart</h2>
      <ListGroup>
        {cartItems.map((item) => (
          <ListGroup.Item key={item.product._id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{item.product.label}</strong> - €{item.product.price.$numberDecimal} x {item.quantity}
            </div>
            <div>
              <Button className='me-1' variant="info" size="sm" onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</Button>
              <Button className='me-1' variant="info" size="sm" onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>-</Button>
              <Button variant="danger" size="sm" onClick={() => handleRemove(item.product._id)}>Remove</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Row className="mt-4">
        <Col>
          <h4>Total Price: <Badge bg="success">€{total.toFixed(2)}</Badge></h4>
        </Col>
      </Row>
      {total > 0 && (
        <Button variant="primary" onClick={handleBuy}>Buy</Button>
      )}
    </Container>
  );
};

export default Cart;
