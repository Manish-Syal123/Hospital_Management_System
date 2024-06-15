import React, { useContext, useEffect, useState } from "react";
import "../Styles/about.css"; // Import the CSS file
import "../Styles/aboutHero.css";
import Doctors from "../components/Doctors";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const AboutUs = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="hero-section">
        <div className="container1">
          <div className="content">
            <h1 className="hero-title">
              Our Registered Doctors.
              <span className="hero-subtitle"> Increase Conversion. </span>
            </h1>
            <p className="hero-description">
              We have the best Hired Doctors arround the world, with higher
              eduction in ther department.
            </p>
            <div className="button-group">
              <a className="button primary-button" href="#">
                Check below Our 👉
              </a>
              <a className="button secondary-button" href="#">
                Registered Doctor Information 👇
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="career-path-section">
        <div className="container">
          <div className="grid">
            <div className="doctor-grid">
              {doctors.map((element, index) => (
                <a key={index} className="doctor-card">
                  <div className="doctor-image">
                    <img
                      src={element.docAvatar && element.docAvatar.url}
                      alt="doctor avatar"
                    />
                  </div>
                  <h2 className="doctor-title">
                    Email:{" "}
                    <span className="doctor-description">{element.email}</span>
                  </h2>
                  <h2 className="doctor-title">
                    Phone:{" "}
                    <span className="doctor-description">{element.phone}</span>
                  </h2>
                  <h2 className="doctor-title">
                    DOB:
                    <span className="doctor-description">
                      {element.dob.substring(0, 10)}
                    </span>
                  </h2>
                  <h2 className="doctor-title">
                    Department:
                    <span className="doctor-description">
                      {element.doctorDepartment}
                    </span>
                  </h2>
                  <h2 className="doctor-title">
                    Gender:
                    <span className="doctor-description">{element.gender}</span>
                  </h2>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
