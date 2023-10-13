import React from "react";
import "./medicationscomponentstyles.css";

const MedicationInlineCard = (props) => {
  const {name, weight, code, image} = props
  return (
    <div className="inline-card">
      <img src={image} alt="Image" className="" />
      <div className="inline-card-info">
        <span>{name}</span>
        <span>{code}</span>
        <span>{weight}gr</span>
      </div>
    </div>
  );
};

export default MedicationInlineCard;
