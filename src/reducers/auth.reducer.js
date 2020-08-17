const defaultState = {
  loggedIn: false,
  need_to_verify: false,
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
    case "VERIFY_USER":
      return {
        need_to_verify: action.need_to_verify,
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
