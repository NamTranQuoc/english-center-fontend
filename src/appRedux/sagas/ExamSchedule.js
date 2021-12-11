import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    ADD_EXAM_SCHEDULE,
    EXPORT_EXAM_SCHEDULE,
    GET_EXAM_SCHEDULE,
    REGISTER_EXAM_SCHEDULE,
    UPDATE_EXAM_SCHEDULE,
} from "../../constants/ActionTypes";
import {
    getListExamSchedule as getListExamScheduleAction,
    getListSuccess,
    hideLoader,
    hideLoaderTable,
    onHideModal,
    showLoader,
    showMessage
} from "../actions";
import axios from "axios";
import {host} from "../store/Host";

const INSTRUCTOR_API_URL = `${host}/exam_schedule`;

export function* getListExamSchedule() {
    yield takeEvery(GET_EXAM_SCHEDULE, getListExamScheduleGenerate);
}

function* getListExamScheduleGenerate({payload}) {
    try {
        const response = yield call(getListExamScheduleRequest, payload);
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

const getListExamScheduleRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/get_list?page=` + payload.page + `&size=` + payload.size,
        data: {
            sort: payload.sort,
            keyword: payload.keyword,
            start_time: payload.start_time,
            end_time: payload.end_time,
            member_ids: payload.member_ids,
            room_ids: payload.room_ids,
            statuses: payload.statuses,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)


export function* addExamSchedule() {
    yield takeEvery(ADD_EXAM_SCHEDULE, addExamScheduleGenerate);
}

function* addExamScheduleGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(addExamScheduleRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListExamScheduleAction({
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

const addExamScheduleRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/add`,
        data: {
            start_time: payload.start_time,
            end_time: payload.end_time,
            room_id: payload.room_id,
            member_ids: payload.member_ids,
            max_quantity: payload.max_quantity,
            min_quantity: payload.min_quantity,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* updateExamSchedule() {
    yield takeEvery(UPDATE_EXAM_SCHEDULE, updateExamScheduleGenerate);
}

function* updateExamScheduleGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(updateExamScheduleRequest, payload.examSchedule);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListExamScheduleAction(payload.param));
            yield put(showMessage("success_update"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const updateExamScheduleRequest = async (payload) =>
    await axios({
        method: "PUT",
        url: `${INSTRUCTOR_API_URL}/update`,
        data: {
            id: payload._id,
            start_time: payload.start_time,
            end_time: payload.end_time,
            room_id: payload.room_id,
            member_ids: payload.member_ids,
            max_quantity: payload.max_quantity,
            min_quantity: payload.min_quantity,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* registerExamSchedule() {
    yield takeEvery(REGISTER_EXAM_SCHEDULE, registerExamScheduleGenerate);
}

function* registerExamScheduleGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(registerExamScheduleRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(showMessage("success_register"));
            yield put(getListExamScheduleAction(payload.param));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const registerExamScheduleRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/register`,
        data: {
            member: payload.member,
            exam_id: payload.exam_id
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* exportExamSchedule() {
    yield takeEvery(EXPORT_EXAM_SCHEDULE, exportExamScheduleGenerate);
}

function* exportExamScheduleGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(exportExamScheduleRequest, payload);
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

const exportExamScheduleRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/export_excel/` + payload.exam_id,
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export default function* rootSaga() {
    yield all([
        fork(getListExamSchedule),
        fork(addExamSchedule),
        fork(updateExamSchedule),
        fork(registerExamSchedule),
        fork(exportExamSchedule),
    ]);
}
