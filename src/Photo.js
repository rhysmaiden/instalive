import React, { useEffect, useState } from "react";
import "./App.css";

//import 'bootstrap/dist/css/bootstrap.min.css';
import { isUserWhitespacable } from "@babel/types";


const Photo = (props) => {


  return (

    <React.Fragment>
      
      <img className="image" src={props.src}></img>

    </React.Fragment>
  );
};

export default Photo;
