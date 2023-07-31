import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import Navbar from "../components/Navbar";
import Notes from "../components/Notes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate()
  const token = localStorage.getItem("userToken");
  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:4000/user-auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(data.verified){
      updateUser(data.userData);
    }else{
      localStorage.removeItem('userToken')
      updateUser(null)
      navigate('/signin')
    }
  };
  useEffect(() => {
    fetchData()
  }, []);
  return (
    <div className="bg-teal-900 w-screen min-h-screen">
      <Navbar />
      <Notes />
    </div>
  );
};

export default HomePage;
