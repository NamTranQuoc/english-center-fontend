import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Popover} from "antd";
import {getCurrentMember, onShowChangePassword, onShowUpdateMember, userSignOut} from "../../appRedux/actions";
import IntlMessages from "../../util/IntlMessages";
import {getImageURL} from "../../util/ParseUtils";
import ModalUpdateMember from "../../components/updateInfoMember";
import ModalChangePassword from "../../components/changePassword";

const UserProfile = () => {
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/englishcenter-2021.appspot.com/o/images%2Favatar.png?alt=media";
    const dispatch = useDispatch();
    const {authUser} = useSelector(({auth}) => auth);
    const {member} = useSelector(({common}) => common);
    const [urlAvatar, setUrlAvatar] = useState(null);
    const [name, setName] = useState("Not Found");
    const {hasShowUpdateMember, hasShowChangePassword} = useSelector(({common}) => common);

    useEffect(() => {
        dispatch(getCurrentMember());
        // eslint-disable-next-line
    }, [authUser])

    useEffect(() => {
        if (member != null) {
            const url = getImageURL(member.avatar);
            setUrlAvatar(url === "" ? defaultImage : url);
            setName(member.name);
        }
    }, [member])

    const userMenuOptions = (
        <ul className="gx-user-popover">
            <li onClick={() => dispatch(onShowChangePassword())}><IntlMessages id="form.change.password"/></li>
            <li onClick={() => dispatch(onShowUpdateMember())}><IntlMessages id="auth.my.account"/></li>
            <li onClick={() => dispatch(userSignOut())}><IntlMessages id="auth.logout"/></li>
        </ul>
    );

    return (
        <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
            <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
                <Avatar src={urlAvatar} className="gx-size-40 gx-pointer gx-mr-3" alt=""/>
                <span className="gx-avatar-name">{name}<i className="icon icon-chevron-down gx-fs-xxs gx-ml-2"/></span>
            </Popover>
            {hasShowUpdateMember && <ModalUpdateMember />}
            {hasShowChangePassword && <ModalChangePassword/>}
        </div>
    )
};

export default UserProfile;
