import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";
import ReactToPrint from "react-to-print";
import paid from "./../../images/paid.png";
import notpaid from "./../../images/notpaid.png";

function Ticket() {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const componentRef = useRef();
  return (
    <>
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-success btn-lg btn-block ">
            {" "}
            <i className="fal fa-print"></i>Print{" "}
          </button>
        )}
        content={() => componentRef.current}
      />
      <div className=" ticket " ref={componentRef}>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row ticket">
              <div className="well col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6">
                    <address>
                      <strong>Dynamix Shop</strong>
                      <br />
                      {order.shippingAddress.city}
                      <br />
                      {order.shippingAddress.address}
                      <br />
                      <abbr title="Phone">PostalCode:</abbr>{" "}
                      {order.shippingAddress.postalCode}
                    </address>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 text-right info ">
                    <p>
                      <em>
                        Date: {moment(order.createdAt).format("MM/DD/YYYY")}
                      </em>
                    </p>
                    <p>
                      <em>Receipt #: 34522677W</em>
                    </p>
                    <p>
                      <em>Client: {order.user.name}</em>
                    </p>
                    <p>
                      <em>Email: {order.user.email}</em>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="text-center">
                    <h1>Receipt</h1>
                  </div>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>#</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems?.map((item) => (
                        <tr key={item._id}>
                          <td className="col-md-9">
                            <em>{item.name}</em>
                          </td>
                          <td
                            className="col-md-1"
                            style={{ textAlign: "center" }}
                          >
                            {" "}
                            {item.qty}
                          </td>
                          <td className="col-md-1 text-center">
                            ${item.price}
                          </td>
                          <td className="col-md-1 text-center">
                            ${item.qty * item.price}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={2}>
                          {order.isPaid ? (
                            <img src={paid} alt="" style={{ width: "180px" }} />
                          ) : (
                            <img
                              src={notpaid}
                              alt=""
                              style={{ width: "180px" }}
                            />
                          )}
                        </td>

                        <td className="text-right">
                          <p>
                            <strong>Subtotal:&nbsp;</strong>
                          </p>
                          <p>
                            <strong>Shipping:&nbsp;</strong>
                          </p>
                          <p>
                            <strong>Tax:&nbsp;</strong>
                          </p>
                        </td>
                        <td className="text-center">
                          <p>
                            <strong>${order.itemsPrice}</strong>{" "}
                          </p>
                          <p>
                            <strong>${order.shippingPrice}</strong>
                          </p>
                          <p>
                            <strong>${order.taxPrice}</strong>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td> &nbsp; </td>
                        <td> &nbsp; </td>
                        <td className="text-right">
                          <h4>
                            <strong>Total:&nbsp;</strong>
                          </h4>
                        </td>
                        <td className="text-center text-danger">
                          <h4>
                            <strong>${order.totalPrice}</strong>
                          </h4>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Ticket;
