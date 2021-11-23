import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Dropdown, Form, Input, Menu, Modal, Row, Select, Table} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {
    addClass,
    getAllCourse,
    getAllShift,
    getListClass,
    onHideModal,
    onSelectIndex,
    onShowModal,
    updateClass
} from "../../../../appRedux/actions";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import "../index.css";
import moment from "moment";
import {getDOW} from "../../../../util/ParseUtils";

let param = {
    page: 1,
    size: 10,
    sort: {
        is_asc: false,
        field: "_id"
    },
    types: ["teacher"],
    keyword: "",
    genders: []
}

moment.updateLocale('vi', {
    weekdaysMin: ["Cn", "T2", "T3", "T4", "T5", "T6", "T7"],
    monthsShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
});

const MyDOW = [2, 3, 4, 5, 6, 7, 8];

const ClassPage = () => {
    const dispatch = useDispatch();
    const {loaderTable, items, totalItems} = useSelector(({getList}) => getList);
    const {hasShowModal, selectIndex} = useSelector(({common}) => common);
    const [action, setAction] = useState("edit");
    const {courses} = useSelector(({course}) => course);
    const {shifts} = useSelector(({shift}) => shift);

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
        dispatch(getListClass(param));
    }

    function onSearch(e) {
        param = {
            ...param,
            keyword: e.target.value,
            page: 1
        }
        dispatch(getListClass(param));
    }

    useEffect(() => {
        // dispatch(getListClass(param));
        dispatch(getAllShift());
        dispatch(getAllCourse());
        // eslint-disable-next-line
    }, []);

    function showTotalItems(total) {
        return <span><IntlMessages id="table.total.items"/>: {total}</span>;
    }

    function onSubmit(values) {
        if (selectIndex !== -1) {
            values = {
                ...values,
                _id: items[selectIndex]._id,
                start_date: values.start_date.unix() * 1000,
            }
            dispatch(updateClass(values));
        } else {
            values = {
                ...values,
                start_date: values.start_date.unix() * 1000,
            }
            dispatch(addClass(values));
            param = {
                ...param,
                page: 1,
                size: 10
            }
        }
    }

    function showModal() {
        dispatch(onSelectIndex(-1));
        setAction("edit");
        if (hasShowModal) {
            dispatch(onHideModal());
        } else {
            dispatch(onShowModal());
        }
    }

    const getInitValueModal = () => {
        if (selectIndex !== -1 && items != null && items.length > selectIndex) {
            return {
                name: items[selectIndex].name,
                max_student: items[selectIndex].max_student,
                dow: items[selectIndex].dow,
                course_id: items[selectIndex].course_id,
                start_date: items[selectIndex].start_date,
                shift_id: items[selectIndex].shift_id
            };
        } else {
            return {};
        }
    }

    const menus = (index) => (<Menu onClick={(e) => {
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
        title={<IntlMessages id="admin.user.form.shift.title"/>}
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
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.class.table.name"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.name"/>,
                            },
                        ]}>
                        <Input placeholder="Toeic 550"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.class.table.max_student"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="max_student"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.max_student"/>,
                            },
                        ]}>
                        <Input placeholder="20" type={"number"}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.class.table.course"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="course_id"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.course"/>,
                            },
                        ]}>
                        <Select placeholder={"Select"} disabled={selectIndex !== -1}>
                            {courses.map(item => {
                                return <Select.Option value={item._id}>{item.name}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.class.table.startDate"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="start_date"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.startDate"/>,
                            },
                        ]}>
                        <DatePicker style={{width: "100%"}} format={'DD/MM/YYYY'}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.class.table.dow"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="dow"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.dow"/>,
                            },
                        ]}>
                        <Select placeholder={"Select"} mode={"multiple"} disabled={selectIndex !== -1}>
                            {MyDOW.map(item => {
                                return <Select.Option value={item}>{getDOW(item)}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.class.table.shift"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="shift_id"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.shift"/>,
                            },
                        ]}>
                        <Select placeholder={"Select"} disabled={selectIndex !== -1}>
                            {shifts.map(item => {
                                return <Select.Option value={item._id}>{item.name}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>);

    return (
        <Card title={<h2><IntlMessages id="admin.user.shift.title"/></h2>}
              extra={<Button type="primary"
                             shape="circle"
                             icon={<PlusOutlined/>}
                             size="large"
                             style={{float: "right"}}
                             onClick={showModal}/>}
              className="gx-card">
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
                               title: <IntlMessages id="admin.user.class.table.name"/>,
                               dataIndex: "name",
                               width: 200,
                               sorter: true
                           },
                           {
                               key: "max_student",
                               title: <IntlMessages id="admin.user.class.table.max_student"/>,
                               dataIndex: "max_student",
                               width: 200,
                               sorter: true
                           },
                           {
                               key: "course_id",
                               title: <IntlMessages id="admin.user.class.table.course"/>,
                               dataIndex: "course_id",
                               width: 200,
                               sorter: true
                           },
                           {
                               key: "dow",
                               title: <IntlMessages id="admin.user.class.table.dow"/>,
                               dataIndex: "dow",
                               width: 200,
                               sorter: true
                           },
                           {
                               key: "shift_id",
                               title: <IntlMessages id="admin.user.class.table.shift"/>,
                               dataIndex: "shift_id",
                               width: 200,
                               sorter: true
                           },
                           {
                               key: "start_date",
                               title: <IntlMessages id="admin.user.class.table.startDate"/>,
                               dataIndex: "start_date",
                               width: 200,
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
        </Card>
    );
};

export default ClassPage;

