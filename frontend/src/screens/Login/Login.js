import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../components/LoadingError/Error";
import Loading from "../../components/LoadingError/Loading";
import { login } from "../../Redux/Actions/userActions";
import styles from "./styles.module.css";

const Login = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <div>
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <div className={styles.login_container}>
          <div className={styles.login_form_container}>
            <div className={styles.left}>
              <form className={styles.form_container} onSubmit={submitHandler}>
                <h1>Login to Your Account</h1>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.input}
                />
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.green_btn}>
                  Sing In
                </button>
              </form>
            </div>
            <div className={styles.right}>
              <h1>New Here ?</h1>
              <Link to="/register">
                <button type="button" className={styles.white_btn}>
                  Sing Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
