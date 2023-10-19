import React, { useState } from "react";
import './medicationscomponentstyles.css'
import {
    GiHamburgerMenu,
    GiAchievement,
    GiWeight
  } from "react-icons/gi";

const MedicationListCard = (props) => {
  const [showActionMenu, setShowActionMenu] = useState(false);

  const actionMenuToggle = () => {
    setShowActionMenu((prev) => !prev);
  };

  return (
    <div className={`medication-list-card `}>
      <div className="medication-list-card-header">
        <span className="">{props.name}</span>
        <div className="action-menu">
          <GiHamburgerMenu onClick={actionMenuToggle} />
          {showActionMenu ? (
            <div className="action-menu-body">
              <span
                onClick={() => {
                  props.onEditClick(props.name);
                  setShowActionMenu(false);
                }}
              >
                Edit
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="medication-list-card-body">
        <img src={props.imageUrl} alt="" />
        <div className="medication-list-card-body-info">
          <div className="medication-list-card-body-info-row">
            <GiAchievement />
            <span>{props.code}</span>
          </div>
          <div className="medication-list-card-body-info-row">
            <GiWeight />
            <span>{props.weight}gr</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationListCard;
