import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import styles from "./Login.module.css";
import UserHeader from "../../components/Header/UserHeader";

const AccountPage = () => {
  return (
    <div className={styles.container}>
      <UserHeader />
      <h1 className={styles.h1}>Account Page</h1>
      <AuthForm isAccount={true} />
    </div>
  );
};

export default AccountPage;
