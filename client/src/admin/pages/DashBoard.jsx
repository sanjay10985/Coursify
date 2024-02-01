import React,{useEffect,useState}from 'react'
import CreateCourse from '../components/CreateCourses'
import './DashBoard.css';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import CourseItems from '../components/CourseItems';
import {jwtDecode} from 'jwt-decode';


const DashBoard = () => {

  const [courses,setCourses] = useState([]);
  const [isAdmin,setIsAdmin] = useState(false);
  const [token,setToken] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
      const storedToken = localStorage.getItem('authToken');
      try {
          const response = await axios.get("http://localhost:3000/admin/courses", {
              headers: { authorization: `bearer ${storedToken}` }
          });
          setCourses(response.data.courses);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  const storedToken = localStorage.getItem('authToken');
  useEffect(() => {
    if(!storedToken)
    {
      navigate("/admin/auth");
      return;
    }

    if(storedToken){
      const decodeToken = jwtDecode(storedToken);
      if(decodeToken.role === 'admin'){
        setIsAdmin(true);
        fetchData();
      }
      else{
        // alert("You are unauthorized");
        // navigate('admin/auth');
      }
    }


  }, [navigate]);


const addCourse = (newCourse) => {
  setCourses((prevCourses) => [...prevCourses,newCourse])
}
  
  const handleLogOut = () =>{
    localStorage.removeItem('authToken');
    navigate('/admin/auth',);
  }

  return (
    <div className='courses'>     
      <button onClick={handleLogOut}>Sign out</button>
      <CreateCourse onCourseCreated={addCourse}/>
      {/* {console.log(courses)} */}
      <CourseItems courses={courses}/>
    </div>
  )
}

export default DashBoard