import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

function MyOffer({ authToken }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();
  // console.log(data.user._id);
  // function handleOfferUpdateClik() {
  //   navigate(`my-user-account/${data.user._id}/user-update`);
  // }
  return (
    <div className="MyOffer-page">
      {isLoading ? (
        <div></div>
      ) : (
        <div className="my-offer-box">
          {data.myoffers.map((elem, index) => {
            return (
              <div className="my-offer" key={elem._id}>
                <h2>{elem.product_name}</h2>
                <div className="my-offer-img">
                  <img
                    src={elem.product_image.secure_url}
                    alt={elem.product_name}
                  />
                </div>
                <p className="my-offer-price">{elem.product_price} €</p>
                <div className="my-offer-detail">
                  {elem.product_details.map((list, index) => {
                    const keys = Object.keys(list);
                    return (
                      <div key={index}>
                        <h4>{keys[0]} : </h4>
                        <span>{list[keys[0]]}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="my-offer-description">
                  {elem.product_description}
                </p>
                <button
                  onClick={() => {
                    navigate(
                      `/my-user-account/mes-offre/modifier/offer-update/${elem._id}`
                    );
                  }}
                  className="my-offer-button-edit"
                >
                  <FontAwesomeIcon icon="edit" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyOffer;
