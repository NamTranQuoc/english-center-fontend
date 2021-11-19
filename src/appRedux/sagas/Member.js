import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    ADD_MEMBER,
    DELETE_MEMBER,
    GET_CURRENT_MEMBER,
    GET_MEMBER,
    SIGNUP_USER,
    UPDATE_MEMBER
} from "../../constants/ActionTypes";
import axios from "axios";
import {host} from "../store/Host";
import {
    getListMember as getListMemberAction,
    getListSuccess,
    hideLoader,
    hideLoaderTable,
    onHideModal,
    setMember,
    showLoader,
    showMessage,
    uploadImage
} from "../actions";

const INSTRUCTOR_API_URL = `${host}/member`;

const getListMemberRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/get_list?page=` + payload.page + `&size=` + payload.size,
        data: {
            sort: payload.sort,
            types: payload.types,
            keyword: payload.keyword,
            from_date: payload.from_date,
            to_date: payload.to_date,
            genders: payload.genders
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

const addMemberRequest = async (payload) =>
    await axios.post(`${INSTRUCTOR_API_URL}/add`, {
        name: payload.name,
        email: payload.email,
        address: payload.address,
        gender: payload.gender,
        dob: payload.dob,
        phone_number: payload.phone_number,
        type: payload.type,
        salary: payload.salary,
        certificate: payload.certificate,
    }).then(response => response)
        .catch(error => error)

const updateMemberRequest = async (payload) =>
    await axios({
        method: "PUT",
        url: `${INSTRUCTOR_API_URL}/update/`,
        data: {
            id: payload._id,
            name: payload.name,
            gender: payload.gender,
            phone_number: payload.phone_number,
            address: payload.address,
            dob: payload.dob,
            salary: payload.salary,
            certificate: payload.certificate,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

const deleteMemberRequest = async (payload) =>
    await axios({
        method: "DELETE",
        url: `${INSTRUCTOR_API_URL}/delete/` + payload.id,
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

const getCurrentMemberRequest = async () =>
    await axios({
        method: "GET",
        url: `${INSTRUCTOR_API_URL}/get_current`,
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

function* getListMemberGenerate({payload}) {
    try {
        const response = yield call(getListMemberRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getListSuccess(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoaderTable());
    }
}

function* addMemberGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(addMemberRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(uploadImage(payload.avatar, response.data.payload.avatar));
            yield put(onHideModal());
            yield put(getListMemberAction({
                page: 1,
                size: 10,
                sort: {
                    is_asc: false,
                    field: "_id"
                },
                types: [response.data.payload.type],
            }));
            yield put(showMessage("success_add"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

function* updateMemberGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(updateMemberRequest, payload.member);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(uploadImage(payload.member.avatar, response.data.payload.avatar));
            yield put(onHideModal());
            yield put(getListMemberAction(payload.param));
            yield put(showMessage("success_update"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

function* deleteMemberGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(deleteMemberRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListMemberAction(payload.param));
            yield put(showMessage("success_delete"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

function* getCurrentMemberGenerate() {
    try {
        const response = yield call(getCurrentMemberRequest);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(setMember(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

export function* getListMember() {
    yield takeEvery(GET_MEMBER, getListMemberGenerate);
}

export function* addMember() {
    yield takeEvery(ADD_MEMBER, addMemberGenerate);
}

export function* updateMember() {
    yield takeEvery(UPDATE_MEMBER, updateMemberGenerate);
}

export function* deleteMember() {
    yield takeEvery(DELETE_MEMBER, deleteMemberGenerate);
}

export function* getCurrentMember() {
    yield takeEvery(GET_CURRENT_MEMBER, getCurrentMemberGenerate);
}

export function* signUpUser() {
    yield takeEvery(SIGNUP_USER, signUp);
}

function* signUp({payload}) {
    const {history, user} = payload;
    try {
        yield put(showLoader());
        const response = yield call(addMemberRequest, user);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(showMessage("success_add"));
            history.push('/signin');
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

export default function* rootSaga() {
    yield all([
        fork(getListMember),
        fork(addMember),
        fork(updateMember),
        fork(deleteMember),
        fork(getCurrentMember),
        fork(signUpUser),
    ]);
}
