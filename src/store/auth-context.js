import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({ isLoggedIn: false, onLogin: (email, password) => {}, onLogout: () => {} });

export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoggedInUserInfo = localStorage.getItem("isLoggedIn");
    if (storedLoggedInUserInfo === "1") setIsLoggedIn(true);
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider value={{ isLoggedIn, onLogin: loginHandler, onLogout: logoutHandler }}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
