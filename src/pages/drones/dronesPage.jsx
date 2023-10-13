import React, { useEffect, useState } from "react";
import "./dronesstyles.css";
import { drones } from "../../mock/mockData";
import DronesListCard from "../../components/dronesComponents/droneListCard";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const DronesPage = () => {
  const [dronesList, setDronesList] = useState([]);

  const loadDronesList = async () => {
    setDronesList(drones);
  };

  useEffect(() => {
    loadDronesList();
  }, []);

  return (
    <>
      <div className="drones-list-header">
        <Link to="/drones/new" className="nav-menu-item">
          <FaPlus />
          <span>New Drone</span>
        </Link>
      </div>
      <section className="drones-section" id="drones_section">
        {dronesList.map((_drone, index) => (
          <DronesListCard
            key={index}
            serial_number={_drone.serial_number}
            model={_drone.model}
            weight={_drone.weight}
            battery={_drone.battery}
            state={_drone.state}
            baggage={_drone.baggage}
          />
        ))}
      </section>
    </>
  );
};

export default DronesPage;
