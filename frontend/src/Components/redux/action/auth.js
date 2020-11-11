import axios from 'axios'
import {
    USER_LOADED,
    LOADER_FAIL,
    // REGISTER_SUCCESS,
    // REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_USER,
    LOGOUT
  } from "./types";
import setAuthToken from '../utils/setAuthToken'

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOADER_FAIL
    });
  }
};


export const login = (username, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post("/api/auth/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });    
    
    // dispatch(loadUser());

  } catch (err) {
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    // }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// export const register = (userstate,history)=> async dispatch =>{
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       }
//     };
//       const res = await axios.post("/api/auth/signup",userstate,config);

//       dispatch({
//         type:REGISTER_SUCCESS,
//         payload:res.data
//       })
//       history.push("/admin/user");
//   } catch (err) {
//     // const errors = err.response.data.errors;
//     // if (errors) {
//     //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
//     // }

//     dispatch({
//       type: REGISTER_FAIL
//     });
//   }
// }




export const logout = () => dispatch => {
    dispatch({ type: CLEAR_USER });
    dispatch({ type: LOGOUT });
  };