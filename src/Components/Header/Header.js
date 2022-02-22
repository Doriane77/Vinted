import React, { useEffect } from "react";
import LogoVinted from "./Vinted_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Login from "../../Components/Login/Login";
import SignUp from "../../Components/SignUp/SingUp";

function Header({
  authToken,
  setauthToken,
  Cookies,
  setSearch,
  floatConnect,
  setFloatConnect,
}) {
  const [float, setFloat] = useState(false);
  // const [floatConnect, setFloatConnect] = useState(false);
  const [floatSignUp, setFloatSingUp] = useState(false);

  let navigate = useNavigate();
  function handleClickSignUp() {
    // navigate("../sign-up");
    setFloatSingUp(!floatSignUp);
    setFloatConnect(false);
  }
  function handleClickLogin() {
    // navigate("../login");
    // fetchData();

    setFloatSingUp(false);
    setFloatConnect(!floatConnect);
  }
  function handleClikSignOut() {
    setauthToken("");
    Cookies.remove("token");
    navigate("/");
    window.location.reload();
  }
  function handleProfileClik() {
    navigate(`../my-user-account/${data.user._id}`);
  }
  function handleSearchChange(event) {
    const value = event.target.value;
    setSearch(value);
  }
  function handleSoleClik() {
    setFloat(false);
    if (authToken) {
      navigate(`../my-user-account/${data.user._id}/vend-un-article`);
    } else {
      setFloatConnect(!floatConnect);
    }
  }
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (authToken) {
      try {
        const response = await axios.post(
          `https://ryan-minted.herokuapp.com/user/profile`,
          {},
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="Header">
      <Link to="/">
        <div className="logo-image">
          <img src={LogoVinted} alt="Logo du site vinted" />
        </div>
      </Link>
      <div className={floatSignUp ? "float-sign-up" : "none"}>
        <SignUp
          authToken={authToken}
          setauthToken={setauthToken}
          setFloatSingUp={setFloatSingUp}
        />
      </div>
      <div className={floatConnect ? "float-connect" : "none"}>
        <Login
          authToken={authToken}
          setauthToken={setauthToken}
          floatConnect={floatConnect}
          setFloatConnect={setFloatConnect}
        />
      </div>
      <div className="search">
        <div className="icon-search">
          <FontAwesomeIcon icon="search" />
        </div>
        <input
          type="search"
          placeholder="Recherche des articles"
          onChange={handleSearchChange}
        />
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
              <div>
                <button onClick={handleClikSignOut} className="sign-out">
                  Se Deconnecter
                </button>
              </div>
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
          <button className="sole" onClick={handleSoleClik}>
            Vends articles
          </button>
        </div>
        <div className={float ? "button-float" : "none"}>
          <div className="authToken-state">
            {authToken ? (
              <div>
                <button onClick={handleClikSignOut} className="sign-out">
                  Se Deconnecter
                </button>
              </div>
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
          <button className="sole" onClick={handleSoleClik}>
            Vends tes articles
          </button>
        </div>
      </div>
      <div className={float ? "" : ""}>
        <div className={authToken ? "header-profile" : "none"}>
          {isLoading ? (
            <div></div>
          ) : (
            <button onClick={handleProfileClik} className="header-user-button">
              <h2>{data.user.account.username}</h2>
              <div className="header-user-img">
                <img src={data.user.account.avatar.secure_url} alt="" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
