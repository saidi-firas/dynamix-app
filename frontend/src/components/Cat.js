import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Cat() {
  return (
    <section className="container py-5">
      <div className="row text-center pt-3">
        <div className="col-lg-6 m-auto">
          <h1 className="h1">Top Categories </h1>
          <p>
            These are the primary categories we offer in our store.
            <br></br> The categories displayed represent the main sections of
            our store's products.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-4 p-5 mt-3">
          <Link to="/fill/kids">
            <img
              src="https://img.freepik.com/free-photo/portrait-smiling-stylish-man-sunglasses-standing-against-brick-wall-modern-office_273443-3553.jpg?w=360"
              className="rounded-circle img-fluid border"
              alt=""
            />
          </Link>
          <h2 className="h5 text-center mt-3 mb-3">MEN</h2>
          <p className="text-center">
            <Link
              className="btn btn "
              style={{ backgroundColor: "#7FBA00" }}
              to="/fill/men"
            >
              Go Shop
            </Link>
          </p>
        </div>
        <div className="col-12 col-md-4 p-5 mt-3">
          <Link to="/fill/kids">
            <img
              src="https://www.newfolks.com/wp-content/uploads/sites/6/2020/09/kids-clothes-2-e1657237042391.jpg?fit=1024%2C1024&p=1"
              className="rounded-circle img-fluid border"
              alt=""
            />
          </Link>
          <h2 className="h5 text-center mt-3 mb-3">KIDS</h2>
          <p className="text-center">
            <Link
              className="btn btn "
              style={{ backgroundColor: "#7FBA00" }}
              to="/fill/kids"
            >
              Go Shop
            </Link>
          </p>
        </div>
        <div className="col-12 col-md-4 p-5 mt-3">
          <Link to="/fill/women">
            <img
              src="https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-974911.jpg&fm=jpg"
              className="rounded-circle img-fluid border"
              alt=""
            />
          </Link>
          <h2 className="h5 text-center mt-3 mb-3">WOMEN</h2>
          <p className="text-center">
            <Link
              className="btn btn "
              style={{ backgroundColor: "#7FBA00" }}
              to="/fill/women"
            >
              Go Shop
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Cat;
