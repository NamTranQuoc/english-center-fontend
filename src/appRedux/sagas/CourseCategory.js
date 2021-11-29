import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    ADD_COURSE_CATEGORY,
    GET_ALL_COURSE_CATEGORY, GET_ALL_COURSE_CATEGORY_ADD,
    GET_COURSE_CATEGORY, UPDATE_COURSE_CATEGORY,
} from "../../constants/ActionTypes";
import {
    getAllSuccessCourseCategory, getAllSuccessCourseCategoryByStatus,
    getListCourseCategory as getListCourseCategoryAction,
    getListSuccess,
    hideLoader,
    hideLoaderTable,
    onHideModal,
    showLoader,
    showMessage,
} from "../actions";
import axios from "axios";
import {host} from "../store/Host";

const INSTRUCTOR_API_URL = `${host}/category_course`;

export function* getListCourseCategory() {
    yield takeEvery(GET_COURSE_CATEGORY, getListCourseCategoryGenerate);
}

function* getListCourseCategoryGenerate({payload}) {
    try {
        const response = yield call(getListCourseCategoryRequest, payload);
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

const getListCourseCategoryRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/get_list?page=` + payload.page + `&size=` + payload.size,
        data: {
            sort: payload.sort,
            keyword: payload.keyword,
            from_date: payload.from_date,
            to_date: payload.to_date
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* getAllCourseCategory() {
    yield takeEvery(GET_ALL_COURSE_CATEGORY, getAllCourseCategoryGenerate);
}

function* getAllCourseCategoryGenerate({payload}) {
    try {
        const response = yield call(getAllCourseCategoryRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getAllSuccessCourseCategory(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

const getAllCourseCategoryRequest = async (payload) =>
    await axios({
        method: "GET",
        url: `${INSTRUCTOR_API_URL}/get_all`,
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* getAllCourseCategoryByStatus() {
    yield takeEvery(GET_ALL_COURSE_CATEGORY_ADD, getAllCourseCategoryByStatusGenerate);
}

function* getAllCourseCategoryByStatusGenerate({payload}) {
    try {
        const response = yield call(getAllCourseCategoryByStatusRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getAllSuccessCourseCategoryByStatus(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

const getAllCourseCategoryByStatusRequest = async (payload) =>
    await axios({
        method: "GET",
        url: `${INSTRUCTOR_API_URL}/get_by_status/` + payload.status,
    }).then(response => response)
        .catch(error => error)

export function* addCourseCategory() {
    yield takeEvery(ADD_COURSE_CATEGORY, addCourseCategoryGenerate);
}

function* addCourseCategoryGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(addCourseCategoryRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListCourseCategoryAction({
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

const addCourseCategoryRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/add`,
        data: {
            name: payload.name,
            status: payload.status,
            description: payload.description,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* updateCourseCategory() {
    yield takeEvery(UPDATE_COURSE_CATEGORY, updateCourseCategoryGenerate);
}

function* updateCourseCategoryGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(updateCourseCategoryRequest, payload.courseCategory);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListCourseCategoryAction(payload.param));
            yield put(showMessage("success_update"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const updateCourseCategoryRequest = async (payload) =>
    await axios({
        method: "PUT",
        url: `${INSTRUCTOR_API_URL}/update`,
        data: {
            id: payload.id,
            name: payload.name,
            status: payload.status,
            description: payload.description,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export default function* rootSaga() {
    yield all([
        fork(getListCourseCategory),
        fork(getAllCourseCategory),
        fork(addCourseCategory),
        fork(updateCourseCategory),
        fork(getAllCourseCategoryByStatus),
    ]);
}
