import React, { useEffect, useMemo, useState } from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import { useDispatch, useSelector } from "react-redux";
import ProdChart from "./ProdChart";
import axios from "axios";
import { listUser } from "../../Redux/Actions/userActions";

const Main = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const [cat, setCat] = useState([]);

  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("https://backend-pfe.onrender.com/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await axios.get(
          "https://backend-pfe.onrender.com/allcategories"
        );
        setCat(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCat();
  }, []);
  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        {/* Top Total */}
        <TopTotal orders={orders} products={products} cat={cat} users={users} />

        <div className="row">
          <SaleStatistics />

          {/* <ProductsStatistics /> */}
        </div>

        {/* STATICS */}
        <ProdChart
          data={userStats}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
