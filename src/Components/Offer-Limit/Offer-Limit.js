import React from "react";
import "./Offer-Limit.css";

function OfferLimit({ count, limit, setLimit, page, setPage }) {
  function handleLimitChange(event) {
    const value = event.target.value;
    setLimit(value);
  }
  function handlePageChange(event) {
    const value = event.target.value;
    setPage(value);
  }
  return (
    <div className="OfferLimit">
      <label> Page : </label>
      <input type="number" value={page} onChange={handlePageChange} />
      <label>Nombre de publication : </label>
      <input type="number" value={limit} onChange={handleLimitChange} />
    </div>
  );
}

export default OfferLimit;
