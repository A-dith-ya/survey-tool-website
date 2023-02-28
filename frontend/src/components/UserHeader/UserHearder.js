import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserHeader.module.css";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const UserHeader = () => {
  const navigation = useNavigate();

  const logout = () => {
    navigation("/");
  };
  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/dashboard" className={styles.navLink}>
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.user}>
        <h3 className={styles.userName}>Lorem Ipsum</h3>
        <FaUserCircle className={styles.userIcon} />
        <FaSignOutAlt className={styles.exitIcon} onClick={logout} />
      </div>
    </header>
  );
};

export default UserHeader;
