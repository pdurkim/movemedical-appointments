import { createContext, useState } from "react";

const AppointmentsContext = createContext();

function Provider({ children }) {
  const [appointments, setAppointments] = useState([]);

  const deleteAppointmentById = async (id) => {
    const updatedAppointments = appointments.filter((appointment) => {
      return appointment.id !== id;
    });
    setAppointments(updatedAppointments);
  };

  const editAppointmentById = (id, appointmentInfo) => {
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === id) {
        return { ...appointment, ...appointmentInfo };
      }
      return appointment;
    });
    setAppointments(updatedAppointments);
  };

  const createAppointment = (appointmentInfo) => {
    const newAppointment = { id: Math.random(), ...appointmentInfo };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
  };

  const valueToShare = {
    appointments,
    deleteAppointmentById,
    editAppointmentById,
    createAppointment,
  };

  return (
    <AppointmentsContext.Provider value={valueToShare}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export { Provider };
export default AppointmentsContext;
