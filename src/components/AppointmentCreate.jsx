import React, { useState } from "react";
import Dropdown from "./Dropdown";
import useAppointmentsContext from "../hooks/useAppointmentsContext";
import "./AppointmentCreate.css";

const AppointmentCreate = ({ onSubmit }) => {
  const { createAppointment } = useAppointmentsContext();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const locationOptions = [
    { label: "San Diego", value: "san-diego" },
    { label: "Portland", value: "portland" },
    { label: "Seattle", value: "seattle" },
    { label: "London", value: "london" },
    { label: "Orlando", value: "orlando" },
  ];
  const handleLocationChange = (option) => {
    setLocation(option);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (date === "" || time === "" || location === "") {
      setErrorMessage("Please fill out required fields.");
    } else if (Date.parse(`${date} ${time}`) < new Date()) {
      setErrorMessage("Date cannot be in the past.");
    } else {
      onSubmit();
      createAppointment({ date, time, location, description });
      setDate("");
      setTime("");
      setLocation("");
      setDescription("");
      setErrorMessage("");
    }
  };

  return (
    <div>
      <h2>New Appointment</h2>
      <div className="error-message">{errorMessage}</div>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="field">
          <label htmlFor="date">Date</label>
          <input
            className="input"
            name="date"
            type="date"
            onChange={handleDateChange}
            value={date}
          />
        </div>
        <div className="field">
          <label htmlFor="time">Time</label>
          <input
            className="input"
            name="time"
            type="time"
            onChange={handleTimeChange}
            value={time}
          />
        </div>
        <div className="field">
          <Dropdown
            options={locationOptions}
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <div className="field">
          <label htmlFor="date">
            Description - <span className="optional-field">Optional</span>
          </label>
          <textarea
            className="input"
            name="description"
            type="text"
            onChange={handleDescriptionChange}
            value={description}
            rows="5"
          />
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AppointmentCreate;
