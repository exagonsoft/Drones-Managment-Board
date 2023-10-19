import React, { useState } from "react";
import "./dronescomponentsstyles.css";
import Drone from "../../assets/drone.png";
import {
  GiHamburgerMenu,
  GiBatteries,
  GiAchievement,
  GiWeight,
  GiGears,
} from "react-icons/gi";

const AvailableDroneListCard = (props) => {
  const { serial_number, model, weight, battery, state } = props;
  const [showActionMenu, setShowActionMenu] = useState(false);

  const actionMenuToggle = () => {
    setShowActionMenu((prev) =>!prev);
  };

  return (
    <div
      className={`drone-list-card `}
    >
      <div className="drone-list-card-header">
        <span className="">{serial_number}</span>
        <div className="action-menu">
          <GiHamburgerMenu onClick={actionMenuToggle}/>
          {showActionMenu ? <div className="action-menu-body">
            <span onClick={() => {props.onLoadClick(serial_number); setShowActionMenu(false)}}>Load Drone</span>
          </div> : <></>}
        </div>
      </div>
      <div className="drone-list-card-body">
        <img src={Drone} alt="" />
        <div className="drone-list-card-body-info">
          <div className="drone-list-card-body-info-row">
            <GiAchievement />
            <span>{model}</span>
          </div>
          <div className="drone-list-card-body-info-row">
            <GiWeight />
            <span>{weight}gr</span>
          </div>
          <div className="drone-list-card-body-info-row">
            <GiGears />
            <span>{state}</span>
          </div>
          <div className="drone-list-card-body-info-row">
            <GiBatteries />
            <span className="drone-list-card-body-info-battery">
              {battery}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableDroneListCard;
