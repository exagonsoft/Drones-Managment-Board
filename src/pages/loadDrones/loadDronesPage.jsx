import React, { useContext, useEffect, useState } from "react";
import "./loaddronesstyles.css";
import AvailableDroneListCard from "../../components/dronesComponents/availableDroneListCard";
import axios from "../../api/axios";
import { Context } from "../../context/mainContext";
import ModalDroneLoadForm from "../../components/dronesComponents/modalDroneLoadForm";

const LoadDronesPage = () => {
  const [dronesList, setDronesList] = useState([]);
  const [showModalForm, setShowModalForm] = useState(false);
  const { freezeScreen, unFreezeScreen, eventEmitted } = useContext(Context);
  const [loadingDrone, setLoadingDrone] = useState(null);

  const loadDronesList = async () => {
    try {
      let _res = await axios.get("api/drones/available");
      setDronesList(_res.data);
    } catch (error) {}
  };

  const hideModalForm = (success) => {
    setShowModalForm(false);
    setLoadingDrone(null);
    if (success) {
      loadDronesList();
    }
    unFreezeScreen();
  };

  const onDroneLoadClick = async (serial_number) => {
    let _droneToLoad = await dronesList.filter(
      (drone) => drone.serial_number === serial_number
    )[0];
    setLoadingDrone(_droneToLoad);
    freezeScreen();
    setShowModalForm(true);
  };

  useEffect(() => {
    loadDronesList();
  }, [eventEmitted]);
  return (
    <section className="drones-section" id="drones_section">
      {showModalForm ? (
        <ModalDroneLoadForm closeForm={hideModalForm} drone={loadingDrone} />
      ) : (
        <></>
      )}
      {dronesList.map((_drone, index) => (
        <AvailableDroneListCard
          key={index}
          onLoadClick = {onDroneLoadClick}
          serial_number={_drone.serial_number}
          model={_drone.model}
          weight={_drone.max_weight}
          battery={_drone.battery_capacity}
          state={_drone.state}
        />
      ))}
    </section>
  );
};

export default LoadDronesPage;
