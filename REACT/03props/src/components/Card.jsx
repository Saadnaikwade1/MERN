import React, { Children } from "react";
import Btn from "./Btn";

function Card(props) {
    console.log(props);
    
  let { img, title, desc, children } = props;
  return (
    <div
      style={{
        width: "40%",
        background: "#f1f2f2",
        display: "flex",
        flexDirection: "column",
        gap: "3px",
        textAlign: "center",
        border: "1px solid black",
        margin: "20px",
        // borderRadius: "10px",
        padding:"5px",
        alignItems:"center",
        justifyContent:"space-between",
        

        overflow:"hidden"
      }}
    >
      <img
        style={{ width: "70%", borderRadius: "10px" }}
        src={img}
        alt="productImg"
      />
      <h1>{title}</h1>
      <p>{desc}</p>
      {children}
    </div>
  );
}

export default Card;
