import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import AuthForm from "../../components/AuthForm/AuthForm";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Survey Tool</h1>
      <h2 className={styles.h2}>Register</h2>
      <AuthForm isRegister={true} authNav="/dashboard" />
      <Link to="/" className={styles.formLogin}>
        Alreday have an Account?
      </Link>
    </div>
  );
};

export default RegisterPage;
