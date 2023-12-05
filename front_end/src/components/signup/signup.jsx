import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthdate: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signup', formData);
            console.log(response.data);
            // Redirect or show success message
        } catch (error) {
            console.error(error.response.data);
            // Handle errors
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField label="Email" type="email" name="email" onChange={handleChange} />
            <TextField label="Password" type="password" name="password" onChange={handleChange} />
            <TextField label="First Name" name="firstName" onChange={handleChange} />
            <TextField label="Last Name" name="lastName" onChange={handleChange} />

            <FormControl>
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={formData.gender} onChange={handleChange}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </Select>
            </FormControl>

            <TextField type="date" name="birthdate" onChange={handleChange} />

            <Button type="submit" variant="contained" color="primary">Sign Up</Button>
        </form>
    );
};

export default SignUp;
