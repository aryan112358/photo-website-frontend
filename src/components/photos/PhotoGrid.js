import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { Favorite, Comment, ShoppingCart, Lock } from '@mui/icons-material';
import { getPhotos, likePhoto } from '../../services/photo.service';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthImage from '../common/AuthImage';

export default function PhotoGrid() {
    const [photos, setPhotos] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadPhotos();
    }, []);

    const loadPhotos = async () => {
        try {
            const response = await getPhotos();
            setPhotos(response.data.content || []);
        } catch (error) {
            console.error('Error loading photos:', error);
            setPhotos([]);
        }
    };

    const handleLike = async (photoId) => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            await likePhoto(photoId);
            loadPhotos();
        } catch (error) {
            console.error('Error liking photo:', error);
        }
    };

    return (
        <Grid container spacing={3}>
            {photos.map((photo) => (
                <Grid item xs={12} sm={6} md={4} key={photo.id}>
                    <Card>
                        <Box sx={{ position: 'relative' }}>
                            <AuthImage
                                photoId={photo.id}
                                fileName={photo.fileName}
                                alt={photo.title}
                                sx={{ 
                                    height: 200,
                                    cursor: 'pointer',
                                    filter: !photo.public && !user ? 'blur(5px)' : 'none'
                                }}
                                onClick={() => navigate(`/photos/${photo.id}`)}
                            />
                            {!photo.public && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        padding: 1,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    <Lock sx={{ color: 'white' }} />
                                </Box>
                            )}
                        </Box>
                        <CardContent>
                            <Typography variant="h6">
                                {photo.title}
                                {!photo.public && (
                                    <Lock sx={{ ml: 1, fontSize: '1rem', verticalAlign: 'middle' }} />
                                )}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {photo.description}
                            </Typography>
                            <Typography variant="caption" display="block">
                                By {photo.uploadedBy} • {new Date(photo.createdAt).toLocaleDateString()}
                            </Typography>
                            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconButton 
                                    onClick={() => handleLike(photo.id)}
                                    disabled={!user && !photo.public}
                                >
                                    <Favorite />
                                </IconButton>
                                <IconButton disabled={!user && !photo.public}>
                                    <Comment />
                                </IconButton>
                                {photo.price > 0 && (
                                    <IconButton 
                                        onClick={() => navigate(`/checkout/${photo.id}`)}
                                        disabled={!user && !photo.public}
                                    >
                                        <ShoppingCart />
                                        <Typography variant="caption" sx={{ ml: 1 }}>
                                            ${photo.price}
                                        </Typography>
                                    </IconButton>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
} 