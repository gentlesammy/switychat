import React from "react";
import "./Styles/Preview.module.css";
import { useHistory } from "react-router-dom";

const Preview = () => {
  const history = useHistory();
  console.log(history);
  return (
    <div className="preview">
      <div className="img-box">
        {/* <img
          src={image}
          alt=""
          className="img img-fluid "
          height="400px"
          width="250px"
        /> */}
      </div>
    </div>
  );
};

export default Preview;
