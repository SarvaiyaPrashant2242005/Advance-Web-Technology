import React from 'react'

const Book = ({details}) => {
    return (
      <div style={{display : "inline-block" , margin: 20 , padding : 10 , border : "1px solid black"}}>
        <h3>{details.title}</h3>
        <h5>{details.author}</h5>
        <p>{details.price}</p>
        <p>{details.pub_name}</p>
        <p>{details.pub_year}</p>
      </div>
    );
  }
  
  export default Book