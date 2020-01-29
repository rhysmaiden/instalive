import React from "react";
import "../App.css";

const Photo = props => {
  return <img className="image" src={props.src}></img>;
};

export default Photo;
