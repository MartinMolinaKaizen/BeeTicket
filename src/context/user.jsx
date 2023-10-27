/* eslint-disable react/prop-types */

import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleUser = (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  };

  const getToken = () => {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user")).token;
    }
  };

  const data = { user, handleUser, getToken, logout };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
