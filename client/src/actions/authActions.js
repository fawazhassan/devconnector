import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { SET_CURRENT_USER, GET_ERRORS } from "./types";
import jwt_decode from "jwt-decode";
// Register User
//Action Creator
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Login - Get User Token

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //save to local storage
      const { token } = res.data;
      //Set token to ls
      localStorage.setItem("jwtToken", token);
      //Set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log user out

export const logoutUser = () => dispatch => {
  //remove local storage token
  localStorage.removeItem("jwtToken");

  //remove auth header for future requests
  setAuthToken(false);
  //set current user to {} which will also set isAuthenticated to false

  dispatch(setCurrentUser({}));
};
