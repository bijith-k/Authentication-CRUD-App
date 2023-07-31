import { useEffect } from "react";
import ResetPassword from "../components/ResetPassword"
import { useNavigate } from "react-router-dom";


const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <ResetPassword />
    </div>
  )
}

export default ResetPasswordPage