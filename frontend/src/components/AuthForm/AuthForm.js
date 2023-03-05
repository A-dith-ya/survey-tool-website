import React, { useEffect, useState, useContext } from "react";
import styles from "./AuthForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  registerUser,
  getUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../../apis/users";

import UserContext from "./UserContext";

function AuthForm(props) {
  const { setUser } = useContext(UserContext);
  const { isLogin, isRegister, isAccount, authNav } = props;

  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    if (name === "username") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleAuth = async () => {
    try {
      if (isLogin) await loginUser({ email, password });
      if (isRegister) await registerUser({ username, email, password });
      if (isAccount) await updateUser({ username, email, password });
      setUser({ username, email });
      navigate(authNav);
    } catch (error) {
      console.error(error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  const getAccounts = async () => {
    if (isAccount) {
      const data = await getUser();

      setName(data.username);
      setEmail(data.email);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div className={styles.container}>
      {!isLogin && (
        <label className={styles.formLabel}>
          Username
          <input
            type="text"
            name="username"
            value={username}
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
      <button
        data-cy="myButton"
        type="submit"
        onClick={handleAuth}
        className={styles.formSubmit}
      >
        {isLogin ? "Login" : isRegister ? "Register" : "Update Account"}
      </button>
      {isAccount && (
        <button
          data-cy="deleteBtn"
          onClick={handleDelete}
          className={styles.formButtonDelete}
        >
          Delete Account
        </button>
      )}
    </div>
  );
}

export default AuthForm;
