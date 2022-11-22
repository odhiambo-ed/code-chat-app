import React, { useState, useEffect } from 'react';
import '../styles/Followed.css';
import '../styles/HomePage.css';

import UserProfile from '../components/UserProfile';
import FollowedProfiles from '../components/FollowedProfiles';
import db, { auth } from '../firebase';

const Followed = () => {
  const [followed, setFollowed] = useState([]);
  useEffect(() => {
    const dbCol = `followed${auth.currentUser.email}`;
    db.collection(dbCol).onSnapshot((snapshot) => {
      setFollowed(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    });
  }, []);
  return (
    <div className="followedDiv">
      <div className="userProfileDiv">
        <UserProfile />
      </div>
      <div className="followedProfilesDiv">
        {followed.map((followers) => (
          <FollowedProfiles
            key={followers.id}
            username={followers.data.username}
          />
        ))}
      </div>
    </div>
  );
};

export default Followed;
