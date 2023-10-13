import React from 'react'
import "./containersstyles.css"
import { Outlet } from 'react-router-dom'
import NavBar from '../components/navbarComponent/navBar'

const MainLayout = () => {
  return (
    <section className="main-layout">
      <NavBar />
      <div className="content-render">
        <Outlet />
      </div>
    </section>
  )
}

export default MainLayout
