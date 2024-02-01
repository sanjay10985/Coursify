import React from 'react'
import Hero from '../components/Hero'
import Content from '../components/Content'
import Statistics from '../components/Statistics'
import Cta from '../components/Cta'
import Courses from '../components/Courses'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Content/>
        <Courses/>
        <Statistics/>
        <Cta/>
    </div>
  )
}

export default Home