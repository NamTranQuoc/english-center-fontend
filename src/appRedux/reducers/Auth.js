import {SIGNIN_USER_SUCCESS, SIGNOUT_USER_SUCCESS, SIGNUP_USER_SUCCESS} from "../../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  alertMessage: '',
  showMessage: false,
  initURL: '',
  authUser: localStorage.getItem('token'),
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      }
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      }
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        initURL: '/',
        loader: false
      }
    }
    default:
      return state;
  }
}
