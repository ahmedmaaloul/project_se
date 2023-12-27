import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const CreateProductForm = () => {
  const [productData, setProductData] = useState({ label: '', description: '', price: '' });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('label', productData.label);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/product-dashboard');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div class="container"> 
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Label</Form.Label>
        <Form.Control type="text" name="label" value={productData.label} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" name="description" value={productData.description} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" name="price" value={productData.price} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} />
      </Form.Group>
      <Button variant="primary" type="submit">Create Product</Button>
    </Form>
    </div>
  );
};

export default CreateProductForm;
