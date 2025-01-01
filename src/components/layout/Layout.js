import { Box, Container } from '@mui/material';
import Navbar from '../common/Navbar';

export default function Layout({ children }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
                {children}
            </Container>
        </Box>
    );
} 