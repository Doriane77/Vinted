import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./Components/Header/Header";
import Home from "./containers/Home-page/Home";
import Offer from "./containers/Offer-page/Offer";
import MyUserAccount from "./containers/MyUserAccount/MyUserAccount";
import MyOffer from "./containers/MyOffer/MyOffer";
import SellYourItems from "./containers/SellYourItems/SellYourItems";
import UserUpdate from "./containers/UpdateUser/UpdateUser";
import MyOfferUpdate from "./containers/MyOfferUpdate/MyOfferUpdate";
import PaymentPage from "./containers/Payment/PaymentPage";

import axios from "axios";

import Cookies from "js-cookie";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faBars, faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faBars, faEdit);

function App() {
  const [authToken, setauthToken] = useState(Cookies.get("token") || "");
  let kookie = Cookies.set("token", authToken, { expires: 7 });

  const [search, setSearch] = useState("");

  const [floatConnect, setFloatConnect] = useState(false);
  const [floatSignUp, setFloatSignUp] = useState(false);

  const [userData, setUserData] = useState({});

  const [product, setProduct] = useState({});

  const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

  const fetchData = async () => {
    if (authToken) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}user/profile`,
          {},
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [kookie, authToken]);

  return (
    <div>
      <ToastContainer />
      <Router>
        <Header
          authToken={authToken}
          setauthToken={setauthToken}
          Cookies={Cookies}
          search={search}
          setSearch={setSearch}
          floatConnect={floatConnect}
          setFloatConnect={setFloatConnect}
          floatSignUp={floatSignUp}
          setFloatSignUp={setFloatSignUp}
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
          <Route
            path="offer/:id"
            element={
              <Offer
                authToken={authToken}
                floatConnect={floatConnect}
                setFloatConnect={setFloatConnect}
                product={product}
                setProduct={setProduct}
              />
            }
          />

          <Route
            path="my-user-account/:id"
            element={<MyUserAccount authToken={authToken} />}
          >
            <Route path="my-offer" element={<MyOffer />} />
          </Route>
          <Route
            path="my-user-account/:id/vend-un-article"
            element={<SellYourItems authToken={authToken} {...userData} />}
          />
          <Route
            path="my-user-account/:id/user-update"
            element={<UserUpdate authToken={authToken} />}
          />
          <Route
            path="my-user-account/mes-offre/modifier/offer-update/:id"
            element={<MyOfferUpdate authToken={authToken} />}
          />

          <Route
            path="offer/buy/:id"
            element={
              <Elements stripe={stripePromise}>
                <PaymentPage
                  authToken={authToken}
                  product={product}
                  setProduct={setProduct}
                />
              </Elements>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
