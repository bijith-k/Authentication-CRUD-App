
import {  useEffect } from 'react';
import ForgotPassword from '../components/ForgotPassword'
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken')
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <ForgotPassword />
    </div>
  )
}

export default ForgotPasswordPage