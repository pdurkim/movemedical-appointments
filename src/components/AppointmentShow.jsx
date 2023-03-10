import React, { useState } from "react";
import useAppointmentsContext from "../hooks/useAppointmentsContext";
import AppointmentEdit from "./AppointmentEdit";
import "./AppointmentShow.css";
import Modal from "./Modal";

const Appointment = ({ appointment }) => {
  const { deleteAppointmentById } = useAppointmentsContext();
  const [showActions, setShowActions] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const appointmentDate = new Date(`${appointment.date} ${appointment.time}`);
  const date = appointmentDate.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    appointmentDate
  );
  const time = appointmentDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let description = appointment.description;
  if (description.length > 35) {
    description = description.substring(0, 35).concat(" ...");
  }

  const handleAppointmentDelete = () => {
    deleteAppointmentById(appointment.id);
  };

  const handleAppointmentEdit = () => {
    setShowModal((currentShowModal) => {
      return !currentShowModal;
    });
  };

  const handleClose = () => {
    setShowActions(false);
    setShowModal(false);
  };

  const modal = (
    <Modal onClose={handleClose}>
      <AppointmentEdit appointment={appointment} onSubmit={handleClose} />
    </Modal>
  );

  return (
    <div
      className="appointment"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="appointment-header">{date}</div>
      <div>{month}</div>
      <div className="appointment-description" alt={appointment.description}>
        {description}
      </div>
      <div className="appointment-time-place">
        <div>{time}</div>
        <div>@ {appointment.location.label}</div>
      </div>
      {showActions && !showModal && (
        <div className="appointment-actions">
          <button onClick={handleAppointmentEdit}>Edit</button>
          <button onClick={handleAppointmentDelete}>Delete</button>
        </div>
      )}
      {showModal && modal}
    </div>
  );
};

export default Appointment;
