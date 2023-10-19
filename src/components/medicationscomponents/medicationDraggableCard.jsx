import React, { useRef } from "react";
import "./medicationscomponentstyles.css";

const MedicationDraggableCard = (props) => {
  const _cardRef = useRef();

  const onDragStarted = () => {
    if (_cardRef.current) {
      _cardRef.current.classList.add("card-dragging");
    }
  };

  const onDragEnded = (e) => {
    if (_cardRef.current) {
      _cardRef.current.classList.remove("card-dragging");
    }
  };

  return (
    <div
      ref={_cardRef}
      className="medication-draggable-card"
      draggable
      onDragStart={(event) => {
        onDragStarted();
        props.onDragStart(event, props.medication, props.itemIndex);
      }}
      onDragEnd={onDragEnded}
    >
      <img src={props.medication.imageUrl} alt="" className="" />
      <div className="card-details">
        <span>{props.medication.name}</span>
        <span>{props.medication.code}</span>
        <span>{props.medication.weight}gr</span>
      </div>
    </div>
  );
};

export default MedicationDraggableCard;
