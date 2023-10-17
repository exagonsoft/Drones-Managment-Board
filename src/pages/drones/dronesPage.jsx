import React, { useEffect, useState } from "react";
import "./dronesstyles.css";
import DronesListCard from "../../components/dronesComponents/droneListCard";
import { FaPlus } from "react-icons/fa";
import axios from "../../api/axios";
import ModalDroneForm from "../../components/dronesComponents/modalDroneForm";
import { Context } from "../../context/mainContext";

const DronesPage = () => {
  const [dronesList, setDronesList] = useState([]);
  const [showModalForm, setShowModalForm] = useState(false);
  const { freezeScreen, unFreezeScreen, eventEmitted } =
    React.useContext(Context);
  const [editingDrone, setEditingDrone] = useState(null);

  const loadDronesList = async () => {
    try {
      let _res = await axios.get("api/drones");
      let _iCounter = 0;
      _res.data?.forEach(async (drone) => {
        let _droneResponse = await axios.get(
          `api/drones/medications/${drone.id}`
        );
        console.log(_droneResponse.data);
        _res.data[_iCounter].baggage = _droneResponse.data;
        _iCounter++;
      });
      setDronesList(_res.data);
    } catch (error) {}
  };

  const hideModalForm = (success) => {
    setShowModalForm(false);
    setEditingDrone(null);
    if (success) {
      loadDronesList();
    }
    unFreezeScreen();
  };

  const onDroneEditClick = async (serial_number) => {
    let _droneToEdit = await dronesList.filter(
      (drone) => drone.serial_number === serial_number
    )[0];
    setEditingDrone(_droneToEdit);
    freezeScreen();
    setShowModalForm(true);
  };

  const addDrone = () => {
    setShowModalForm(true);
    freezeScreen();
  };

  useEffect(() => {
    loadDronesList();
  }, [eventEmitted]);

  return (
    <>
      <div className="drones-list-header">
        <div className="nav-menu-item" onClick={addDrone}>
          <FaPlus />
          <span>New Drone</span>
        </div>
      </div>
      {showModalForm ? (
        <ModalDroneForm closeForm={hideModalForm} drone={editingDrone} />
      ) : (
        <></>
      )}
      <section className="drones-section" id="drones_section">
        {dronesList.map((_drone, index) => (
          <DronesListCard
            key={index}
            onEditClick={onDroneEditClick}
            serial_number={_drone.serial_number}
            model={_drone.model}
            weight={_drone.max_weight}
            battery={_drone.battery_capacity}
            state={_drone.state}
            baggage={_drone.baggage}
          />
        ))}
      </section>
    </>
  );
};

export default DronesPage;
