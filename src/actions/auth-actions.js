import Cookies from "js-cookie";
import { CONFIG } from "../config/config";

const setUser = (payload) => ({ type: "SET_USER", payload });
const logout = () => ({ type: "LOG_OUT" });

export const fetchUser = (userData) => (dispatch) => {
  fetch(`${CONFIG.BASE_URL}/login`, {
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
      dispatch(setUser({ data, token: data.token }));
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
