import { Fragment, useContext } from "react";
import Login from "./components/page-content/Login";
import Home from "./components/page-content/Home";
import MainHeader from "./components/main-header/MainHeader";
import AuthContext from "./store/auth-context";

const App = () => {
  const ctx = useContext(AuthContext);

  return (
    <Fragment>
      <MainHeader />
      <main>{ctx.isLoggedIn ? <Home /> : <Login />}</main>
    </Fragment>
  );
};

export default App;
