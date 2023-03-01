import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import AuthForm from "../../components/AuthForm/AuthForm";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Survey Tool</h1>
      <h2 className={styles.h2}>Login</h2>
      <AuthForm isLogin={true} authNav="/dashboard" />
      <Link to="/Register" className={styles.formLogin}>
        Create an Account
      </Link>
    </div>
  );
};

export default LoginPage;
