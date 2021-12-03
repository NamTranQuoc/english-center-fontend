import React, {useEffect} from "react";
import {Layout} from "antd";
import {useDispatch} from "react-redux";
import InsideHeader from "../Topbar/InsideHeader/index";
import {footerText} from "../../util/config";
import App from "../../routes/user";
import {updateWindowWidth} from "../../appRedux/actions";

const {Content, Footer} = Layout;

const MainApp = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('resize', () => {
            dispatch(updateWindowWidth(window.innerWidth));
        })
    }, [dispatch]);

    return (
        <Layout className="gx-app-layout">
            <InsideHeader/>
            <Layout>
                <Content className={`gx-layout-content gx-container-wrap`}>
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

