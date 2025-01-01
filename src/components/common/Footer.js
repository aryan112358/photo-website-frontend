import { Box, Container, Typography, Link, Grid } from '@mui/material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Photo Website
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Share your moments with the world
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link href="/about" color="text.secondary" display="block">
                            About Us
                        </Link>
                        <Link href="/contact" color="text.secondary" display="block">
                            Contact
                        </Link>
                        <Link href="/privacy" color="text.secondary" display="block">
                            Privacy Policy
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Connect
                        </Typography>
                        <Link href="https://twitter.com" color="text.secondary" display="block">
                            Twitter
                        </Link>
                        <Link href="https://instagram.com" color="text.secondary" display="block">
                            Instagram
                        </Link>
                        <Link href="https://facebook.com" color="text.secondary" display="block">
                            Facebook
                        </Link>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {'Copyright © '}
                        <Link color="inherit" href="/">
                            Photo Website
                        </Link>{' '}
                        {new Date().getFullYear()}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}