import React from "react";
import logo from "./vinted.png";

function LoadingPage() {
  return (
    <div className="loading-block">
      <div className="Loading">
        <div>
          Bienvenue <br />
          sur <br />
        </div>
        <div>
          <span>
            <img src={logo} alt="vinted logo" />
          </span>
        </div>
        <p>Fait par LOLLIA DORIANE</p>
      </div>
      {/* <img
        src="https://www.vinted.fr/assets/seller-promotion/other/banner-tablets-up-afe3d19776592a72f165c1bb93fd02c5528250a8c670ecc1656654323f9d4856.jpg"
        alt="picture clothe"
      /> */}
    </div>
  );
}

export default LoadingPage;
