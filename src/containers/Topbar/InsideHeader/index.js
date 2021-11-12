import React, {useState} from "react";
import {Button, Dropdown, Layout, Menu, message, Popover} from 'antd';
import Icon from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import languageData from "../languageData";
import SearchBox from "../../../components/SearchBox";
import UserInfo from "../../../components/UserInfo";
import AppNotification from "../../../components/AppNotification";
import MailNotification from "../../../components/MailNotification";
import HorizontalNav from "../HorizontalNav";
import {Link} from "react-router-dom";
import {switchLanguage, toggleCollapsedSideNav} from "../../../appRedux/actions";
import IntlMessages from "../../../util/IntlMessages";
import {TAB_SIZE} from "../../../constants/ThemeSetting";

const {Header} = Layout;

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">Products</Menu.Item>
        <Menu.Item key="2">Apps</Menu.Item>
        <Menu.Item key="3">Blogs</Menu.Item>
    </Menu>
);

function handleMenuClick(e) {
    message.info('Click on menu item.');
}

const InsideHeader = () => {
    const [searchText, setSearchText] = useState('');
    const {locale} = useSelector(({settings}) => settings);
    const navCollapsed = useSelector(({common}) => common.navCollapsed);
    const width = useSelector(({common}) => common.width);
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

    const updateSearchChatUser = (evt) => {
        setSearchText(evt.target.value)
    };

    return (
        <div className="gx-header-horizontal gx-header-horizontal-dark gx-inside-header-horizontal">
            <div className="gx-header-horizontal-top">
                <div className="gx-container">
                    <div className="gx-header-horizontal-top-flex">
                        <div className="gx-header-horizontal-top-left">
                            <i className="icon icon-alert gx-mr-3"/>
                            <p className="gx-mb-0 gx-text-truncate"><IntlMessages id="app.announced"/></p>
                        </div>
                        <ul className="gx-login-list">
                            <li><a href={"/signin"} style={{color: "#fa8c15"}}><IntlMessages id={"app.userAuth.signIn"}/></a></li>
                            <li><a href={"/signup"} style={{color: "#fa8c15"}}><IntlMessages id={"app.userAuth.signUp"}/></a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <Header
                className="gx-header-horizontal-main">
                <div className="gx-container">
                    <div className="gx-header-horizontal-main-flex">
                        <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3 6e">
                            <i className="gx-icon-btn icon icon-menu"
                               onClick={() => {
                                   dispatch(toggleCollapsedSideNav(!navCollapsed));
                               }}
                            />
                        </div>
                        <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo">
                            <img alt="" src="/assets/images/w-logo.png"/></Link>
                        <Link to="/" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
                            <img alt="" src="/assets/images/logo.png"/></Link>

                        {width >= TAB_SIZE && (
                            <div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve">
                                <HorizontalNav/>
                            </div>
                        )}

                        <ul className="gx-header-notifications gx-ml-auto">
                            <li className="gx-notify gx-notify-search">
                                <Popover overlayClassName="gx-popover-horizantal"
                                         placement="bottomRight" content={
                                    <div className="gx-d-flex"><Dropdown overlay={menu}>
                                        <Button>
                                            Category <Icon type="down"/>
                                        </Button>
                                    </Dropdown>
                                        <SearchBox styleName="gx-popover-search-bar"
                                                   placeholder="Search in app..."
                                                   onChange={updateSearchChatUser}
                                                   value={searchText}/></div>
                                } trigger="click">

                                    <span className="gx-pointer gx-d-block"><i className="icon icon-search-new"/></span>

                                </Popover>
                            </li>

                            <li className="gx-notify">
                                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                                         content={<AppNotification/>}
                                         trigger="click">
                                    <span className="gx-pointer gx-d-block"><i
                                        className="icon icon-notification"/></span>
                                </Popover>
                            </li>

                            <li className="gx-msg">
                                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                                         content={<MailNotification/>} trigger="click">
                <span className="gx-pointer gx-status-pos gx-d-block">
                <i className="icon icon-chat-new"/>
                <span className="gx-status gx-status-rtl gx-small gx-orange"/>
                </span>
                                </Popover>
                            </li>
                            <li className="gx-language">
                                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                                         content={languageMenu()} trigger="click">
              <span className="gx-pointer gx-flex-row gx-align-items-center"><i
                  className={`flag flag-24 flag-${locale.icon}`}/>
              </span>
                                </Popover>
                            </li>
                            <li className="gx-user-nav"><UserInfo/></li>
                        </ul>
                    </div>
                </div>
            </Header>
        </div>
    );
};

export default InsideHeader;
