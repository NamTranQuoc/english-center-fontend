import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {hideMessage, showLoader, userSignUp,} from "../../appRedux/actions";
import IntlMessages from "../../util/IntlMessages";

const FormItem = Form.Item;

function SignUp(props) {
    function handleSubmit() {
        // this.props.form.validateFields((err, values) => {
        //   if (!err) {
        //     this.props.showLoader();
        //     this.props.userSignUp(values);
        //   }
        // });
    }

    return (
        <div className="gx-app-login-wrap" style={{height: "100vh"}}>
            <div className="gx-app-login-container">
                <div className="gx-app-login-main-content">
                    <div className="gx-app-logo-content">
                        <div className="gx-app-logo-content-bg">
                            <img src='https://via.placeholder.com/272x395' alt='Neature'/>
                        </div>
                        <div className="gx-app-logo-wid">
                            <h1><IntlMessages id="app.userAuth.signUp"/></h1>
                            <p><IntlMessages id="app.userAuth.bySigning"/></p>
                            <p><IntlMessages id="app.userAuth.getAccount"/></p>
                        </div>
                        <div className="gx-app-logo">
                            <img alt="example"
                                 src="https://firebasestorage.googleapis.com/v0/b/englishcenter-2021.appspot.com/o/images%2Flogo.png?alt=media&token=e32f70cd-77f2-469b-b98a-1bd4c56bb3e9"/>
                        </div>
                    </div>

                    <div className="gx-app-login-content">
                        <Form className="gx-signup-form gx-form-row0">
                            <FormItem>
                                {props.form.getFieldDecorator('userName', {
                                    rules: [{required: true, message: 'Please input your username!'}],
                                })(
                                    <Input placeholder="Username"/>
                                )}
                            </FormItem>

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
                                <span className="gx-link gx-signup-form-forgot"><IntlMessages
                                    id="appModule.termAndCondition"/></span>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" className="gx-mb-0" onClick={handleSubmit}>
                                    <IntlMessages id="app.userAuth.signUp"/>
                                </Button>
                                <span><IntlMessages id="app.userAuth.or"/></span>
                                <Link to="/signin"><IntlMessages id="app.userAuth.signIn"/></Link>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        </div>

    );
}

const WrappedSignUpForm = Form.create()(SignUp);

const mapStateToProps = ({auth}) => {
    const {alertMessage, showMessage, authUser} = auth;
    return {alertMessage, showMessage, authUser}
};

export default connect(mapStateToProps, {
    userSignUp,
    hideMessage,
    showLoader
})(WrappedSignUpForm);
