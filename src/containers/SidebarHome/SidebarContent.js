import React from "react";
import {useSelector} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";
import SidebarLogo from "./SidebarLogo";
import CustomScrollbars from "../../util/CustomScrollbars";

const SubMenu = Menu.SubMenu;

const SidebarContent = ({sidebarCollapsed, setSidebarCollapsed}) => {
    const {views} = useSelector(({courseCategory}) => courseCategory);
    const pathname = useSelector(({common}) => common.pathname);

    return (
        <>
            <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
            <div className="gx-sidebar-content" style={{marginTop: "30px"}}>
                <CustomScrollbars className="gx-layout-sider-scrollbar">
                    <Menu
                        defaultOpenKeys={["/home"]}
                        selectedKeys={[pathname]}
                        theme={'lite'}
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
                        <Menu.Item key="/home/schedule">
                            <Link to="/home/schedule">
                                <i className="icon icon-hotel-booking"/>
                                <span><IntlMessages id="sidebar.managerStudy.schedule"/></span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/home/document">
                            <Link to="/home/document">
                                <i className="icon icon-folder-o"/>
                                <span><IntlMessages id="sidebar.home.document"/></span>
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

