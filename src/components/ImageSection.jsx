// src/ImageSection.js

import React from 'react';
import './ImageSection.css';
import back from '../assests/backg.jpg'
import { useNavigate } from 'react-router-dom';


function ImageSection(props) {

  const nav = useNavigate()

  return (
    <div className="image-section">
      <img src={back} alt="Background" className="background-image" />
      <div className="overlay">
        <h3>Hello {props.title}</h3>
        <p>Ready to Complete your courses ?</p>
        <button className="cta-button" onClick={()=>nav('/courses')}>Click Here</button>
      </div>
    </div>
  );
}

export default ImageSection;
