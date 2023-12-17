import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import './style.css';
const SignUp = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthdate: ''
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signup', userData);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <div style={formContainerStyle}>
        <h1 className="animated-title">Sign Up</h1> {/* Title with animation */}
        <form onSubmit={handleSubmit} style={formStyle}>
            <TextField label="Email" type="email" name="email" value={userData.email} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Password" type="password" name="password" value={userData.password} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="First Name" name="firstName" value={userData.firstName} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Last Name" name="lastName" value={userData.lastName} onChange={handleChange} fullWidth margin="normal" />

            <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={userData.gender} onChange={handleChange}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </Select>
            </FormControl>

            <TextField label="Birthdate" type="date" name="birthdate" value={userData.birthdate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />

            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Sign Up</Button>
        </form>
    </div>
        
    );
};

const formStyle = { maxWidth: '500px', margin: 'auto', padding: '20px' };
const formContainerStyle = { maxWidth: '500px', margin: 'auto', padding: '20px', textAlign: 'center' };

export default SignUp;
