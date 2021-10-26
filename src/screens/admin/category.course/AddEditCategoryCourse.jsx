import React from "react";
import 'antd/dist/antd.css';
import {showNotification} from "../../../components/common/NotifyCation";
import {addCategoryCourse, getAll, updateCategoryCourse} from "../../../service/CategoryCourseService";
import {Button, Col, Form, Input, Row, Select} from "antd";
import Modal from "antd/es/modal/Modal";
import TextArea from "antd/es/input/TextArea";

const {Option} = Select;

function AddEditCategoryCourse(props) {
    function onSubmit(values) {
        if (props.category_course._id === -1) {
            addCategoryCourse(values.category_name, values.status, values.description).then((Response) => {
                if (Response.data.code !== -9999) {
                    showNotification("success_add");
                    getAll();
                    props.close_modal();
                    props.reload();
                } else {
                    showNotification(Response.data.message);
                }
            });
        } else {
            updateCategoryCourse(props.category_course._id, values.category_name, values.status, values.description).then(
                (Response) => {
                    if (Response.data.code !== -9999) {
                        showNotification("success_update");
                        getAll();
                        props.close_modal();
                        props.reload();
                    } else {
                        showNotification(Response.data.message);
                    }
                }
            );
        }
    }

    return (
        <Modal title="Thông tin loại khóa học" visible={props.show_add}
               footer={
                   <Button type="primary" form={"normal_login"} htmlType="submit">Lưu</Button>
               }
               onCancel={props.close_modal}>
            <Form
                layout={"vertical"}
                name="normal_login"
                className="login-form"
                initialValues={{
                    category_name: props.category_course.name,
                    status: props.category_course.status,
                    description: props.category_course.description,
                }}
                onFinish={onSubmit}
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            label={"Tên loại khóa học"}
                            name="category_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên loại khóa học!',
                                },
                            ]}
                        >
                            <Input placeholder="Toeic"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Trạng thái"
                                   name="status"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Vui lòng nhập tên loại khóa học!',
                                       },
                                   ]}>
                            <Select>
                                <Option value="ACTIVE">Hoạt động</Option>
                                <Option value="INACTIVE">Không hoạt động</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item label={"Mô tả"} name="description">
                            <TextArea rows={4}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

AddEditCategoryCourse.defaultProps = {
    show_add: false,
};

export default AddEditCategoryCourse;
