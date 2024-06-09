import React from 'react'

const HomeCard = (props) => {
  return (
    <div className="card">
    <p className="card-title">{props.title}</p>
    <p className="card-body">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi suscipit deserunt tempore. 
      Et tenetur in architecto. Quo, perspiciatis. Hic ipsam officia laboriosam quidem. Id provident vel beatae consequuntur odit ab?
    </p>   
     <button className='button'>View now</button>

  </div>

  )
}

export default HomeCard