import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Drawer,} from "antd";

import SidebarContent from "./SidebarContent";
import {toggleCollapsedSideNav} from "../../appRedux/actions";
import {NAV_STYLE_MINI_SIDEBAR, THEME_TYPE_LITE} from "../../constants/ThemeSetting";

const Sidebar = () => {
    let [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const {themeType, navStyle} = useSelector(({settings}) => settings);
    const navCollapsed = useSelector(({common}) => common.navCollapsed);
    const dispatch = useDispatch();

    const onToggleCollapsedNav = () => {
        dispatch(toggleCollapsedSideNav(!navCollapsed));
    };

    useEffect(() => {
        setSidebarCollapsed(navStyle === NAV_STYLE_MINI_SIDEBAR)
    }, [navStyle])

    return (
        <Drawer
            className={`gx-drawer-sidebar ${themeType !== THEME_TYPE_LITE ? 'gx-drawer-sidebar-dark' : null}`}
            placement="left"
            closable={false}
            onClose={onToggleCollapsedNav}
            visible={navCollapsed}>
            <SidebarContent sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
        </Drawer>
    )
};
export default Sidebar;
