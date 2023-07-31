import React, { useEffect } from "react";
import SignIn from "../components/SignIn";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("userToken");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  
  return (
    <div>
      <SignIn />
    </div>
  )
}

export default SignInPage