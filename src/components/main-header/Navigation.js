import AuthContext from "../../store/auth-context";
import classes from "./Navigation.module.css";

const Navigation = props => {
  return (
    <AuthContext.Consumer>
      {ctx => {
        return (
          <nav className={classes.nav}>
            {ctx.isLoggedIn && (
              <ul>
                <li>
                  <a href="/">Users</a>
                </li>
                <li>
                  <a href="/">Admin</a>
                </li>
                <li>
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              </ul>
            )}
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navigation;
