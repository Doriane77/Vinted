import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faBars, faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faBars, faEdit);
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./containers/Home-page/Home";
import Offer from "./containers/Offer-page/Offer";
import Header from "./Components/Header/Header";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import MyUserAccount from "./containers/MyUserAccount/MyUserAccount";
import MyOffer from "./containers/MyOffer/MyOffer";
import SellYourItems from "./containers/SellYourItems/SellYourItems";
import UserUpdate from "./containers/UpdateUser/UpdateUser";
import MyOfferUpdate from "./containers/MyOfferUpdate/MyOfferUpdate";
import axios from "axios";

function App() {
  const [authToken, setauthToken] = useState(Cookies.get("token") || "");
  const [search, setSearch] = useState("");
  let kookie = Cookies.set("token", authToken, { expires: 7 });
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [floatConnect, setFloatConnect] = useState(false);

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
        setUserData(response.data);
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
    <div>
      <Router>
        <Header
          authToken={authToken}
          setauthToken={setauthToken}
          Cookies={Cookies}
          search={search}
          setSearch={setSearch}
          floatConnect={floatConnect}
          setFloatConnect={setFloatConnect}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                authToken={authToken}
                {...userData}
                floatConnect={floatConnect}
                setFloatConnect={setFloatConnect}
              />
            }
          />
          <Route path="offer/:id" element={<Offer />} />
          {/* <Route path="sign-up" element={<SignUp />} /> */}
          {/* <Route
            path="login"
            element={
              <Login authToken={authToken} setauthToken={setauthToken} />
            }
          /> */}
          <Route
            path="my-user-account/:id"
            element={<MyUserAccount authToken={authToken} />}
          >
            <Route path="my-offer" element={<MyOffer />} />
          </Route>
          <Route
            path="my-user-account/:id/vend-un-article"
            element={<SellYourItems authToken={authToken} />}
          />
          <Route
            path="my-user-account/:id/user-update"
            element={<UserUpdate authToken={authToken} />}
          />
          <Route
            path="my-user-account/mes-offre/modifier/offer-update/:id"
            element={<MyOfferUpdate authToken={authToken} />}
          />
          {/* <Route path="my-user-account/:id/my-offer" element={<MyOffer />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
