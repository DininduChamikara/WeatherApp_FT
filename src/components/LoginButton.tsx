import { useAuth0 } from "@auth0/auth0-react";
import { redirectURLs } from "../constants";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <div
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-5 mb-2 cursor-pointer"
          onClick={() =>
            loginWithRedirect({
              authorizationParams: {
                redirect_uri: redirectURLs.LOGIN_REDIRECT,
              },
            })
          }
        >
          Sign In
        </div>
      )}
    </div>
  );
};

export default LoginButton;
