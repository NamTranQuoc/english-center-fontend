import {all, fork, put, takeEvery} from "redux-saga/effects";
import {INIT_URL, SWITCH_LANGUAGE} from "../../constants/ActionTypes";
import {clearItems} from "../actions";

function* setInitUrlGenerate({payload}) {
    yield put(clearItems());
}

export function* setInitUrl() {
    yield takeEvery(INIT_URL, setInitUrlGenerate);
}

export function* setLocale() {
    yield takeEvery(SWITCH_LANGUAGE, (payload) => {localStorage.setItem("locale", JSON.stringify(payload.payload))});
}

export default function* rootSaga() {
    yield all([
        fork(setInitUrl),
        fork(setLocale),
    ]);
}