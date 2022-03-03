import axios from "axios";
import React, { useState } from "react";
// import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Login({
  setauthToken,
  authToken,
  setFloatConnect,
  floatSignUp,
  setFloatSignUp,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // let navigate = useNavigate();
  function clickSignUp() {
    setFloatSignUp(true);
    setFloatConnect(false);
  }
  function handleEmailChange(event) {
    const value = event.target.value;
    setEmail(value);
  }

  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    // window.location.reload();

    const data = { email: email, password: password };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}user/login`,
        data
      );
      setauthToken(response.data.token);
      toast.success("Connection", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFloatConnect(false);
      window.location.reload();

      //  toast.warning("")
      // toast.info("");
      // toast.error("");
      // toast.default("");

      // navigate(`../my-user-account/${response.data.id}`);
      // navigate("/");
    } catch (error) {
      toast.error("mot de passe ou adresse email erroner, veuillez réessayer", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

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
