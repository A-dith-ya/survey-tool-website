import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./UserHeader.module.css";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import UserContext from "../AuthForm/UserContext";
import { logoutUser } from "../../apis/users";

const UserHeader = () => {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigate();

  const accountNav = () => {
    navigation("/account");
  };

  // Exit user session
  const logout = async () => {
    try {
      await logoutUser();
      navigation("/");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
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
        <h3 className={styles.userName}>{user.username}</h3>
        <FaUserCircle className={styles.userIcon} onClick={accountNav} />
        <FaSignOutAlt
          data-cy="logoutButton"
          className={styles.exitIcon}
          onClick={logout}
        />
      </div>
    </header>
  );
};

export default UserHeader;
