import axios from "axios";
import React, { useEffect, useState } from "react";

const MyAppointments = () => {
  const [userAppointments, setUserAppointments] = useState([]);

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

      setUserAppointments(result.data.userAppointments);
      //   console.log(result.data.userAppointments);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Your Appointments</h2>
      <div>
        {userAppointments.map((items, index) => (
          <h2 key={index}>{items.firstName}</h2>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
