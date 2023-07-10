import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Rating from "../components/homeComponents/Rating";
import { useSelector } from "react-redux";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";

const FiltredShop = ({ match }) => {
  const [products, setProducts] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        `https://backend-pfe.onrender.com/products/category/${match.params.cat}`,
        config
      );
      setProducts(data);
    };
    fetchProducts();
  });
  console.log(products);
  const productList = useSelector((state) => state.productList);
  const { loading, error } = productList;

  return (
    <>
      <hr style={{ color: "black" }}></hr>

      <h1 style={{ textAlign: "center" }}>
        Filtered Shop Page for {match.params.cat}{" "}
      </h1>
      <Link to="/">Back to Home</Link>
      <hr style={{ color: "black" }}></hr>

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : products.length === 0 ? (
                  <Loading />
                ) : (
                  <>
                    {products.map((product) => (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6 shopitem"
                        key={product._id}
                      >
                        <div className="border-product">
                          <Link to={`/products/${product._id}`}>
                            <div className="shopBack">
                              <img src={product.image} alt={product.name} />
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p>
                              <Link to={`/products/${product._id}`}>
                                {product.name}
                              </Link>
                            </p>

                            <Rating
                              value={product.rating}
                              text={`${product.numReviews} reviews`}
                            />
                            <h3>${product.price}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FiltredShop;
