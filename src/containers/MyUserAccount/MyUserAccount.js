import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import MyOffer from "../MyOffer/MyOffer";

function MyUserAccount({ authToken }) {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [seeOffer, setSeeOffer] = useState(false);

  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  let navigate = useNavigate();
  function handleMyOfferClick() {
    setSeeOffer(!seeOffer);
    // navigate(`/my-user-account/${id}/my-offer`);
    // navigate("my-offer");
  }
  function handleEditProfileClik() {
    navigate(`/my-user-account/${data.user._id}/user-update`);
  }
  return (
    <div className="MyUserAccount">
      {isLoading ? (
        <div></div>
      ) : (
        <div className="MyUserAccount-page">
          <button onClick={handleEditProfileClik} className="edit-profile">
            <FontAwesomeIcon icon="edit" />
          </button>
          <h1>Mon profile</h1>
          <div>
            <div className="profile-img">
              <img
                src={data.user.account.avatar.secure_url}
                alt={data.user.account.username}
              />
            </div>
            <div className="profile-description">
              <h2>Nom : {data.user.account.username}</h2>
              <p>Numéros de téléphone : {data.user.account.phone}</p>
              <p>Email : {data.user.email}</p>
            </div>
          </div>
          <button onClick={handleMyOfferClick} className="profile-my-offer">
            Mes Offres
          </button>
        </div>
      )}
      <div className={seeOffer ? "see-offer" : "none"}>
        <MyOffer authToken={authToken} />
      </div>
    </div>
  );
}

export default MyUserAccount;
