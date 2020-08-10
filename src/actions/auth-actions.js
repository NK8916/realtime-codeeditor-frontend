import Cookies from "js-cookie";

const setUser = (payload) => ({ type: "SET_USER", payload });
const logout = () => ({ type: "LOG_OUT" });

export const fetchUser = (userData) => (dispatch) => {
  fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((data) => {
      Cookies.set("token", data.token);
      dispatch(setUser(data));
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const logoutUser = () => (dispatch) => {
  console.log("logout");
  Cookies.remove("token");
  dispatch(logout());
};

export const authenticate = () => (dispatch) => {
  const token = Cookies.get("token");
  console.log("totktk", token);
  if (token) {
    dispatch(setUser(token));
  }
};
