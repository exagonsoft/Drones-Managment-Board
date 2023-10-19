import React, { useEffect, useRef, useState } from "react";
import "./dronescomponentsstyles.css";
import axios from "../../api/axios";
import { droneModel } from "../../data/models/drone";
import DroneLoadPanel from "./droneLoadPanel";
import { notify } from "../../messages/notificationsHandler";
import { notificationType } from "../../constants/constants";

const ModalDroneLoadForm = (props) => {
  const [drone, setDrone] = useState(droneModel);
  const [medicationsList, setMedicationsList] = useState([]);
  const [droneStorageMedicationsList, setDroneStorageMedicationsList] =
    useState([]);
  const _formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (droneStorageMedicationsList.length > 0) {
        let _medicationsList = droneStorageMedicationsList.map(
          (item) => item.id
        );
        let _res = await axios.put(
          `api/drones/medications/load/${props.drone.id}`,
          { medicationsListIds: _medicationsList }
        );
        notify("Medications Loaded Successfully", notificationType.success);
        closeForm(true);
      }
    } catch (error) {
      console.log(error);
      notify(error.response.data.message, notificationType.error);
    }
  };

  const closeForm = (success = false) => {
    setDrone(droneModel);
    if (_formRef.current) {
      _formRef.current.reset();
    }
    props.closeForm(success);
  };

  const loadMedicationsList = async () => {
    try {
      let _res = await axios.get("api/medications");
      setMedicationsList(_res.data);
    } catch (error) {
      console.log(error);
      notify(error.response.data.message, notificationType.error);
    }
  };

  const storageMedication = (medication) => {
    if (setDroneStorageMedicationsList[0]?.id) {
      setDroneStorageMedicationsList([
        ...droneStorageMedicationsList,
        medication,
      ]);
    } else {
      setDroneStorageMedicationsList([
        ...droneStorageMedicationsList,
        medication,
      ]);
    }
  };

  const removeMedication = (medIndex) => {
    setDroneStorageMedicationsList((prevList) => {
      const newList = [...prevList];
      newList.splice(medIndex, 1);
      return newList;
    });
  };

  useEffect(() => {
    loadMedicationsList();
  }, []);

  return (
    <div className="drone-modal-container">
      <div className="glass-background"></div>
      <form
        ref={_formRef}
        onSubmit={handleSubmit}
        className="drone-modal-load-form"
      >
        <div className="drone-modal-form-header">
          <h1>{`Load Drone ${props.drone.serial_number}`}</h1>
        </div>
        <DroneLoadPanel
          mxWeight={props.drone.max_weight}
          medicationsList={medicationsList}
          droneStorageMedicationsList={droneStorageMedicationsList}
          storageMedication={storageMedication}
          removeMedication={removeMedication}
        />
        <div className="form-footer">
          <button type="submit" className="btn btn-primary">
            Confirm
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalDroneLoadForm;
