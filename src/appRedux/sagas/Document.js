import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    ADD_DOCUMENT,
    DELETE_DOCUMENT,
    GET_ADVERTISEMENT,
    GET_DOCUMENT,
    UPDATE_DOCUMENT,
} from "../../constants/ActionTypes";
import {
    getImageAdvertisementSuccess,
    getListDocument as getListDocumentAction,
    getListSuccess,
    hideLoader,
    hideLoaderTable,
    onHideModal,
    showLoader,
    showMessage,
    uploadFile,
} from "../actions";
import axios from "axios";
import {host} from "../store/Host";

const INSTRUCTOR_API_URL = `${host}/document`;

export function* getListDocument() {
    yield takeEvery(GET_DOCUMENT, getListDocumentGenerate);
}

function* getListDocumentGenerate({payload}) {
    try {
        const response = yield call(getListDocumentRequest, payload);
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

const getListDocumentRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/get_list?page=` + payload.page + `&size=` + payload.size,
        data: {
            sort: payload.sort,
            keyword: payload.keyword,
            from_date: payload.from_date,
            to_date: payload.to_date,
            types: payload.types,
            course_ids: payload.course_ids
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* addDocument() {
    yield takeEvery(ADD_DOCUMENT, addDocumentGenerate);
}

function* addDocumentGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(addDocumentRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(uploadFile(payload.file, response.data.payload.path));
            yield put(getListDocumentAction({
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

const addDocumentRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/add`,
        data: {
            name: payload.name,
            type: payload.type,
            path: payload.path,
            course_ids: payload.course_ids,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* updateDocument() {
    yield takeEvery(UPDATE_DOCUMENT, updateDocumentGenerate);
}

function* updateDocumentGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(updateDocumentRequest, payload.document);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(uploadFile(payload.document.file, response.data.payload.path));
            yield put(getListDocumentAction(payload.param));
            yield put(showMessage("success_update"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const updateDocumentRequest = async (payload) =>
    await axios({
        method: "PUT",
        url: `${INSTRUCTOR_API_URL}/update`,
        data: {
            id: payload._id,
            name: payload.name,
            path: payload.path,
            course_ids: payload.course_ids,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* deleteDocument() {
    yield takeEvery(DELETE_DOCUMENT, deleteDocumentGenerate);
}

function* deleteDocumentGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(deleteDocumentRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListDocumentAction(payload.param));
            yield put(showMessage("success_delete"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const deleteDocumentRequest = async (payload) =>
    await axios({
        method: "DELETE",
        url: `${INSTRUCTOR_API_URL}/delete/` + payload.id,
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)


export function* getAdvertisement() {
    yield takeEvery(GET_ADVERTISEMENT, getAdvertisementGenerate);
}

function* getAdvertisementGenerate() {
    yield put(showLoader());
    try {
        const response = yield call(getAdvertisementRequest);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getImageAdvertisementSuccess(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const getAdvertisementRequest = async () =>
    await axios({
        method: "GET",
        url: `${INSTRUCTOR_API_URL}/get_advertisement`,
    }).then(response => response)
        .catch(error => error)

export default function* rootSaga() {
    yield all([
        fork(updateDocument),
        fork(addDocument),
        fork(getListDocument),
        fork(deleteDocument),
        fork(getAdvertisement),
    ]);
}
