import React from 'react'

const Hero = () => {
  return (
    <section className="text-gray-600 body-font mt-10">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Get all the top rated courses
        <br className="hidden lg:inline-block"/>with free certificates!
      </h1>
      <p className="mb-8 leading-relaxed">Discover top-rated courses from leading companies like Google, Microsoft, and Amazon. Explore both free and paid resources to enhance your skills and stay updated with the latest technologies.</p>
      <div className="flex justify-center">
       <a href="#courses"> <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">All Courses</button></a>
        <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Register</button>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img className="object-cover object-center rounded" alt="hero" src="https://images.unsplash.com/photo-1499257398700-43669759a540?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
    </div>
  </div>
</section>
  )
}

export default Hero