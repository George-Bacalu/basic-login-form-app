import { Fragment, useState } from "react";
import Login from "./components/page-content/Login";
import Home from "./components/page-content/Home";
import MainHeader from "./components/main-header/MainHeader";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // We should of course check email and password, but it's just a dummy/ demo anyways
    setIsLoggedIn(true);
  };

  const logoutHandler = () => setIsLoggedIn(false);

  return (
    <Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </Fragment>
  );
};

export default App;
