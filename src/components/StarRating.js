// src/components/StarRating.js
import React from "react";

export default function StarRating({ value = 0, onChange }) {
  const handleClick = (val) => {
    if (onChange) onChange(val);
  };

  return (
    <div className="rating" style={{ fontSize: "1.5rem", cursor: "pointer" }}>
      {[1,2,3,4,5].map((i) => (
        <span
          key={i}
          onClick={() => handleClick(i)}
          style={{ color: i <= value ? "gold" : "gray", marginRight: 6 }}
          data-star={i}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}
