import React, { useEffect, useState } from 'react'
import './CreateCourses.css'
import axios from 'axios'

const CreateCourse = ({onCourseCreated}) => {

  const [formInput,setFormInput] = useState({title:"",description: "",price:"",imageLink:"",published:""})

  const handleFormInput = (e) =>{
    const {name,value} = e.target;
    setFormInput((prevInput) => ({
      ...prevInput,[name]:value
    }))
    console.log(formInput.title);
  }

  const [token,setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    setToken(storedToken);
  },[token])

  // useEffect(() => {
  //   console.log(formInput);
  // },[formInput])

  const handleFormSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3000/admin/courses',
    {
      title: formInput.title,
      description: formInput.description,
      price: formInput.price,
      imageLink: formInput.imageLink,
      published: formInput.published
    },
    {
    headers:{
      authorization: `Bearer ${token}`
    }})
    .then((response) => {
      console.log(response.data);
      onCourseCreated(response.data.course);
      alert("New Course has been created");
      setFormInput({title:"",description: "",price:"",imageLink:"",published:""});
    })
    .catch(err => console.log(err)) 
  }

  return (
    <div className='createCourse'>
        <form className='course_Input_Form' onSubmit={handleFormSubmit}>
          <h1 className='text-2xl'>Create a course</h1>
          <div className="courseInputItems">
          <label>Title: </label>
          <input type="text" name='title' value={formInput.title} onChange={handleFormInput}/>
          </div>
          <div className="courseInputItems">
          <label>Description: </label>
          <input type="text" name='description' value={formInput.description} onChange={handleFormInput}/>
          </div>
          <div className="courseInputItems">

          <label>Price: </label>
          <input type="number" name='price' value={formInput.price} onChange={handleFormInput}/>
          </div>
          <div className="courseInputItems">

          <label>Image URL </label>
          <input type="text" name='imageLink'  value={formInput.imageLink} onChange={handleFormInput}/>
          </div>
          <div className="courseInputItems">

          <div className="pulishedOrNot">
          <label>Published: </label>
          <input type="radio" name='published' value="yes" checked={formInput.published === "yes"} onChange={handleFormInput}/>yes
          <input type="radio" name='published' value="no" checked={formInput.published === "no"} onChange={handleFormInput}/>no
          </div>
          </div>
          <button className='form_submit_button' type='submit'>submit</button>
        </form>
    </div>
  )
}

export default CreateCourse