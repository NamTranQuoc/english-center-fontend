import React, {useState} from "react";
import IntlMessages from "../../util/IntlMessages";
import {Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select} from "antd";
import Image from "../uploadImage";
import {getGender, getImageURL, getMoney, getRoleCurrent} from "../../util/ParseUtils";
import {useDispatch, useSelector} from "react-redux";
import {onHideUpdateMember, updateCurrentMember} from "../../appRedux/actions";
import "./index.css";
import moment from "moment";

const ModalUpdateMember = () => {
    const dispatch = useDispatch();
    const {hasShowUpdateMember, member} = useSelector(({common}) => common);
    const [image, setImage] = useState(null);
    const [urlAvatar, setUrlAvatar] = useState(null);
    const memberType = getRoleCurrent();


    const getInitValueModal = () => {
        if (member !== null) {
            if (urlAvatar == null) {
                setUrlAvatar(getImageURL(member.avatar));
            }
            if (memberType === "teacher") {
                return {
                    certificateType: member.certificate.type,
                    certificateCode: member.certificate.code,
                    certificateScore: member.certificate.score,
                    name: member.name,
                    gender: member.gender,
                    phone_number: member.phone_number,
                    email: member.email,
                    dob: moment.unix(member.dob / 1000),
                    address: member.address,
                    salary: member.salary
                }
            } else if (memberType === "receptionist") {
                return {
                    name: member.name,
                    gender: member.gender,
                    phone_number: member.phone_number,
                    email: member.email,
                    dob: moment.unix(member.dob / 1000),
                    address: member.address,
                    salary: member.salary
                }
            } else {
                return {
                    name: member.name,
                    gender: member.gender,
                    phone_number: member.phone_number,
                    email: member.email,
                    dob: moment.unix(member.dob / 1000),
                    address: member.address,
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
            certificate: {
                type: _member.certificateType,
                code: _member.certificateCode,
                score: _member.certificateScore
            }
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
                    <Col span={12}>
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
                                    required: true,
                                    message: <IntlMessages id="admin.user.form.phoneNumber"/>,
                                    pattern: new RegExp("([0-9]{10})"),
                                },
                            ]}>
                            <Input placeholder={"0987654321"}/>
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
                <Row>
                    <Col span={memberType === "student" ? 24 : 12}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.email"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="email">
                            <Input placeholder="nguyenvan@gmail.com" disabled={true}/>
                        </Form.Item>
                    </Col>
                    <Col span={12} style={memberType === "student" ? {display: "none"} : {}}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.table.salary"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="salary">
                            <InputNumber
                                disabled={true}
                                style={{width: "100%"}}
                                placeholder={"9,999,999"}
                                formatter={value => getMoney(value)}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={memberType !== "teacher" ? {display: "none"} : {}}>
                    <Col span={8}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.table.certificate.type"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="certificateType"
                            rules={[
                                {
                                    required: memberType === "teacher",
                                    message: <IntlMessages id="admin.user.form.certificate.type"/>,
                                },
                            ]}>
                            <Select>
                                <Select.Option value="TOEIC">TOEIC</Select.Option>
                                <Select.Option value="IELTS">IELTS </Select.Option>
                                <Select.Option value="OTHER">OTHER</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.table.certificate.code"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="certificateCode"
                            rules={[
                                {
                                    required: memberType === "teacher",
                                    message: <IntlMessages id="admin.user.form.certificate.code"/>,
                                },
                            ]}>
                            <Input placeholder="TO-00000001"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.table.certificate.score"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="certificateScore"
                            rules={[
                                {
                                    required: memberType === "teacher",
                                    message: <IntlMessages id="admin.user.form.certificate.score"/>,
                                },
                            ]}>
                            <InputNumber placeholder={"500"} style={{width: "100%"}}/>
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
