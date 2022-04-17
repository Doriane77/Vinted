import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MyOffer from "../MyOffer/MyOffer";

function MyUserAccount({ authToken }) {
  // const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [seeOffer, setSeeOffer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}user/profile`,
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
    fetchData();
  }, [authToken]);

  let navigate = useNavigate();
  function handleMyOfferClick() {
    setSeeOffer(!seeOffer);
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
