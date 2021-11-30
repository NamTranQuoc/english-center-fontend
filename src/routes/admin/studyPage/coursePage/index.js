import React, {useEffect, useState} from "react";
import {Button, Card, Col, Dropdown, Form, Input, Menu, Modal, Row, Select, Table, Tooltip} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {
    addCourse,
    getAllCourseCategory, getAllCourseCategoryByStatus,
    getListCourse,
    onHideModal,
    onSelectIndex,
    onShowModal,
    updateCourse,
} from "../../../../appRedux/actions";
import {getItemNameById, getStatusTagV2, getStatusV2} from "../../../../util/ParseUtils";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import "../index.css";
import DeleteModal from "./deleteModal";
import MyEditor from "../../../../components/editor";

let param = {
    page: 1,
    size: 10,
    sort: {
        is_asc: false,
        field: "_id"
    },
    keyword: "",
    genders: []
}

const CoursePage = () => {
    const dispatch = useDispatch();
    const {loaderTable, items, totalItems} = useSelector(({getList}) => getList);
    const {hasShowModal, selectIndex} = useSelector(({common}) => common);
    const [action, setAction] = useState("edit");
    const {courseCategories} = useSelector(({courseCategory}) => courseCategory);
    const [desc, setDesc] = useState(null);
    const {courseCategoriesAdd} = useSelector(({courseCategory}) => courseCategory);

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
        dispatch(getListCourse(param));
    }

    function onSearch(e) {
        param = {
            ...param,
            keyword: e.target.value,
            page: 1
        }
        dispatch(getListCourse(param));
    }

    function onFilterType(e) {
        const types = Array.isArray(e) ? e.map((x) => x) : []
        param = {
            ...param,
            category_courses: types,
            page: 1
        }
        dispatch(getListCourse(param));
    }

    useEffect(() => {
        dispatch(getListCourse(param));
        dispatch(getAllCourseCategory())
        dispatch(getAllCourseCategoryByStatus("active"));
        // eslint-disable-next-line
    }, []);

    function showTotalItems(total) {
        return <span><IntlMessages id="table.total.items"/>: {total}</span>;
    }

    function onSubmit(course) {
        if (selectIndex !== -1) {
            course = {
                ...course,
                id: items[selectIndex]._id,
                description: desc != null ? desc.replaceAll('"', "'").replaceAll('\n', "") : "",
            }
            dispatch(updateCourse(course, param));
        } else {

            course = {
                ...course,
                description: desc != null ? desc.replaceAll('"', "'").replaceAll('\n', "") : "",
            }
            dispatch(addCourse(course));
            param = {
                ...param,
                page: 1,
                size: 10
            }
        }
    }

    function onFilterStatus(e) {
        const status = Array.isArray(e) ? e.map((x) => x) : []
        param = {
            ...param,
            status: status,
            page: 1
        }
        dispatch(getListCourse(param));
    }

    function showModal() {
        dispatch(onSelectIndex(-1));
        setDesc(null);
        setAction("edit");
        if (hasShowModal) {
            dispatch(onHideModal());
        } else {
            dispatch(onShowModal());
        }
    }

    const getInitValueModal = () => {
        if (selectIndex !== -1 && items != null && items.length > selectIndex) {
            if (desc === null) {
                setDesc(items[selectIndex].description);
            }
            return {
                name: items[selectIndex].name,
                tuition: items[selectIndex].tuition,
                number_of_shift: items[selectIndex].number_of_shift,
                category_course_id: items[selectIndex].category_course_id,
                input_score: items[selectIndex].input_score,
                output_score: items[selectIndex].output_score,
                status: items[selectIndex].status
            };
        } else {
            return {
                status: "active",
            };
        }
    }

    const menus = (index) => (<Menu onClick={(e) => {
        setDesc(null);
        if (e.key === 'delete') {
            setAction("delete");
        } else {
            setAction("edit");
        }
        dispatch(onSelectIndex(index));
        dispatch(onShowModal());
    }}>
        <Menu.Item key="edit"><IntlMessages id="admin.user.form.edit"/></Menu.Item>
    </Menu>);

    const modal = () => (<Modal
        title={<IntlMessages id="admin.user.form.course.title"/>}
        visible={hasShowModal && action !== "delete"}
        footer={
            <Button type="primary" form="add-edit-form" htmlType="submit">{<IntlMessages
                id="admin.user.form.save"/>}</Button>
        }
        onCancel={showModal}
        bodyStyle={{overflowY: "scroll", height: "550px"}}
        centered
        width={1200}>
        <Form
            onFinish={onSubmit}
            id="add-edit-form"
            initialValues={getInitValueModal()}>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.course.table.name"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.course.form.name"/>,
                            },
                        ]}>
                        <Input placeholder="Toeic 600+"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<IntlMessages id="admin.course.table.type"/>}
                               name="category_course_id"
                               labelCol={{span: 24}}
                               wrapperCol={{span: 24}}
                               rules={[
                                   {
                                       required: true,
                                       message: <IntlMessages id="admin.course.form.type"/>,
                                   },
                               ]}>
                        <Select>
                            {courseCategoriesAdd.map(item => {
                                return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.course.table.numberOfShift"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="number_of_shift"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.course.form.numberOfShift"/>,
                            },
                        ]}>
                        <Input placeholder="60"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.course.table.tuition"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="tuition"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.course.form.tuition"/>,
                            },
                        ]}>
                        <Input placeholder="2000000"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Form.Item
                        label={<IntlMessages id="admin.course.table.input_score"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="input_score"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.user.form.input_score"/>,
                            },
                        ]}>
                        <Input placeholder="300"/>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label={<IntlMessages id="admin.course.table.output_score"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="output_score">
                        <Input placeholder="550"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<IntlMessages id="admin.categoryCourse.table.status"/>}
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
                            <Select.Option value="active">{getStatusV2("active")}</Select.Option>
                            <Select.Option value="shutdown">{getStatusV2("shutdown")}</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item
                        label={<IntlMessages id="admin.categoryCourse.table.description"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}>
                        <MyEditor value={desc} setValue={setDesc} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>);

    return (
        <Card title={<h2><IntlMessages id="admin.user.course.title"/></h2>}
              extra={<Tooltip placement="bottom" title={<IntlMessages id="admin.button.add"/>}>
                  <Button type="primary"
                          shape="circle"
                          icon={<PlusOutlined/>}
                          size="large"
                          style={{float: "right"}}
                          onClick={showModal}/>
              </Tooltip>}
              className="gx-card">
            <Form layout="inline" style={{marginBottom: "10px", marginTop: "10px"}}>
                <Form.Item label={<IntlMessages id="admin.course.table.type"/>}
                           name="genders"
                           style={{marginLeft: "10px", marginRight: "10px"}}>
                    <IntlMessages id="filter.select">
                        {placeholder =>
                            <Select mode="multiple"
                                    style={{minWidth: "100px"}}
                                    onChange={onFilterType}
                                    placeholder={placeholder}>
                                {courseCategories.map(item => {
                                    return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        }
                    </IntlMessages>
                </Form.Item>
                <Form.Item label={<IntlMessages id="admin.categoryCourse.table.status"/>}
                           name="genders"
                           style={{marginLeft: "10px", marginRight: "10px"}}>
                    <IntlMessages id="filter.select">
                        {placeholder =>
                            <Select mode="multiple"
                                    style={{minWidth: "100px"}}
                                    onChange={onFilterStatus}
                                    placeholder={placeholder}>
                                <Select.Option key="active" value="active">{getStatusV2("active")}</Select.Option>
                                <Select.Option key="shutdown" value="shutdown">{getStatusV2("shutdown")}</Select.Option>
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
            <Table dataSource={items}
                   columns={
                       [
                           {
                               key: "index",
                               dataIndex: "index",
                               render: (text, record, index) => index + 1,
                               width: 50,
                           },
                           {
                               key: "_id",
                               title: <IntlMessages id="admin.user.student.table.id"/>,
                               dataIndex: "_id",
                               width: 250,
                               sorter: true
                           },
                           {
                               key: "name",
                               title: <IntlMessages id="admin.course.table.name"/>,
                               dataIndex: "name",
                               width: 200,
                               sorter: true
                           },
                           {
                               key: "category_course_id",
                               title: <IntlMessages id="admin.course.table.type"/>,
                               dataIndex: "category_course_id",
                               render: (category_course_id) => getItemNameById(courseCategories, category_course_id),
                               width: 150,
                               sorter: true,
                           },
                           {
                               key: "number_of_shift",
                               title: <IntlMessages id="admin.course.table.numberOfShift"/>,
                               dataIndex: "number_of_shift",
                               width: 120,
                               sorter: true
                           },
                           {
                               key: "tuition",
                               title: <IntlMessages id="admin.course.table.tuition"/>,
                               dataIndex: "tuition",
                               width: 120,
                               sorter: true
                           },
                           {
                               key: "tuition",
                               title: <IntlMessages id="admin.course.table.input_score"/>,
                               dataIndex: "input_score",
                               width: 120,
                               sorter: true
                           },
                           {
                               key: "tuition",
                               title: <IntlMessages id="admin.course.table.output_score"/>,
                               dataIndex: "output_score",
                               width: 120,
                               sorter: true
                           },
                           {
                               key: "status",
                               title: <IntlMessages id="admin.categoryCourse.table.status"/>,
                               dataIndex: "status",
                               render: (status) => getStatusTagV2(status),
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
            {hasShowModal &&
            <DeleteModal showModal={showModal} getInitValueModal={getInitValueModal}
                         action={action} param={param}/>}
        </Card>
    );
};

export default CoursePage;
