import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Button
} from '@mui/material';
import { Download } from '@mui/icons-material';
import { getPurchaseHistory, downloadPhoto } from '../../services/payment.service';
import { useSnackbar } from '../../context/SnackbarContext';

export default function PurchaseHistory() {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        loadPurchases();
    }, []);

    const loadPurchases = async () => {
        try {
            const response = await getPurchaseHistory();
            setPurchases(response.data);
        } catch (error) {
            showSnackbar('Failed to load purchase history', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (purchaseId, photoId) => {
        try {
            await downloadPhoto(photoId, purchaseId);
        } catch (error) {
            showSnackbar('Failed to download photo', 'error');
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Purchase History
            </Typography>
            
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Photo</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {purchases.map((purchase) => (
                            <TableRow key={purchase.id}>
                                <TableCell>
                                    {new Date(purchase.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{purchase.photo.title}</TableCell>
                                <TableCell>${purchase.amount}</TableCell>
                                <TableCell>{purchase.status}</TableCell>
                                <TableCell>
                                    {purchase.status === 'completed' && (
                                        <Button
                                            startIcon={<Download />}
                                            onClick={() => handleDownload(purchase.id, purchase.photo.id)}
                                        >
                                            Download
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}