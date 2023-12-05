import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';

const SignIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signin', formData);
            console.log(response.data);
            // Redirect or handle login success
        } catch (error) {
            console.error(error.response.data);
            // Handle errors
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField label="Email" type="email" name="email" onChange={handleChange} />
            <TextField label="Password" type="password" name="password" onChange={handleChange} />
            <Button type="submit" variant="contained" color="primary">Sign In</Button>
        </form>
    );
};

export default SignIn;
