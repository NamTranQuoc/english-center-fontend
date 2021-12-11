import {all, fork, put, takeEvery} from "redux-saga/effects";
import {
    IMPORT_UPDATE_SCORE,
    INIT_URL,
    SHOW_MESSAGE,
    SWITCH_LANGUAGE,
    UPLOAD_FILE,
    UPLOAD_IMAGE
} from "../../constants/ActionTypes";
import {createNotification} from "../../components/Notification";
import {clearItems, showLoader, updateScoreByExcel, userSignOut} from "../actions";
import {storage} from "../../firebase/firebase";

function* showNotificationGenerate({payload}) {
    yield createNotification(payload);
    if ("member_type_deny" === payload) {
        yield put(userSignOut());
    }
}

function* setInitUrlGenerate({payload}) {
    yield put(clearItems());
}

function* uploadImageGenerate({payload}) {
    if (payload.image != null) {
        yield storage.ref(`images/${payload.path}`).put(payload.image, {contentType: "image/png"});
    }
}

export function* setInitUrl() {
    yield takeEvery(INIT_URL, setInitUrlGenerate);
}

export function* setLocale() {
    yield takeEvery(SWITCH_LANGUAGE, (payload) => {localStorage.setItem("locale", JSON.stringify(payload.payload))});
}

export function* showNotification() {
    yield takeEvery(SHOW_MESSAGE, showNotificationGenerate);
}

export function* uploadImage() {
    yield takeEvery(UPLOAD_IMAGE, uploadImageGenerate);
}

export function* uploadFile() {
    yield takeEvery(UPLOAD_FILE, uploadFileGenerate);
}

function* uploadFileGenerate({payload}) {
    if (payload.file != null) {
        yield storage.ref(`documents/${payload.path}`).put(payload.file, {contentType: payload.file.type});
    }
}

export function* importUpdateScoreFile() {
    yield takeEvery(IMPORT_UPDATE_SCORE, importUpdateScoreFileGenerate);
}

function* importUpdateScoreFileGenerate({payload}) {
    if (payload.file != null) {
        yield put(showLoader());
        yield storage.ref(`imports/${payload.path}`).put(payload.file, {contentType: payload.file.type});
        yield put(updateScoreByExcel(payload.path));
    }
}

export default function* rootSaga() {
    yield all([
        fork(showNotification),
        fork(setInitUrl),
        fork(setLocale),
        fork(uploadImage),
        fork(uploadFile),
        fork(importUpdateScoreFile)
    ]);
}
