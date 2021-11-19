import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {GET_ALL_COURSE_CATEGORY, GET_COURSE_CATEGORY} from "../../constants/ActionTypes";
import {getAllSuccessCourseCategory, getListSuccess, hideLoaderTable, showMessage} from "../actions";
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

export default function* rootSaga() {
    yield all([
        fork(getListCourseCategory),
        fork(getAllCourseCategory),
    ]);
}
