import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {GET_STUDENT_ABSENT, SAVE_ABSENT,} from "../../constants/ActionTypes";
import {getListStudentAbsentSuccess, hideLoader, hideLoaderTable, showLoader, showMessage} from "../actions";
import axios from "axios";
import {host} from "../store/Host";

const INSTRUCTOR_API_URL = `${host}/absent`;

export function* getListStudentSaga() {
    yield takeEvery(GET_STUDENT_ABSENT, getListStudentGenerate);
}

function* getListStudentGenerate({payload}) {
    try {
        const response = yield call(getListStudentRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getListStudentAbsentSuccess(response.data.payload));
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
        url: `${INSTRUCTOR_API_URL}/get_students`,
        data: {
            schedule_id: payload.schedule_id,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* saveSaga() {
    yield takeEvery(SAVE_ABSENT, saveGenerate);
}

function* saveGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(saveRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(showMessage("success_update"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const saveRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/save_absent`,
        data: {
            schedule_id: payload.schedule_id,
            student_ids: payload.student_ids
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export default function* rootSaga() {
    yield all([
        fork(getListStudentSaga),
        fork(saveSaga),
    ]);
}
