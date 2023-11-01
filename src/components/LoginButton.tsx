import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <div onClick={() => loginWithRedirect({
          authorizationParams: {
            redirect_uri: 'http://localhost:3000/home'
          }
        })}>Sign In</div>
      )}
    </div>
  );
};

export default LoginButton;
