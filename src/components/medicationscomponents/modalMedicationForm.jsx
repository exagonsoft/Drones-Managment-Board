import React, { useEffect, useRef, useState } from "react";
import "./medicationscomponentstyles.css";
import { medicationModel } from "../../data/models/medication";
import axios from "../../api/axios";
import PictureUploader from "../pictureUploader/PictureUploader";
import { config } from "../../configs/config";
import { notify } from "../../messages/notificationsHandler";
import { notificationType } from "../../constants/constants";

const ModalMedicationForm = (props) => {
  const [medication, setMedication] = useState(medicationModel);
  const [selectedImage, setSelectedImage] = useState("");
  const _formRef = useRef();
  const _nameRef = useRef();
  const _codeRef = useRef();
  const _weightRef = useRef();
  const _imageRef = useRef();

  const onImageSelected = async (_newImage) => {
    setMedication((prevMedicationData) => ({
      ...prevMedicationData,
      imageUrl: _newImage.url,
    }));
    setSelectedImage(_newImage.image);
  };

  const updateMedicationData = (value, target) => {
    setMedication((prevMedicationData) => ({
      ...prevMedicationData,
      [target]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let _saveData = medication;
    _saveData.imageUrl = config.API_URL + "images/" + medication.name + ".png";
    try {
      if (props.medication) {
        let _res = await axios.put(
          `api/medications/${props.medication.id}`,
          _saveData
        );
      } else {
        let _res = await axios.post("api/medications", _saveData);
      }
      let _uploaded = await uploadImage();
      notify("Medication Saved Successfully", notificationType.success);
      closeForm(true);
    } catch (error) {
      console.log(error);
      notify(error.response.data.message, notificationType.error);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("fileName", medication.name + ".png");

    let _res = await axios.post("api/upload_file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return _res.data
  };

  const closeForm = (success = false) => {
    setMedication(medicationModel);
    if (_formRef.current) {
      _formRef.current.reset();
    }
    props.closeForm(success);
  };

  const loadMedicationData = () => {
    setMedication(props.medication);
    if (_nameRef.current) {
      _nameRef.current.value = props.medication.name;
    }
    if (_codeRef.current) {
      _codeRef.current.value = props.medication.code;
    }
    if (_weightRef.current) {
      _weightRef.current.value = props.medication.weight;
    }
    if (_imageRef.current) {
      _imageRef.current.value = props.medication.imageUrl;
    }
  };

  useEffect(() => {
    if (props.medication) {
      loadMedicationData();
    }
  }, []);
  return (
    <div className="medication-modal-container">
      <div className="glass-background"></div>
      <form
        ref={_formRef}
        onSubmit={handleSubmit}
        className="medication-modal-form"
      >
        <div className="medication-modal-form-header">
          <h1>
            {props.medication
              ? `Edit Medication ${props.medication.name}`
              : `Register new Medication`}
          </h1>
        </div>
        <div className="medication-modal-form-body">
          <div className="medication-modal-form-input">
            <label>Name</label>
            <input
              ref={_nameRef}
              type="text"
              placeholder="Name"
              pattern="[A-Za-z0-9_-]+"
              onChange={(e) => updateMedicationData(e.target.value, "name")}
              required
              maxLength="100"
            />
          </div>
          <div className="medication-modal-form-input">
            <label>Code</label>
            <input
              ref={_codeRef}
              type="text"
              placeholder="Code"
              required
              pattern="[A-Z0-9_]+"
              onChange={(e) => updateMedicationData(e.target.value, "code")}
            />
          </div>
          <div className="medication-modal-form-input">
            <label>Weight</label>
            <input
              ref={_weightRef}
              type="number"
              placeholder="Weight"
              required
              onChange={(e) => updateMedicationData(e.target.value, "weight")}
            />
          </div>
          <div className="medication-modal-form-input">
            <PictureUploader
              image={medication.imageUrl}
              onChange={onImageSelected}
            />
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="btn btn-primary">
            {props.medication ? "Update Medication" : "Register Medication"}
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

export default ModalMedicationForm;
