import React, { useEffect, useRef, useState } from "react";
import "./dronescomponentsstyles.css";
import { droneModels, droneStates, notificationType } from "../../constants/constants";
import { droneModel } from "../../data/models/drone";
import axios from "../../api/axios";
import { notify } from "../../messages/notificationsHandler";

const ModalDroneForm = (props) => {
  const [drone, setDrone] = useState(droneModel);
  const _formRef = useRef();
  const _snRef = useRef();
  const _modelRef = useRef();
  const _weightRef = useRef();
  const _batteryRef = useRef();
  const _stateRef = useRef();

  const updateDroneData = (value, target) => {
    setDrone((prevDroneData) => ({ ...prevDroneData, [target]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let _res = null;
    try {
      if (props.drone) {
        _res = await axios.put(`api/drones/${props.drone.id}`, drone);
      } else {
        _res = await axios.post("api/drones", drone);
      }
      notify("Drone Saved Successfully", notificationType.success);
      closeForm(true);
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

  const loadDroneData = () => {
    setDrone(props.drone);
    if (_snRef.current) {
      _snRef.current.value = props.drone.serial_number;
    }
    if (_modelRef.current) {
      _modelRef.current.value = props.drone.model;
    }
    if (_weightRef.current) {
      _weightRef.current.value = props.drone.max_weight;
    }
    if (_batteryRef.current) {
      _batteryRef.current.value = props.drone.battery_capacity;
    }
    if (_stateRef.current) {
      _stateRef.current.value = props.drone.state;
    }
  };

  useEffect(() => {
    if (props.drone) {
      loadDroneData();
    }
  }, []);

  return (
    <div className="drone-modal-container">
      <div className="glass-background"></div>
      <form ref={_formRef} onSubmit={handleSubmit} className="drone-modal-form">
        <div className="drone-modal-form-header">
          <h1>
            {props.drone
              ? `Edit Drone ${props.drone.serial_number}`
              : `Register new Drone`}
          </h1>
        </div>
        <div className="drone-modal-form-body">
          {props.drone ? (
            <></>
          ) : (
            <div className="drone-modal-form-input">
              <label>Serial Number</label>
              <input
                ref={_snRef}
                type="text"
                placeholder="Serial Number"
                onChange={(e) =>
                  updateDroneData(e.target.value, "serial_number")
                }
                required
                maxLength="100"
              />
            </div>
          )}
          <div className="drone-modal-form-input">
            <label>Model</label>
            <select
              ref={_modelRef}
              name=""
              id="droneModel"
              className=""
              aria-required
              required
              onChange={(e) => updateDroneData(e.target.value, "model")}
            >
              <option value="">Select Model</option>
              <option value={droneModels[0]}>Lightweight</option>
              <option value={droneModels[1]}>Middleweight</option>
              <option value={droneModels[2]}>Cruiserweight</option>
              <option value={droneModels[3]}>Heavyweight</option>
            </select>
          </div>
          <div className="drone-modal-form-input">
            <label>Max Weight</label>
            <input
              ref={_weightRef}
              type="number"
              placeholder="Max Weight"
              max="500"
              required
              onChange={(e) => updateDroneData(e.target.value, "max_weight")}
            />
          </div>
          <div className="drone-modal-form-input">
            <label>Battery Capacity</label>
            <input
              ref={_batteryRef}
              type="number"
              placeholder="Battery Capacity"
              required
              max={100}
              onChange={(e) =>
                updateDroneData(e.target.value, "battery_capacity")
              }
            />
          </div>
          {props.drone ? (
            <div className="drone-modal-form-input">
              <label>State</label>
              <select
                ref={_stateRef}
                name=""
                id="droneState"
                className=""
                aria-required
                required
                onChange={(e) => updateDroneData(e.target.value, "state")}
              >
                <option value="">Select State</option>
                <option value={droneStates[0]}>Idle</option>
                <option value={droneStates[1]}>Loading</option>
                <option value={droneStates[2]}>Loaded</option>
                <option value={droneStates[3]}>Delivering</option>
                <option value={droneStates[4]}>Delivered</option>
                <option value={droneStates[5]}>Returning</option>
              </select>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="form-footer">
          <button type="submit" className="btn btn-primary">
            {props.drone ? "Update Drone" : "Register Drone"}
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

export default ModalDroneForm;
