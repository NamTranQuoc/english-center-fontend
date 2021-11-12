import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Layout} from "antd";

import SidebarContent from "./SidebarContent";
import {
    NAV_STYLE_DRAWER,
    NAV_STYLE_FIXED,
    NAV_STYLE_MINI_SIDEBAR,
    NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
    NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
    TAB_SIZE,
    THEME_TYPE_LITE
} from "../../constants/ThemeSetting";

const {Sider} = Layout;

const Sidebar = () => {
    let [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const {themeType, navStyleHome} = useSelector(({settings}) => settings);
    const width = useSelector(({common}) => common.width);

    useEffect(() => {
        setSidebarCollapsed(navStyleHome === NAV_STYLE_MINI_SIDEBAR)
    }, [navStyleHome])

    let drawerStyle = "gx-collapsed-sidebar";

    if (navStyleHome === NAV_STYLE_FIXED) {
        drawerStyle = "";
    } else if (navStyleHome === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
        drawerStyle = "gx-mini-sidebar gx-mini-custom-sidebar";
    } else if (navStyleHome === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
        drawerStyle = "gx-custom-sidebar"
    } else if (navStyleHome === NAV_STYLE_MINI_SIDEBAR) {
        drawerStyle = "gx-mini-sidebar";
    } else if (navStyleHome === NAV_STYLE_DRAWER) {
        drawerStyle = "gx-collapsed-sidebar"
    }
    if ((navStyleHome === NAV_STYLE_FIXED || navStyleHome === NAV_STYLE_MINI_SIDEBAR
        || navStyleHome === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) && width < TAB_SIZE) {
        drawerStyle = "gx-collapsed-sidebar"
    }

    return (
        <Sider
            className={`gx-app-sidebar ${drawerStyle} ${themeType !== THEME_TYPE_LITE ? 'gx-layout-sider-dark' : null}`}
            trigger={null}
            collapsed={(width < TAB_SIZE ? false : sidebarCollapsed || navStyleHome === NAV_STYLE_NO_HEADER_MINI_SIDEBAR)}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            collapsible>
            <SidebarContent sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
        </Sider>)
};
export default Sidebar;
