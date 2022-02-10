import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import { useParams } from "react-router-dom";
import anonymous from "../../images/anonymous.png";

function Offer(props) {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://ryan-minted.herokuapp.com/offer/${id}`
    );
    setProduct(response.data);
    console.log("offer data :", response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const { id } = useParams();
  return (
    <div className="Offer">
      {isLoading ? (
        <div></div>
      ) : (
        <div className="box-product">
          <div className="product-img">
            <img
              src={
                product.product_image ? product.product_image.secure_url : ""
              }
              alt={product.product_name}
            />
          </div>
          <div className="product-description">
            <div className="detail-col1">
              <h1>{product.product_name}</h1>
              <h3>{product.product_price} €</h3>
              <div className="detail">
                {product.product_details.map((elem, index) => {
                  const keys = Object.keys(elem);
                  return (
                    <div key={index} className="product-detail">
                      <h4>{keys[0]}</h4>
                      <span>{elem[keys[0]]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <hr />
            <div className="detail-col2">
              <div>
                <p>{product.product_description}</p>
                <div className="detail-user">
                  <div className="detail-img">
                    <img
                      src={
                        product.owner.account.avatar
                          ? product.owner.account.avatar.secure_url
                          : anonymous
                      }
                      alt=""
                    />
                  </div>
                  <h2>{product.owner.account.username}</h2>
                </div>
              </div>
              <div>
                <button>Acheter</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Offer;
