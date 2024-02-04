import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './user/pages/Home';
// import Courses from './user/pages/Courses'
import Navbar from './user/components/Navbar';
import Footer from './user/components/Footer';
import CourseDetail from './user/components/CourseDetail';
import Auth from './user/components/Auth';
import PurchasedCourses from './user/components/PurchasedCourses';
import AdminLogin from './admin/components/AdminLogin';
import DashBoard from './admin/pages/DashBoard';

const App = () => {

  return (
    <div>

      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element = {<Auth/>}/>
        {/* <Route path="/courses" element={<Courses/>}/> */}
        <Route path="/courses/:id" element={<CourseDetail/>}/>
        <Route path="/purchases" element={<PurchasedCourses/>}/>  
        <Route path="/admin" element={<DashBoard/>}/>
        <Route path="/admin/auth" element={<AdminLogin/>}/>  
      </Routes>
      <Footer/>

    </div>
  )
}

export default App