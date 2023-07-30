import React, { useContext } from 'react'
import UserContext from '../context/UserContext';
import Navbar from '../components/Navbar';
import Notes from '../components/Notes';


const HomePage = () => {
  const { user, updateUser } = useContext(UserContext);
  // const login = (e)=>{
  //   e.preventDefault()
  //   setIsLoggedIn(true)
  //   setAuthUser({
  //     name:"dd"
  //   })
  // }
  // const logout = (e) => {
  //   e.preventDefault();
  //   setIsLoggedIn(false);
  //   setAuthUser(null);
  // };
  return (
    <div className="bg-teal-900 w-screen min-h-screen">
      <Navbar />
      <Notes />
    </div>
  );
}

export default HomePage