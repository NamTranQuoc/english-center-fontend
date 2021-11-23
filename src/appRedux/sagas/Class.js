import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    ADD_CLASS,
    GET_CLASS,
    UPDATE_CLASS,
} from "../../constants/ActionTypes";
import {
    getListClass as getListClassAction,
    getListSuccess, hideLoader,
    hideLoaderTable,
    onHideModal,
    showLoader,
    showMessage
} from "../actions";
import axios from "axios";
import {host} from "../store/Host";

const INSTRUCTOR_API_URL = `${host}/class`;

export function* getListClass() {
    yield takeEvery(GET_CLASS, getListClassGenerate);
}

function* getListClassGenerate({payload}) {
    try {
        const response = yield call(getListClassRequest, payload);
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

const getListClassRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/get_list?page=` + payload.page + `&size=` + payload.size,
        data: {
            sort: payload.sort,
            keyword: payload.keyword,
            shift_ids: payload.shift_ids,
            dow: payload.dow,
            start_from_date: payload.start_from_date,
            start_to_date: payload.start_to_date
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)


export function* addClass() {
    yield takeEvery(ADD_CLASS, addClassGenerate);
}

function* addClassGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(addClassRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListClassAction({
                page: 1,
                size: 10,
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

const addClassRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/add`,
        data: {
            name: payload.name,
            max_student: payload.max_student,
            dow: payload.dow,
            course_id: payload.course_id,
            start_date: payload.start_date,
            shift_id: payload.shift_id
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* updateClass() {
    yield takeEvery(UPDATE_CLASS, updateClassGenerate);
}

function* updateClassGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(updateClassRequest, payload.values);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListClassAction(payload.param));
            yield put(showMessage("success_update"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const updateClassRequest = async (payload) =>
    await axios({
        method: "PUT",
        url: `${INSTRUCTOR_API_URL}/update`,
        data: {
            id: payload._id,
            name: payload.name,
            max_student: payload.max_student,
            start_date: payload.start_date
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export default function* rootSaga() {
    yield all([
        fork(getListClass),
        fork(addClass),
        fork(updateClass),
    ]);
}
