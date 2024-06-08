import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";
const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to HumanKind Medicare Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/hero2.png"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
