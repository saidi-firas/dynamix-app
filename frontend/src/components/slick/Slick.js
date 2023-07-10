import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./slick.css";
import oopsErr from "./images/oops-404.avif";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom";

function Slick() {
  const [topProducts, setTopProducts] = useState([]);
  const [defaultImage, setDefaultImage] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const { data } = await axios.get(
          `https://backend-pfe.onrender.com/recommend`
        );
        setTopProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopProducts();
  }, []);

  console.log(topProducts);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: oopsErr,
    }));
  };

  return (
    <div className="slickapp">
      <h1> Recommended</h1>
      <hr></hr>
      <Slider {...settings}>
        {topProducts.map((item) => (
          <div className="card">
            <div className="card-top">
              <img
                src={
                  defaultImage[item.name] === item.name
                    ? defaultImage.linkDefault
                    : item.image
                }
                alt={item.name}
                onError={handleErrorImage}
              />
              <h1>
                {item.name
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")
                  .concat("...")}
              </h1>
            </div>
            <div className="card-bottom">
              <h3>{item.price}$</h3>
              <span className="category">{item.categories.join(", ")}</span>
            </div>
            <Link className="linkslick" to={`/products/${item._id}`}>
              Open{" "}
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Slick;
