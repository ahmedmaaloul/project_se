import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';

const SignIn = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signin', credentials);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <TextField label="Email" type="email" name="email" value={credentials.email} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Password" type="password" name="password" value={credentials.password} onChange={handleChange} fullWidth margin="normal" />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Sign In</Button>
        </form>
    );
};

const formStyle = { maxWidth: '500px', margin: 'auto', padding: '20px' };

export default SignIn;
