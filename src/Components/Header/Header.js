import React from "react";
import LogoVinted from "./Vinted_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header({ authToken, setauthToken, Cookies }) {
  const [float, setFloat] = useState(false);
  let navigate = useNavigate();
  function handleClickSignUp() {
    navigate("../sign-up");
  }
  function handleClickLogin() {
    navigate("../login");
  }
  function handleClikSignOut() {
    setauthToken("");
    Cookies.remove("token");
  }
  return (
    <div className="Header">
      <Link to="/">
        <div className="logo-image">
          <img src={LogoVinted} alt="Logo du site vinted" />
        </div>
      </Link>
      <div className="search">
        <div className="icon-search">
          <FontAwesomeIcon icon="search" />
        </div>
        <input type="search" placeholder="Recherche des articles" />
      </div>
      <div className="box-button">
        <button
          className="bars"
          onClick={() => {
            setFloat(!float);
          }}
        >
          <FontAwesomeIcon icon="bars" />
        </button>
        <div className="header-button">
          <div className="authToken-state">
            {authToken ? (
              <button onClick={handleClikSignOut} className="sign-out">
                Se Deconnecter
              </button>
            ) : (
              <div>
                <button onClick={handleClickSignUp} className="register">
                  S'inscrire
                </button>
                <button onClick={handleClickLogin} className="login">
                  Se connecter
                </button>
              </div>
            )}
          </div>
          <button className="sole">Vends tes articles</button>
        </div>
        <div className={float ? "button-float" : "none"}>
          <div className="authToken-state">
            {authToken ? (
              <button className="sign-out">Se Deconnecter</button>
            ) : (
              <div>
                <button onClick={handleClickSignUp} className="register">
                  S'inscrire
                </button>
                <button onClick={handleClickLogin} className="login">
                  Se connecter
                </button>
              </div>
            )}
          </div>
          <button className="sole">Vends tes articles</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
