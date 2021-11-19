import IntlMessages from "./IntlMessages";
import React from "react";
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

function imageExists(image_url){
    let http = new XMLHttpRequest();

    http.open('GET', image_url, false);
    http.send();

    return http.status === 200;

}

export function getImageURL(path) {
    const url = "https://firebasestorage.googleapis.com/v0/b/englishcenter-2021.appspot.com/o/images%2F" + path;
    if (imageExists(url)) {
        return url + "?alt=media";
    }
    return "";
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

export function getStatus(status) {
    if (status === null) {
        return "-"
    }
    return <IntlMessages id={`admin.categoryCourse.table.${status}`}/>
}
