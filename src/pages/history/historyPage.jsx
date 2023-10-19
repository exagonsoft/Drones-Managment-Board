import React, { useEffect, useState } from "react";
import "./historystyles.css";
import axios from "../../api/axios";

const HistoryPage = () => {
  const [dronesList, setDronesList] = useState([]);
  const [historyList, setHistoryList] = useState([]);

  const loadDronesList = async () => {
    try {
      let _res = await axios.get("api/drones");
      let _dronesOption = _res.data.map((drone) => {
        return {
          id: drone.id,
          serialNumber: drone.serial_number,
        };
      });
      setDronesList(_dronesOption);
    } catch (error) {
      console.log(error);
    }
  };

  const loadHistoryList = async (_droneId = null) => {
    try {
      let _url = "api/audit_logs";
      if (_droneId) {
        _url = "api/audit_logs/" + _droneId;
      }
      let _res = await axios.get(_url);
      setHistoryList(_res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDronesList();
    loadHistoryList();
  }, []);
  return (
    <section className="history-section" id="historySection">
      <div className="history-header">
        <h1>Audit Log registers</h1>
      </div>
      <div className="history-filters">
        <select
          name="drones"
          id="droneSelect"
          onChange={(e) => loadHistoryList(e.target.value)}
        >
          <option value="">Select Drone</option>
          {dronesList.map((drone, index) => (
            <option key={index} value={drone.id}>
              {drone.serialNumber}
            </option>
          ))}
        </select>
      </div>
      <div className="logs-wrapper">
        <div className="log-header">
          <span>Drone ID</span>
          <span>Message</span>
          <span>TimeStamp</span>
        </div>
        <div className="log-body">
          {historyList.map((log, index) => (
            <div key={index} className="history-log">
              <span>{log.drone_id}</span>
              <span>{log.message}</span>
              <span>{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryPage;
