import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    CHANGE_PASSWORD,
    FORGET_PASSWORD,
    REQUEST_FORGET_PASSWORD,
    RESET_PASSWORD, SIGNIN_FACEBOOK_USER,
    SIGNIN_GOOGLE_USER,
    SIGNIN_USER,
    SIGNOUT_USER,
} from "../../constants/ActionTypes";
import {
    hideLoader,
    onHideChangePassword,
    setInitUrl,
    setMember,
    showLoader,
    showMessage,
    userSignInSuccess,
    userSignOutSuccess,
} from "../actions";
import axios from "axios";
import {host} from "../store/Host";
import {getRoleCurrent} from "../../util/ParseUtils";
import {auth, googleAuthProvider, facebookAuthProvider} from "../../firebase/firebase";

const INSTRUCTOR_API_URL = `${host}/auth`;

const signOutRequest = async () => {
}
// await auth.signOut()
//     .then(authUser => authUser)
//     .catch(error => error);

const signInUserWithEmailPasswordRequest = async (payload) =>
    await axios.post(`${INSTRUCTOR_API_URL}/login`, {
        username: payload.email,
        password: payload.password,
    }).then(response => response)
        .catch(error => error)

const resetPasswordRequest = async (payload) =>
    await axios({
        method: "PUT",
        url: `${INSTRUCTOR_API_URL}/reset`,
        data: {
            username: payload.username,
            new_password: payload.newPassword,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

function* signInUserWithEmailPassword({payload}) {
    try {
        yield put(showLoader());
        const response = yield call(signInUserWithEmailPasswordRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            localStorage.setItem('token', response.data.payload);
            yield put(userSignInSuccess(response.data.payload));
            const role = getRoleCurrent();
            if (role === "admin" || role === "receptionist") {
                yield put(setInitUrl("/admin/dashboard"));
            } else {
                yield put(setInitUrl("/home"));
            }
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

function* signOut() {
    try {
        const signOutUser = yield call(signOutRequest);
        if (signOutUser === undefined) {
            localStorage.removeItem('token');
            yield put(setMember(null));
            yield put(userSignOutSuccess(signOutUser));
        } else {
            yield put(showMessage(signOutUser.message));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

function* resetPassword({payload}) {
    try {
        yield put(showLoader());
        const response = yield call(resetPasswordRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(showMessage("success_reset"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

export function* signInUser() {
    yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
    yield takeEvery(SIGNOUT_USER, signOut);
}

export function* resetPasswordUser() {
    yield takeEvery(RESET_PASSWORD, resetPassword);
}

export function* requestForgetPasswordUser() {
    yield takeEvery(REQUEST_FORGET_PASSWORD, requestForgetPassword);
}

function* requestForgetPassword({payload}) {
    try {
        const {email, history} = payload;
        yield put(showLoader());
        const response = yield call(requestForgetPasswordPasswordRequest, email);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(showMessage("check_mail"));
            history.push('/signin');
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const requestForgetPasswordPasswordRequest = async (payload) =>
    await axios.get(`${INSTRUCTOR_API_URL}/request_forget_password/` + payload)
        .then(response => response)
        .catch(error => error)

export function* forgetPasswordUser() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* forgetPassword({payload}) {
    try {
        const {values, history} = payload;
        yield put(showLoader());
        const response = yield call(forgetPasswordRequest, values);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(showMessage("success_update"));
            history.push('/signin');
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const forgetPasswordRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/forget_password`,
        data: {
            confirm_password: payload.confirmPassword,
            new_password: payload.password,
        },
        headers: {
            Authorization: "Bearer " + payload.token,
        },
    }).then(response => response)
        .catch(error => error)

export function* changePasswordUser() {
    yield takeEvery(CHANGE_PASSWORD, changePassword);
}

function* changePassword({payload}) {
    try {
        yield put(showLoader());
        const response = yield call(changePasswordRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(showMessage("success_update"));
            yield put(onHideChangePassword());
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const changePasswordRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/change_password`,
        data: {
            old_password: payload.oldPassword,
            confirm_password: payload.confirmPassword,
            new_password: payload.newPassword,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* signInWithGoogle() {
    yield takeEvery(SIGNIN_GOOGLE_USER, signInUserWithGoogle);
}

function* signInUserWithGoogle() {
    try {
        const signUpUser = yield call(signInUserWithGoogleRequest);
        if (signUpUser.message) {
            yield put(showMessage(signUpUser.message));
        } else {
            yield put(showLoader());
            const signInResponse = yield call(SigninWithGoogle, signUpUser);
            if (signInResponse.status !== 200) {
                yield put(showMessage("bad_request"));
            } else if (signInResponse.data.code !== 9999) {
                yield put(showMessage(signInResponse.data.message));
            } else {
                localStorage.setItem('token', signInResponse.data.payload);
                yield put(userSignInSuccess(signInResponse.data.payload));
                const role = getRoleCurrent();
                if (role === "admin" || role === "receptionist") {
                    yield put(setInitUrl("/admin/dashboard"));
                } else {
                    yield put(setInitUrl("/home"));
                }
            }
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader())
    }
}

const SigninWithGoogle = async (signUpUser) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/sign_with_google`,
        data: {
            email: signUpUser.user.email,
            name: signUpUser.user.displayName,
            avatar: signUpUser.user.photoURL,
            phone_number: signUpUser.user.phoneNumber
        },
    }).then(response => response)
        .catch(error => error)

const signInUserWithGoogleRequest = async () =>
    await auth.signInWithPopup(googleAuthProvider)
        .then(authUser => authUser)
        .catch(error => error);

export function* signInWithFacebook() {
    yield takeEvery(SIGNIN_FACEBOOK_USER, signInUserWithFacebook);
}

function* signInUserWithFacebook() {
    try {
        const signUpUser = yield call(signInUserWithFacebookRequest);
        if (signUpUser.message) {
            yield put(showMessage(signUpUser.message));
        } else {
            console.log(signUpUser.user);
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

const signInUserWithFacebookRequest = async () =>
    await  auth.signInWithPopup(facebookAuthProvider)
        .then(authUser => authUser)
        .catch(error => error);

export default function* rootSaga() {
    yield all([fork(signInUser),
        fork(signOutUser),
        fork(resetPasswordUser),
        fork(requestForgetPasswordUser),
        fork(forgetPasswordUser),
        fork(changePasswordUser),
        fork(signInWithGoogle),
        fork(signInWithFacebook),
    ]);
}
