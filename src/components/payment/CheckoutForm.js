import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { 
    Button, 
    Box, 
    Typography, 
    CircularProgress,
    Alert 
} from '@mui/material';
import { processPayment } from '../../services/payment.service';

export default function CheckoutForm({ photoId, amount }) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        try {
            // Create payment intent
            const { clientSecret } = await processPayment({
                photoId,
                amount
            });

            // Confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                // Payment successful
                // Redirect or show success message
            }
        } catch (err) {
            setError('Payment failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, m: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                Payment Details
            </Typography>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <Box sx={{ mb: 3 }}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </Box>

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!stripe || processing}
            >
                {processing ? <CircularProgress size={24} /> : `Pay $${amount}`}
            </Button>
        </Box>
    );
} 