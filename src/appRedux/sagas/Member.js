import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    ADD_MEMBER,
    DELETE_MEMBER, EXPORT_MEMBER,
    GET_ALL_TEACHERS,
    GET_CURRENT_MEMBER,
    GET_MEMBER, GET_MEMBER_BY_TYPE_AND_STATUS,
    SIGNUP_USER,
    UPDATE_CURRENT_MEMBER,
    UPDATE_MEMBER, UPDATE_SCORE_BY_EXCEL
} from "../../constants/ActionTypes";
import axios from "axios";
import {host} from "../store/Host";
import {
    getAllMemberByTypeAndStatusSuccess,
    getAllTeachersSuccess,
    getCurrentMember as getCurrentMemberAction,
    getListMember as getListMemberAction,
    getListSuccess,
    hideLoader,
    hideLoaderTable,
    onHideModal,
    onHideUpdateMember,
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
        nick_name: payload.nick_name,
        note: payload.note,
        guardian: payload.guardian,
        course_ids: payload.course_ids,
        status: payload.status
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
            type: payload.type,
            address: payload.address,
            dob: payload.dob,
            salary: payload.salary,
            certificate: payload.certificate,
            nick_name: payload.nick_name,
            note: payload.note,
            guardian: payload.guardian,
            course_ids: payload.course_ids,
            status: payload.status
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

export function* updateMemberCurrent() {
    yield takeEvery(UPDATE_CURRENT_MEMBER, updateMemberCurrentGenerate);
}

function* updateMemberCurrentGenerate({payload}) {
    try {
        yield put(showLoader());
        const response = yield call(updateMemberRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(uploadImage(payload.avatar, response.data.payload.avatar));
            yield put(onHideUpdateMember());
            yield put(getCurrentMemberAction());
            yield put(showMessage("success_update"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

export function* getTeachers() {
    yield takeEvery(GET_ALL_TEACHERS, getTeachersGenerate);
}

function* getTeachersGenerate() {
    try {
        const response = yield call(getTeachersRequest);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getAllTeachersSuccess(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

const getTeachersRequest = async () =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/get_all`,
        data: {
            types: ["teacher"]
        },
    }).then(response => response)
        .catch(error => error)

export function* updateScoreByExcel() {
    yield takeEvery(UPDATE_SCORE_BY_EXCEL, updateScoreByExcelGenerate);
}

function* updateScoreByExcelGenerate({payload}) {
    try {
        const response = yield call(updateScoreByExcelRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getListMemberAction({
                page: 1,
                size: 10,
                sort: {
                    is_asc: false,
                    field: "_id"
                },
                types: ["student"],
            }));
            yield put(showMessage("success_update"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const updateScoreByExcelRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/update_score_by_excel`,
        data: {
            path: payload.path
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* ExportExcel() {
    yield takeEvery(EXPORT_MEMBER, ExportExcelGenerate);
}

function* ExportExcelGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(ExportExcelRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(showMessage("success_export"));
            if (response.data.payload !== "") {
                window.open(response.data.payload, "_self");
            }
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const ExportExcelRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/export`,
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

export function* getAllMemberByTypeAndStatus() {
    yield takeEvery(GET_MEMBER_BY_TYPE_AND_STATUS, getAllMemberByTypeAndStatusGenerate);
}

function* getAllMemberByTypeAndStatusGenerate({payload}) {
    try {
        const response = yield call(getAllMemberByTypeAndStatusRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getAllMemberByTypeAndStatusSuccess(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

const getAllMemberByTypeAndStatusRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/get_all_by_status`,
        data: {
            type: payload.type,
            status: payload.status,
            course_id: payload.course_id
        }
    }).then(response => response)
        .catch(error => error)

export default function* rootSaga() {
    yield all([
        fork(getListMember),
        fork(addMember),
        fork(updateMember),
        fork(deleteMember),
        fork(getCurrentMember),
        fork(signUpUser),
        fork(updateMemberCurrent),
        fork(getTeachers),
        fork(updateScoreByExcel),
        fork(ExportExcel),
        fork(getAllMemberByTypeAndStatus),
    ]);
}
