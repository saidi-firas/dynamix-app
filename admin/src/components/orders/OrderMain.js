import React, { useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders from "./Orders";
import OrdersTab from "./OrdersTab";
import { useSelector } from "react-redux";

const OrderMain = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const [selectedOption, setSelectedOption] = useState("Normal Mode");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" onChange={handleOptionChange}>
                <option value={"Normal Mode"}>Normal Mode</option>
                <option>Advanced Mode</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : selectedOption === "Normal Mode" ? (
              <Orders orders={orders} />
            ) : selectedOption === "Advanced Mode" ? (
              <OrdersTab orders={orders} />
            ) : (
              "select other option pls !"
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
