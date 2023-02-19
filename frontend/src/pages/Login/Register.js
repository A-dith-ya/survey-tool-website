import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Survey Tool</h1>
      <h2 className={styles.h2}>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.formLabel}>
          Username
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
            className={styles.formInput}
          />
        </label>
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
        </label>
        <button type="submit" className={styles.formSubmit}>
          Register
        </button>
      </form>
      <Link to="/" className={styles.formLogin}>
        Alreday have an Account?
      </Link>
    </div>
  );
};

export default RegisterPage;
