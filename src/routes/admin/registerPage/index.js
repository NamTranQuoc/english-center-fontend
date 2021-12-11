import React, {useEffect, useState} from "react";
import {Button, Card, Col, Dropdown, Form, Input, Menu, Modal, Row, Select, Table, Tooltip} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {
    addRegister,
    exportRegister,
    getAllClassByCourseId,
    getAllCourseByCategoryId,
    getAllCourseCategoryByStatus,
    getListRegister,
    onHideModal,
    onSelectIndex,
    onShowModal,
    showMessage,
    updateRegister
} from "../../../appRedux/actions";
import {DownloadOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import "./index.css";
import {getDate, getGender, getStatusV2} from "../../../util/ParseUtils";
import {useForm} from "antd/es/form/Form";
import DeleteModal from "../registerPage/deleteModal";

let param = {
    page: 1,
    size: 10,
    sort: {
        is_asc: false,
        field: "_id"
    },
    keyword: ""
}

const RegisterPage = () => {
    const dispatch = useDispatch();
    const {loaderTable, items, totalItems} = useSelector(({getList}) => getList);
    const {hasShowModal, selectIndex} = useSelector(({common}) => common);
    const [action, setAction] = useState("edit");
    const {coursesByCategoryId} = useSelector(({course}) => course);
    const {classByCourseId} = useSelector(({classRoom}) => classRoom);
    const {courseCategoriesAdd} = useSelector(({courseCategory}) => courseCategory);
    const [form] = useForm();
    const [classId, setClassId] = useState(null);

    function onChange(pagination, filters, sorter) {
        if (sorter != null && sorter.columnKey != null && sorter.order != null) {
            param = {
                ...param,
                sort: {
                    is_asc: sorter.order === "ascend",
                    field: sorter.columnKey
                }
            }
        }
        param = {
            ...param,
            page: pagination.current,
            size: pagination.pageSize
        }
        dispatch(getListRegister(param));
    }

    function onSearch(e) {
        param = {
            ...param,
            keyword: e.target.value,
            page: 1
        }
        dispatch(getListRegister(param));
    }

    useEffect(() => {
        dispatch(getAllCourseCategoryByStatus("active"))
        // eslint-disable-next-line
    }, []);

    function showTotalItems(total) {
        return <span><IntlMessages id="table.total.items"/>: {total}</span>;
    }

    function onFilterCourseCategory(e) {
        form.resetFields(['course_id', 'class_id']);
        dispatch(getAllCourseByCategoryId(e));
    }

    function onFilterCourse(e) {
        form.resetFields(['class_id']);
        dispatch(getAllClassByCourseId(e));
    }

    function onClassChange(e) {
        setClassId(e);
        param = {
            ...param,
            class_id: e,
        }
        dispatch(getListRegister(param))
    }

    function onSubmit(values) {
        if (selectIndex !== -1) {
            values = {
                ...values,
                id: data[selectIndex]._id,
                status: values.status,
                class_id: classId,
            }
            console.log(values);
            dispatch(updateRegister(values, param));
        } else {
            if (classId !== null) {
                values = {
                    ...values,
                    class_id: classId
                }
                dispatch(addRegister(values));
            }
        }
    }

    function showModal() {
        if (classId !== null) {
            dispatch(onSelectIndex(-1));
            setAction("edit");
            if (hasShowModal) {
                dispatch(onHideModal());
            } else {
                dispatch(onShowModal());
            }
        } else {
            dispatch(showMessage("param_not_null"));
        }
    }

    const getInitValueModal = () => {
        if (selectIndex !== -1 && items != null && items.length > selectIndex) {
            return {
                student_id: data[selectIndex].code,
                status: data[selectIndex].status,
            };
        } else {
            return {
                status: "unpaid"
            };
        }
    }

    function onExportMember() {
        if (classId !== null) {
            dispatch(exportRegister(classId));
        } else {
            dispatch(showMessage("param_not_null"));
        }
    }

    const menus = (index) => (<Menu onClick={(e) => {
        if (e.key === "generate") {
            dispatch(onSelectIndex(index));
        } else {
            if (e.key === 'delete') {
                setAction("delete");
            } else {
                setAction("edit");
            }
            dispatch(onSelectIndex(index));
            dispatch(onShowModal());
        }

    }}>
        <Menu.Item key="edit"><IntlMessages id="admin.user.form.edit"/></Menu.Item>
            <Menu.Item key="delete"><IntlMessages id="admin.user.form.delete"/></Menu.Item>
        </Menu>

    );

    const modal = () => (<Modal
        title={<IntlMessages id="admin.user.form.register.title"/>}
        visible={hasShowModal && action !== "delete"}
        footer={
            <Button type="primary" form="add-edit-form" htmlType="submit">{<IntlMessages
                id="admin.user.form.save"/>}</Button>
        }
        onCancel={showModal}
        centered
        width={600}>
        <Form
            onFinish={onSubmit}
            id="add-edit-form"
            initialValues={getInitValueModal()}>
            <Row>
                <Col span={24}>
                    <Form.Item label={<IntlMessages id="admin.categoryCourse.table.EmailPhoneCode"/>}
                               name="student_id"
                               labelCol={{span: 24}}
                               wrapperCol={{span: 24}}
                               rules={[
                                   {
                                       required: true,
                                       message: <IntlMessages id="admin.categoryCourse.form.status"/>,
                                   },
                               ]}>
                        <Input disabled={selectIndex !== -1}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item label={<IntlMessages id="admin.categoryCourse.table.statusPayment"/>}
                               name="status"
                               labelCol={{span: 24}}
                               wrapperCol={{span: 24}}
                               rules={[
                                   {
                                       required: true,
                                       message: <IntlMessages id="admin.categoryCourse.form.status"/>,
                                   },
                               ]}>
                        <Select>
                            <Select.Option value="unpaid">{getStatusV2("unpaid")}</Select.Option>
                            <Select.Option value="paid">{getStatusV2("paid")}</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>);

    const data = items.map((item) =>{
        return {
            ...item.member,
            ...item.register,
        }
    })
    return (
        <Card title={<h2><IntlMessages id="admin.user.register.title"/></h2>}
              extra={<>
                  <Tooltip placement="bottom" title={<IntlMessages id="admin.button.add"/>}>
                      <Button type="primary"
                              shape="circle"
                              icon={<PlusOutlined/>}
                              size="large"
                              style={{float: "right"}}
                              onClick={showModal}/>
                  </Tooltip>
                  <Tooltip placement="bottom" title={<IntlMessages id="admin.button.export"/>}>
                      <Button type="primary"
                              shape="circle"
                              icon={<DownloadOutlined/>}
                              size="large"
                              style={{float: "right", marginRight: "10px"}}
                              onClick={onExportMember}/>
                  </Tooltip>
              </>
              }
              className="gx-card">
            <Form form={form} layout="inline" style={{marginBottom: "10px", marginTop: "10px"}}>
                <Form.Item label={<IntlMessages id="sidebar.managerStudy.courseCategory"/>}
                           name="category_id"
                           style={{marginLeft: "10px", marginRight: "10px"}}>
                    <IntlMessages id="filter.select">
                        {placeholder =>
                            <Select
                                    style={{minWidth: "150px"}}
                                    onSelect={onFilterCourseCategory}
                                    placeholder={placeholder}>
                                {courseCategoriesAdd.map(item => {
                                    return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        }
                    </IntlMessages>
                </Form.Item>
                <Form.Item label={<IntlMessages id="admin.user.class.table.course"/>}
                           name="course_id"
                           style={{marginLeft: "10px", marginRight: "10px"}}>
                    <IntlMessages id="filter.select">
                        {placeholder =>
                            <Select
                                    style={{minWidth: "150px"}}
                                    onSelect={onFilterCourse}
                                    placeholder={placeholder}>
                                {coursesByCategoryId.map(item => {
                                    return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        }
                    </IntlMessages>
                </Form.Item>
                <Form.Item label={<IntlMessages id="sidebar.managerStudy.class"/>}
                           name="class_id"
                           style={{marginLeft: "10px", marginRight: "10px"}}>
                    <IntlMessages id="filter.select">
                        {placeholder =>
                            <Select
                                    style={{minWidth: "150px"}}
                                    onChange={onClassChange}
                                    placeholder={placeholder}>
                                {classByCourseId.map(item => {
                                    return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        }
                    </IntlMessages>
                </Form.Item>
            </Form>
            <IntlMessages id="table.search">
                {placeholder => <Input
                    placeholder={placeholder}
                    prefix={<SearchOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                    onPressEnter={onSearch}
                />}
            </IntlMessages>
            <Table dataSource={data}
                   columns={
                       [
                           {
                               key: "index",
                               dataIndex: "index",
                               render: (text, record, index) => index + 1,
                               width: 50,
                           },
                           {
                               key: "code",
                               title: <IntlMessages id="admin.user.student.table.id"/>,
                               dataIndex: "code",
                               width: 150,
                               sorter: true
                           },
                           {
                               key: "name",
                               title: <IntlMessages id="admin.user.student.table.name"/>,
                               dataIndex: "name",
                               width: 250,
                               sorter: true
                           },
                           {
                               key: "email",
                               title: <IntlMessages id="admin.user.student.table.email"/>,
                               dataIndex: "email",
                               width: 250,
                               sorter: true
                           },
                           {
                               key: "gender",
                               title: <IntlMessages id="admin.user.student.table.gender"/>,
                               dataIndex: "gender",
                               render: (gender) => getGender(gender),
                               width: 100,
                               sorter: true,
                           },
                           {
                               key: "dob",
                               title: <IntlMessages id="admin.user.student.table.dob"/>,
                               dataIndex: "dob",
                               render: (dob) => getDate(dob),
                               width: 120,
                               sorter: true
                           },
                           {
                               key: "action",
                               dataIndex: "index",
                               render: (text, record, index) => (<div>
                                   <Dropdown overlay={menus(index)} placement="bottomRight" trigger={['click']}>
                                       <i className="gx-icon-btn icon icon-ellipse-v"/>
                                   </Dropdown>
                               </div>),
                               fixed: 'right',
                               width: 60,
                           },
                       ]
                   }
                   loading={loaderTable}
                   onChange={onChange}
                   scroll={{y: 520}} pagination={
                {
                    size: "small",
                    current: param.page,
                    total: totalItems,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: showTotalItems,
                    defaultPageSize: 10,
                    pageSizeOptions: ["10", "15", "20"]
                }
            }/>
            {hasShowModal && modal()}
            {hasShowModal && (<DeleteModal showModal={showModal} action={action} getInitValueModal={getInitValueModal} param={param}/>)}
        </Card>
    );
};

export default RegisterPage;

