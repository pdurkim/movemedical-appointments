import { useContext } from "react";
import AppointmentsContext from "../context/appointments";

function useAppointmentsContext() {
  return useContext(AppointmentsContext);
}

export default useAppointmentsContext;
