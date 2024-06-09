import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';


import back1 from '../assests/back1.jpg'
import back2 from '../assests/back2.jpg'
import back3 from '../assests/back3.jpg'

const CourseCard = (props) => {
  const [randomNumber, setRandomNumber] = useState(null);
  const [imgg, setimgg] = useState('back1');

 /* useEffect(
    () => {
    const generateRandomNumber = () => {
      return Math.floor(Math.random() * 3) + 1;
    };

    const number = generateRandomNumber();
    console.log(number)
    setRandomNumber(number);
     setimgg(`back${randomNumber}`)
  },
   []);
*/
  return (
     
      <div className="card">
       <img className='img-thumbnail' src={back3} alt="" />
      <p className="card-title">{props.title}</p>
      <p className="card-body">{props.description}</p>   
       <Link to={`/course/${props.id}`} className='button' >View now</Link>
  
    </div>
  
 )
}

export default CourseCard