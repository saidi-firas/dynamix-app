import React from "react";
import { Link } from "react-router-dom";

export default function Product(props) {
  const handleOpenClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div key={props.id} className="carouselcard">
      <img className="product--image" src={props.url} alt="" />
      <h2>{props.name}</h2>
      <p className="carouselcardprice">{props.price}$</p>
      <p>{props.description}</p>

      <Link
        className="carouselbtn"
        to={`/products/${props.id}`}
        onClick={handleOpenClick}
      >
        Open
      </Link>
    </div>
  );
}
