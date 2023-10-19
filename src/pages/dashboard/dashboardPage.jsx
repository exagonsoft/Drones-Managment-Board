import React, { useContext, useEffect, useState } from "react";
import "./dashboardstyles.css";
import { Context } from "../../context/mainContext";
import axios from "../../api/axios";
import { notify } from "../../messages/notificationsHandler";
import { droneStates, notificationType } from "../../constants/constants";

const DashBoard = () => {
  const [dronesList, setDronesList] = useState([]);
  const [medicamentList, setMedicamentList] = useState([]);
  const [totalDrones, setTotalDrones] = useState(0);
  const [totalMedicaments, setTotalMedicaments] = useState(0);
  const [idleDrones, setIdleDrones] = useState(0);
  const [loadingDrones, setLoadingDrones] = useState(0);
  const [loadedDrones, setLoadedDrones] = useState(0);
  const [deliveringDrones, setDeliveringDrones] = useState(0);
  const [deliveredDrones, setDeliveredDrones] = useState(0);
  const [returningDrones, setReturningDrones] = useState(0);
  const { eventEmitted } = useContext(Context);

  const loadInfo = async () => {
    const _dronesRequest = axios.get(`/api/drones`);
    const _medicamentListRequest = axios.get(`/api/medications`);
    try {
      const [_droneList, _medicamentList] = await Promise.all([
        _dronesRequest,
        _medicamentListRequest,
      ]);
    } catch (error) {
      console.log(error);
      notify(error.response.data.message, notificationType.error);
    }

    setTotalDrones((await _dronesRequest).data.length);
    setTotalMedicaments((await _medicamentListRequest).data.length);
    setIdleDrones((await _dronesRequest).data.filter((d) => d.state === droneStates[0]).length);
    setLoadingDrones((await _dronesRequest).data.filter((d) => d.state === droneStates[1]).length);
    setLoadedDrones((await _dronesRequest).data.filter((d) => d.state === droneStates[2]).length);
    setDeliveringDrones((await _dronesRequest).data.filter((d) => d.state === droneStates[3]).length);
    setDeliveredDrones((await _dronesRequest).data.filter((d) => d.state === droneStates[4]).length);
    setReturningDrones((await _dronesRequest).data.filter((d) => d.state === droneStates[5]).length);
  };

  useEffect(() => {
    loadInfo();
  }, [eventEmitted]);

  return (
    <section className="dash-section">
      <div className="header">
        <h2>DRONES MANAGEMENT BOARD</h2>
      </div>
      <div className="body">
        <div className="entities-info">
          <span>{`Drones Registered: ${totalDrones}`}</span>
          <span>{`Medicaments in Storage: ${totalMedicaments}`}</span>
        </div>
        <div className="drones-state-info">
          <div className="drones-state-info-card">
            <div className="drones-state-info-card-header">
              <h4>Idle Drones</h4>
            </div>
            <div className="drones-state-info-card-body">{idleDrones}</div>
          </div>
          <div className="drones-state-info-card">
            <div className="drones-state-info-card-header">
              <h4>Loading Drones</h4>
            </div>
            <div className="drones-state-info-card-body">{loadingDrones}</div>
          </div>
          <div className="drones-state-info-card">
            <div className="drones-state-info-card-header">
              <h4>Loaded Drones</h4>
            </div>
            <div className="drones-state-info-card-body">{loadedDrones}</div>
          </div>
          <div className="drones-state-info-card">
            <div className="drones-state-info-card-header">
              <h4>Delivering Drones</h4>
            </div>
            <div className="drones-state-info-card-body">
              {deliveringDrones}
            </div>
          </div>
          <div className="drones-state-info-card">
            <div className="drones-state-info-card-header">
              <h4>Delivered Drones</h4>
            </div>
            <div className="drones-state-info-card-body">{deliveredDrones}</div>
          </div>
          <div className="drones-state-info-card">
            <div className="drones-state-info-card-header">
              <h4>Returning Drones</h4>
            </div>
            <div className="drones-state-info-card-body">{returningDrones}</div>
          </div>
        </div>
      </div>
      <div className="footer">
        <span>{`EXAGON-SOFT 2017 - ${new Date().getFullYear()} © ALL RIGHTS RESERVED`}</span>
      </div>
    </section>
  );
};

export default DashBoard;
