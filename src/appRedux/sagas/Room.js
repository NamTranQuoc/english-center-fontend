import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    ADD_ROOM,
    GET_ROOM, GET_ROOMS,
    UPDATE_ROOM
} from "../../constants/ActionTypes";
import {
    getListRoom as getListRoomAction,
    getListSuccess, getRoomsSuccess, hideLoader,
    hideLoaderTable,
    onHideModal,
    showLoader,
    showMessage
} from "../actions";
import axios from "axios";
import {host} from "../store/Host";

const INSTRUCTOR_API_URL = `${host}/room`;

export function* getListRoom() {
    yield takeEvery(GET_ROOM, getListRoomGenerate);
}

function* getListRoomGenerate({payload}) {
    try {
        const response = yield call(getListRoomRequest, payload);
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

const getListRoomRequest = async (payload) =>
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


export function* addRoom() {
    yield takeEvery(ADD_ROOM, addRoomGenerate);
}

function* addRoomGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(addRoomRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListRoomAction({
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

const addRoomRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/add`,
        data: {
            name: payload.name,
            capacity: payload.capacity,
            status: payload.status,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* updateRoom() {
    yield takeEvery(UPDATE_ROOM, updateRoomGenerate);
}

function* updateRoomGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(updateRoomRequest, payload.room);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListRoomAction(payload.param));
            yield put(showMessage("success_update"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const updateRoomRequest = async (payload) =>
    await axios({
        method: "PUT",
        url: `${INSTRUCTOR_API_URL}/update`,
        data: {
            id: payload.id,
            name: payload.name,
            capacity: payload.capacity,
            status: payload.status,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* getRooms() {
    yield takeEvery(GET_ROOMS, getRoomsGenerate);
}

function* getRoomsGenerate({payload}) {
    try {
        const response = yield call(getRoomsRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getRoomsSuccess(response.data.payload.items));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

const getRoomsRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/get_list?page=1&size=10`,
        data: {
            sort: {
                is_asc: false,
                field: "_id"
            },
            keyword: payload.keyword
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export default function* rootSaga() {
    yield all([
        fork(getListRoom),
        fork(addRoom),
        fork(updateRoom),
        fork(getRooms),
    ]);
}
