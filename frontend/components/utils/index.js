import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

export const getRole = () => {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  if (token) {
    const token = jwtDecode(localStorage.getItem("token"));
    return token.role;
  }
  return null;
};

export const getToken = () => {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    return token;
  }
  return token;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    window.localStorage.clear();
  }
};

export const isUserLogined = () => {
  let token = false
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('token')) {
      token = true
    }
  }
  return token
};

export const getTokenDecode = () => {
  let token
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } else {
      return false
    }
  }
};