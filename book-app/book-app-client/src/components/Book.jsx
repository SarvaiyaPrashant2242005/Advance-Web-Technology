import React from "react";

const Book = ({ details }) => {
  return (
    <div
      style={{
        display: "inline-block",
        margin: 20,
        padding: 10,
        width: "200px",
        height: "250px",
        backgroundColor: "whitesmoke",
        color: "black",
        border: "1px solid white",
      }}
    >
      <h3>{details.title}</h3>
      <h5>{details.author}</h5>
      <p>{details.price}</p>
      <p>{details.pub_name}</p>
      <p>{details.pub_year}</p>
    </div>
  );
};

export default Book;
