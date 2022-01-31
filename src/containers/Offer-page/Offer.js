import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";

function Offer() {
  return (
    <div className="Offer">
      <Header />
      <Link to="/">Aller sur la page d'acceuil</Link>
    </div>
  );
}

export default Offer;
