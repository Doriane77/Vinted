import React from "react";
import LogoVinted from "./Vinted_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
  return (
    <div className="Header">
      <div className="logo-image">
        <img src={LogoVinted} alt="Logo du site vinted" />
      </div>
      <div className="search">
        <div className="icon-search">
          <FontAwesomeIcon icon="search" />
        </div>
        <input type="search" placeholder="Recherche des articles" />
      </div>
      <div className="box-button">
        <button className="register">S'inscrire</button>
        <button className="login">Se connecter</button>
        <button className="sole">Vends tes articles</button>
      </div>
    </div>
  );
}

export default Header;
