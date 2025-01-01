import { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Typography,
    Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createAlbum } from '../../services/album.service';
import { useSnackbar } from '../../context/SnackbarContext';

export default function AlbumCreate() {
    const [album, setAlbum] = useState({
        title: '',
        description: '',
        isPublic: true
    });
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createAlbum(album);
            showSnackbar('Album created successfully', 'success');
            navigate(`/albums/${response.data.id}`);
        } catch (error) {
            showSnackbar('Failed to create album', 'error');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Create New Album
                </Typography>
                
                <TextField
                    fullWidth
                    required
                    label="Title"
                    margin="normal"
                    value={album.title}
                    onChange={(e) => setAlbum({ ...album, title: e.target.value })}
                />
                
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    margin="normal"
                    value={album.description}
                    onChange={(e) => setAlbum({ ...album, description: e.target.value })}
                />
                
                <FormControlLabel
                    control={
                        <Switch
                            checked={album.isPublic}
                            onChange={(e) => setAlbum({ ...album, isPublic: e.target.checked })}
                        />
                    }
                    label="Make this album public"
                />
                
                <Box sx={{ mt: 3 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mr: 2 }}
                    >
                        Create Album
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/albums')}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}