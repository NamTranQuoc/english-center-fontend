import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Menu} from "antd";
import {THEME_TYPE_LITE} from "../../constants/ThemeSetting";
import {Link} from "react-router-dom";
import {viewCourseCategory} from "../../appRedux/actions";
import IntlMessages from "../../util/IntlMessages";

const SubMenu = Menu.SubMenu;

const SidebarContent = () => {
    const dispatch = useDispatch();
    const {themeType} = useSelector(({settings}) => settings);
    const {views} = useSelector(({courseCategory}) => courseCategory);

    useEffect(() => {
        dispatch(viewCourseCategory());
        // eslint-disable-next-line
    }, [])

    console.log("fasdfasd");
    return (
        <Menu mode="horizontal"
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              style={{minWidth: '700px'}}>
                <Menu.Item key="/home">
                    <Link to="/home">
                        <IntlMessages id="sidebar.home"/>
                    </Link>
                </Menu.Item>
                <SubMenu key="SubMenu" title={<IntlMessages id="admin.course.table.type"/>}>
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
                <Menu.Item key="/schedule">
                    <Link to="/schedule">
                        <IntlMessages id="sidebar.managerStudy.schedule"/>
                    </Link>
                </Menu.Item>
        </Menu>
    );
};

SidebarContent.propTypes = {};

export default SidebarContent;

