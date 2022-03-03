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
    </div>
  );
}

export default LoadingPage;
