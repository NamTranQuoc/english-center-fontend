import React from "react";
import IntlMessages from "../../util/IntlMessages";
import {Button, Col, Form, Input, Modal, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {changePassword, onHideChangePassword} from "../../appRedux/actions";
import "./index.css";

const ModalChangePassword = () => {
    const dispatch = useDispatch();
    const {hasShowChangePassword} = useSelector(({common}) => common);

    function onSubmit(values) {
        dispatch(changePassword(values));
    }

    return (
        <Modal
            title={<IntlMessages id="admin.user.form.information.title"/>}
            visible={hasShowChangePassword}
            footer={
                <Button type="primary" form="add-edit-form" htmlType="submit">{<IntlMessages
                    id="admin.user.form.save"/>}</Button>
            }
            onCancel={() => dispatch(onHideChangePassword())}
            centered
            width={400}>
            <Form
                onFinish={onSubmit}
                id="add-edit-form">
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.oldPassword"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="oldPassword"
                            rules={[
                                {
                                    required: true,
                                    message: <IntlMessages id="admin.user.form.password"/>,
                                },
                            ]}>
                            <Input type={"password"}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.newPassword"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: <IntlMessages id="admin.user.form.password"/>,
                                },
                            ]}>
                            <Input type={"password"}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.confirmPassword"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: <IntlMessages id="admin.user.form.password"/>,
                                },
                            ]}>
                            <Input type={"password"}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
};

export default ModalChangePassword;
