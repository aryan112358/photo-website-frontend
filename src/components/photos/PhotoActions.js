import { useState } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import { MoreVert, Delete, Edit, Share } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../context/SnackbarContext';

export default function PhotoActions({ photo, onDelete, onEdit }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        showSnackbar('Link copied to clipboard!', 'success');
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        onDelete();
        setDeleteDialog(false);
        handleMenuClose();
    };

    return (
        <>
            <IconButton onClick={handleMenuOpen}>
                <MoreVert />
            </IconButton>
            
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => {
                    onEdit();
                    handleMenuClose();
                }}>
                    <Edit sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem onClick={handleShare}>
                    <Share sx={{ mr: 1 }} /> Share
                </MenuItem>
                <MenuItem onClick={() => setDeleteDialog(true)} sx={{ color: 'error.main' }}>
                    <Delete sx={{ mr: 1 }} /> Delete
                </MenuItem>
            </Menu>

            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                <DialogTitle>Delete Photo</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this photo? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}