import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Navigation.module.css";

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      {authCtx.isLoggedIn && (
        <ul>
          <li><a href="/">Users</a></li>
          <li><a href="/">Admin</a></li>
          <li><button onClick={authCtx.onLogout}>Logout</button></li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
