import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const ShopSection = ({ match, keyword, pagenumber }) => {
  const [products, setProducts] = useState([]);
  const shopSectionRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async (keyword = "", pageNumber = "") => {
      const { data } = await axios.get(
        `https://backend-pfe.onrender.com/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      setProducts(data.products);
    };
    fetchProducts(keyword, pagenumber);
    dispatch(listProduct(keyword, pagenumber));
  }, [keyword, pagenumber, dispatch]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, page, pages } = productList;

  const history = useHistory();
  const handlePageChange = (pageNumber) => {
    history.push(`/page/${pageNumber}`);
  };

  useEffect(() => {
    const mymatch = match.path.split("/")[1];

    if (mymatch === "page") {
      shopSectionRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (mymatch === "search") {
      shopSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pagenumber, match.path]);

  return (
    <>
      <div className="container" ref={shopSectionRef}>
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
                  <Message variant="alert-info">
                    No products found. Please try a different search.
                  </Message>
                ) : (
                  <>
                    <hr></hr>
                    <h1 style={{ textAlign: "center" }}> Our Products</h1>
                    <hr></hr>
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

                {/* Pagination */}
                <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
