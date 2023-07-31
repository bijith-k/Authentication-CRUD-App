import React, { useEffect } from "react";
import SignUp from "../components/SignUp";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

 const token = localStorage.getItem("userToken");
 useEffect(() => {
   if (token) {
     navigate("/");
   }
 }, []);
  return (
    <div>
      <SignUp />
    </div>
  )
}

export default SignUpPage