import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingPage from "../../Components/Loading-page/Loading-page";
import Header from "../../Components/Header/Header";
import homePicture from "../../images/home-picture.jpg";

function Home() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    setData(response.data);
    console.log(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    const showSomething = () => {
      fetchData();
    };
    // setTimeout(showSomething, 5000);
    showSomething();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div className="loading-page">
          <LoadingPage />
        </div>
      ) : (
        <div className="Home-page">
          <Header />

          <div className="Home">
            <div className="flottant">
              <h2>Prêts à faire du tri dans vos placards ?</h2>
              <button>Commencer à vendre</button>
            </div>
            <div className="box-main-picture">
              <div className="main-picture">
                <img src={homePicture} alt="image acceuil du site vinted" />
                <div className="effet">
                  <img
                    src="https://lereacteur-vinted.netlify.app/static/media/tear.42d6cec6.svg"
                    alt="effet page déchirer"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="box-announce">
            {data.offers.map((elem) => {
              return (
                <div key={elem._id} className="announce">
                  <div className="announce-user">
                    <div
                      className={
                        elem.owner.account.avatar ? "announce-user-img" : ""
                      }
                    >
                      <img
                        src={
                          elem.owner.account.avatar
                            ? elem.owner.account.avatar.secure_url
                            : ""
                        }
                      />
                    </div>
                    <h2>{elem.owner.account.username}</h2>
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
                </div>
              );
            })}
          </div>
          <Link to="/offer">
            <div className="t">aller sur la page offrir</div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
