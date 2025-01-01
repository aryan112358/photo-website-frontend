import { useState } from 'react';
import { 
    Button, 
    TextField, 
    Box, 
    Typography, 
    Switch, 
    FormControlLabel 
} from '@mui/material';
import { uploadPhoto } from '../../services/photo.service';

export default function PhotoUpload() {
    const [photo, setPhoto] = useState({
        title: '',
        description: '',
        price: 0,
        isPublic: true,
        file: null
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', photo.title);
            formData.append('description', photo.description);
            formData.append('price', photo.price);
            formData.append('isPublic', photo.isPublic);
            formData.append('file', photo.file);

            await uploadPhoto(formData);
            // Reset form or redirect
        } catch (error) {
            setError('Failed to upload photo');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6">Upload Photo</Typography>
            {error && <Typography color="error">{error}</Typography>}
            
            <TextField
                fullWidth
                margin="normal"
                label="Title"
                value={photo.title}
                onChange={(e) => setPhoto({...photo, title: e.target.value})}
            />
            
            <TextField
                fullWidth
                margin="normal"
                label="Description"
                multiline
                rows={3}
                value={photo.description}
                onChange={(e) => setPhoto({...photo, description: e.target.value})}
            />
            
            <TextField
                type="number"
                margin="normal"
                label="Price"
                value={photo.price}
                onChange={(e) => setPhoto({...photo, price: e.target.value})}
            />
            
            <FormControlLabel
                control={
                    <Switch
                        checked={photo.isPublic}
                        onChange={(e) => setPhoto({...photo, isPublic: e.target.checked})}
                    />
                }
                label="Make Public"
            />
            
            <input
                accept="image/*"
                type="file"
                onChange={(e) => setPhoto({...photo, file: e.target.files[0]})}
            />
            
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3 }}
            >
                Upload
            </Button>
        </Box>
    );
} 