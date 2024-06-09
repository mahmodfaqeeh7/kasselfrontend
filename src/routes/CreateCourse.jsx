import React, { useState } from "react";
import NoImageSelected from "../assests/no-image-selected.jpg";
import axios from "axios";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
 
  const [submitted, setSubmitted] = useState("");
  
  const createBook = async (e) => {
    e.preventDefault();
   


    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("CreatedBy", users.id);

    console.log()

    try {

      const response = await axios.post("http://localhost:8000/api/courses/",
         {
          title : title,
          description : description,
          CreatedBy :users.id 
           } ,{
            headers: {'Authorization': `Bearer ${users.token}`},
          }).then(
            setTitle(""),
            setDescription(""),
            setSubmitted(true),
           ).catch(
            (er) =>      console.log(er)

           )

    

      if (response.ok) {
        setTitle("");
        setSubmitted(true);
      } else {
        console.log("Failed to submit data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  ////////////////////////////////////////////////////
 
  const users = JSON.parse(localStorage.getItem('user'))




  
  ////////////////////////////////////////////////////////

  return (
    <div>
      <h1>Create Course</h1>
      <p>
        please fill the require fields
      </p>

      {submitted ? (
        <p>Data submitted successfully!</p>
      ) : (users &&
        <form className="bookdetails" onSubmit={createBook}>
         
          <div className="col-2">
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
           </div>
            
       
            <div>
              <label>Description</label>
              <textarea
                rows="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          
    
            <input type="submit" />
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateCourse;
