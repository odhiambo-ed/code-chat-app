import React from 'react'
import '../styles/Comment.css'

const Comment = () => {
  return (
    <div className='commentSection'>
        <p className="hash">[#]</p>
        <p className='time'>12:24</p>
        <p className='usernames'>Edward</p>
        <p className='comments'>This is great!!</p>  
    </div>
  )
}

export default Comment