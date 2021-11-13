import IntlMessages from "../../../util/IntlMessages";
import {Button, Col, Form, Input, Modal, Row} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux"
import {resetPassword} from "../../../appRedux/actions";

const ResetPassword = (props) => {
    const dispatch = useDispatch();
    const {items} = useSelector(({getList}) => getList);
    const {selectIndex} = useSelector(({common}) => common);

    const onSubmit = (param) => {
        param = {
            ...param,
            username: items[selectIndex].email
        }
        dispatch(resetPassword(param));
        props.showModal();
    }

    return (
        <Modal
            title={<IntlMessages id="admin.user.form.resetPassword"/>}
            visible={props.hasShowModal}
            footer={
                <Button type="primary" form="reset-form" htmlType="submit">{<IntlMessages
                    id="admin.user.form.reset"/>}</Button>
            }
            onCancel={props.showModal}
            centered
            width={300}>
            <Form
                onFinish={onSubmit}
                id="reset-form">
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.newPassword"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            rules={[
                                {
                                    required: true,
                                    message: <IntlMessages id="admin.user.form.password"/>,
                                },
                            ]}
                            name="newPassword">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default ResetPassword;
