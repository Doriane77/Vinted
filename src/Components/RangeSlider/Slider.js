import React from "react";

function Slider({ priceMax, priceMin, setPriceMax, setPriceMin }) {
  function handlePriceMinChange(event) {
    const value = event.target.value;
    setPriceMin(value);
  }
  function handlePriceMaxChange(event) {
    const value = event.target.value;
    setPriceMax(value);
  }
  return (
    <div className="Slider">
      <p>min {priceMin}</p>

      <span className="multi-range">
        <input
          type="range"
          min="0"
          max="2000"
          value={priceMin}
          id="lower"
          onChange={handlePriceMinChange}
        />
        <input
          type="range"
          min="0"
          max="2000"
          value={priceMax}
          id="upper"
          onChange={handlePriceMaxChange}
        />
      </span>

      {/* <input
        type="range"
        min="0"
        max="1000"
        value={priceMin}
        onChange={handlePriceMinChange}
      /> */}

      <p>max {priceMax}</p>
    </div>
  );
}

export default Slider;
