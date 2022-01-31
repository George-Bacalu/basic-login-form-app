import { useEffect, useReducer, useState } from "react";
import classes from "./Login.module.css";
import Card from "../ui/Card";
import Button from "../ui/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_EMAIL") return { value: action.value, isValid: action.value.includes("@") };
  else if (action.type === "EMAIL_BLUR") return { value: state.value, isValid: state.value.includes("@") };
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_PASSWORD") return { value: action.value, isValid: action.value.trim().length > 6 };
  else if (action.type === "PASSWORD_BLUR") return { value: state.value, isValid: state.value.trim().length > 6 };
  return { value: "", isValid: false };
};

const Login = props => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: "", isValid: null });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Check form validity");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = event => {
    dispatchEmail({ type: "USER_EMAIL", value: event.target.value });
    //setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = event => {
    dispatchPassword({ type: "USER_PASSWORD", value: event.target.value });
    //setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => dispatchEmail({ type: "EMAIL_BLUR" });
  const validatePasswordHandler = () => dispatchPassword({ type: "PASSWORD_BLUR" });

  const submitHandler = event => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${emailState.isValid === false && classes.invalid}`}>
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
        </div>
        <div className={`${classes.control} ${passwordState.isValid === false && classes.invalid}`}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
