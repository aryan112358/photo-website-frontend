import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import PhotoGrid from '../components/photos/PhotoGrid';
import PhotoUpload from '../components/photos/PhotoUpload';
import AlbumList from '../components/albums/AlbumList';
import Profile from '../components/user/Profile';
import CheckoutForm from '../components/payment/CheckoutForm';
import PhotoDetail from '../components/photos/PhotoDetail';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PhotoGrid />} />
      <Route path="/photos/:id" element={<PhotoDetail />} />
      
      <Route element={<PrivateRoute />}>
        <Route path="/upload" element={<PhotoUpload />} />
        <Route path="/albums" element={<AlbumList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout/:photoId" element={<CheckoutForm />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
} 