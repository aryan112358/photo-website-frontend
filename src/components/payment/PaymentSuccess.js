import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Container,
    Paper
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { confirmPayment } from '../../services/payment.service';
import { useSnackbar } from '../../context/SnackbarContext';

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const paymentIntentId = searchParams.get('payment_intent');

    useEffect(() => {
        if (paymentIntentId) {
            handlePaymentConfirmation();
        }
    }, [paymentIntentId]);

    const handlePaymentConfirmation = async () => {
        try {
            await confirmPayment(paymentIntentId);
            showSnackbar('Payment confirmed successfully!', 'success');
        } catch (error) {
            showSnackbar('Error confirming payment', 'error');
            navigate('/');
        }
    };

    if (!paymentIntentId) {
        return <CircularProgress />;
    }

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
                <CheckCircle color="success" sx={{ fontSize: 64, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                    Payment Successful!
                </Typography>
                <Typography color="text.secondary" paragraph>
                    Thank you for your purchase. You can now download your photo in full resolution.
                </Typography>
                <Box sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/profile/purchases')}
                        sx={{ mr: 2 }}
                    >
                        View Purchases
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/')}
                    >
                        Continue Browsing
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}