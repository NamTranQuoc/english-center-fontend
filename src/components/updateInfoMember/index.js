import React, {useEffect, useState} from "react";
import IntlMessages from "../../util/IntlMessages";
import {Button, Col, DatePicker, Form, Input, Modal, Row, Select} from "antd";
import Image from "../uploadImage";
import {getGender, getImageURL, getRoleCurrent, getStatusV2} from "../../util/ParseUtils";
import {useDispatch, useSelector} from "react-redux";
import {getAllCourse, onHideUpdateMember, updateCurrentMember} from "../../appRedux/actions";
import "./index.css";
import moment from "moment";

const ModalUpdateMember = () => {
    const dispatch = useDispatch();
    const {hasShowUpdateMember, member} = useSelector(({common}) => common);
    const [image, setImage] = useState(null);
    const [urlAvatar, setUrlAvatar] = useState(null);
    const memberType = getRoleCurrent();
    const {courses} = useSelector(({course}) => course);

    useEffect(() => {
        if (courses === []) {
            dispatch(getAllCourse());
        }
        // eslint-disable-next-line
    }, [])

    const getInitValueModal = () => {
        if (member !== null) {
            if (urlAvatar == null) {
                setUrlAvatar(getImageURL(member.avatar));
            }
            if (memberType === "teacher") {
                return {
                    name: member.name,
                    gender: member.gender,
                    phone_number: member.phone_number,
                    email: member.email,
                    dob: moment.unix(member.dob / 1000),
                    address: member.address,
                    course_ids: member.course_ids,
                    status: member.status
                }
            } else if (memberType === "receptionist" || memberType === "admin") {
                return {
                    name: member.name,
                    gender: member.gender,
                    phone_number: member.phone_number,
                    email: member.email,
                    dob: moment.unix(member.dob / 1000),
                    address: member.address,
                    status: member.status
                }
            } else {
                return {
                    name: member.name,
                    gender: member.gender,
                    phone_number: member.phone_number,
                    email: member.email,
                    dob: moment.unix(member.dob / 1000),
                    address: member.address,
                    current_score: member.current_score.total,
                    input_score: member.input_score.total,
                    note: member.note,
                    guardian_relationship: member.guardian.relationship,
                    guardian_phone_number: member.guardian.phone_number,
                    guardian_name: member.guardian.name,
                    status: member.status,
                    nick_name: member.nick_name
                };
            }
        } else {
            return {
                certificateType: "TOEIC",
                gender: "male",
                address: "",
                dob: moment()
            };
        }
    }

    function onSubmit(_member) {
        _member = {
            ..._member,
            _id: member._id,
            dob: _member.dob.unix() * 1000,
            type: memberType,
            avatar: image,
        }
        dispatch(updateCurrentMember(_member));
    }

    return (
        <Modal
            title={<IntlMessages id="admin.user.form.information.title"/>}
            visible={hasShowUpdateMember}
            footer={
                <Button type="primary" form="add-edit-form" htmlType="submit">{<IntlMessages
                    id="admin.user.form.save"/>}</Button>
            }
            onCancel={() => dispatch(onHideUpdateMember())}
            bodyStyle={{overflowY: "scroll", height: "600px"}}
            centered
            width={600}>
            <Form
                onFinish={onSubmit}
                id="add-edit-form"
                initialValues={getInitValueModal()}>
                <Row justify="center">
                    <Col span={12}>
                        <Image setImage={setImage} url={urlAvatar} setUrl={setUrlAvatar} disabled={false}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={memberType !== "student" ? 24 : 12}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.name"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: <IntlMessages id="admin.user.form.name"/>,
                                },
                            ]}>
                            <Input placeholder="Nguyen Van A"/>
                        </Form.Item>
                    </Col>
                    <Col span={12} style={memberType !== "student" ? {display: "none"} : {}}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.nick_name"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="nick_name">
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label={<IntlMessages id="admin.user.student.table.gender"/>}
                                   name="gender"
                                   labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}
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
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<IntlMessages id="admin.categoryCourse.table.status"/>}
                                   name="status"
                                   labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                            <Select disabled={true}>
                                <Select.Option value="active">{getStatusV2("active")}</Select.Option>
                                <Select.Option value="block">{getStatusV2("block")}</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.phoneNumber"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="phone_number"
                            rules={[
                                {
                                    message: <IntlMessages id="admin.user.form.phoneNumber"/>,
                                    pattern: new RegExp("[0-9]{10}"),
                                },
                            ]}>
                            <Input placeholder="0987654321"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.dob"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="dob"
                            rules={[
                                {
                                    required: true,
                                    message: <IntlMessages id="admin.user.form.dob"/>,
                                },
                            ]}>
                            <DatePicker style={{width: "100%"}} format={'DD/MM/YYYY'}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={memberType !== "student" ? {display: "none"} : {}}>
                    <Col span={12}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.input_score"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="input_score">
                            <Input placeholder="0" disabled={true}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.current_score"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="current_score">
                            <Input placeholder="0" disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.email"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="email">
                            <Input placeholder="nguyenvan@gmail.com" disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={memberType !== "student" ? {display: "none"} : {}}>
                    <Col span={8}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.guardian_name"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="guardian_name">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.guardian_phone_number"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="guardian_phone_number"
                            rules={[
                                {
                                    message: <IntlMessages id="admin.user.form.phoneNumber"/>,
                                    pattern: new RegExp("[0-9]{10}"),
                                },
                            ]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.guardian_relationship"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="guardian_relationship">
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={memberType !== "teacher" ? {display: "none"} : {}}>
                    <Col span={24}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.teacher.table.course_ids"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="course_ids">
                            <Select placeholder="Select" mode={"multiple"} disabled={true}>
                                {courses.map(item => {
                                    return <Select.Option value={item._id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={memberType !== "student" ? {display: "none"} : {}}>
                    <Col span={24}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.note"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="note">
                            <Input.TextArea rows={4}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.address"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="address">
                            <Input.TextArea rows={4}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
};

export default ModalUpdateMember;
