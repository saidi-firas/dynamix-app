import React, { useEffect, useState } from "react";
import "./mostrated.css";
import axios from "axios";
import Rating from "../Rating";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function MostRated() {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-pfe.onrender.com/rating"
        );
        setTopProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <>
      <div>
        <hr></hr>
        <h1 style={{ textAlign: "center" }}> Most Rated Products</h1>
        <hr></hr>

        <div className="container containermost">
          {topProducts.map((prod) => (
            <div
              className="rated card"
              key={prod._id}
              style={{ width: "18rem" }}
            >
              <img src={prod.image} className="rated card-img-top" alt="" />
              <div className="rated card-body">
                <h5 className="rated card-title fw-bold">{prod.name}</h5>
                <p className="rated card-text">
                  <Rating
                    value={prod.rating}
                    text={`${prod.numReviews} reviews`}
                  />
                </p>
              </div>
              <Link
                to={`/products/${prod._id}`}
                className="mrated btn btn-primary"
              >
                Get it
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="heading "></div>
    </>
  );
}

export default MostRated;
