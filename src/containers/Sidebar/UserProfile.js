import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Popover} from "antd";
import {getCurrentMember, userSignOut} from "../../appRedux/actions";
import IntlMessages from "../../util/IntlMessages";
import {getImageURL} from "../../util/ParseUtils";

const UserProfile = () => {
    const dispatch = useDispatch();
    const {authUser} = useSelector(({auth}) => auth);
    const {member} = useSelector(({common}) => common);
    const [urlAvatar, setUrlAvatar] = useState(null);
    const [name, setName] = useState("Not Found");

    useEffect(() => {
        dispatch(getCurrentMember());
        // eslint-disable-next-line
    }, [authUser])

    useEffect(() => {
        if (member != null) {
            setUrlAvatar(getImageURL(member.avatar));
            setName(member.name);
        }
    }, [member])

    const userMenuOptions = (
        <ul className="gx-user-popover">
            <li><IntlMessages id="auth.my.account"/></li>
            <li onClick={() => dispatch(userSignOut())}><IntlMessages id="auth.logout"/></li>
        </ul>
    );

    return (
        <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
            <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
                <Avatar src={urlAvatar} className="gx-size-40 gx-pointer gx-mr-3" alt=""/>
                <span className="gx-avatar-name">{name}<i className="icon icon-chevron-down gx-fs-xxs gx-ml-2"/></span>
            </Popover>
        </div>
    )
};

export default UserProfile;
