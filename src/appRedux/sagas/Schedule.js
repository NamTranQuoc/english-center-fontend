import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {GENERATE_SCHEDULE, GET_ALL_COURSE, GET_SCHEDULE} from "../../constants/ActionTypes";
import {getAllSuccessCategory, getScheduleSuccess, hideLoader, showLoader, showMessage} from "../actions";
import axios from "axios";
import {addCourse, getListCourse, updateCourse} from "./Course";
import {host} from "../store/Host";

const INSTRUCTOR_API_URL = `${host}/schedule`;

export function* getsSchedule() {
    yield takeEvery(GET_SCHEDULE, getsScheduleGenerate);
}

function* getsScheduleGenerate({payload}) {
    try {
        const response = yield call(getsScheduleRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getScheduleSuccess(response.data.payload.map(item => {
                return {
                    title: item.title,
                    start: new Date(item.start),
                    end: new Date(item.end),
                }
            })));
        }
    } catch (error) {
        yield put(showMessage(error));
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

export default function* rootSaga() {
    yield all([
        fork(getsSchedule),
        fork(generateSchedule),
    ]);
}
