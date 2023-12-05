import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/request-reset-password', { email });
            console.log(response.data);
            // Show success message or handle redirect
        } catch (error) {
            console.error(error.response.data);
            // Handle errors (e.g., user not found)
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button type="submit" variant="contained" color="primary">Request Password Reset</Button>
        </form>
    );
};

export default RequestPasswordReset;
