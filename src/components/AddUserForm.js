// src/components/AddUserForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AddUserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get('userId');

  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    company: '',
    street: '',
    city: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data = await response.json();
        setUserData({
          name: data.name,
          username: data.username,
          email: data.email,
          phone: data.phone,
          website: data.website,
          company: data.company.name,
          street: data.address.street,
          city: data.address.city,
        });
      }
    };
    fetchUser();
  }, [userId]); // Depend on userId to refetch when it changes

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userPayload = {
      ...userData,
      address: {
        street: userData.street,
        city: userData.city,
      },
      company: {
        name: userData.company,
      },
    };

    try {
      if (userId) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
          method: 'PUT',
          body: JSON.stringify(userPayload),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to update user');

        const updatedUser = await response.json();
        navigate(`/user/${updatedUser.id}`); // Redirect to the updated user
      } else {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          body: JSON.stringify(userPayload),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to create user');

        const newUser = await response.json();
        navigate(`/user/${newUser.id}`); // Redirect to the new user
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{userId ? 'Edit User' : 'Add User'}</h2>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={userData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={userData.username} readOnly />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={userData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Phone:</label>
        <input type="tel" name="phone" value={userData.phone} onChange={handleChange} required />
      </div>
      <div>
        <label>Website:</label>
        <input type="url" name="website" value={userData.website} onChange={handleChange} />
      </div>
      <div>
        <label>Company:</label>
        <input type="text" name="company" value={userData.company} onChange={handleChange} />
      </div>
      <div>
        <label>Street:</label>
        <input type="text" name="street" value={userData.street} onChange={handleChange} required />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={userData.city} onChange={handleChange} required />
      </div>
      <button type="submit">{userId ? 'Update User' : 'Add User'}</button>
    </form>
  );
};

export default AddUserForm;
