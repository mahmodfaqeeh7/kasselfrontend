import React from 'react'
import { Link } from "react-router-dom";
import logo from "../assests/logo.png";
import '../components/header.css'

export const Header = () => {

  const users = JSON.parse(localStorage.getItem('user'))
  const handleClick = () => {
    localStorage.removeItem('user')

    // dispatch logout action
    window.location.reload(false);
    
  }



  return (
    <header>
    <Link to="/reg" className="logo">
      <img src={logo} alt="ReactJs" /> KasselPortal
    </Link>

    <nav>
    
    {users && (<>
    
    <Link to="/">Home</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/about">About</Link>
   
            <div>
              <button onClick={handleClick}>Log out</button>
            </div>
          </>  )} 
          </nav>
  </header>
  )
}
