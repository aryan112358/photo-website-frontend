import { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { Favorite, Comment, ShoppingCart } from '@mui/icons-material';
import { getPhotos, likePhoto } from '../../services/photo.service';
import { useAuth } from '../../context/AuthContext';

export default function PhotoGrid() {
    const [photos, setPhotos] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        loadPhotos();
    }, []);

    const loadPhotos = async () => {
        try {
            const response = await getPhotos();
            setPhotos(response.data);
        } catch (error) {
            console.error('Error loading photos:', error);
        }
    };

    const handleLike = async (photoId) => {
        try {
            await likePhoto(photoId);
            loadPhotos(); // Reload to update likes
        } catch (error) {
            console.error('Error liking photo:', error);
        }
    };

    return (
        <Grid container spacing={3}>
            {photos.map((photo) => (
                <Grid item xs={12} sm={6} md={4} key={photo.id}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="200"
                            image={`/api/photos/${photo.id}/image`}
                            alt={photo.title}
                        />
                        <CardContent>
                            <Typography variant="h6">{photo.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {photo.description}
                            </Typography>
                            <IconButton onClick={() => handleLike(photo.id)}>
                                <Favorite color={photo.liked ? "error" : "inherit"} />
                                <Typography variant="caption">{photo.likes}</Typography>
                            </IconButton>
                            <IconButton>
                                <Comment />
                                <Typography variant="caption">{photo.comments}</Typography>
                            </IconButton>
                            {photo.price > 0 && (
                                <IconButton>
                                    <ShoppingCart />
                                    <Typography variant="caption">${photo.price}</Typography>
                                </IconButton>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
} 