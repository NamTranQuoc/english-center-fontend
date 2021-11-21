import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    ADD_SHIFT,
    GET_SHIFT,
    UPDATE_SHIFT,
} from "../../constants/ActionTypes";
import {
    getListShift as getListShiftAction,
    getListSuccess, hideLoader,
    hideLoaderTable,
    onHideModal,
    showLoader,
    showMessage
} from "../actions";
import axios from "axios";
import {host} from "../store/Host";

const INSTRUCTOR_API_URL = `${host}/shift`;

export function* getListShift() {
    yield takeEvery(GET_SHIFT, getListShiftGenerate);
}

function* getListShiftGenerate({payload}) {
    try {
        const response = yield call(getListShiftRequest, payload);
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

const getListShiftRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/get_list?page=` + payload.page + `&size=` + payload.size,
        data: {
            sort: payload.sort,
            keyword: payload.keyword,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)


export function* addShift() {
    yield takeEvery(ADD_SHIFT, addShiftGenerate);
}

function* addShiftGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(addShiftRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListShiftAction({
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

const addShiftRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/add`,
        data: {
            name: payload.name,
            from: payload.from,
            to: payload.to,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* updateShift() {
    yield takeEvery(UPDATE_SHIFT, updateShiftGenerate);
}

function* updateShiftGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(updateShiftRequest, payload.course);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListShiftAction(payload.param));
            yield put(showMessage("success_update"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const updateShiftRequest = async (payload) =>
    await axios({
        method: "PUT",
        url: `${INSTRUCTOR_API_URL}/update`,
        data: {
            id: payload.id,
            name: payload.name,
            from: payload.from,
            to: payload.to,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export default function* rootSaga() {
    yield all([
        fork(getListShift),
        fork(addShift),
        fork(updateShift),
    ]);
}
