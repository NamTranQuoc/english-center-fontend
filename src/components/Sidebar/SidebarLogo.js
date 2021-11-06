import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {toggleCollapsedSideNav} from "../../appRedux/actions";


class SidebarLogo extends Component {

    render() {
        const {navCollapsed} = this.props;
        return (
            <div className="gx-layout-sider-header">
                <div className="gx-linebar">
                    <i
                        className={`gx-icon-btn icon icon-${navCollapsed ? 'menu-unfold' : 'menu-fold'} 'gx-text-black'`}
                        onClick={() => {
                            this.props.toggleCollapsedSideNav(!navCollapsed)
                        }}
                    />
                </div>
                <Link to="/admin/dashboard" className="gx-site-logo">
                    <img alt="logo"
                         src="https://firebasestorage.googleapis.com/v0/b/englishcenter-2021.appspot.com/o/images%2Flogo.png?alt=media&token=e32f70cd-77f2-469b-b98a-1bd4c56bb3e9"/>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = ({settings}) => {
    const {navStyle, themeType, width, navCollapsed} = settings;
    return {navStyle, themeType, width, navCollapsed}
};

export default connect(mapStateToProps, {
    toggleCollapsedSideNav
})(SidebarLogo);
