import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "../Styles/appointment.css";
import { Context } from "../main";
const MyAppointments = () => {
  const [userAppointments, setUserAppointments] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const { user, setUser } = useContext(Context);

  useEffect(() => {
    BookedAppointments();
    console.log(userAppointments);
  }, []);
  const BookedAppointments = async () => {
    try {
      const result = await axios.get(
        "http://localhost:4000/api/v1/appointment/getuserappointments",
        {
          withCredentials: true,
        }
      );

      const filteredAppointments = result.data.userAppointments.filter(
        (items) => items.email === user?.email
      );
      setUserAppointments(filteredAppointments);
      //   console.log(result.data.userAppointments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setUserAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
      BookedAppointments();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="maincontainer">
      <div className="banner">
        <h5>My Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userAppointments && userAppointments.length > 0 ? (
              userAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td data-label="Patient">{`${appointment.firstName} ${appointment.lastName}`}</td>
                  <td data-label="Date">
                    {appointment.appointment_date.substring(0, 16)}
                  </td>
                  <td data-label="Doctor">{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                  <td data-label="Department">{appointment.department}</td>
                  <td data-label="Status">
                    <select
                      className={
                        appointment.status === "Pending"
                          ? "value-pending"
                          : appointment.status === "Accepted"
                          ? "value-accepted"
                          : "value-rejected"
                      }
                      value={appointment.status}
                      disabled
                    >
                      <option value="Pending" className="value-pending">
                        Pending
                      </option>
                      <option value="Accepted" className="value-accepted">
                        Accepted
                      </option>
                      <option value="Rejected" className="value-rejected">
                        Rejected
                      </option>
                    </select>
                  </td>
                  <td data-label="Visited">
                    <button
                      disabled={isClicked}
                      onClick={() => {
                        handleUpdateStatus(appointment._id, "Rejected");
                        setIsClicked(true);
                      }}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <h1>No Appointments Found!</h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
