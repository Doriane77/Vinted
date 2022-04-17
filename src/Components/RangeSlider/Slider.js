import React from "react";

function Slider({ priceMax, priceMin, setPriceMax, setPriceMin }) {
  return (
    <div className="Slider">
      <p>min {priceMin}</p>
      <input type="range" min={priceMin} max={priceMax} />
      <p>max {priceMax}</p>
    </div>
  );
}

export default Slider;
