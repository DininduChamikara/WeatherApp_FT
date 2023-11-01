import React from 'react'
import LoginButton from '../components/LoginButton'
import LogoutButton from '../components/LogoutButton'

const Login = () => {
  return (
    <div>
        <h1>Auth0 Login</h1>
        <LoginButton />
        <LogoutButton />
    </div>
  )
}

export default Login