import React from 'react'

const Content = () => {
  return (
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h2 className="text-xs text-blue-500 tracking-widest font-medium title-font mb-1">Take a step</h2>
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Learn at your own pace, be your own teacher!</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Sometimes, you need to "do" first and plan later. <br/>the first step to doing something is doing something, move</p>
    </div>  
    <div className="flex flex-wrap">
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Software Development</h2>
        <p className="leading-relaxed text-base mb-4">Dive into software development with the simple, practical courses.</p>
        <a className="text-blue-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" strokeLinejoin="round"  strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Project Management</h2>
        <p className="leading-relaxed text-base mb-4">Learn essential skills, tools, and techniques to efficiently plan, execute, and deliver successful projects.</p>
        <a className="text-blue-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" strokeLinejoin="round"  strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Data Analytics</h2>
        <p className="leading-relaxed text-base mb-4">Uncover valuable insights, make informed decisions, and boost your career with practical skills in data analysis.</p>
        <a className="text-blue-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Digital Marketing</h2>
        <p className="leading-relaxed text-base mb-4">Learn practical strategies to reach your audience, build brand presence, and drive business growth online.</p>
        <a className="text-blue-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" strokeLinejoin="round"  strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
    <a href="#courses">
    <button className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Go to courses</button></a>
  </div>
</section>
  )
}

export default Content