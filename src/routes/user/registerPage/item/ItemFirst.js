import React, {useState} from "react";
import {Button, Col, Form, Input, Modal, Row, Select} from "antd";
import IntlMessages from "util/IntlMessages";
import {getDate, getDOW, getMemberIdCurrent, getTimeOfShift} from "../../../../util/ParseUtils";
import {useDispatch, useSelector} from "react-redux";
import {addRegister, showMessage} from "../../../../appRedux/actions";

const PriceItem = (props) => {
    const dispatch = useDispatch();
    const item = props.props;
    const {shifts} = useSelector(({shift}) => shift);
    const {authUser} = useSelector(({auth}) => auth);
    const [hasShowModal, setHasShowModal] = useState(false);
    const MyDOW = [2, 3, 4, 5, 6, 7, 1];

    function getDow(dow) {
        const length = dow.length;
        return dow.map((item, index) => {
            return  <IntlMessages id={`admin.class.dow.${item}`}>
                {placeholder => placeholder + (length - 1 === index ? "" : " - ") }
            </IntlMessages>
        });
    }

    function showModal() {
        setHasShowModal(!hasShowModal);
    }

    function onRegister() {
        if (authUser === null) {
            dispatch(showMessage("please_login"));
        } else {
            const values = {
                student_id: getMemberIdCurrent(),
                status: "unpaid",
                class_id: item._id,
            }
            dispatch(addRegister(values))
        }
        setHasShowModal(!hasShowModal);
    }

    const getInitValueModal = () => {
        return {
            name: item.name,
            opening: getDate(item.start_date),
            schedule: item.dow,
            time: getTimeOfShift(shifts, item.shift_id),
            quantity: item.max_student,
        };
    }

    const modal = () => (<Modal
        title={<IntlMessages id="admin.user.form.class.title"/>}
        visible={hasShowModal}
        footer={
            <Button type="primary" form="add-edit-form" htmlType="submit">{<IntlMessages
                id="admin.user.form.registerExam"/>}</Button>
        }
        onCancel={showModal}
        centered
        width={650}>
        <Form
            onFinish={onRegister}
            id="add-edit-form"
            initialValues={getInitValueModal()}>
            <Row>
                <Col span={24}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.class.table.name"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="name">
                        <Input disabled={true}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.course.table.opening"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="opening">
                        <Input disabled={true}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.course.table.schedule"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="schedule"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.dow"/>,
                            },
                        ]}>
                        <Select placeholder={"Select"} mode={"multiple"} disabled={true}>
                            {MyDOW.map(item => {
                                return <Select.Option value={item}>{getDOW(item)}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.course.table.time"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="time">
                        <Input disabled={true}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.course.table.quantity"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="quantity">
                        <Input disabled={true}/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>);

    return (
        <div className="gx-package">
            <div className="gx-package-header gx-bg-yellow gx-text-black">
                <h2 className="gx-letter-spacing-base gx-text-white gx-text-uppercase gx-mb-0"
                    style={{fontSize: "25px"}}>
                    <b>{item.name}</b>
                </h2>
            </div>
            <div className="gx-package-body">
                <ul className="gx-package-items" style={{lineHeight: "2"}}>
                    <li>
                        <i className="icon icon-hotel-booking"/>
                        <span><IntlMessages
                            id="admin.course.table.opening"/>: <b>{getDate(item.start_date)}</b></span>
                    </li>
                    <li>
                        <i className="icon icon-datepicker"/>
                        <span><IntlMessages id="admin.course.table.schedule"/>: <b>{getDow(item.dow)}</b></span>
                    </li>
                    <li>
                        <i className="icon icon-schedule"/>
                        <span><IntlMessages id="admin.course.table.time"/>: <b>{getTimeOfShift(shifts, item.shift_id)}</b></span>
                    </li>
                    <li>
                        <i className="icon icon-user"/>
                        <span><IntlMessages id="admin.course.table.quantity"/>: <b>{item.max_student}</b></span>
                    </li>
                </ul>
                <div className="gx-package-footer">
                    <Button type="primary" className="gx-btn-block" onClick={() => {showModal()}}>
                        <IntlMessages id="admin.user.form.register"/>
                    </Button>
                </div>
            </div>
            {hasShowModal && modal()}
        </div>
    )
};

export default PriceItem;

