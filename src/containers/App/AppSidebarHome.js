import React from "react";
import {
    NAV_STYLE_DRAWER,
    NAV_STYLE_FIXED,
    NAV_STYLE_MINI_SIDEBAR,
    NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
    NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
    TAB_SIZE
} from "../../constants/ThemeSetting";
import {useSelector} from "react-redux";
import Sidebar from "../SidebarHome";

const SIDEBAR_VISIBLE_ON = [NAV_STYLE_FIXED, NAV_STYLE_DRAWER, NAV_STYLE_MINI_SIDEBAR, NAV_STYLE_NO_HEADER_MINI_SIDEBAR, NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR];

const AppSidebar = ({navStyleHome}) => {
    const width = useSelector(({common}) => common.width);

    if (width < TAB_SIZE || SIDEBAR_VISIBLE_ON.includes(navStyleHome)) {
        return <Sidebar/>;
    }

    return null;
};

export default React.memo(AppSidebar);
