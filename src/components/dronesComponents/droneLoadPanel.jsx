import React, { useState } from "react";
import "./dronescomponentsstyles.css";
import MedicationDraggableCard from "../medicationscomponents/medicationDraggableCard";
import { medicationModel } from "../../data/models/medication";

const DroneLoadPanel = (props) => {
  const [itemDragged, setItemDragged] = useState(medicationModel);
  const [indexDragged, setIndexDragged] = useState(null);
  const [startDragColumn, setStartDragColumn] = useState(null);

  const totalWeight = props.droneStorageMedicationsList.reduce((sum, item) => {
    return sum + item.weight;
  }, 0);

  const handleDragStart = (item, index, startColumn) => {
    setItemDragged(item);
    setIndexDragged(index);
    setStartDragColumn(startColumn);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, column) => {
    if (column === "right" && startDragColumn === "left") {
      props.storageMedication(itemDragged);
      cleanTempData();
    }
    if (column === "left") {
      props.removeMedication(indexDragged);
      cleanTempData();
    }
  };

  const cleanTempData = () => {
    setItemDragged(medicationModel);
    setIndexDragged(null);
    setStartDragColumn(null);
  };

  return (
    <div className="drone-modal-form-load-body">
      <div className="drag-drop-container">
        <h3>Available Medicaments</h3>
        <div
          className="drag-drop-wrapper"
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "left")}
        >
          {props.medicationsList.map((medication, index) => (
            <MedicationDraggableCard
              key={index}
              itemIndex={index}
              medication={medication}
              onDragStart={(event) =>
                handleDragStart(medication, index, "left")
              }
            />
          ))}
        </div>
      </div>
      <div className="drag-drop-container">
        <div className="drone-storage-header">
          <h3>Drone Storage</h3>
          <div className="drone-storage-info">
            <div className="drone-info-cell">{`max. weight: ${props.mxWeight}gr`}</div>
            <div className={`loading-info-cell ${(props.mxWeight >= totalWeight) ? 'drone-storage-fine' : 'drone-storage-overload'}`}>{`loading weight: ${totalWeight}gr`}</div>
          </div>
        </div>
        <div
          className="drag-drop-wrapper"
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "right")}
        >
          {props.droneStorageMedicationsList.map((medication, index) => (
            <MedicationDraggableCard
              key={index}
              itemIndex={index}
              medication={medication}
              onDragStart={(event) =>
                handleDragStart(medication, index, "right")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DroneLoadPanel;
