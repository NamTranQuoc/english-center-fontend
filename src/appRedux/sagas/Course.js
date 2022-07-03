import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    ADD_COURSE,
    GET_ALL_COURSE,
    GET_ALL_COURSE_ADD,
    GET_ALL_COURSE_BY_CATEGORY,
    GET_COURSE, GET_COURSE_SUGGEST,
    UPDATE_COURSE,
} from "../../constants/ActionTypes";
import {
    getAllSuccessCategory,
    getAllSuccessCourseByCategoryId,
    getAllSuccessCourseByStatus,
    getListCourse as getListCourseAction,
    getListSuccess,
    hideLoader,
    hideLoaderTable,
    onHideModal,
    showLoader,
    showMessage
} from "../actions";
import axios from "axios";
import {host} from "../store/Host";

const INSTRUCTOR_API_URL = `${host}/course`;

export function* getListCourse() {
    yield takeEvery(GET_COURSE, getListCourseGenerate);
}

function* getListCourseGenerate({payload}) {
    try {
        const response = yield call(getListCourseRequest, payload);
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

const getListCourseRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/get_list?page=` + payload.page + `&size=` + payload.size,
        data: {
            sort: payload.sort,
            category_courses: payload.category_courses,
            keyword: payload.keyword,
            from_date: payload.from_date,
            to_date: payload.to_date,
            status: payload.status,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)


export function* addCourse() {
    yield takeEvery(ADD_COURSE, addCourseGenerate);
}

function* addCourseGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(addCourseRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListCourseAction({
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

const addCourseRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/add`,
        data: {
            name: payload.name,
            category_course_id: payload.category_course_id,
            tuition: payload.tuition,
            number_of_shift: payload.number_of_shift,
            description: payload.description,
            input_score: payload.input_score,
            output_score: payload.output_score,
            status: payload.status,
            suggest: payload.suggest
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* updateCourse() {
    yield takeEvery(UPDATE_COURSE, updateCourseGenerate);
}

function* updateCourseGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(updateCourseRequest, payload.course);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(onHideModal());
            yield put(getListCourseAction(payload.param));
            yield put(showMessage("success_update"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const updateCourseRequest = async (payload) =>
    await axios({
        method: "PUT",
        url: `${INSTRUCTOR_API_URL}/update`,
        data: {
            id: payload.id,
            name: payload.name,
            category_course_id: payload.category_course_id,
            tuition: payload.tuition,
            number_of_shift: payload.number_of_shift,
            description: payload.description,
            input_score: payload.input_score,
            output_score: payload.output_score,
            status: payload.status,
            suggest: payload.suggest
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* getAllCourse() {
    yield takeEvery(GET_ALL_COURSE, getAllCourseGenerate);
}

function* getAllCourseGenerate({payload}) {
    try {
        const response = yield call(getAllCourseRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getAllSuccessCategory(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

const getAllCourseRequest = async (payload) =>
    await axios({
        method: "GET",
        url: `${INSTRUCTOR_API_URL}/get_all`,
    }).then(response => response)
        .catch(error => error)

export function* getAllCourseByStatus() {
    yield takeEvery(GET_ALL_COURSE_ADD, getAllCourseByStatusGenerate);
}

function* getAllCourseByStatusGenerate({payload}) {
    try {
        const response = yield call(getAllCourseByStatusRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getAllSuccessCourseByStatus(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

const getAllCourseByStatusRequest = async (payload) =>
    await axios({
        method: "GET",
        url: `${INSTRUCTOR_API_URL}/get_by_status/` + payload.status,
    }).then(response => response)
        .catch(error => error)


export function* getAllCourseByCategoryId() {
    yield takeEvery(GET_ALL_COURSE_BY_CATEGORY, getAllCourseByCategoryIdGenerate);
}

function* getAllCourseByCategoryIdGenerate({payload}) {
    try {
        const response = yield call(getAllCourseByCategoryIdRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getAllSuccessCourseByCategoryId(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

const getAllCourseByCategoryIdRequest = async (payload) =>
    await axios({
        method: "GET",
        url: `${INSTRUCTOR_API_URL}/get_by_category_id/` + payload.id,
    }).then(response => response)
        .catch(error => error)

export function* getCourseSuggest() {
    yield takeEvery(GET_COURSE_SUGGEST, getCourseSuggestGenerate);
}

function* getCourseSuggestGenerate({payload}) {
    try {
        const response = yield call(getCourseSuggestRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getAllSuccessCategory(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

const getCourseSuggestRequest = async (payload) =>
    await axios({
        method: "GET",
        url: `${INSTRUCTOR_API_URL}/get_course_suggest`,
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export default function* rootSaga() {
    yield all([
        fork(getListCourse),
        fork(addCourse),
        fork(updateCourse),
        fork(getAllCourse),
        fork(getAllCourseByStatus),
        fork(getAllCourseByCategoryId),
        fork(getCourseSuggest),
    ]);
}
