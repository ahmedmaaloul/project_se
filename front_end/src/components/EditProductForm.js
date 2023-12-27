import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Image } from 'react-bootstrap';

const EditProductForm = () => {
  const [product, setProduct] = useState({ label: '', description: '', price: '' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { id: productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
        if (response.data.image) {
          setImagePreview(`http://localhost:5000/uploads/${response.data.image}`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      // Preview the new image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // User cancelled file selection: revert back to original image
      setImage(null);
      if (product.image) {
        setImagePreview(`http://localhost:5000/uploads/${product.image}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('label', product.label);
    formData.append('description', product.description);
    console.log(product.price)
    if (product.price.$numberDecimal)
      formData.append('price', product.price.$numberDecimal);
    else
      formData.append('price', product.price);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/product-dashboard');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
       <Form.Group className="mb-3">
        <Form.Label>Label</Form.Label>
        <Form.Control type="text" name="label" value={product.label} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" name="description" value={product.description} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" name="price" value={product.price.$numberDecimal} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <div>
          <Image src={imagePreview} thumbnail style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
          <Form.Control type="file" onChange={handleImageChange} />
        </div>
      </Form.Group>
      <Button variant="success" type="submit">Update Product</Button>
    </Form>
  );
};

export default EditProductForm;


