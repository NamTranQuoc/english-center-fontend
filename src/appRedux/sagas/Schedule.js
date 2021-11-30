import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {GENERATE_SCHEDULE, GET_SCHEDULE, UPDATE_SCHEDULE} from "../../constants/ActionTypes";
import {getScheduleSuccess, hideLoader, showLoader, showMessage, getSchedule as getScheduleAction} from "../actions";
import axios from "axios";
import {host} from "../store/Host";

const INSTRUCTOR_API_URL = `${host}/schedule`;

export function* getsSchedule() {
    yield takeEvery(GET_SCHEDULE, getsScheduleGenerate);
}

function* getsScheduleGenerate({payload}) {
    try {
        yield put(showLoader());
        const response = yield call(getsScheduleRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getScheduleSuccess(response.data.payload.map(item => {
                return {
                    id: item.id,
                    teacher_id: item.teacher_id,
                    room_id: item.room_id,
                    title: item.title,
                    start: new Date(item.start),
                    end: new Date(item.end),
                    session: item.session,
                    max_student: item.max_student,
                    course_id: item.course_id,
                    took_place: item.took_place
                }
            })));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const getsScheduleRequest = async (payload) =>
    await axios({
        method: "POST",
        data: {
            to_date: payload.to_date,
            from_date: payload.from_date
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
        url: `${INSTRUCTOR_API_URL}/gets`,
    }).then(response => response)
        .catch(error => error)

export function* generateSchedule() {
    yield takeEvery(GENERATE_SCHEDULE, generateScheduleGenerate);
}

function* generateScheduleGenerate({payload}) {
    try {
        yield put(showLoader());
        const response = yield call(generateScheduleRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(showMessage("generate_success"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const generateScheduleRequest = async (payload) =>
    await axios({
        method: "POST",
        data: {
            classroom_id: payload.classroom_id,
            teacher_id: payload.teacher_id,
            room_id: payload.room_id
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
        url: `${INSTRUCTOR_API_URL}/generate`,
    }).then(response => response)
        .catch(error => error)

export function* updateSchedule() {
    yield takeEvery(UPDATE_SCHEDULE, updateScheduleGenerate);
}

function* updateScheduleGenerate({payload}) {
    try {
        yield put(showLoader());
        const response = yield call(updateScheduleRequest, payload.values);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(showMessage("success_update"));
            yield put(getScheduleAction(payload.param))
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const updateScheduleRequest = async (payload) =>
    await axios({
        method: "PUT",
        data: {
            id: payload.id,
            teacher_id: payload.teacher_id,
            room_id: payload.room_id,
            start_time: payload.start_time,
            end_time: payload.end_time
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
        url: `${INSTRUCTOR_API_URL}/update`,
    }).then(response => response)
        .catch(error => error)

export default function* rootSaga() {
    yield all([
        fork(getsSchedule),
        fork(generateSchedule),
        fork(updateSchedule),
    ]);
}
