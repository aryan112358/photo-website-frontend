import { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
    const { user } = useAuth();

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4">Profile</Typography>
                <Typography>Username: {user?.username}</Typography>
                <Typography>Email: {user?.email}</Typography>
            </Box>
        </Container>
    );
} 