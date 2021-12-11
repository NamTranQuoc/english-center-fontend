import {
    CLEAR_ITEMS,
    HIDE_CHANGE_PASSWORD,
    HIDE_MESSAGE,
    HIDE_MODAL,
    HIDE_UPDATE_MEMBER,
    IMPORT_UPDATE_SCORE,
    INIT_URL,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    SELECT_INDEX,
    SET_MEMBER,
    SHOW_CHANGE_PASSWORD,
    SHOW_MESSAGE,
    SHOW_MODAL,
    SHOW_UPDATE_MEMBER,
    UPLOAD_FILE,
    UPLOAD_IMAGE,
} from "../../constants/ActionTypes";

export const showMessage = (message) => {
    return {
        type: SHOW_MESSAGE,
        payload: message
    }
};

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE
    }
};

export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url
    };
};

export const showLoader = () => {
    return {
        type: ON_SHOW_LOADER,
    };
};

export const hideLoader = () => {
    return {
        type: ON_HIDE_LOADER,
    };
};

export const clearItems = () => {
    return {
        type: CLEAR_ITEMS,
    }
}

export const uploadImage = (image, path) => {
    return {
        type: UPLOAD_IMAGE,
        payload: {
            image: image,
            path: path
        }
    }
}

export const uploadFile = (file, path) => {
    return {
        type: UPLOAD_FILE,
        payload: {
            file: file,
            path: path
        }
    }
}

export const importUpdateScoreFile = (file, path) => {
    return {
        type: IMPORT_UPDATE_SCORE,
        payload: {
            file: file,
            path: path
        }
    }
}

export const onShowModal = () => {
    return {
        type: SHOW_MODAL
    }
}

export const onHideModal = () => {
    return {
        type: HIDE_MODAL
    }
}

export const onShowUpdateMember = () => {
    return {
        type: SHOW_UPDATE_MEMBER
    }
}

export const onHideUpdateMember = () => {
    return {
        type: HIDE_UPDATE_MEMBER
    }
}

export const onShowChangePassword = () => {
    return {
        type: SHOW_CHANGE_PASSWORD
    }
}

export const onHideChangePassword = () => {
    return {
        type: HIDE_CHANGE_PASSWORD
    }
}

export const onSelectIndex = (index) => {
    return {
        type: SELECT_INDEX,
        payload: index
    }
}

export const setMember = (member) => {
    return {
        type: SET_MEMBER,
        payload: member
    }
}




