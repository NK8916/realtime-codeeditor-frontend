import Cookies from "js-cookie";
import { CONFIG } from "../config/config";

const setUser = (payload) => ({ type: "SET_USER", payload });
const verifyUser = (payload) => ({
  type: "VERIFY_USER",
  need_to_verify: payload.need_to_verify,
});
const logout = () => ({ type: "LOG_OUT" });

export const register = (userData) => (dispatch) => {
  fetch(`${CONFIG.BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      res.json();
    })
    .then((data) => {
      dispatch(
        verifyUser({
          data,
          need_to_verify: true,
        })
      );
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const verify = (data) => (dispatch) => {
  fetch(`${CONFIG.BASE_URL}/verify`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      Cookies.set("token", data.token);
      dispatch(setUser(data, { token: data.token }));
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

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

export const resetPassword = (data) => (dispatch) => {
  fetch(`${CONFIG.BASE_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const forgotPassword = (data) => (dispatch) => {
  fetch(`${CONFIG.BASE_URL}forgot-password`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const authenticate = () => (dispatch) => {
  const token = Cookies.get("token");
  console.log("totktk", token);
  if (token) {
    dispatch(setUser(token));
  }
};
