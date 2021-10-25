import React from "react";

function Sidebar() {
    const pathName = window.location.pathname;
    return (
        <div className="main-sidebar">
            <aside id="sidebar-wrapper">
                <div className="sidebar-brand">
                    <a href="index.html">Stisla</a>
                </div>
                <div className="sidebar-brand sidebar-brand-sm">
                    <a href="index.html">St</a>
                </div>
                <ul className="sidebar-menu">
                    <li className="menu-header">Thống kê</li>
                    <li className={pathName === "/admin/dashboard" ? "active" : ""}>
                        <a href="/admin/dashboard" className="nav-link no-dropdown">
                            <i className="fas fa-fire"/>
                            <span>Tổng quan</span>
                        </a>
                    </li>
                    <li className={pathName === "/admin/abc" ? "active" : ""}>
                        <a href="/admin/abc" className="nav-link no-dropdown">
                            <i className="fas fa-fire"/>
                            <span>Xuất báo cáo</span>
                        </a>
                    </li>
                    <li className="menu-header">Quản lý người dùng</li>
                    <li
                        className={pathName === "/admin/student" ? "active" : ""}
                    >
                        <a href="/admin/student" className="nav-link no-dropdown">
                            <i className="fas fa-fire"/>
                            <span>Học viên</span>
                        </a>
                    </li>
                    <li
                        className={pathName === "/admin/teacher" ? "active" : ""}
                    >
                        <a href="/admin/teacher" className="nav-link no-dropdown">
                            <i className="fas fa-fire"/>
                            <span>Giảng viên</span>
                        </a>
                    </li>
                    <li
                        className={pathName === "/admin/receptionist" ? "active" : ""}
                    >
                        <a href="/admin/receptionist" className="nav-link no-dropdown">
                            <i className="fas fa-fire"/>
                            <span>Nhân viên</span>
                        </a>
                    </li>
                    <li className="menu-header">Quản lý học vụ</li>
                    <li
                        className={pathName === "/admin/category/course" ? "active" : ""}
                    >
                        <a href="/admin/category/course" className="nav-link no-dropdown">
                            <i className="fas fa-fire"/>
                            <span>Loại khóa học</span>
                        </a>
                    </li>
                    <li
                        className={pathName === "/admin/course" ? "active" : ""}
                    >
                        <a href="/admin/course" className="nav-link no-dropdown">
                            <i className="fas fa-fire"/>
                            <span>Khóa học</span>
                        </a>
                    </li>
                </ul>
            </aside>
        </div>
    );
}

export default Sidebar;
