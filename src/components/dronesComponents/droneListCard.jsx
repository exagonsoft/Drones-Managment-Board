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
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import MedicationInlineCard from "../medicationscomponents/medicationInlineCard";

const DronesListCard = (props) => {
  const { serial_number, model, weight, battery, state, baggage } = props;
  const [showDetails, setShowDetails] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);

  const detailsToggle = () => {
    setShowDetails((prev) => !prev);
  };

  const actionMenuToggle = () => {
    setShowActionMenu((prev) =>!prev);
  };

  return (
    <div
      className={`drone-list-card ${
        showDetails ? "expanded-drone-list-card" : ""
      }`}
    >
      <div className="drone-list-card-header">
        <span className="">{serial_number}</span>
        <div className="action-menu">
          <GiHamburgerMenu onClick={actionMenuToggle}/>
          {showActionMenu ? <div className="action-menu-body">
            <span onClick={() => {props.onEditClick(serial_number); setShowActionMenu(false)}}>Edit</span>
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
      <div className="drone-list-card-baggage">
        <div className="drone-list-card-baggage-details-menu">
          <hr className="" />
          {showDetails ? (
            <FaArrowCircleUp onClick={detailsToggle} />
          ) : (
            <FaArrowCircleDown onClick={detailsToggle} />
          )}
        </div>
        {showDetails ? (
          <div className="drone-list-card-baggage-list">
            {baggage?.map((_item, index) => (
              <MedicationInlineCard
                key={index}
                name={_item.name}
                weight={_item.weight}
                code={_item.code}
                image={_item.imageUrl}
              />
            ))}
          </div>
        ) : <></>}
      </div>
    </div>
  );
};

export default DronesListCard;
