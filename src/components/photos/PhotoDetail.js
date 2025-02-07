import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    CircularProgress
} from '@mui/material';
import { getPhotoDetails } from '../../services/photo.service';
import { useSnackbar } from '../../context/SnackbarContext';
import AuthImage from '../common/AuthImage';

export default function PhotoDetail() {
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const { showSnackbar } = useSnackbar();
    const token = localStorage.getItem('token');

    useEffect(() => {
        loadPhoto();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const loadPhoto = async () => {
        try {
            const response = await getPhotoDetails(id);
            setPhoto(response.data);
        } catch (error) {
            showSnackbar('Failed to load photo details', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (!photo) {
        return <Typography>Photo not found</Typography>;
    }

    return (
        <Card>
            <AuthImage
                photoId={photo.id}
                fileName={photo.fileName}
                alt={photo.title}
                sx={{ height: 500 }}
            />
            <CardContent>
                <Typography variant="h5">{photo.title}</Typography>
                <Typography variant="body1">{photo.description}</Typography>
                <Typography variant="caption">
                    By {photo.uploadedBy} • {new Date(photo.createdAt).toLocaleDateString()}
                </Typography>
                {photo.price > 0 && (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        href={`/checkout/${photo.id}`}
                    >
                        Purchase (${photo.price})
                    </Button>
                )}
            </CardContent>
        </Card>
    );
} 