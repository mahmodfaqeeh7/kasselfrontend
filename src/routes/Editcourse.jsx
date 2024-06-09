import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


function Editcourse() {
  const navigate = useNavigate();
  const urlSlug = useParams();
  const baseUrl = `http://localhost:8000/api/courses/${urlSlug.id}`;

  const [courseid, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState("");


  
  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl ,{
        headers: {'Authorization': `Bearer ${users.token}`},
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      console.log(data)
      setCourseId(data._id);
      setTitle(data.title);
      setDescription(data.description);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createBook = async (e) => {
    e.preventDefault();
   

    const formData = new FormData();
    formData.append("courseid", courseid);
    formData.append("title", title);
    formData.append("description", description);



    try {
      const response = await axios.put("http://localhost:8000/api/courses/", {
        courseid: courseid ,
        title: title,
        description : description 
      } 
      ,{
        headers: {'Authorization': `Bearer ${users.token}`},
      }).then(
        setTitle(""),
        setSubmitted(true),
        console.log('done')
      ).catch(        console.log("Failed to submit data.")  );
    } 
    catch (error) {
      console.log(error);
    }
  };

  


  const removeBook = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete("http://localhost:8000/api/courses/" , { data:{courseid : courseid} } ,{
        headers: {'Authorization': `Bearer ${users.token}`},
      }
      ).then(  navigate("/"),
        console.log("Book removed.")
    )
    } catch (error) {
      console.error(error);
    }
  };
  ////////////////////////////////////////////////////////



  

  ////////////////////////////////////////////////////////

  return (
    <div>
      <h1>Edit Book</h1>
     

      <button onClick={removeBook} className="delete">
        Delete Course
      </button>

      {submitted ? (
        <p>Data subitted successfully!</p>
      ) : (
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

export default Editcourse;
