import React from 'react'
import UserProfile from '../components/UserProfile'
import FollowedProfiles from '../components/FollowedProfiles'
import NewPost from '../components/NewPost'

const sampleFollowers = [
  {
    id: 1,
    username: "Duncan",
    profilePicture:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.statusfacebook.com%2Fprofile_pictures%2FAwesome%2Fawesome-profile-picture-127.jpg&f=1&nofb=1",
  },
  {
    id: 2,
    username: "Edward",
    profilePicture:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fbetterdailyhabits.com%2Fwp-content%2Fuploads%2F2015%2F06%2Fsuccessful-smiling-man.jpg&f=1&nofb=1",
  },
  {
    id: 3,
    username: "Ellen",
    profilePicture:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.timesfreepress.com%2Fimg%2Fphotos%2F2017%2F04%2F03%2F1491249045_TRAFFANSTEDT-2017-0309--ChatterBeautifulPeople-035_t1000_hd265e9a0b93a1afe0135b0cd717b43e018478eeb.jpg&f=1&nofb=1",
  },
];

const Followed = () => {
  return (
      <div className="followedDiv">
          <div className="userProfileDiv">
              <UserProfile />
          </div>
          <div className="newPostDiv">
              <NewPost />
          </div>
          <div className="followedProfilesDiv">
              {sampleFollowers.map((followed) => {
                  return (
                    <FollowedProfiles
                      key={followed.id}
                      username={followed.username}
                      photo={followed.profilePicture}
                    />
                  );
              })}
          </div>
    </div>
  )
}

export default Followed