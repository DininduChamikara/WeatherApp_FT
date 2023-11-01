import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { localStorageKeys } from "../constants";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  const [isAuthenticatedInCache, setIsAuthenticatedInCache] =
    useState(isAuthenticated);

  useEffect(() => {
    const cachedAuth0Data = localStorage.getItem(
      localStorageKeys.CACHED_AUTH0_DATA
    );

    if (cachedAuth0Data) {
      const parsedCachedAuth0Data = JSON.parse(cachedAuth0Data);
      const cachedIsAuthenticated = parsedCachedAuth0Data.isAuthenticated;

      if (cachedIsAuthenticated) {
        setIsAuthenticatedInCache(cachedIsAuthenticated);
      }
    } else {
      if (isAuthenticated) {
        localStorage.setItem(
          localStorageKeys.CACHED_AUTH0_DATA,
          JSON.stringify({
            isAuthenticated: isAuthenticated,
          })
        );
        setIsAuthenticatedInCache(isAuthenticated);
      }
    }
  }, [isAuthenticated]);

  return (
    <div>
      {isAuthenticatedInCache && (
        <div
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer items-center"
          onClick={() => logout()}
        >
          <svg
            className="w-5 h-5 mr-3"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 18 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
            />
          </svg>
          Sign Out
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
