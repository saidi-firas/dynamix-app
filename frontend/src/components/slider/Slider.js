import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Slider = () => {
  const [topProducts, setTopProducts] = useState([]);

  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: userInfo ? `Bearer ${userInfo.token}` : undefined,
  //   },
  // };

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-pfe.onrender.com/recommend"
        );
        setTopProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopProducts();
  }, []);

  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="slider-container" className="myslider">
      <div id="slider-arrow-left" onClick={() => handleClick("left")}>
        &lt;
      </div>
      <div
        id="slider-wrapper"
        style={{
          transform: `translateX(${slideIndex * -100}vw)`,
          transition: "all 1.5s ease",
        }}
      >
        {topProducts.map((item) => (
          <div id="slider-slide" key={item._id}>
            <div id="slider-img-container">
              <img id="slider-img" src={item.image} alt={item.name} />
            </div>
            <div id="slider-info-container">
              <h1 id="slider-title">{item.name}</h1>
              <p id="slider-desc">
                {item.description
                  .split(" ")
                  .slice(0, 4)
                  .join(" ")
                  .concat("...")}
              </p>
              <Link to={`/products/${item._id}`} id="slider-button">
                SHOW NOW
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div id="slider-arrow-right" onClick={() => handleClick("right")}>
        &gt;
      </div>
    </div>
  );
};

export default Slider;
