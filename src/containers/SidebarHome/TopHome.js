import React from "react";
import {Layout, Popover} from "antd";
import {Link} from "react-router-dom";
import languageData from "../Topbar/languageData";
import {switchLanguage, toggleCollapsedSideNav} from "../../appRedux/actions";
import UserInfo from "../../components/UserInfo";


import {NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR} from "../../constants/ThemeSetting";
import {useDispatch, useSelector} from "react-redux";

const {Header} = Layout;

const Topbar = () => {

    const {locale, navStyle} = useSelector(({settings}) => settings);
    const navCollapsed = useSelector(({common}) => common.navCollapsed);
    const dispatch = useDispatch();

    const languageMenu = () => (
        <ul className="gx-sub-popover">
            {languageData.map(language =>
                <li className="gx-media gx-pointer" key={JSON.stringify(language)} onClick={() =>
                    dispatch(switchLanguage(language))
                }>
                    <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`}/>
                    <span className="gx-language-text">{language.name}</span>
                </li>
            )}
        </ul>);

    return (
        <Header>
            <div className="gx-container">
                <div className="gx-header-horizontal-main-flex">
                    {navStyle === NAV_STYLE_DRAWER || ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR)) ?
                        <div className="gx-linebar gx-mr-3">
                            <i className="gx-icon-btn icon icon-menu"
                               onClick={() => {
                                   dispatch(toggleCollapsedSideNav(!navCollapsed));
                               }}
                            />
                        </div> : null}
                    <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo">
                        <img alt="" src="/assets/images/w-logo.png"/></Link>
                    <Link to="/" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
                        <img alt="" src="/assets/images/logo.png"/></Link>

                    <ul className="gx-header-notifications gx-ml-auto">
                        <li className="gx-language">
                            <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                                     content={languageMenu()}
                                     trigger="click">
                                <span className="gx-pointer gx-flex-row gx-align-items-center">
                                      <i className={`flag flag-24 flag-${locale.icon}`}/>
                                      <span className="gx-pl-2 gx-language-name">{locale.name}</span>
                                      <i className="icon icon-chevron-down gx-pl-2"/>
                                </span>
                            </Popover>
                        </li>
                        <li className="gx-user-nav"><UserInfo/></li>
                    </ul>
                </div>
            </div>
        </Header>
    );
};

export default Topbar;
