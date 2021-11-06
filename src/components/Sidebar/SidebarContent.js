import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "../../util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "../../util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR, NAV_STYLE_NO_HEADER_MINI_SIDEBAR} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";

class SidebarContent extends Component {

    getNoHeaderClass = (navStyle) => {
        if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
            return "gx-no-header-notifications";
        }
        return "";
    };

    render() {
        const {pathname} = this.props;
        const selectedKeys = pathname;
        const defaultOpenKeys = "/admin/dashboard";
        return (<Auxiliary>
                <SidebarLogo/>
                <div className="gx-sidebar-content">
                    <div className={`gx-sidebar-notifications`}>
                        <UserProfile/>
                        <AppsNavigation/>
                    </div>
                    <CustomScrollbars className="gx-layout-sider-scrollbar">
                        <Menu
                            defaultOpenKeys={[defaultOpenKeys]}
                            selectedKeys={[selectedKeys]}
                            mode="inline"
                            theme="dark">

                            <Menu.Item key="/admin/dashboard">
                                <Link to="/admin/dashboard"><i className="icon icon-widgets"/>
                                    <IntlMessages id="sidebar.dashboard"/>
                                </Link>
                            </Menu.Item>
                            <Menu.SubMenu key="managerUser"
                                          title={
                                              <span>
                                                  <i className="icon icon-avatar"/><IntlMessages
                                                  id="sidebar.managerUser"/>
                                              </span>}>
                                <Menu.Item key="/admin/student">
                                    <Link to="/admin/student">
                                        <IntlMessages id="sidebar.managerUser.student"/>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/admin/teacher">
                                    <Link to="/admin/teacher">
                                        <IntlMessages id="sidebar.managerUser.teacher"/>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/admin/receptionist">
                                    <Link to="/admin/receptionist">
                                        <IntlMessages id="sidebar.managerUser.receptionist"/>
                                    </Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="managerStudy"
                                          title={
                                              <span>
                                <i className="icon icon-ckeditor"/>
                                <IntlMessages id="sidebar.managerStudy"/>
                              </span>}>
                                <Menu.Item key="/admin/course-category">
                                    <Link to="/admin/course-category">
                                        <IntlMessages id="sidebar.managerStudy.courseCategory"/>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/admin/course">
                                    <Link to="/admin/course">
                                        <IntlMessages id="sidebar.managerStudy.course"/>
                                    </Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </CustomScrollbars>
                </div>
            </Auxiliary>
        );
    }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings}) => {
    const {navStyle, locale, pathname} = settings;
    return {navStyle, locale, pathname}
};
export default connect(mapStateToProps)(SidebarContent);

