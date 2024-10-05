// src/components/AddUserForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';

const AddUserForm = () => {
  const location = useLocation();
  const { user } = location.state || {}; // Get user data from the state
  const navigate = useNavigate();

  const [name, setName] = useState(user ? user.name : '');
  const [username, setUsername] = useState(user ? user.username : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [website, setWebsite] = useState(user ? user.website : '');
  const [address, setAddress] = useState(user ? user.address : { street: '', city: '', suite: '', zipcode: '' });
  const [company, setCompany] = useState(user ? user.company.name : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      username,
      email,
      phone,
      website,
      address,
      company: { name: company },
    };

    try {
      if (user) {
        // Update existing user
        await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
          method: 'PUT',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        // Create new user
        await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      navigate('/'); // Navigate back to home after submit
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <Typography variant="h4">{user ? 'Edit User' : 'Add User'}</Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginBottom: '20px', width: '100%' }}
        />
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          InputProps={{ readOnly: true }} // Make the username field non-editable
          style={{ marginBottom: '20px', width: '100%' }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: '20px', width: '100%' }}
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{ marginBottom: '20px', width: '100%' }}
        />
        <TextField
          label="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          style={{ marginBottom: '20px', width: '100%' }}
        />
        <TextField
          label="Street"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          required
          style={{ marginBottom: '20px', width: '100%' }}
        />
        <TextField
          label="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          required
          style={{ marginBottom: '20px', width: '100%' }}
        />
        <TextField
          label="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ marginBottom: '20px', width: '100%' }}
        />
        <Button type="submit" variant="contained" color="primary">
          {user ? 'Update User' : 'Add User'}
        </Button>
      </form>
    </div>
  );
};

export default AddUserForm;
