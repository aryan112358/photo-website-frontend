import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    Typography,
    IconButton,
    Card,
    CardMedia,
    Button,
    Dialog
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { getAlbumById, deleteAlbum } from '../../services/album.service';
import { useSnackbar } from '../../context/SnackbarContext';
import PhotoGrid from '../photos/PhotoGrid';

export default function AlbumDetail() {
    const [album, setAlbum] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        loadAlbum();
    }, [id]);

    const loadAlbum = async () => {
        try {
            const response = await getAlbumById(id);
            setAlbum(response.data);
        } catch (error) {
            showSnackbar('Failed to load album', 'error');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteAlbum(id);
            showSnackbar('Album deleted successfully', 'success');
            navigate('/albums');
        } catch (error) {
            showSnackbar('Failed to delete album', 'error');
        }
    };

    if (!album) return null;

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">{album.title}</Typography>
                <Box>
                    <IconButton onClick={() => navigate(`/albums/${id}/edit`)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => setDeleteDialog(true)} color="error">
                        <Delete />
                    </IconButton>
                </Box>
            </Box>

            <Typography variant="body1" sx={{ mb: 3 }}>
                {album.description}
            </Typography>

            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate(`/albums/${id}/add-photos`)}
                sx={{ mb: 3 }}
            >
                Add Photos
            </Button>

            <PhotoGrid photos={album.photos} />

            <Dialog
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
            >
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6">Delete Album</Typography>
                    <Typography>Are you sure you want to delete this album?</Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={() => setDeleteDialog(false)} sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} color="error" variant="contained">
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
}