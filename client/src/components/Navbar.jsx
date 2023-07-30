import React, { useContext } from 'react'
import UserContext from "../context/UserContext";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    updateUser(null)
    navigate('/signin')
  }
  return (
    <div className="bg-teal-500 w-screen h-fit flex justify-between sticky top-0">
      <p className="p-5 font-bold text-2xl">
        Welcome {user && <span>{user.name}</span>}
      </p>
      <div className="p-3">
        <button
          className=" px-6 py-3 font-bold rounded-2xl text-xl bg-blue-900 text-white "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar