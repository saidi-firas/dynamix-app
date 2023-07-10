import React, { useEffect, useState } from "react";
import "./sideCard.css";
import Rating from "../components/homeComponents/Rating";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import { Link } from "react-router-dom/cjs/react-router-dom";
function SideCard() {
  const [topProducts, setTopProducts] = useState([]);

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

  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: userInfo ? `Bearer ${userInfo.token}` : undefined,
  //   },
  // };
  console.log(topProducts);

  return (
    <>
      {topProducts.slice(0, 2).map((prod) => (
        <Link to={`/products/${prod._id}`}>
          <div
            className="card sidecard"
            style={{
              height: "300px",
              marginBottom: "10px",
            }}
          >
            <img src={prod.image} className="card-img-top" alt={prod.name} />
            <div className="card-body" style={{ height: "100px" }}>
              {" "}
              <h4>
                {prod.name
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")
                  .concat("...")}
              </h4>
              <p className="card-text">
                <Rating
                  value={prod.rating}
                  text={`${prod.numReviews} reviews`}
                />
              </p>
              <Link className="btn btn-primary" to={`/products/${prod._id}`}>
                Open
              </Link>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default SideCard;
