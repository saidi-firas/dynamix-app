import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import { responsive } from "./data";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductCarousel({ prodCat }) {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const prod = prodCat[0];
        const { data } = await axios.get(
          `https://backend-pfe.onrender.com/products/category/${prod}`
        );
        setTopProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopProducts();
  }, [prodCat]);
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: userInfo ? `Bearer ${userInfo.token}` : undefined,
  //   },
  // };

  const product = topProducts
    ? topProducts.map((item) => {
        const shortDescription = item.description.split(" ").slice(0, 4);
        const desc = shortDescription.join(" ").concat("...");
        const shortTitle = item.name.split(" ").slice(0, 2);
        const title = shortTitle.join(" ").concat("...");
        return (
          <Product
            name={title}
            url={item.image}
            price={item.price}
            description={desc}
            id={item._id}
          />
        );
      })
    : "Loading...";

  return (
    <div className="productcarousel">
      <h1>You may Also Like</h1>
      <Carousel
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1500}
        showDots={false}
        pauseOnHover={true}
        responsive={responsive}
      >
        {product}
      </Carousel>
    </div>
  );
}
