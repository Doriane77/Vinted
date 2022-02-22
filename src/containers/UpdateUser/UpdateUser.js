import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function UserUpdate({ authToken }) {
  const [picture, setPicture] = useState({});
  const [pictureURL, setPictureURL] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // window.location.reload();
    navigate(`/my-user-account/${id}`);
    const formData = new FormData();

    formData.append("picture", picture);
    formData.append("description", description);
    try {
      const response = await axios.post(
        `https://ryan-minted.herokuapp.com/user/update`,
        formData,

        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  function handlePictureChange(event) {
    if (event.target.files && event.target.files[0]) {
      setPictureURL(URL.createObjectURL(event.target.files[0]));
    }
    setPicture(event.target.files[0]);
  }
  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }
  return (
    <div className="UserUpdate">
      <div className="UserUpdatePage">
        <h1>Modifier mon profile</h1>
        <div className="user-update-page">
          <div className={pictureURL ? "update-user-picture-url" : "none"}>
            <img src={pictureURL} />
          </div>
          <form>
            <div className="user-update-file">
              <label htmlFor="file">Nouvelle photo de profile : </label>
              <input type="file" onChange={handlePictureChange} />
            </div>

            <input
              type="text"
              placeholder="nouvelle description"
              value={description}
              onChange={handleDescriptionChange}
            />
            <button type="submit" onClick={handleSubmit}>
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserUpdate;
