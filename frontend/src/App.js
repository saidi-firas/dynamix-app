import React, { useEffect, useState } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import About from "./screens/about/About";
import Header from "./components/Header";
import FiltredShop from "./screens/FiltredShop";
import Chatbot from "./chatbot/Chatbot";
import Load from "./Load";

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {loading ? (
        <Load loading={loading} />
      ) : (
        <Router>
          <Header />
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/search/:keyword" component={HomeScreen} exact />
            <Route path="/page/:pagenumber" component={HomeScreen} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/login" component={Login} />
            <Route path="/aboutus" component={About} />
            <Route path="/register" component={Register} />
            <PrivateRouter path="/profile" component={ProfileScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <PrivateRouter path="/shipping" component={ShippingScreen} />
            <PrivateRouter path="/payment" component={PaymentScreen} />
            <PrivateRouter path="/placeorder" component={PlaceOrderScreen} />
            <PrivateRouter path="/fill/:cat" component={FiltredShop} />
            <PrivateRouter path="/order/:id" component={OrderScreen} />
            <PrivateRouter path="/chat" component={Chatbot} />
            <Route path="*" componentChatbot={NotFound} />
          </Switch>
        </Router>
      )}
    </>
  );
};
export default App;
