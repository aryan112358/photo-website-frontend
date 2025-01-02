import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function AuthImage({ photoId, fileName, alt, sx = {}, onClick }) {
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        let isMounted = true;

        const loadImage = async () => {
            // Try different endpoint patterns
            const endpoints = [
                `/photos/${photoId}/image`,           // Pattern 1
                `/photos/file/${fileName}`,           // Pattern 2
                `/photos/${photoId}/file/${fileName}` // Pattern 3
            ];

            for (const endpoint of endpoints) {
                try {
                    console.log('Trying endpoint:', endpoint); // Debug log
                    
                    const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'image/jpeg,image/*',
                        },
                        credentials: 'include' // Include cookies if needed
                    });

                    if (response.ok) {
                        const blob = await response.blob();
                        if (isMounted) {
                            const objectUrl = URL.createObjectURL(blob);
                            setImageUrl(objectUrl);
                            setLoading(false);
                            return; // Success! Exit the loop
                        }
                    }
                } catch (error) {
                    console.error('Error with endpoint', endpoint, ':', error);
                }
            }

            // If we get here, all endpoints failed
            if (isMounted) {
                setError('Failed to load image from any endpoint');
                setLoading(false);
            }
        };

        if (photoId && fileName) {
            loadImage();
        }

        return () => {
            isMounted = false;
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [photoId, fileName, token]);

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                height: sx.height || '200px',
                width: '100%'
            }}>
                <CircularProgress />
                <Typography variant="caption" sx={{ mt: 1 }}>
                    Loading image...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                height: sx.height || '200px',
                width: '100%',
                bgcolor: 'grey.100'
            }}>
                <Typography color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box 
            sx={{ 
                position: 'relative',
                width: '100%',
                ...sx 
            }} 
            onClick={onClick}
        >
            <img
                src={imageUrl}
                alt={alt}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
                onError={(e) => {
                    console.error('Image display error');
                    setError('Failed to display image');
                }}
            />
        </Box>
    );
} 