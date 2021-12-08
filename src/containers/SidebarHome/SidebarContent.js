import React from "react";
import {useSelector} from "react-redux";
import {Menu} from "antd";
import {THEME_TYPE_LITE} from "../../constants/ThemeSetting";
import {Link} from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";
import SidebarLogo from "./SidebarLogo";
import CustomScrollbars from "../../util/CustomScrollbars";

const SubMenu = Menu.SubMenu;

const SidebarContent = ({sidebarCollapsed, setSidebarCollapsed}) => {
    const {themeType} = useSelector(({settings}) => settings);
    const {views} = useSelector(({courseCategory}) => courseCategory);
    const pathname = useSelector(({common}) => common.pathname);

    return (
        <>
            <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
            <div className="gx-sidebar-content">
                <CustomScrollbars className="gx-layout-sider-scrollbar">
                    <Menu
                        defaultOpenKeys={["/admin/dashboard"]}
                        selectedKeys={[pathname]}
                        theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
                        mode="inline">

                        <Menu.Item key="/home">
                            <Link to="/home">
                                <i className="icon icon-widgets"/>
                                <span><IntlMessages id="sidebar.home"/></span>
                            </Link>
                        </Menu.Item>
                        <SubMenu key="SubMenu" title={<span><i className="icon icon-ckeditor"/>
                                <span><IntlMessages id="admin.course.table.type"/></span></span>}>
                            {views.map((item) => {
                                return <SubMenu title={item.name}>
                                    {item.courses.map(subItem => {
                                        return <Menu.Item key={subItem.id}>
                                            <Link to="/register">
                                                {subItem.name}
                                            </Link>
                                        </Menu.Item>
                                    })}
                                </SubMenu>
                            })}
                        </SubMenu>
                        <Menu.Item key="/schedule">
                            <Link to="/schedule">
                                <i className="icon icon-hotel-booking"/>
                                <span><IntlMessages id="sidebar.managerStudy.schedule"/></span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </CustomScrollbars>
            </div>
        </>
    );
};

SidebarContent.propTypes = {};

export default SidebarContent;

