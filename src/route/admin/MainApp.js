import React from "react";
import {Layout} from "antd";
import Sidebar from "../../components/Sidebar/index";
import Topbar from "../../components/Topbar/index";
import {footerText} from "../../util/config";
import App from "../../route/admin";

const {Content, Footer} = Layout;

function MainApp() {
    return (
        <Layout className="gx-app-layout">
            <Sidebar/>
            <Layout>
                <Topbar/>
                <Content className="gx-layout-content">
                    <App/>
                    <Footer>
                        <div className="gx-layout-footer-content">
                            {footerText}
                        </div>
                    </Footer>
                </Content>
            </Layout>
        </Layout>
    );
}

export default MainApp;

