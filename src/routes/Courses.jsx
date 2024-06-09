import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import { Link } from 'react-router-dom'
export const Courses = () => {

    const baseUrl = 'http://localhost:8000/api/courses/'
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const nav = useNavigate()
    useEffect(() => {

        const fetchData = async () => {
            try {

                let url = baseUrl


                const response = await fetch(url,{
                    headers: {'Authorization': `Bearer ${users.token}`},
                  });
          
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const jsonData = await response.json()
                setData(jsonData)
                setIsLoading(false)

            } catch (error) {
                console.log(error)
                setError("Error fetching data,please try again later")
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])


    const users = JSON.parse(localStorage.getItem('user'))


    return (<>

        {!users && (<>
            <h2>Please sign in first</h2>
            <button onClick={() => nav('/')}>Back Home</button>
        </>)}




        {users && !users.isTeacher && (<>
           

            <h2>Available Courses</h2>

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
        {users && users.isTeacher && (<>
            <button onClick={()=>nav('/createcourse')
            } class="normalbutton full-rounded">
                <span>Create Course</span>
            </button>

            <h2>Available Courses</h2>

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
                    ))}
                </ul>
            )}

        </>)}
    </>
    )
}
