import React from "react";

const TopTotal = (props) => {
  const { orders, products, cat, users } = props;
  let totalSale = 0;
  if (orders) {
    orders.map((order) =>
      order.isPaid === true ? (totalSale = totalSale + order.totalPrice) : null
    );
  }
  const numNotPaid = orders?.filter((order) => !order.isPaid).length;
  return (
    <>
      <div className="row">
        <div className="col-lg-4">
          <div className="card card-body mb-4 shadow-sm">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle alert-primary">
                <i className="text-primary fas fa-usd-circle"></i>
              </span>
              <div className="text">
                <h6 className="mb-1">Total Sales</h6>{" "}
                <span>${totalSale.toFixed(0)}</span>
              </div>
            </article>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card card-body mb-4 shadow-sm">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle alert-success">
                <i className="text-success fas fa-bags-shopping"></i>
              </span>
              <div className="text">
                <h6 className="mb-1">Total Orders</h6>
                {orders ? <span>{orders.length}</span> : <span>0</span>}
              </div>
            </article>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card card-body mb-4 shadow-sm">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle alert-warning">
                <i className="text-warning fas fa-shopping-basket"></i>
              </span>
              <div className="text">
                <h6 className="mb-1">Total Products</h6>
                {products ? <span>{products.length}</span> : <span>0</span>}
              </div>
            </article>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="card card-body mb-4 shadow-sm">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle alert-primary">
                <i className="icon fas fa-user"></i>
              </span>
              <div className="text">
                <h6 className="mb-1">Total Users</h6>
                {users ? <span>{users.length}</span> : <span>0</span>}
              </div>
            </article>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card card-body mb-4 shadow-sm">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle alert-success">
                <i className="fab fa-first-order-alt"></i>{" "}
              </span>
              <div className="text">
                <h6 className="mb-1">Total Orders Not Paid</h6>
                {orders ? <span>{numNotPaid}</span> : <span>0</span>}
              </div>
            </article>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card card-body mb-4 shadow-sm">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle alert-warning">
                <i className="fas fa-cart-arrow-down"></i>{" "}
              </span>
              <div className="text">
                <h6 className="mb-1">Total Categorie</h6>
                {cat ? <span>{cat?.length}</span> : <span>0</span>}
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopTotal;
