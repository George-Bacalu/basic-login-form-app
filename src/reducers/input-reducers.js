const emailValidity = value => value.includes("@");
const passswordValidity = value => value.trim().length > 6;

export const initialState = { value: "", isValid: null };

export const emailReducer = (state, action) => {
  if (action.type === "USER_EMAIL") return { value: action.value, isValid: emailValidity(action.value) };
  else if (action.type === "EMAIL_BLUR") return { value: state.value, isValid: emailValidity(state.value) };
  return { value: "", isValid: false };
};

export const passwordReducer = (state, action) => {
  if (action.type === "USER_PASSWORD") return { value: action.value, isValid: passswordValidity(action.value) };
  else if (action.type === "PASSWORD_BLUR") return { value: state.value, isValid: passswordValidity(state.value) };
  return { value: "", isValid: false };
};
