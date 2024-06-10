import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ax from "axios"
import HomeCard from '../components/HomeCard';
import 'bootstrap/dist/css/bootstrap.css';
import ImageSection from '../components/ImageSection';


export const Home = () => {
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: '',
  });
  const nav = useNavigate()
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [showLog, setshowLog] = useState(false);
  const [showSign, setShowSign] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      setError(null)

      const res = await ax.post("http://localhost:8000/api/users/login", 
        signInForm)
        .catch(err => alert(`error , invailid email ir password: ${err.message}` ))


      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(res.data))
      // update loading state
      setIsLoading(false)
      window.location.reload()


      console.log(res)
      nav('/')
    } catch (error) {
      console.log("eroorererer")
    }
    console.log('Sign In Form Submitted:', signInForm);
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {

      setIsLoading(true)
      setError(null)

      const response = await ax.post('http://localhost:8000/api/users/signup', signUpForm)
      .catch(err => alert(`error , invailid  - : ${err.message}` ))



      localStorage.setItem('user', JSON.stringify(response.data))



      // update loading state
      setIsLoading(false)
      window.location.reload()

      nav('/')

    } catch (error) {

      setIsLoading(false)
      setError('please fill out all fields')
    }
    console.log('Sign Up Form Submitted:', signUpForm);
  };

  const users = JSON.parse(localStorage.getItem('user'))



  const toggleSignInForm = () => {
    setshowLog(true); // Close sign-up form when opening sign-in form
    setShowSign(false); // Close sign-in form when opening sign-up form

  };

  const toggleSignUpForm = () => {
    setshowLog(false); // Close sign-up form when opening sign-in form
    setShowSign(true); // Close sign-in form when opening sign-up form
  };



  return (
    <div>
      <h1>Welcome to KesselPortal</h1>
      {users ? (<></>)
        : (<h5> Hello our student ,<br></br> Login or signup</h5>)}


      {users && (<>
        <ImageSection title={users.username} />
        <div className="card-container mx-4">
        <HomeCard name="" title="About Us"/>
        <HomeCard name="" title="Why us" />
        <HomeCard name="" title="Contact us" />
        </div>



      </>
    )}





      {!users && (<> <h5>New student ? Sign up Now</h5>
        <div className="btn-group">
          <div onClick={()=>toggleSignInForm()}>
          <button id="bottone5">Login</button>
          </div>
          <div onClick={()=>toggleSignUpForm()} className='mx-2'>
          <button id="bottone5">Signup</button>
          </div>
        </div></>)}
      {showLog && (


        <form className="form" onSubmit={handleSignInSubmit}>
          <p className="form-title">Sign in to your account</p>
          <div className="input-container">
            <input type="email"
              name="email"
              value={signInForm.email}
              onChange={handleSignInChange}
              placeholder="Enter email" />
            <span>
            </span>
          </div>
          <div className="input-container">
            <input type="password"
              name="password"
              value={signInForm.password}
              onChange={handleSignInChange}
              placeholder="Enter password" />
          </div>
          <button type="submit" className="submit">
            Sign in
          </button>

          <p className="signup-link">
            No account?
            <a onClick={toggleSignUpForm}>Sign up</a>
          </p>
        </form>





      )}
      {/* Sign Up Form */}
      {showSign  && (

        <form className="form" onSubmit={handleSignUpSubmit}>
          <p className="form-title">Sign in to your account</p>

          <div className="input-container">
            <input type="text"
              name="username"
              value={signUpForm.username}
              onChange={handleSignUpChange}
              placeholder="Enter username" />
            <span>
            </span>
          </div>
          <div className="input-container">
            <input type="email"
              name="email"
              value={signUpForm.email}
              onChange={handleSignUpChange}
              placeholder="Enter email" />
            <span>
            </span>
          </div>
          <div className="input-container">
            <input type="password"
              name="password"
              value={signUpForm.password}
              onChange={handleSignUpChange}
              placeholder="Enter password" />
          </div>
          <button type="submit" className="submit">
            Sign up
          </button>


        </form>


      )}
    </div>
  );
};
