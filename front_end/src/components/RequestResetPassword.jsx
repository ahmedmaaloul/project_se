import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const RequestResetPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/request-reset-password', { email });
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Request Password Reset</Button>
        </form>
    );
};

const formStyle = { maxWidth: '500px', margin: 'auto', padding: '20px' };

export default RequestResetPassword;
