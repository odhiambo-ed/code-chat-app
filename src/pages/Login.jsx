import React from 'react'
import Google from '../assets/google.jpeg'

const Login = () => {
  return (
      <div className="loginDiv">
          <h2 className="appTitle">
              Code Chat App
          </h2>
          <div className="signInDiv">
              <img src={Google} alt="Google" className="signInImage" />
              <p className="signInButton">
                  Sign In With <span className="signInAlt">Google</span>
              </p>
          </div>
    </div>
  )
}

export default Login