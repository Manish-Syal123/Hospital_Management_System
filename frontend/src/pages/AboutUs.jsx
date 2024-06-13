import React from "react";
import "../Styles/about.css"; // Import the CSS file
import "../Styles/aboutHero.css";
import Doctors from "../components/Doctors";
const AboutUs = () => {
  return (
    <>
      <section className="hero-section">
        <div className="container1">
          <div className="content">
            <h1 className="hero-title">
              Understand User Flow.
              <span className="hero-subtitle"> Increase Conversion. </span>
            </h1>
            <p className="hero-description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>
            <div className="button-group">
              <a className="button primary-button" href="#">
                Get Started
              </a>
              <a className="button secondary-button" href="#">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="career-path-section">
        <div className="container">
          <div className="grid">
            <div className="text-content">
              <h2 className="title">Find your career path</h2>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                vero aliquid sint distinctio iure ipsum cupiditate? Quis, odit
                assumenda? Deleniti quasi inventore, libero reiciendis minima
                aliquid tempora. Obcaecati, autem.
              </p>
              <a href="#" className="cta-button">
                Get Started Today
              </a>
            </div>

            <div className="icon-grid">
              {Array(3)
                .fill("")
                .map((_, index) => (
                  <a key={index} className="icon-card" href="#">
                    <span className="icon">
                      <svg
                        className="icon-svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        ></path>
                      </svg>
                    </span>
                    <h2 className="icon-title">Accountant</h2>
                    <p className="icon-description">
                      Lorem ipsum dolor sit amet consectetur.
                    </p>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Available Doctors Information */}
      <Doctors />
    </>
  );
};

export default AboutUs;
