import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function SellYourItems({ authToken, user }) {
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState({});
  const [pictureURL, setPictureURL] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setConditon] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", Number(price));
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("condition", condition);
    formData.append("color", color);
    formData.append("city", city);
    formData.append("picture", picture);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}offer/publish`,
        formData,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      console.log(response);
      toast.success("Annonce créer", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const afterSubmit = () => {
        navigate(`/my-user-account/${user._id}`);
        window.location.reload();
      };
      setTimeout(afterSubmit, 1000);
    } catch (error) {
      console.log(error.response);
    }
  };

  function handleTitleChange(event) {
    const value = event.target.value;
    setTitle(value);
  }
  function handlePictureChange(event) {
    if (event.target.files && event.target.files[0]) {
      setPictureURL(URL.createObjectURL(event.target.files[0]));
    }
    setPicture(event.target.files[0]);
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
    setConditon(event.target.value);
  }
  function handleColorChange(event) {
    setColor(event.target.value);
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }
  return (
    <div className="SellYourItems">
      <div className="box-publish-page">
        <h1>Mettre en vente un nouvelle article</h1>
        <div className={pictureURL ? "publish-page" : "publish"}>
          <div className={pictureURL ? "SellYourItem-img" : "none"}>
            <img src={pictureURL} alt={title} />
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom de l'article"
              value={title}
              onChange={handleTitleChange}
              required
            />
            <div className="create-offer-picture">
              <h2>Photo de l'article : </h2>
              <input
                type="file"
                placeholder="image"
                accept="image/png, image/jpeg, image/webp"
                onChange={handlePictureChange}
                required
              />
            </div>
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
              placeholder="marque"
              value={brand}
              onChange={handleBrandChange}
              required
            />
            <input
              type="text"
              placeholder="taille"
              value={size}
              onChange={handleSizeChange}
              required
            />
            <input
              type="text"
              placeholder="état"
              value={condition}
              onChange={handleConditionChange}
              required
            />
            <input
              type="text"
              placeholder="color"
              value={color}
              onChange={handleColorChange}
              required
            />
            <input
              type="text"
              placeholder="ville"
              value={city}
              onChange={handleCityChange}
              required
            />
            <button type="submit">Publier</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellYourItems;
