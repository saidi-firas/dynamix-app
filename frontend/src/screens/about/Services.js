import React from 'react'

function Services() {
  return (
    <>
    <section className="container py-5">
    <div className="row text-center pt-5 pb-3">
      <div className="col-lg-6 m-auto">
        <h1 className="h1">Our Services</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod Lorem ipsum dolor sit amet.
        </p>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 col-lg-3 pb-5">
        <div className="h-100 py-5 services-icon-wap shadow">
          <div className="h1 text-success text-center">
            <i className="fa fa-truck fa-lg" />
          </div>
          <h2 className="h5 mt-4 text-center">Delivery Services</h2>
        </div>
      </div>
      <div className="col-md-6 col-lg-3 pb-5">
        <div className="h-100 py-5 services-icon-wap shadow">
          <div className="h1 text-success text-center">
            <i className="fas fa-exchange-alt" />
          </div>
          <h2 className="h5 mt-4 text-center">Shipping &amp; Return</h2>
        </div>
      </div>
      <div className="col-md-6 col-lg-3 pb-5">
        <div className="h-100 py-5 services-icon-wap shadow">
          <div className="h1 text-success text-center">
            <i className="fa fa-percent" />
          </div>
          <h2 className="h5 mt-4 text-center">Promotion</h2>
        </div>
      </div>
      <div className="col-md-6 col-lg-3 pb-5">
        <div className="h-100 py-5 services-icon-wap shadow">
          <div className="h1 text-success text-center">
            <i className="fa fa-user" />
          </div>
          <h2 className="h5 mt-4 text-center">24 Hours Service</h2>
        </div>
      </div>
    </div>
  </section>
  </>
  )
}

export default Services