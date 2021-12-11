import React from "react";
import {Button, Form, Input, Select} from "antd";
import {Link, useHistory} from "react-router-dom";
import moment from 'moment';

import {useDispatch} from "react-redux";
import {userSignUp} from "../appRedux/actions";

import IntlMessages from "util/IntlMessages";
import {getGender, getImageURL} from "../util/ParseUtils";

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onFinish = member => {
        member = {
            ...member,
            dob: moment().unix() * 1000,
            type: "student",
            image: null
        }
        dispatch(userSignUp(member, history));
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
                            <h1><IntlMessages id="app.userAuth.signUp"/></h1>
                            <a href="/home" style={{color: "#ffffff"}}><IntlMessages id="sidebar.home"/></a>
                        </div>
                        <div className="gx-app-logo">
                            <img alt="logo" src={getImageURL("logo.png")}/>
                        </div>
                    </div>

                    <div className="gx-app-login-content">
                        <Form
                            initialValues={{gender: "male"}}
                            name="basic"
                            onFinish={onFinish}
                            className="gx-signin-form gx-form-row0">
                            <Form.Item name="email"
                                      rules={[
                                          {
                                              required: true,
                                              message: <IntlMessages id="admin.user.form.email"/>,
                                              type: "email"
                                          }
                                      ]}>
                                <Input placeholder="Email"/>
                            </Form.Item>
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: <IntlMessages id="admin.user.form.name"/>,
                                    },
                                ]}>
                                <Input placeholder="Name"/>
                            </Form.Item>
                            <Form.Item name="phone_number"
                                       rules={[
                                           {
                                               required: true,
                                               message: <IntlMessages id="admin.user.form.phoneNumber"/>,
                                               pattern: new RegExp("([0-9]{10})"),
                                           },
                                       ]}>
                                <Input placeholder="Phone Number" type={"number"}/>
                            </Form.Item>
                            <Form.Item name="gender"
                                       rules={[
                                           {
                                               required: true,
                                               message: <IntlMessages id="admin.user.form.gender"/>,
                                           },
                                       ]}>
                                <Select>
                                    <Select.Option value="male">{getGender("male")}</Select.Option>
                                    <Select.Option value="female">{getGender("female")}</Select.Option>
                                    <Select.Option value="other">{getGender("other")}</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" className="gx-mb-0" htmlType="submit">
                                    <IntlMessages id="app.userAuth.signUp"/>
                                </Button>
                                <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signin"><IntlMessages
                                id="app.userAuth.signIn"/></Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SignUp;
