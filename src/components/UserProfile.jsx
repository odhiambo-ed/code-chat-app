import React from "react";
import UserProfileImage from "../assets/user.jpeg";
import { auth } from "../firebase";

export const UserProfile = () => {
  const signout = () => {
    auth.signOut();
  };
  const username = auth?.currentUser.displayName.split(" ")[0];
  return (
    <div>
      <div className="userProfileSection">
        <img src={UserProfileImage} alt="User Profile" />
        <p>{username}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          style={{
            backgroundColor: "red",
            border: "none",
            outline: "none",
            paddingLeft: "2em",
            paddingRight: "2em",
            paddingTop: "0.5em",
            paddingBottom: "0.5em",
            borderRadius: "10px",
            cursor: "pointer",
            color: "white",
          }}
          onClick={signout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
