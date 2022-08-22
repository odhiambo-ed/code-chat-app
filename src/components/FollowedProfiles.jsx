import React from 'react'

const FollowedProfiles = ({username, photo}) => {
  return (
    <div>
          <img src={photo} alt="Photo" />
          <p>{ username }</p>   
    </div>
  )
}

export default FollowedProfiles