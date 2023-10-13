import React from "react";
import "./navbarstyles.css";
import Logo from "../../assets/logo.png";
import { navMenuLinks } from "../../constants/constants";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <Link to="./" className="logo-link">
        <img src={Logo} alt="Logo" className="logo" />
        <span className="logo-text">Drone Management</span>
      </Link>
      <div className="nav-menu">
        {navMenuLinks.map((_link, index) => (
          <Link key={index} to={_link.link} className="nav-menu-item">
            {_link.icon}
            <span >{_link.title}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
