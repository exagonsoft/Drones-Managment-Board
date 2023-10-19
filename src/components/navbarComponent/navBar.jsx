import React, { useEffect, useState } from "react";
import "./navbarstyles.css";
import Logo from "../../assets/logo.png";
import { navMenuLinks } from "../../constants/constants";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) =>!prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 650);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <nav className="nav-bar">
      <Link to="./" className="logo-link">
        <img src={Logo} alt="Logo" className="logo" />
        <span className="logo-text">Drone Management</span>
      </Link>
      {isWideScreen ? (
        <div className="nav-menu">
          {navMenuLinks.map((_link, index) => (
            <Link key={index} to={_link.link} className="nav-menu-item">
              {_link.icon}
              <span>{_link.title}</span>
            </Link>
          ))}
        </div>
      ) : (
        <>
          <GiHamburgerMenu className="mobile-menu-icon" onClick={toggleMenu}/>
          {showMenu ? <div className="nav-menu-mobile">
          {navMenuLinks.map((_link, index) => (
            <Link key={index} to={_link.link} className="nav-menu-item-mobile" onClick={() => {setShowMenu(false)}}>
              {_link.icon}
              <span>{_link.title}</span>
            </Link>
          ))}
        </div> : <></>}
        </>
      )}
    </nav>
  );
};

export default NavBar;
