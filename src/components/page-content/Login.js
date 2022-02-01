import { useContext, useEffect, useReducer, useRef, useState } from "react";
import classes from "./Login.module.css";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import AuthContext from "../../store/auth-context";
import { emailReducer, passwordReducer, initialState } from "../../reducers/input-reducers";

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, initialState);
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, initialState);

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { value: emailValue, isValid: emailIsValid } = emailState;
  const { value: passwordValue, isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => setFormIsValid(emailIsValid && passwordIsValid), 500);
    return () => clearTimeout(identifier);
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = event => dispatchEmail({ type: "USER_EMAIL", value: event.target.value });
  const passwordChangeHandler = event => dispatchPassword({ type: "USER_PASSWORD", value: event.target.value });
  const validateEmailHandler = () => dispatchEmail({ type: "EMAIL_BLUR" });
  const validatePasswordHandler = () => dispatchPassword({ type: "PASSWORD_BLUR" });

  const submitHandler = event => {
    event.preventDefault();
    if (formIsValid) authCtx.onLogin(emailValue, passwordValue);
    else if (!emailIsValid) emailInputRef.current.focus();
    else passwordInputRef.current.focus();
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>Login</Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
