import Brands from "./Brands";
import Services from "./Services";

function About() {
  return (
    <div>
      <section className="bg-success py-5">
        <div className="container">
          <div className="row align-items-center py-2">
            <div className="col-md-8 text-white">
              <h1>About Us</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="col-md-4">
              <img
                style={{
                  width: "34.5vw",
                  height: "70pvh",
                }}
                src="images/about-hero.jpg"
                alt="About Hero"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Close Banner */}
      {/* Start Section */}
      <Services />
      {/* End Section */}
      {/* Start Brands */}
      <Brands />
    </div>
  );
}

export default About;
