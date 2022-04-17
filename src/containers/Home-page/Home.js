import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

import LoadingPage from "../../Components/Loading-page/Loading-page";
import homePicture from "../../images/home-picture.jpg";
import OfferLimit from "../../Components/Offer-Limit/Offer-Limit";
import Slider from "../../Components/RangeSlider/Slider";

function Home({ search, authToken, user, floatConnect, setFloatConnect }) {
  // const [sale, setSale] = useState();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(1);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}offers?page=${page}&limit=${limit}&title=${search}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    const showSomething = () => {
      fetchData();
    };
    setTimeout(showSomething, 1000);
    // showSomething();
  }, [page, limit, search]);
  const navigate = useNavigate();
  function handleSaleClik() {
    if (authToken) {
      navigate(`../my-user-account/${user._id}/vend-un-article`);
    } else {
      setFloatConnect(!floatConnect);
    }
  }
  return (
    <div className="App">
      {isLoading ? (
        <div className="loading-page">
          <LoadingPage />
        </div>
      ) : (
        <div className="Home-page">
          <div className="Home">
            <div className="flottant">
              <h2>Prêts à faire du tri dans vos placards ?</h2>
              <button onClick={handleSaleClik}>Commencer à vendre</button>
            </div>
            <div className="box-main-picture">
              <div className="main-picture">
                <img src={homePicture} alt="acceuil du site vinted" />
                <div className="effet">
                  <img
                    src="https://lereacteur-vinted.netlify.app/static/media/tear.42d6cec6.svg"
                    alt="effet page déchirer"
                  />
                </div>
              </div>
            </div>
          </div>
          <OfferLimit
            {...data}
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
          />

          <Slider
            priceMax={priceMax}
            priceMin={priceMin}
            setPriceMax={setPriceMax}
            setPriceMin={setPriceMin}
          />
          <div className="box-announce">
            {data.offers.map((elem, index) => {
              // console.log(elem);
              return (
                <Link
                  to={`/offer/${elem._id}`}
                  key={elem._id}
                  className="announce"
                >
                  <div className="announce-user">
                    <h2>{elem.product_name}</h2>
                  </div>
                  <div className="announce-img-product">
                    <img src={elem.product_image.url} alt={elem.product_name} />
                  </div>
                  <div className="announce-info">
                    <h3>{elem.product_price} €</h3>
                    <div>
                      {elem.product_details.map((detail, index) => {
                        return (
                          <div key={index} className="announce-detail">
                            <p>{detail.TAILLE}</p>
                            <p>{detail.MARQUE}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <OfferLimit
            {...data}
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
