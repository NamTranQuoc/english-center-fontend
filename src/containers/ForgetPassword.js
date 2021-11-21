import React from "react";
import {Button, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";

import IntlMessages from "util/IntlMessages";
import {getImageURL} from "../util/ParseUtils";
import {forgetPassword} from "../appRedux/actions";
import {useHistory} from "react-router-dom";

const ForgetPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const pathname = useSelector(({common}) => common.pathname);

    const onFinish = values => {
        const token = pathname.substring(17);
        values = {
            ...values,
            token: token
        }
        dispatch(forgetPassword(values, history));
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
                            <h1><IntlMessages id="title.forgot.password"/></h1>
                            <a href="/home" style={{color: "#fdfdfd"}}><IntlMessages id="sidebar.home"/></a>
                        </div>
                        <div className="gx-app-logo">
                            <img alt="logo" src={getImageURL("logo.png")}/>
                        </div>
                    </div>
                    <div className="gx-app-login-content">
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            className="gx-signin-form gx-form-row0">

                            <Form.Item
                                rules={[{required: true, message: 'Please input your Password!'}]} name="password">
                                <Input type="password" placeholder="Password"/>
                            </Form.Item>
                            <Form.Item
                                rules={[{required: true, message: 'Please input confirm Password!'}]} name="confirmPassword">
                                <Input type="Password" placeholder="Confirm Password"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" className="gx-mb-0" htmlType="submit">
                                    <IntlMessages id="admin.user.form.reset"/>
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
