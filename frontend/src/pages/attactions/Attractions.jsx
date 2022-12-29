import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Attractions = () => {
  return (
    <div className="attractions">
      <Navbar />
      <h1>We are building this page soon</h1>
      <h3>Thanks for you visit</h3>
      <Link to="/">
        {" "}
        <button>Go to homepage</button>
      </Link>
    </div>
  );
};

export default Attractions;
