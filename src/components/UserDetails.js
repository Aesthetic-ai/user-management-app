// src/components/UserDetails.js
import React from 'react';

const UserDetails = ({ user }) => {
    return (
        <div>
            <h2>User Details</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
            <p><strong>Website:</strong> {user.website}</p>
        </div>
    );
};

export default UserDetails;
