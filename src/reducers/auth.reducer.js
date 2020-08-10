import Cookies from "js-cookie";

const defaultState = {
  loggedIn: false,
  user: {},
};

const authReducer = (state = defaultState, action) => {
  console.log("payload", action);
  switch (action.type) {
    case "SET_USER":
      return {
        loggedIn: true,
        user: { ...action.payload },
      };

    case "LOG_OUT":
      return {
        loggesIn: false,
      };

    default:
      return state;
  }
};

export default authReducer;
