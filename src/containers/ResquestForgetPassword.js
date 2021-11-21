import React from "react";
import {Button, Form, Input} from "antd";
import {useDispatch} from "react-redux";

import IntlMessages from "util/IntlMessages";
import {getImageURL} from "../util/ParseUtils";
import {requestForgetPassword} from "../appRedux/actions";
import {useHistory} from "react-router-dom";

const RequestForgetPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onFinish = values => {
        dispatch(requestForgetPassword(values.email, history));
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
                            <h1><IntlMessages id="login.forgot.password"/></h1>
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
                                rules={[{required: true, message: 'The input is not valid E-mail!'}]} name="email">
                                <Input placeholder="Email"/>
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

export default RequestForgetPassword;
