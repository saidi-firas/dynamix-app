import { useEffect, useState } from "react";
import "./banner.css";
import axios from "axios";
import Rating from "./homeComponents/Rating";
import { Link } from "react-router-dom";

function Banner() {
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

  const [timeLeft, setTimeLeft] = useState(186400); // day in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  function formatTime(timeInSeconds) {
    const days = Math.floor(timeInSeconds / 86400);
    const hours = Math.floor((timeInSeconds % 86400) / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return {
      days: days.toString().padStart(2, "0"),
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  }

  const { days, hours, minutes, seconds } = formatTime(timeLeft);
  return (
    <>
      <div className="bg ">
        <h1 style={{ textAlign: "center", paddingTop: "7px" }}>
          Today's Featured Deals
        </h1>
        <div className="bg-product mt-5">
          <div className="container product">
            <div className="row">
              <div
                id="sliderproduct"
                className="carousel slide "
                data-ride="carousel"
                data-interval={10000}
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#sliderproduct"
                    data-slide-to={0}
                    className="active"
                  />
                  <li data-target="#sliderproduct" data-slide-to={1} />
                  <li data-target="#sliderproduct" data-slide-to={2} />
                </ol>
                <div
                  className="carousel-inner"
                  role="listbox"
                  data-interval={10000000}
                >
                  {topProducts?.slice(0, 3).map((prod, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      key={index}
                    >
                      <div className="container text-center">
                        <div className="row">
                          <div className="col-sm-6 image">
                            <div className="item">
                              <h1>Today's Deal</h1>
                              <img
                                className="img-fluid"
                                src={prod.image}
                                alt=""
                              />
                            </div>
                            {/*enditem*/}
                          </div>
                          {/*endcol*/}
                          <div className="col-sm-6">
                            <div className="top d-flex justify-content-center">
                              <a href="#/">
                                <b>{days}</b> <br />
                                days
                              </a>
                              <a href="#/">
                                <b>{hours}</b> <br /> hours
                              </a>
                              <a href="#/">
                                <b>{minutes}</b> <br />
                                min
                              </a>
                              <a href="#/">
                                <b>{seconds}</b> <br /> sec
                              </a>
                            </div>
                            {/*endtop*/}
                            <div className="details">
                              <h2 className="cr3">{prod.name} </h2>
                              <p className="cr4">{prod.description}</p>

                              <Rating
                                value={prod.rating}
                                text={`${prod.numReviews} reviews`}
                              />

                              {/*endrating*/}
                              <p className="cr1">{prod.price} $</p>
                              <Link
                                to={`/products/${prod._id}`}
                                className="btn btn-food"
                              >
                                add to cart
                              </Link>
                            </div>
                            {/*enddetails*/}
                          </div>
                          {/*endcol*/}
                        </div>
                        {/*endrow*/}
                      </div>
                      {/*endcontainer*/}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
