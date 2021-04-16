import React from "react";
import "./Img.css";


const container = {
  margin: 5,
};

const image = {
  display: "block",
  width: "95%",
  borderRadius: 5,
  boxShadow: "2px 2px 5px rgba(#000, .7)",
};


const Img = ({ address, source, onShow }) => {
  console.log(address);

  return (
    <div style={container}>
      <img
        style={image}
        src={address}
        onClick={() => onShow(source)}
        alt=""
      />
    </div>
  );
};


export default Img;
