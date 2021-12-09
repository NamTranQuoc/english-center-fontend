import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Popover} from "antd";
import {getCurrentMember, onShowChangePassword, onShowUpdateMember, userSignOut} from "../../appRedux/actions";
import {getImageURL} from "../../util/ParseUtils";
import ModalUpdateMember from "../updateInfoMember";
import IntlMessages from "../../util/IntlMessages";
import ModalChangePassword from "../changePassword";
import {Link} from "react-router-dom";

const UserInfo = () => {
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/englishcenter-2021.appspot.com/o/images%2Favatar.png?alt=media";
    const dispatch = useDispatch();
    const {authUser} = useSelector(({auth}) => auth);
    const {member} = useSelector(({common}) => common);
    const [urlAvatar, setUrlAvatar] = useState(null);
    const [name, setName] = useState("Not Found");
    const {hasShowUpdateMember, hasShowChangePassword} = useSelector(({common}) => common);

    useEffect(() => {
        if (member === null && authUser !== null) {
            dispatch(getCurrentMember());
        }
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
        <>
            {member != null ?
                <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
                <span className="gx-avatar-name"
                      style={{color: "#fa8c15", fontSize: "15px", marginRight: "10px"}}>{name}</span>
                    <Avatar src={urlAvatar} className="gx-size-40 gx-pointer gx-mr-3" alt="avatar"/>
                </Popover> :
                <ul className="gx-login-list">
                    <li><Link to="/signin"><IntlMessages id="app.userAuth.signIn"/></Link></li>
                    <li><Link to="/signup"><IntlMessages id="app.userAuth.signUp"/></Link></li>
                </ul>}

            {hasShowUpdateMember && <ModalUpdateMember/>}
            {hasShowChangePassword && <ModalChangePassword/>}
        </>

    );
};

export default UserInfo;
