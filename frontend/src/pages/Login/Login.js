import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Survey Tool</h1>
      <h2 className={styles.h2}>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.formLabel}>
          Email
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            className={styles.formInput}
          />
        </label>
        <label className={styles.formLabel}>
          Password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className={styles.formInput}
          />
          <Link to="#" className={styles.formForgot}>
            Forgot Password?
          </Link>
        </label>
        <button
          type="submit"
          onClick={handleSubmit}
          className={styles.formSubmit}
        >
          Login
        </button>
      </form>
      <Link to="/Register" className={styles.formLogin}>
        Create an Account
      </Link>
    </div>
  );
};

export default LoginPage;
