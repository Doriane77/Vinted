import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
function OfferUpdate({ authToken }) {
  const id = useParams();
  console.log(id.id);
  const [data, setData] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const [picture, setPicture] = useState({});
  const [pictureURL, setPictureURL] = useState("");
  const nagivate = useNavigate();

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
  console.log(data);
  const handleSubmit = async (event) => {
    // event.preventDefault();
    nagivate(`/my-user-account/${data.user._id}`);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", Number(price));
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("condition", condition);
    formData.append("color", color);
    formData.append("city", city);
    // formData.append("picture", picture);
    formData.append("id", id.id);

    try {
      const response = await axios.post(
        `https://ryan-minted.herokuapp.com/offer/update`,
        formData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      console.log("response", response);
    } catch (error) {
      console.log(error.response);
    }
    const boxPicture = new FormData();
    boxPicture.append("offerId", id.id);
    boxPicture.append("picture", picture);
    try {
      const response = await axios.post(
        `https://ryan-minted.herokuapp.com/offer/picture-profile-change`,
        boxPicture,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }
  function handlePriceChange(event) {
    const value = event.target.value;
    const regex = /^[0-9]+$/;
    const result = regex.test(value);
    if (result) {
      setPrice(event.target.value);
    }
  }
  function handleBrandChange(event) {
    setBrand(event.target.value);
  }
  function handleSizeChange(event) {
    setSize(event.target.value);
  }
  function handleConditionChange(event) {
    setCondition(event.target.value);
  }
  function handleColorChange(event) {
    setColor(event.target.value);
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }
  function handlePictureChange(event) {
    if (event.target.files && event.target.files[0]) {
      setPictureURL(URL.createObjectURL(event.target.files[0]));
    }
    setPicture(event.target.files[0]);
  }
  return (
    <div className="OfferUpdate">
      <div className="offer-update-page">
        <h1>Modifier mon offre</h1>
        <div className="offer-update-col">
          <div className={pictureURL ? "offer-update-picture-url" : "none"}>
            <img src={pictureURL} />
          </div>
          <form>
            <input
              type="text"
              placeholder="Titre"
              value={title}
              onChange={handleTitleChange}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
              required
            />
            <input
              type="text"
              placeholder="prix"
              value={price}
              onChange={handlePriceChange}
              required
            />
            <input
              type="text"
              placeholder="Marque"
              value={brand}
              onChange={handleBrandChange}
              required
            />
            <input
              type="text"
              placeholder="Taille"
              value={size}
              onChange={handleSizeChange}
              required
            />
            <input
              type="text"
              placeholder="Etat"
              value={condition}
              onChange={handleConditionChange}
              required
            />
            <input
              type="text"
              placeholder="Couleur"
              value={color}
              onChange={handleColorChange}
              required
            />
            <input
              type="text"
              placeholder="Ville"
              value={city}
              onChange={handleCityChange}
              required
            />
            <div className="offer-update-file">
              <label>Nouvelle photo :</label>
              <input type="file" onChange={handlePictureChange} required />
            </div>
            {/* <OfferPictureUpdate
              handlePictureChange={handlePictureChange}
              id={id}
            /> */}
            <button type="submit" onClick={handleSubmit}>
              Valider
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OfferUpdate;
