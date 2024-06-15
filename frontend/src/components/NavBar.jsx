import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImHome } from "react-icons/im";
import { ImCalendar } from "react-icons/im";
import { ImUsers } from "react-icons/im";
import { HiShoppingCart } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const navigateTo = useNavigate();
  const goToLogin = () => {
    navigateTo("/login");
  };
  return (
    <>
      <nav
        style={{ maxWidth: "100%", paddingLeft: "30px", paddingRight: "30px" }}
      >
        <div className="logo">
          <img src="/navlogo.svg" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="link">
            <Link to={"/"}>
              <ImHome size={25} /> Home
            </Link>
            {isAuthenticated && (
              <Link to={"/appointment"}>
                <ImCalendar /> Appointment
              </Link>
            )}

            <Link to={"/aboutus"}>
              <ImUsers /> About Us
            </Link>
            {isAuthenticated && (
              <Link to={"/myappointments"}>
                <HiShoppingCart />
                MyApoint.
              </Link>
            )}
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LogOut
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              LogIn
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
