import React, {useEffect} from "react";
import {Button, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";

import {userSignIn,} from "../appRedux/actions";

import IntlMessages from "util/IntlMessages";
import {getImageURL, getRoleCurrent} from "../util/ParseUtils";

const SignIn = () => {
    const dispatch = useDispatch();
    const {authUser} = useSelector(({auth}) => auth);
    const history = useHistory();

    useEffect(() => {
        if (authUser !== null) {
            const role = getRoleCurrent();
            if (role === "admin" || role === "receptionist") {
                history.push("/admin/dashboard");
            } else {
                history.push("/home");
            }
        }
    });

    const onFinish = values => {
        dispatch(userSignIn(values));
    };

    return (
        <div className="gx-app-login-wrap">
            <div className="gx-app-login-container">
                <div className="gx-app-login-main-content">
                    <div className="gx-app-logo-content">
                        <div className="gx-app-logo-content-bg">
                            {/*<img src={"https://via.placeholder.com/272x395"} alt='Neature'/>*/}
                        </div>
                        <div className="gx-app-logo-wid">
                            <h1><IntlMessages id="app.userAuth.signIn"/></h1>
                            <a href="/home" style={{color: "#fdfdfd"}}><IntlMessages id="sidebar.home"/></a>
                        </div>
                        <div className="gx-app-logo">
                            <img alt="logo" src={getImageURL("logo.png")}/>
                        </div>
                    </div>
                    <div className="gx-app-login-content">
                        <Form
                            initialValues={{remember: true}}
                            name="basic"
                            onFinish={onFinish}
                            className="gx-signin-form gx-form-row0">

                            <Form.Item
                                rules={[{required: true, message: <IntlMessages id="admin.user.form.email"/>}]} name="email">
                                <Input placeholder="Email"/>
                            </Form.Item>
                            <Form.Item
                                rules={[{required: true, message: <IntlMessages id="admin.user.form.password"/>}]} name="password">
                                <Input type="password" placeholder="Password"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" className="gx-mb-0" htmlType="submit">
                                    <IntlMessages id="app.userAuth.signIn"/>
                                </Button>
                                <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signup"><IntlMessages
                                id="app.userAuth.signUp"/></Link>
                            </Form.Item>
                            <Form.Item name="forgetPassword">
                                <Link className="gx-login-form-forgot"
                                      to="/request_forget_password">
                                    <IntlMessages id="login.forgot.password"/>
                                </Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
