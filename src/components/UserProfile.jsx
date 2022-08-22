import React from 'react'
import ProfileImage from '../assets/passport.jpeg'
import '../styles/UserProfile.css'

const UserProfile = () => {
  return (
    <div className='userProfileSection'>
          <img src={ProfileImage} alt="User Profile" />
          <p>Edward Odhiambo</p>
    </div>
  )
}

export default UserProfile