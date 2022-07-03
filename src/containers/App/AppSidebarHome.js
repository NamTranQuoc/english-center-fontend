import React from "react";
import Sidebar from "../SidebarHome";
import Navigation from "../../routes/user/landingPage/subItem/navigation";

const AppSidebar = ({navStyle}) => {
    return <Navigation/>;
};

export default React.memo(AppSidebar);
