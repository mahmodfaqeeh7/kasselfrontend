import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams , useNavigate } from 'react-router-dom'

export const SingleCourse = () => {

    const users = JSON.parse(localStorage.getItem('user'))
    const [data, setData] = useState([])
    const urlSlug = useParams()
    const [joined, setJoined] = useState(false)
    const [mine, setMine] = useState(false)
    const nav = useNavigate()
    const baseUrl = `http://localhost:8000/api/courses/${urlSlug.id}`
    useEffect(() => {

        const fetchData = async () => {
            try {

                const response = await fetch(baseUrl  ,{
                    headers: {'Authorization': `Bearer ${users.token}`},
                  })
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const jsonData = await response.json()
                setData(jsonData)
                console.log(jsonData)
            

                
                const cor = users.mycourses
                if(cor.some(course => course == urlSlug.id) )
                    {
                        setJoined(true)
                    }
               


            } catch (error) {
                console.log(error)

            }
        }
        fetchData()
    }, [])

    const handlejoin = async () => {
        try {
           
            const studentid = users.id
            const response = await axios.put(`http://localhost:8000/api/courses/addcourse/${studentid}`, {
                courseid: urlSlug.id , 
              }
              ,{
                headers: {'Authorization': `Bearer ${users.token}`},
              }).then((res) =>
                {
                    if(res.status  == 404)
                        {
                            console.log(res.data)
                            alert(err =>'Error : '+ res.data +err.message)
                        }
                 console.log('done'),
                setJoined(true),
                nav('/profile')  
                }
                
              ).catch((error)=> {
                console.log(error.response.data)

                 if(error.response.status  == 404)
                {
                    alert(`Error :  ${error.response.data} `)
                }
              }
            )
        } catch (error) {

           
        }
    }

    


    return (
        <div>
            

            <Link to={"/courses"}> ◀️Books</Link>
            <h1>{data.title}</h1>

            <div className='bookdetails d-block'>
                <div className='col-1'>
                    {users.isTeacher && users.id == data.CreatedBy 
                    && (<Link  to={`/editcourse/${data._id}`}><button className="button">Edit</button></Link>)}
                </div>

                <table className='table mt-3'>
                    
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            {users && !users.isTeacher && !joined &&
            (<div style={{display : false || (users && !users.isTeacher && !joined)}}><button onClick={handlejoin} id="bottone5">Join the course</button></div> )
            (<div><button onClick={handlejoin} id="bottone5">Join the course</button></div> )
            }
        </div>
    )
}
