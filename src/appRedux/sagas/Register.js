import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    ADD_REGISTER, DELETE_REGISTER, EXPORT_REGISTER,
    GET_REGISTER, GET_STUDENT_BY_CLASSROOM,
    UPDATE_REGISTER,
} from "../../constants/ActionTypes";
import {
    getListRegister, getListStudentByClassroomSuccess,
    getListSuccess,
    hideLoader,
    hideLoaderTable,
    onHideModal,
    showLoader,
    showMessage
} from "../actions";
import axios from "axios";
import {host} from "../store/Host";

const INSTRUCTOR_API_URL = `${host}/register`;

export function* getListRegisterSaga() {
    yield takeEvery(GET_REGISTER, getListRegisterGenerate);
}

function* getListRegisterGenerate({payload}) {
    try {
        const response = yield call(getListRegisterRequest, payload);
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

const getListRegisterRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/get_list?page=` + payload.page + `&size=` + payload.size,
        data: {
            sort: payload.sort,
            keyword: payload.keyword,
            class_id: payload.class_id,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* addRegister() {
    yield takeEvery(ADD_REGISTER, addRegisterGenerate);
}

function* addRegisterGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(addRegisterRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListRegister({
                page: 1,
                size: 10,
                class_id: payload.class_id,
                sort: {
                    is_asc: false,
                    field: "_id"
                },
            }));
            yield put(showMessage("success_add"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const addRegisterRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/add`,
        data: {
            class_id: payload.class_id,
            student_id: payload.student_id,
            status: payload.status,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* updateRegister() {
    yield takeEvery(UPDATE_REGISTER, updateRegisterGenerate);
}

function* updateRegisterGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(updateRegisterRequest, payload.register);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListRegister(payload.param));
            yield put(showMessage("success_update"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const updateRegisterRequest = async (payload) =>
    await axios({
        method: "PUT",
        url: `${INSTRUCTOR_API_URL}/update`,
        data: {
            student_id: payload.id,
            status: payload.status,
            class_id: payload.class_id,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* deleteRegister() {
    yield takeEvery(DELETE_REGISTER, deleteRegisterGenerate);
}

function* deleteRegisterGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(deleteRegisterRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListRegister(payload.param));
            yield put(showMessage("success_delete"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const deleteRegisterRequest = async (payload) =>
    await axios({
        method: "PUT",
        url: `${INSTRUCTOR_API_URL}/delete/`,
        data: {
            student_id: payload.student_id,
            class_id: payload.class_id,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* ExportExcel() {
    yield takeEvery(EXPORT_REGISTER, ExportExcelGenerate);
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
        url: `${INSTRUCTOR_API_URL}/export_excel/` + payload.id,
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* getListStudentSaga() {
    yield takeEvery(GET_STUDENT_BY_CLASSROOM, getListStudentGenerate);
}

function* getListStudentGenerate({payload}) {
    try {
        const response = yield call(getListStudentRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getListStudentByClassroomSuccess(response.data.payload.map(item => {
                return {
                    ...item,
                    selected: false
                }
            })));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoaderTable());
    }
}

const getListStudentRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/gets_by_class`,
        data: {
            session: payload.session,
            keyword: payload.keyword,
            classroom_id: payload.classroom_id,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export default function* rootSaga() {
    yield all([
        fork(addRegister),
        fork(getListRegisterSaga),
        fork(updateRegister),
        fork(deleteRegister),
        fork(ExportExcel),
        fork(getListStudentSaga),
    ]);
}
