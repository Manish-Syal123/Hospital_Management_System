import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Friday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  return (
    <>
      <footer
        style={{
          padding: "20px",
          backgroundColor: "#ffffff",
          marginTop: "50px",
          //   borderTop: "1px solid #ddd",
        }}
      >
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 200px", margin: "10px" }}>
            <img src="/navlogo.svg" alt="logo" style={{ maxWidth: "100px" }} />
          </div>
          <div style={{ flex: "1 1 200px", margin: "10px" }}>
            <h4>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/appointment"}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  Appointment
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div style={{ flex: "1 1 200px", margin: "10px" }}>
            <h4>Hours</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {hours.map((element) => (
                <li key={element.id} style={{ marginBottom: "5px" }}>
                  <span style={{ display: "inline-block", width: "100px" }}>
                    {element.day}
                  </span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: "1 1 200px", margin: "10px" }}>
            <h4>Contact</h4>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <FaPhone style={{ marginRight: "10px" }} />
              <span>999-999-9999</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <MdEmail style={{ marginRight: "10px" }} />
              <span>manish@gmail.com</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaLocationArrow style={{ marginRight: "10px" }} />
              <span>India, Maharashtra</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
