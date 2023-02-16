import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
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
  };

  return (
    <div className="login-container">
      <h1>Survey Tool</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <Link to="#" className="forgot-link">
            Forgot Password?
          </Link>
        </label>
        <button type="submit">Login</button>
      </form>
      <Link to="/Register" className="login-link">
        Create an Account
      </Link>
    </div>
  );
};

export default LoginPage;
