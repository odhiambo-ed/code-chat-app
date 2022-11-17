import React from "react";
import "../styles/Login.css";
import GoogleLogo from "../assets/google.jpeg";
import { auth, provider } from "../firebase";

export const Login = () => {
  const login = () => {
    auth.signInWithPopup(provider);
  };
  return (
    <div className="loginDiv">
      <h2 className="appTitle">Code Labs</h2>
      <div className="signInDiv">
        <img className="signInImage" src={GoogleLogo} alt="Google Logo" />
        <p className="signInButton" onClick={login}>
          Sign in with <span className="signInAlt">Google</span>
        </p>
      </div>
    </div>
  );
};
