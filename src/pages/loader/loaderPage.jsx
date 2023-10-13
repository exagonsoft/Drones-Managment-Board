import React from 'react'
import './loaderstyles.css'
import Loader from '../../assets/loader.gif'

const LoaderPage = () => {
  return (
    <>
    <div className="loader-back">
        <div className="loader-gradient" />
    </div>
    <div className="loader-wrapper">
        <div className="loader-spinner">
            <img src={Loader} alt="FlexSport" />
            <div className="spinner"></div>

        </div>
        <h1>Loading...</h1>
    </div>
</>
  )
}

export default LoaderPage
