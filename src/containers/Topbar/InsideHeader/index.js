import React from "react";
import {Layout, Popover} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import languageData from "../languageData";
import UserInfo from "../../../components/UserInfo";
import {Link} from "react-router-dom";
import {switchLanguage} from "../../../appRedux/actions";
import IntlMessages from "../../../util/IntlMessages";
import SidebarContent from "../../SidebarHome/SidebarContent";

const {Header} = Layout;

const InsideHeader = () => {
    const {locale} = useSelector(({settings}) => settings);
    const authUser = useSelector(({auth}) => auth.authUser);
    const dispatch = useDispatch();

    const languageMenu = () => (
        <ul className="gx-sub-popover">
            {languageData.map(language =>
                <li className="gx-media gx-pointer" key={JSON.stringify(language)} onClick={(e) =>
                    dispatch(switchLanguage(language))
                }>
                    <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`}/>
                    <span className="gx-language-text">{language.name}</span>
                </li>
            )}
        </ul>);

    const getMemberAvatar = () => {
        if (authUser == null) {
            return (<li><Link to={"/signin"} style={{color: "#fa8c15", fontSize: "15px"}}><IntlMessages
                id={"app.userAuth.signIn"}/></Link><span style={{marginRight: "3px", marginLeft: "3px"}}>|</span><Link
                to={"/signup"} style={{color: "#fa8c15", fontSize: "15px"}}><IntlMessages
                id={"app.userAuth.signUp"}/></Link></li>)
        } else {
            return <li><UserInfo/></li>
        }
    }

    return (
        <div className="gx-header-horizontal gx-header-horizontal-dark gx-inside-header-horizontal">
            <Header className="gx-header-horizontal-main">
                <div className="gx-container">
                    <div className="gx-header-horizontal-main-flex">
                        <Link to="/home" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
                            <img alt="" src="/assets/images/logo.png"/>
                        </Link>

                        <div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve">
                            <SidebarContent/>
                        </div>

                        <ul className="gx-header-notifications gx-ml-auto">
                            <li className="gx-language">
                                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                                         content={languageMenu()} trigger="click">
                                    <span className="gx-pointer gx-flex-row gx-align-items-center">
                                        <i className={`flag flag-24 flag-${locale.icon}`}/>
                                    </span>
                                </Popover>
                            </li>
                            {getMemberAvatar()}
                        </ul>
                    </div>
                </div>
            </Header>
        </div>
    );
};

export default InsideHeader;
