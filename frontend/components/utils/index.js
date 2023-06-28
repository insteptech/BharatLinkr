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
export const setCookies = ( expDays, LoginToken, RoleKey) => {
  const d = new Date();
  d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = "role" + "=" + RoleKey + ";" + expires + ";path=/";
  document.cookie = "token" + "=" + LoginToken + ";" + expires + ";path=/";
  document.cookie = "isLoggedIn" + "=" + true + ";" + expires + ";path=/";
}

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

export const LikedContent = {
  college: 'college',
  organisation: 'organisation',
  corporate: 'corporate'
}

export const mocktestQuestionStatus = {
  notAttempted: 'notattempted',
  answered: 'answered',
  notAnswered: 'notAnswered',
  forReview: 'forReview'
}