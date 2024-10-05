// src/api.js

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Fetch all users
export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  return response.json(); // Parses response to JSON
};

// Fetch a single user by ID
export const fetchUserById = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  return response.json(); // Parses response to JSON
};

// Create a new user
export const createUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json(); // Parses response to JSON
};

// Update a user
export const updateUser = async (userId, userData) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json(); // Parses response to JSON
};

// Delete a user
export const deleteUser = async (userId) => {
  await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'DELETE',
  });
  return true; // Return success
};
