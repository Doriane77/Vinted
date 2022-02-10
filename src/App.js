import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faBars);
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./containers/Home-page/Home";
import Offer from "./containers/Offer-page/Offer";
import SignUp from "./containers/SignUp/SingUp";
import Header from "./Components/Header/Header";
import Login from "./containers/Login/Login";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [authToken, setauthToken] = useState(Cookies.get("token") || "");
  let kookie = Cookies.set("token", authToken, { expires: 7 });
  console.log(authToken);
  return (
    <div>
      <Router>
        <Header
          authToken={authToken}
          setauthToken={setauthToken}
          Cookies={Cookies}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="offer/:id" element={<Offer />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route
            path="login"
            element={
              <Login authToken={authToken} setauthToken={setauthToken} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
