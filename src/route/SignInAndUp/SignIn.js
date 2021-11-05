import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {hideLoader, hideMessage, showLoader, userSignIn, userSignInSuccess,} from "../../appRedux/actions";
import IntlMessages from "../../util/IntlMessages";

const FormItem = Form.Item;

function SignIn(props) {
    function handleSubmit() {
        props.form.validateFields((err, values) => {
            if (!err) {
                props.userSignIn(values);
            }
        });
    }

    return (
        <div className="gx-app-login-wrap" style={{height: "100vh"}}>
            <div className="gx-app-login-container">
                <div className="gx-app-login-main-content">
                    <div className="gx-app-logo-content">
                        <div className="gx-app-logo-content-bg">
                            <img src="https://via.placeholder.com/272x395" alt='Neature'/>
                        </div>
                        <div className="gx-app-logo-wid">
                            <h1><IntlMessages id="app.userAuth.signIn"/></h1>
                            <p><IntlMessages id="app.userAuth.bySigning"/></p>
                            <p><IntlMessages id="app.userAuth.getAccount"/></p>
                        </div>
                        <div className="gx-app-logo">
                            <img alt="example"
                                 src="https://firebasestorage.googleapis.com/v0/b/englishcenter-2021.appspot.com/o/images%2Flogo.png?alt=media&token=e32f70cd-77f2-469b-b98a-1bd4c56bb3e9"/>
                        </div>
                    </div>
                    <div className="gx-app-login-content">
                        <Form className="gx-signin-form gx-form-row0">

                            <FormItem>
                                {props.form.getFieldDecorator('email', {
                                    rules: [{
                                        required: true, type: 'email', message: 'The input is not valid E-mail!',
                                    }],
                                })(
                                    <Input placeholder="Email"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {props.form.getFieldDecorator('password', {
                                    rules: [{required: true, message: 'Please input your Password!'}],
                                })(
                                    <Input type="password" placeholder="Password"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {props.form.getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox><IntlMessages id="appModule.iAccept"/></Checkbox>
                                )}
                                <span className="gx-signup-form-forgot gx-link"><IntlMessages
                                    id="appModule.termAndCondition"/></span>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" className="gx-mb-0" onClick={handleSubmit}>
                                    <IntlMessages id="app.userAuth.signIn"/>
                                </Button>
                                <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signup"><IntlMessages
                                id="app.userAuth.signUp"/></Link>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

const WrappedNormalLoginForm = Form.create()(SignIn);

const mapStateToProps = ({auth, common}) => {
    const {authUser} = auth;
    const {alertMessage, showMessage} = common;
    return {alertMessage, showMessage, authUser}
};

export default connect(mapStateToProps, {
    userSignIn,
    hideMessage,
    hideLoader,
    showLoader,
    userSignInSuccess,
})(WrappedNormalLoginForm);
