import React, { useState } from "react";
import styles from "./AuthForm.module.css";
import { Link, useNavigate } from "react-router-dom";

function AuthForm(props) {
  const { isLogin, isRegister, isAccount, authNav } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleAuth = () => {
    navigate(authNav);
  };

  const handleDelete = () => {
    navigate(authNav);
  };

  return (
    <div className={styles.container}>
      {!isLogin && (
        <label className={styles.formLabel}>
          Username
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </label>
      )}
      <label className={styles.formLabel}>
        Email
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className={styles.formInput}
        />
      </label>
      <label className={styles.formLabel}>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          className={styles.formInput}
        />
        {isLogin && (
          <Link to="#" className={styles.formForgot}>
            Forgot Password?
          </Link>
        )}
      </label>
      <button type="submit" onClick={handleAuth} className={styles.formSubmit}>
        {isLogin ? "Login" : isRegister ? "Register" : "Save"}
      </button>
      {isAccount && (
        <button onClick={handleDelete} className={styles.formButtonDelete}>
          Delete Account
        </button>
      )}
    </div>
  );
}

export default AuthForm;
