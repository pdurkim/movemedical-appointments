import React, { useState } from "react";
import useAppointmentsContext from "../hooks/useAppointmentsContext";
import AppointmentCreate from "./AppointmentCreate";
import AppointmentShow from "./AppointmentShow";
import Modal from "./Modal";
import "./AppointmentList.css";

const AppointmentList = () => {
  const { appointments } = useAppointmentsContext();
  const [showModal, setShowModal] = useState(false);

  const renderAppointments = appointments
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);

      return dateB - dateA;
    })
    .map((appointment) => {
      return <AppointmentShow appointment={appointment} key={appointment.id} />;
    });

  const handleAppointmentCreate = () => {
    setShowModal((currentShowModal) => {
      return !currentShowModal;
    });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const modal = (
    <Modal onClose={handleClose}>
      <AppointmentCreate onSubmit={handleClose} />
    </Modal>
  );

  return (
    <>
      <div className="appointments-header">
        <h1>My Appointments</h1>
        <button
          onClick={handleAppointmentCreate}
          className="create-appointment"
        >
          Create Appointment
        </button>
      </div>
      {showModal && modal}
      <div>
        <div className="upcoming-appointments">
          <h2>{appointments.length > 0 ? "Upcoming" : "No Upcoming Events"}</h2>
          <div className="appointment-list">{renderAppointments}</div>
        </div>
      </div>
    </>
  );
};

export default AppointmentList;
