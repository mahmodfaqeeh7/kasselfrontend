import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CourseCard from '../components/CourseCard'
const Profile = () => {
    const [data, setData] = useState([])
    const [courses, setcourses] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const nav = useNavigate()
    useEffect(() => {

        const fetchData = async () => {
            if(!users.isTeacher)
                {
                    try {
                        const response = await axios.get(`http://localhost:8000/api/courses/studentcourses/${users.id}`
                            ,{
                                headers: {'Authorization': `Bearer ${users.token}`},
                              }
                        ).then(response => 
                        {setIsLoading(false),
                        setData(response.data)
                        //setcourses()
                    }
                    );
                        setData(response.data);
                        console.log(data)
    
                      } catch (error) {
                        console.log('Error fetching student: ' + error.message);
                      }
                }
                if(users.isTeacher)
                    {
                        try {
                            const response = await axios.get(`http://localhost:8000/api/courses/teacheronly/${users.id}`,{
                                headers: {'Authorization': `Bearer ${users.token}`},
                              }
                            ).then(response => 
                            {setIsLoading(false),
                            setData(response.data), console.log(data)
                            //setcourses()
                        }
                        );
                
        
                          } catch (error) {
                            console.log('Error fetching student: ' + error.message);
                          }
                    }
               


        }
        fetchData()
    }, [])



    const users = JSON.parse(localStorage.getItem('user'))



return (<>
  
    {users && !users.isTeacher && (<>
           

           <h2>my Courses</h2>
   
           {isLoading ? (
               <p>Loading...</p>
           ) : error ? (
               <p>{error}</p>
           ) : (
            <ul className="books">
            <div className="card-container mx-4">
            {data.mycourses.map((item) => (
                       <li key={item._id}>
                           <CourseCard id={item._id} title={item.title} description={item.description} />
                       </li>
                   ))
                   }
            </div>

        </ul>
           )}
   
       </>)}

       {users && users.isTeacher && (<>
           

           <h2>my Courses</h2>
   
           {isLoading ? (
               <p>Loading...</p>
           ) : error ? (
               <p>{error}</p>
           ) : (
               <ul className="books">
                   {data.map((item) => (
                       <li key={item._id}>
                           <CourseCard id={item._id} title={item.title} description={item.description} />
                       </li>
                   ))
                   }
               </ul>
           )}
   
       </>)}
  </>
      )
}

export default Profile