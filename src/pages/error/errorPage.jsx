import React from 'react'
import './errorstyles.css'
import Robot from '../../assets/questionrobot.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaBackward } from "react-icons/fa";

const ErrorPage = () => {
  const naviGate =  useNavigate()
  return (
    <div className='error-wrapper'>
      <img src={Robot} alt="question Pet" className='error-picture'/>
      <div className="error-message">
        <h1>Resourse not Found</h1>
        <Link to={'#'} className='nav-menu-item' onClick={() => naviGate(-1)}><FaBackward/><span>Back to Site</span></Link>
      </div>
    </div>
  )
}

export default ErrorPage
