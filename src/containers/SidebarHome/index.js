import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Drawer,} from "antd";

import SidebarContent from "./SidebarContent";
import {toggleCollapsedSideNav} from "../../appRedux/actions";
import {NAV_STYLE_MINI_SIDEBAR} from "../../constants/ThemeSetting";

const Sidebar = () => {
    let [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const {navStyle} = useSelector(({settings}) => settings);
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
            className={`gx-drawer-sidebar`}
            placement="left"
            closable={false}
            onClose={onToggleCollapsedNav}
            visible={navCollapsed}>
            <SidebarContent sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
        </Drawer>
    )
};
export default Sidebar;
