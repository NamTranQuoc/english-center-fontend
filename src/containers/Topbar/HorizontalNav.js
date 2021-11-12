import React from "react";
import {useSelector} from "react-redux";
import {Menu} from "antd";
import IntlMessages from "../../util/IntlMessages";
import {
    NAV_STYLE_ABOVE_HEADER,
    NAV_STYLE_BELOW_HEADER,
    NAV_STYLE_DEFAULT_HORIZONTAL,
    NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";

const SubMenu = Menu.SubMenu;

const HorizontalNav = () => {
    const navStyleHome = useSelector(({settings}) => settings.navStyleHome);
    const pathname = useSelector(({common}) => common.pathname);

    const getNavStyleSubMenuClass = (navStyle) => {
        switch (navStyle) {
            case NAV_STYLE_DEFAULT_HORIZONTAL:
                return "gx-menu-horizontal gx-submenu-popup-curve";
            case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
                return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
            case NAV_STYLE_BELOW_HEADER:
                return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
            case NAV_STYLE_ABOVE_HEADER:
                return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
            default:
                return "gx-menu-horizontal";
        }
    };

    const selectedKeys = pathname;
    return (
        <Menu
            defaultOpenKeys={[selectedKeys]}
            selectedKeys={[selectedKeys]}
            mode="horizontal">
            <SubMenu className={getNavStyleSubMenuClass(navStyleHome)} key="/home" title={<IntlMessages id="sidebar.home"/>}>
            </SubMenu>
        </Menu>
    );
};

HorizontalNav.propTypes = {};

export default HorizontalNav;

