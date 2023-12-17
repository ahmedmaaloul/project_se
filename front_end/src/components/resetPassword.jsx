import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/reset-password/${token}`, { newPassword });
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <TextField label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} fullWidth margin="normal" />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Reset Password</Button>
        </form>
    );
};

const formStyle = { maxWidth: '500px', margin: 'auto', padding: '20px' };

export default ResetPassword;
