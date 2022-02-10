import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../Components/Header/Header";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState({});

  function handleUserNameChange(event) {
    const value = event.target.value;
    setUserName(value);
  }
  function handleEmailChange(event) {
    const value = event.target.value;
    setEmail(value);
  }
  function handlePhoneChange(event) {
    const value = event.target.value;
    setPhone(value);
  }
  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);
  }
  function handlePictureChange(event) {
    setPicture(event.target.files[0]);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", userName);
    formData.append("phone", phone);
    formData.append("pictureup", picture);
    console.log(formData);

    try {
      const response = await axios.post(
        "https://ryan-minted.herokuapp.com/user/signup",
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  let navigate = useNavigate();
  function clickLogin() {
    navigate("../login");
  }
  return (
    <div className="SignUp">
      <div className="SignUp-page">
        <h1>S'incrire</h1>
        <form onSubmit={handleSubmit} className="sign-up-form">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={userName}
            onChange={handleUserNameChange}
            required
          />
          <input
            type="email"
            placeholder="email@gmail.com"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="phone"
            placeholder="Numéro de téléphone"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <input
            type="file"
            id="file"
            multiple
            placeholder="Photo d'utilisateur"
            accept="image/png, image/jpeg, image/webp"
            onChange={handlePictureChange}
            required
          />
          <div className="sign-up-checkbox">
            <div>
              <input className="checkbox" type="checkbox" />
              <h2>S'inscrire à notre newsletter</h2>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moin 18 ans.
            </p>
          </div>
          <button type="submit">S'inscrire</button>
          <div className="sign-up-racourci">
            <p onClick={clickLogin}>Tu a déjà un compte ? Connecte-toi</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
