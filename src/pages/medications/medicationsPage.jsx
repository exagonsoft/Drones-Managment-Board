import React, { useContext, useEffect, useState } from 'react'
import './medicationsstyles.css'
import { Context } from '../../context/mainContext';
import MedicationListCard from '../../components/medicationscomponents/medicationListCard';
import axios from '../../api/axios';
import { FaPlus } from "react-icons/fa";
import ModalMedicationForm from '../../components/medicationscomponents/modalMedicationForm';

const MedicationsPage = () => {
  const [medicationsList, setMedicationsList] = useState([]);
  const [showModalForm, setShowModalForm] = useState(false);
  const { freezeScreen, unFreezeScreen, eventEmitted } = useContext(Context);
  const [editingMedication, setEditingMedication] = useState(null);

  const loadMedicationsList = async () => {
    try {
      let _res = await axios.get("api/medications");
      let _listedMedications = _res.data;
      setMedicationsList(_listedMedications);
    } catch (error) {}
  };

  const hideModalForm = async (success) => {
    if (success) {
      await loadMedicationsList();
    }
    setShowModalForm(false);
    setEditingMedication(null);
    unFreezeScreen();
  };

  const onMedicationEditClick = async (name) => {
    let _medicationToEdit = await medicationsList.filter(
      (med) => med.name === name
    )[0];
    setEditingMedication(_medicationToEdit);
    freezeScreen();
    setShowModalForm(true);
  };

  const addMedication = () => {
    setShowModalForm(true);
    freezeScreen();
  };

  useEffect(() => {
    loadMedicationsList();
  }, [eventEmitted]);

  return (
    <>
    <div className="medications-list-header">
        <div className="nav-menu-item" onClick={addMedication}>
          <FaPlus />
          <span>New Medication</span>
        </div>
      </div>
      {showModalForm ? (
        <ModalMedicationForm closeForm={hideModalForm} medication={editingMedication} />
      ) : (
        <></>
      )}
    <section className="medications-section" id="medications_section">
        {medicationsList.map((_med, index) => (
          <MedicationListCard
            key={index}
            onEditClick={onMedicationEditClick}
            name={_med.name}
            weight={_med.weight}
            code={_med.code}
            imageUrl={_med.imageUrl}
          />
        ))}
      </section>
    </>
  )
}

export default MedicationsPage
