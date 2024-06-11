import React from "react";
import AppointmentForm from "../components/AppointmentForm";
import Hero from "../components/Hero";
const Appointment = () => {
  return (
    <div className="container" style={{ marginTop: "47px" }}>
      <Hero
        title={"Schedule Your Appointment | ZeeCare Medical Institute"}
        imageUrl={"/hero1.png"}
      />
      <AppointmentForm />
    </div>
  );
};

export default Appointment;
