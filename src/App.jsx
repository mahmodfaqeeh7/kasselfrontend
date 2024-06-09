import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { Home } from "./routes/home"
import { About } from "./routes/about"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import Profile from "./routes/profile"
import { Courses } from "./routes/Courses"
import CreateCourse from "./routes/CreateCourse";
import Editcourse from "./routes/Editcourse"
import { SingleCourse } from "./routes/singleCourse"
import './index.css'

function App() {
 

  return (
    <>
     <Router>
      <Header/>
      <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/profile" element={<Profile/>}/>

            <Route path="/courses" element={<Courses/>}/>
            <Route path="/course/:id" element={<SingleCourse/>}/>
            <Route path="/createcourse" element={<CreateCourse/>}/>
            <Route path="/editcourse/:id" element={<Editcourse/>}/>
      </Routes>
      <Footer/>
     </Router>
    
    </>
  )
}

export default App
