import {all} from "redux-saga/effects";
import authSagas from "./Auth";
import commonSagas from "./Common";
import memberSagas from "./Member";
import courseCategorySagas from "./CourseCategory";
import courseSagas from "./Course";

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        commonSagas(),
        memberSagas(),
        courseCategorySagas(),
        courseSagas(),
    ]);
}
