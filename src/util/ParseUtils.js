import IntlMessages from "./IntlMessages";
import React from "react";
import {storage} from "../firebase/firebase";
import jwt from 'jwt-decode';

export function getDate(timestamp) {
    const date = new Date(timestamp);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

export function getGender(gender) {
    if (gender === null) {
        return "-"
    }
    return <IntlMessages id={`admin.user.gender.${gender}`}/>
}

export async function getImageURL(path) {
    let result;
    if (path !== null) {
        let promise = new Promise((resolve) => {
            storage
                .ref("images/" + path)
                .getMetadata()
                .then((Response) => {
                    if (Response.contentType === "image/png") {
                        resolve("https://firebasestorage.googleapis.com/v0/b/englishcenter-2021.appspot.com/o/images%2F" + path + "?alt=media&token=" + Response.md5Hash);
                    } else {
                        resolve("");
                    }
                })
                .catch((error) => {
                    resolve("");
                })
        });
        result = await promise;
    } else {
        result = "";
    }
    return result + "";
}

export function getMoney(value) {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function getRoleCurrent() {
    const token = localStorage.getItem("token");
    if (token != null) {
        const parse = jwt(token);
        return parse.role;
    }
    return null;
}

export function getMemberIdCurrent() {
    const token = localStorage.getItem("token");
    if (token != null) {
        const parse = jwt(token);
        return parse.member_id;
    }
    return null;
}
