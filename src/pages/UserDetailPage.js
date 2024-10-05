// src/pages/UserDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

const UserDetailPage = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleEdit = () => {
    // Navigate to the AddUserForm page with the userId
    navigate(`/EditUserForm`, { state: { user } });
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  if (!user) {
    return <Typography variant="h6">User not found</Typography>;
  }

  return (
    <Card variant="outlined" style={{ margin: '20px', padding: '20px' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          User Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Name: {user.name}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Username: {user.username}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Email: {user.email}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Phone: {user.phone}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Website: {user.website}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Company: {user.company.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Address:</Typography>
            <Typography>
              {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}
            </Typography>
          </Grid>
        </Grid>
        <Button 
          variant="contained" 
          color="primary" 
          style={{ marginTop: '20px' }} 
          onClick={handleEdit} // Add onClick to handle editing
        >
          Edit User
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserDetailPage;
