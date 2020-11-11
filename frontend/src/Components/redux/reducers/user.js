/* eslint-disable import/no-anonymous-default-export */
import { USERLOADALL_FAIL, USERLOADALL,    RESET_SUCCESS,
    RESET_FAIL } from "../action/types";
  
  const initialState = {
    user: null,
    users: [],
    reset: null
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case USERLOADALL:
        return {
          users: payload
        };
      case USERLOADALL_FAIL:
        break;
      case RESET_SUCCESS:
        return {
          reset:payload
        }
      case RESET_FAIL:
      
      break;
      default:
        return state;
    }
  }