import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          marginTop: "100px",
          alignItems: "center",
        }}
      >
        <div style={{ width: "40%", marginLeft: "10%", marginTop: "-10px" }}>
          <h1 style={{ marginBottom: "25px" }}>{title}</h1>
          <p>
            HumanKind Medical Institute is a state-of-the-art facility dedicated
            to providing comprehensive healthcare services with compassion and
            expertise. Our team of skilled professionals is committed to
            delivering personalized care tailored to each patient's needs. At
            HumanKind, we prioritize your well-being, ensuring a harmonious
            journey towards optimal health and wellness.
          </p>
        </div>
        <div style={{ flex: 1, textAlign: "right", marginRight: "10%" }}>
          <img
            src={imageUrl}
            alt="hero"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
