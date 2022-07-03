import React from "react";
import IntlMessages from "../../../../util/IntlMessages";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getRoleCurrent} from "../../../../util/ParseUtils";
import {Menu, Popover} from "antd";
import {
    getAllClassByCourseId,
    saveCourseName,
    selectSchedule,
    switchLanguage
} from "../../../../appRedux/actions";
import UserInfo from "../../../../components/UserInfo";
import languageData from "../../../../containers/Topbar/languageData";
import {showChatFB} from "../../../../util/ChatFacebook";

const SubMenu = Menu.SubMenu;

export const Navigation = (props) => {
    const {views} = useSelector(({courseCategory}) => courseCategory);
    const pathname = useSelector(({common}) => common.pathname);
    const roleCurrent = getRoleCurrent();
    const dispatch = useDispatch();
    const {locale} = useSelector(({settings}) => settings);

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
        <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
            {showChatFB()}
            <div className="gx-container">
            <div className="gx-header-horizontal-main-flex">
                <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo">
                    <img alt="" src="/assets/images/w-logo.png"/></Link>
                <Link to="/" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
                    <img alt="" src="/assets/images/logo.png"/></Link>

                <Menu
                    defaultOpenKeys={["/home"]}
                    selectedKeys={[pathname]}
                    mode="horizontal"
                >

                    <Menu.Item key="/home">
                        <Link to="/home">
                            <span><IntlMessages id="sidebar.home"/></span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/home/study-program">
                        <Link to="/home/study-program">
                            <SubMenu key="SubMenu" title={
                                <span><IntlMessages id="admin.course.table.type"/></span>}>
                                {views.map((item) => {
                                    return <SubMenu title={item.name} onTitleClick={console.log(item.id)}>
                                        {item.courses.map(subItem => {
                                            return <Menu.Item key={subItem.id}>
                                                <Link to="/home/register" onClick={() => {
                                                    dispatch(getAllClassByCourseId(subItem.id));
                                                    dispatch(saveCourseName(subItem.name));
                                                }}>
                                                    {subItem.name}
                                                </Link>
                                            </Menu.Item>
                                        })}
                                    </SubMenu>
                                })}
                            </SubMenu>
                        </Link>
                    </Menu.Item>

                    {roleCurrent === "teacher" || roleCurrent === "student" ?
                        <Menu.Item key="/home/schedule">
                            <Link to="/home/schedule">
                                <span><IntlMessages id="sidebar.managerStudy.schedule"/></span>
                            </Link>
                        </Menu.Item> : null }
                    {roleCurrent === "teacher" || roleCurrent === "student" ?
                        <Menu.Item key="/home/document">
                            <Link to="/home/document">
                                <span><IntlMessages id="sidebar.home.document"/></span>
                            </Link>
                        </Menu.Item> : null }
                    {roleCurrent === "student" ?
                        <Menu.Item key="/home/exam_schedule">
                            <Link to="/home/exam_schedule">
                                <span><IntlMessages id="sidebar.home.exam"/></span>
                            </Link>
                        </Menu.Item> : null }
                    {roleCurrent === "teacher" ?
                        <Menu.Item key="/home/muster">
                            <Link to="/home/muster" onClick={() => {dispatch(selectSchedule(null));}}>
                                <span><IntlMessages id="sidebar.home.muster"/></span>
                            </Link>
                        </Menu.Item> : null }
                </Menu>

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
        </nav>
    )
}

export default Navigation;
