import React from 'react'
import Body from "../sub-pages/Body";
import Comments from "../sub-pages/Comments";
import Followed from "../sub-pages/Followed";

const HomePage = () => {
  return (
      <div className='homeDiv'>
          <Followed />
          <Body />
          <Comments />
    </div>
  )
}

export default HomePage