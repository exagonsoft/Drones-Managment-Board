import React, { useEffect, useState } from "react";
import './loaddronesstyles.css'
import AvailableDroneListCard  from "../../components/dronesComponents/availableDroneListCard";
import axios from "../../api/axios";

const LoadDronesPage = () => {
  const [dronesList, setDronesList] = useState([]);
 
  const loadDronesList = async () => {
    try {
      let _res = await axios.get("api/drones/available");
      setDronesList(_res.data);
    } catch (error) {}

    
  };

  useEffect(() => {
    loadDronesList();
  }, []);
  return (
    <section className="drones-section" id="drones_section">
        {dronesList.map((_drone, index) => (
          <AvailableDroneListCard
            key={index}
            serial_number={_drone.serial_number}
            model={_drone.model}
            weight={_drone.max_weight}
            battery={_drone.battery_capacity}
            state={_drone.state}
          />
        ))}
      </section>
  )
}

export default LoadDronesPage
