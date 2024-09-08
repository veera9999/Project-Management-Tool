import React from "react";
import { Link } from "react-router-dom";
import "./welcome.css";
const Welcome: React.FC = () => {
  return (
    <div className="welcome">
      <h1>Task Ninja</h1>
      <div className="nav-buttons">
        <Link className="nav-link" to="/register">
          Register
        </Link>
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
