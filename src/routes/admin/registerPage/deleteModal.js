import IntlMessages from "../../../util/IntlMessages";
import {Button, Col, Form, Input, Modal, Row, Select} from "antd";
import React from "react";
import {getStatusV2} from "../../../util/ParseUtils";
import {useDispatch, useSelector} from "react-redux";
import {deleteRegister} from "../../../appRedux/actions";

const DeleteModal = (props) => {
    const dispatch = useDispatch();
    const {items} = useSelector(({getList}) => getList);
    const {hasShowModal, selectIndex} = useSelector(({common}) => common);

    const data = items.map((item) =>{
        return {
            ...item.member,
            ...item.register,
        }
    })
    const onSubmit = () => {
        dispatch(deleteRegister(data[selectIndex]._id, items[selectIndex].class_id, props.param));
    }
    return (
        <Modal
            title={<IntlMessages id="admin.user.form.student.title"/>}
            visible={hasShowModal && props.action === "delete"}
            footer={
                <>
                    <Button onClick={props.showModal}>{<IntlMessages id="admin.user.form.cancel"/>}</Button>
                    <Button type="primary" form="add-edit-form" htmlType="submit">{<IntlMessages id="admin.user.form.delete"/>}</Button>
                </>
            }
            onCancel={props.showModal}
            bodyStyle={{height: "200px"}}
            centered
            width={600}>
            <Form
                onFinish={onSubmit}
                id="add-edit-form"
                initialValues={props.getInitValueModal()}
            >
                <Row>
                    <Col span={24}>
                        <Form.Item label={<IntlMessages id="admin.categoryCourse.table.EmailPhoneCode"/>}
                                   name="student_id"
                                   labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={<IntlMessages id="admin.categoryCourse.table.statusPayment"/>}
                                   name="status"
                                   labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                            <Select disabled={true}>
                                <Select.Option value="unpaid">{getStatusV2("unpaid")}</Select.Option>
                                <Select.Option value="paid">{getStatusV2("paid")}</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default DeleteModal;
