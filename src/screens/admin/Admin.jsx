import React, {useState} from "react";
import 'antd/dist/antd.css';
import '../../css/Admin.css';
import {Layout, Menu} from 'antd';
import {TeamOutlined,} from '@ant-design/icons';
import {Link} from "react-router-dom";
import ManagerStudents from "../../screens/admin/student/ManagerStudents";
import Dashboard from "./dashboard/Dashboard";
import ManagerTeacher from "../../screens/admin/teacher/ManagerTeacher";
import ManagerReceptionist from "../../screens/admin/receptionist/ManagerReceptionist";
import ManagerCategoryCourse from "../../screens/admin/category.course/ManagerCategoryCourse";
import ManagerCourse from "../../screens/admin/course/ManagerCourse";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const items = [
    {
        label: "QUẢN LÝ NGƯỜI DÙNG", child: [
            {
                key: "1", label: "Học viên", path: "/admin/student", content: <ManagerStudents/>
            },
            {
                key: "2", label: "Giảng viên", path: "/admin/teacher", content: <ManagerTeacher/>
            },
            {
                key: "3", label: "Nhân viên", path: "/admin/receptionist", content: <ManagerReceptionist/>
            }
        ]
    },
    {
        label: "QUẢN LÝ HỌC VỤ", child: [
            {
                key: "4", label: "Loại khóa học", path: "/admin/category-course", content: <ManagerCategoryCourse/>
            },
            {
                key: "5", label: "Khóa học", path: "/admin/course", content: <ManagerCourse/>
            }
        ]
    },
]

function Admin() {
    const [collapse, setCollapse] = useState(true);
    const [selectedKey, setSelectedKey] = useState("0");
    const [content, setContent] = useState(<Dashboard/>);

    function onClickMenu(item) {
        setSelectedKey(item.key);
        if (item.key !== "0") {
            for (let i = 0; i < items.length; i++) {
                for (let j = 0; j < items[i].child.length; j++) {
                    if (item.key === items[i].child[j].key) {
                        setContent(items[i].child[j].content);
                        break;
                    }
                }
            }
        } else {
            console.log(item.key);
            setContent(<Dashboard/>);
        }
    }

    function onCollapse() {
        setCollapse(!collapse);
    }

    return (
        <Layout style={{minHeight: "100vh"}}>
            <Sider collapsible onCollapse={onCollapse} mode="inline" width={250} breakpoint="lg">
                <div className="logo"/>
                <Menu theme="dark"
                      defaultSelectedKeys={['/']}
                      selectedKeys={[selectedKey]}
                      mode="inline"
                      onClick={onClickMenu}>
                    <Menu.Item key="0" icon={<TeamOutlined/>}>
                        <Link to="/admin/dashboard">
                            <span>TỔNG QUAN</span>
                        </Link>
                    </Menu.Item>
                    {items.map((item) => (
                        <SubMenu icon={<TeamOutlined/>} title={item.label}>
                            {item.child.map((subItem) => (
                                <Menu.Item key={subItem.key}>
                                    <Link to={subItem.path}>
                                        <span>{subItem.label}</span>
                                    </Link>
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Header>Header</Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {content}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}

export default Admin;
