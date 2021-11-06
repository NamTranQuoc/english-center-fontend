import React from "react";
import {Layout, Popover} from "antd";
import {Link} from "react-router-dom";
import languageData from "./languageData";
import {switchLanguage, toggleCollapsedSideNav} from "../../appRedux/actions";
import AppNotification from "../AppNotification";
import Auxiliary from "../../util/Auxiliary";


import {TAB_SIZE} from "../../constants/ThemeSetting";
import {connect} from "react-redux";

const {Header} = Layout;

function Topbar(props) {
    const languageMenu = () => (
        <ul className="gx-sub-popover">
            {languageData.map(language =>
                <li className="gx-media gx-pointer" key={JSON.stringify(language)} onClick={(e) =>
                    props.switchLanguage(language)
                }>
                    <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`}/>
                    <span className="gx-language-text">{language.name}</span>
                </li>
            )}
        </ul>);

    return (
        <Auxiliary>
            <Header>
                <Link to="/admin/dashboard" className="gx-d-block gx-d-lg-none gx-pointer">
                    <img alt=""
                         src="https://firebasestorage.googleapis.com/v0/b/englishcenter-2021.appspot.com/o/images%2Flogo.png?alt=media&token=e32f70cd-77f2-469b-b98a-1bd4c56bb3e9"/></Link>
                <ul className="gx-header-notifications gx-ml-auto">
                    {props.width >= TAB_SIZE ? null :
                        <Auxiliary style={{height: "100px"}}>
                            <li className="gx-notify">
                                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                                         content={<AppNotification/>}
                                         trigger="click">
                                    <span className="gx-pointer gx-d-block"><i
                                        className="icon icon-notification"/></span>
                                </Popover>
                            </li>
                        </Auxiliary>
                    }
                    <li className="gx-language">
                        <Popover overlayClassName="gx-popover-vertical" placement="bottomRight"
                                 content={languageMenu()}
                                 trigger="click">
                <span className="gx-pointer gx-flex-row gx-align-items-center">
                  <i className={`flag flag-24 flag-${props.locale.icon}`}/>
                  <span className="gx-pl-2 gx-language-name">{props.locale.name}</span>
                  <i className="icon icon-chevron-down gx-pl-2"/>
                </span>
                        </Popover>
                    </li>
                </ul>
            </Header>
        </Auxiliary>
    );
}

const mapStateToProps = ({settings}) => {
    const {locale, navStyle, navCollapsed, width} = settings;
    return {locale, navStyle, navCollapsed, width}
};

export default connect(mapStateToProps, {toggleCollapsedSideNav, switchLanguage})(Topbar);
