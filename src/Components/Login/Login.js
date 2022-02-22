import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../Components/Header/Header";

function Login({ setauthToken, authToken, setFloatConnect }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  function clickSignUp() {
    navigate("../sign-up");
  }

  function handleEmailChange(event) {
    const value = event.target.value;
    setEmail(value);
  }

  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);
  }
  const handleSubmit = async () => {
    // event.preventDefault();
    setFloatConnect(false);
    // window.location.reload();

    const data = { email: email, password: password };
    try {
      const response = await axios.post(
        "https://ryan-minted.herokuapp.com/user/login",
        data
      );
      setauthToken(response.data.token);
      // navigate(`../my-user-account/${response.data.id}`);
      // navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="Login">
      <div className="login-page">
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="email@gmail.com"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <button type="submit">Se connecter</button>
          <div className="login-racourci">
            <p onClick={clickSignUp}>Pas encore de compte ? Inscris-toi</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
