// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../api';
import { Link } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Alert,
} from '@mui/material';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      setError('Error deleting user');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <CircularProgress />; // Loading spinner
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>; // Error handling
  }

  return (
    <Grid container justifyContent="center" style={{ padding: '20px' }}>
      <Grid item xs={12} sm={10} md={8}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleSearch}
          value={searchTerm}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Link to={`/user/${user.id}`}>
                    <Button variant="outlined">View</Button>
                  </Link>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default Home;
