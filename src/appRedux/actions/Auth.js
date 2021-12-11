import {
    FORGET_PASSWORD,
    REQUEST_FORGET_PASSWORD,
    RESET_PASSWORD,
    SIGNIN_FACEBOOK_USER,
    SIGNIN_GOOGLE_USER,
    SIGNIN_USER,
    SIGNIN_USER_SUCCESS,
    SIGNOUT_USER,
    SIGNOUT_USER_SUCCESS,
    SIGNUP_USER,
} from "../../constants/ActionTypes";

export const userGoogleSignIn = () => {
    return {
        type: SIGNIN_GOOGLE_USER
    };
};

export const userFacebookSignIn = () => {
    return {
        type: SIGNIN_FACEBOOK_USER
    };
};

export const userSignUp = (user, history) => {
    return {
        type: SIGNUP_USER,
        payload: {
            user: user,
            history: history
        }
    };
};
export const userSignIn = (user) => {
    return {
        type: SIGNIN_USER,
        payload: user
    };
};
export const userSignOut = () => {
    return {
        type: SIGNOUT_USER
    };
};

export const userSignInSuccess = (authUser) => {
    return {
        type: SIGNIN_USER_SUCCESS,
        payload: authUser
    }
};
export const userSignOutSuccess = () => {
    return {
        type: SIGNOUT_USER_SUCCESS,
    }
};

export const resetPassword = (param) => {
    return {
        type: RESET_PASSWORD,
        payload: param
    };
};

export const requestForgetPassword = (email, history) => {
    return {
        type: REQUEST_FORGET_PASSWORD,
        payload: {
            email: email,
            history: history
        }
    };
};

export const forgetPassword = (values, history) => {
    return {
        type: FORGET_PASSWORD,
        payload: {
            values: values,
            history: history
        }
    };
};
