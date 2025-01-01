import { useState } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    IconButton, 
    Menu, 
    MenuItem,
    Avatar 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    Photo Website
                </Typography>

                {user ? (
                    <>
                        <Button color="inherit" onClick={() => navigate('/upload')}>
                            Upload
                        </Button>
                        <Button color="inherit" onClick={() => navigate('/albums')}>
                            Albums
                        </Button>
                        <IconButton onClick={handleMenu} color="inherit">
                            <Avatar src={user.profilePicture} alt={user.username} />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => {
                                handleClose();
                                navigate('/profile');
                            }}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Button color="inherit" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                        <Button color="inherit" onClick={() => navigate('/register')}>
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
} 