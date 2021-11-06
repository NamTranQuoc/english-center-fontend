import React from "react";
import {connect} from "react-redux";
import {Layout} from "antd";

import SidebarContent from "./SidebarContent";

const {Sider} = Layout;

function Sidebar(props) {
    return (
        <Sider collapsed={props.navCollapsed} className="gx-layout-sider-dark">
            <SidebarContent/>
        </Sider>
    );
}

const mapStateToProps = ({settings}) => {
    const {locale, navCollapsed} = settings;
    return {navCollapsed, locale};
};
export default connect(mapStateToProps, {})(Sidebar);
