import { useState, useEffect } from 'react';
import { 
    Grid, 
    Card, 
    CardMedia, 
    CardContent, 
    Typography, 
    Button,
    IconButton 
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { getAlbums, deleteAlbum } from '../../services/album.service';
import { useNavigate } from 'react-router-dom';

export default function AlbumList() {
    const [albums, setAlbums] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadAlbums();
    }, []);

    const loadAlbums = async () => {
        try {
            const response = await getAlbums();
            setAlbums(response.data);
        } catch (error) {
            console.error('Error loading albums:', error);
        }
    };

    const handleDelete = async (albumId) => {
        try {
            await deleteAlbum(albumId);
            loadAlbums();
        } catch (error) {
            console.error('Error deleting album:', error);
        }
    };

    return (
        <>
            <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={() => navigate('/albums/create')}
                sx={{ mb: 3 }}
            >
                Create Album
            </Button>

            <Grid container spacing={3}>
                {albums.map((album) => (
                    <Grid item xs={12} sm={6} md={4} key={album.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={album.coverPhotoUrl || '/default-album.jpg'}
                                alt={album.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{album.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {album.description}
                                </Typography>
                                <Typography variant="caption">
                                    {album.photos?.length || 0} photos
                                </Typography>
                                <IconButton 
                                    onClick={() => navigate(`/albums/${album.id}/edit`)}
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(album.id)}>
                                    <Delete />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
} 