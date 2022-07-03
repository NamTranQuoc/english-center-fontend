import React, {useEffect} from "react";
import {Layout} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {footerText} from "../../util/config";
import App from "../../routes/user";
import {updateWindowWidth} from "../../appRedux/actions";
import AppSidebar from "./AppSidebarHome";

const {Content, Footer} = Layout;

const MainApp = () => {
    const dispatch = useDispatch();
    const {navStyleHome} = useSelector(({settings}) => settings);

    useEffect(() => {
        window.addEventListener('resize', () => {
            dispatch(updateWindowWidth(window.innerWidth));
        })
    }, [dispatch]);

    return (
        <Layout className="gx-app-layout">
            <AppSidebar navStyle={navStyleHome}/>
            <Layout>
                <Content className={`gx-layout-content gx-container-wrap`} style={{marginTop: 80}}>
                    <App/>
                    <Footer>
                        <div className="gx-layout-footer-content">
                            {footerText}
                        </div>
                    </Footer>
                </Content>
            </Layout>
        </Layout>
    )
};


export default MainApp;

