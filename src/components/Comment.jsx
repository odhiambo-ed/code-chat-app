import React from 'react'
import '../styles/Comment.css'

const Comment = () => {
  return (
    <div className='commentSection'>
        <p className="hash">[#]</p>
        <p className='time'>12:24</p>
        <p className='username'>Edward</p>
        <p className='comment'>This is great!!</p>  
    </div>
  )
}

export default Comment