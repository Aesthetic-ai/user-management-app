// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Drawer } from '@mui/material';

const UserForm = ({ open, onClose, onSubmit, user }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState({ street: '', city: '' });
    const [companyName, setCompanyName] = useState('');
    const [website, setWebsite] = useState('');
    const [error, setError] = useState({});

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setAddress(user.address);
            setCompanyName(user.company.name);
            setWebsite(user.website);
        } else {
            setName('');
            setEmail('');
            setPhone('');
            setAddress({ street: '', city: '' });
            setCompanyName('');
            setWebsite('');
        }
    }, [user]);

    const validateForm = () => {
        let errors = {};
        if (!name || name.length < 3) errors.name = 'Name is required and should have at least 3 characters';
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Email is required and must be valid';
        if (!phone.match(/^[0-9]+$/)) errors.phone = 'Phone is required and must be valid';
        if (!address.street || !address.city) errors.address = 'Address is required';
        if (companyName && companyName.length < 3) errors.companyName = 'Company name must have at least 3 characters';
        if (website && !website.match(/^(ftp|http|https):\/\/[^ "]+$/)) errors.website = 'Website must be a valid URL';
        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit({
                name,
                email,
                phone,
                address,
                company: { name: companyName },
                website,
                username: `USER-${name.toLowerCase()}`,
            });
            onClose();
        }
    };

    return (
        <Drawer anchor='right' open={open} onClose={onClose}>
            <div style={{ padding: '20px', width: '300px' }}>
                <h2>{user ? '' : 'Create User'}</h2>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!error.name}
                    helperText={error.name}
                    fullWidth
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error.email}
                    helperText={error.email}
                    fullWidth
                />
                <TextField
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={!!error.phone}
                    helperText={error.phone}
                    fullWidth
                />
                <TextField
                    label="Street"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    error={!!error.address}
                    helperText={error.address}
                    fullWidth
                />
                <TextField
                    label="City"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    error={!!error.address}
                    helperText={error.address}
                    fullWidth
                />
                <TextField
                    label="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    error={!!error.companyName}
                    helperText={error.companyName}
                    fullWidth
                />
                <TextField
                    label="Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    error={!!error.website}
                    helperText={error.website}
                    fullWidth
                />
                <Button onClick={handleSubmit} variant="contained">
                    {user ? 'Update' : 'Create'}
                </Button>
            </div>
        </Drawer>
    );
};

export default UserForm;
