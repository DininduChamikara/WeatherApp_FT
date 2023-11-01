import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    <div>{isAuthenticated && <div onClick={() => logout()}>Sign Out</div>}</div>
  );
};

export default LogoutButton;
