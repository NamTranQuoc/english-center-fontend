import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Dropdown, Form, Input, Menu, Modal, Row, Select, Table, Tag} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {
    addExamSchedule,
    getAllRooms,
    getAllTeachers,
    getListExamSchedule,
    onHideModal,
    onSelectIndex,
    onShowModal, updateExamSchedule,
} from "../../../../appRedux/actions";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {getDateTime, getItemNameById} from "../../../../util/ParseUtils";
import moment from "moment";

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
const {RangePicker} = DatePicker;
const ExamSchedulePage = () => {
    const dispatch = useDispatch();
    const {loaderTable, items, totalItems} = useSelector(({getList}) => getList);
    const {hasShowModal, selectIndex} = useSelector(({common}) => common);
    const [action, setAction] = useState("edit");
    const {locale} = useSelector(({settings}) => settings);
    const {rooms,} = useSelector(({room}) => room);
    const {teachers,} = useSelector(({teacher}) => teacher);

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
        dispatch(getListExamSchedule(param));
    }

    function onSearch(e) {
        param = {
            ...param,
            keyword: e.target.value,
            page: 1
        }
        dispatch(getListExamSchedule(param));
    }

    useEffect(() => {
        dispatch(getListExamSchedule(param));
        dispatch(getAllRooms());
        dispatch(getAllTeachers());
        // eslint-disable-next-line
    }, []);

    function showTotalItems(total) {
        return <span><IntlMessages id="table.total.items"/>: {total}</span>;
    }

    function onSubmit(values) {
        if (selectIndex !== -1) {
            values = {
                _id: items[selectIndex]._id,
                start_time: values.time[0].unix() * 1000,
                end_time: values.time[1].unix() * 1000,
                room_id: values.room_id,
                member_ids: values.member_ids,
                min_quantity: values.min_quantity,
                max_quantity: values.max_quantity,
            }
            dispatch(updateExamSchedule(values, param));
        } else {
            values = {
                start_time: values.time[0].unix() * 1000,
                end_time: values.time[1].unix() * 1000,
                room_id: values.room_id,
                member_ids: values.member_ids,
                min_quantity: values.min_quantity,
                max_quantity: values.max_quantity,
            }
            dispatch(addExamSchedule(values));
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
                room_id: items[selectIndex].room_id,
                member_ids: items[selectIndex].member_ids,
                min_quantity: items[selectIndex].min_quantity,
                max_quantity: items[selectIndex].max_quantity,
                time:[moment.unix(items[selectIndex].start_time / 1000),moment.unix(items[selectIndex].end_time / 1000)]
            };
        } else {
            return {
            };
        }
    }

    const menus = (index) => (<Menu onClick={(e) => {
        if (e.key === 'delete') {
            setAction("delete");
            dispatch(onSelectIndex(index));
            dispatch(onShowModal());
        } else if (e.key === 'resetPassword') {
            dispatch(onSelectIndex(index));
        } else {
            setAction("edit");
            dispatch(onSelectIndex(index));
            dispatch(onShowModal());
        }
    }}>
        <Menu.Item key="edit"><IntlMessages id="admin.user.form.edit"/></Menu.Item>
    </Menu>);

    const modal = () => (<Modal
        title={<IntlMessages id="admin.user.form.examSchedule.title"/>}
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
                        label={<IntlMessages id="admin.user.room.table.room"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="time">
                        <RangePicker showTime
                                     placeholder={locale.locale === "vi" ? ["Từ", "Đến"] : ["From", "To"]}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.room.table.room"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="room_id">
                        <Select
                            showSearch
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {rooms.map(item => {
                                return <Select.Option value={item._id}>{item.name}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<IntlMessages id="sidebar.managerUser.teacher"/>}
                               name="member_ids"
                               labelCol={{span: 24}}
                               wrapperCol={{span: 24}}>
                        <Select
                            mode={"multiple"}
                            showSearch
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {teachers.map(item => {
                                return <Select.Option value={item._id}>{item.name}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.examSchedule.table.min"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="min_quantity"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.room.form.capacity"/>,
                            },
                        ]}>
                        <Input type="number" placeholder="20"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.examSchedule.table.max"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="max_quantity"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.room.form.capacity"/>,
                            },
                        ]}>
                        <Input type="number" placeholder="50"/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>);

    return (
        <Card title={<h2><IntlMessages id="admin.user.examSchedule.title"/></h2>}
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
                               width: 220,
                               sorter: true
                           },
                           {
                               key: "start_time",
                               title: <IntlMessages id="admin.user.examRegistrations.table.startTime"/>,
                               dataIndex: "start_time",
                               render: (start_time) => getDateTime(start_time),
                               width: 150,
                               sorter: true
                           },
                           {
                               key: "end_time",
                               title: <IntlMessages id="admin.user.examRegistrations.table.endTime"/>,
                               dataIndex: "end_time",
                               render: (end_time) => getDateTime(end_time),
                               width: 150,
                               sorter: true,
                           },
                           {
                               key: "room_id",
                               title: <IntlMessages id="admin.user.examRegistrations.table.room"/>,
                               dataIndex: "room_id",
                               render: (room_id) => getItemNameById(rooms, room_id),
                               width: 100,
                               sorter: true,
                           },
                           {
                               key: "member_id",
                               title: <IntlMessages id="admin.user.examRegistrations.table.supervisor"/>,
                               dataIndex: "member_ids",
                               render: (member_ids) => (
                                   <div>
                                       {member_ids.map(item => {
                                           return <Tag color={"green"}>{getItemNameById(teachers, item)}</Tag>;
                                       })}
                                   </div>
                               ),
                               width: 140,
                               sorter: true,
                           },
                           {
                               key: "max_quantity",
                               title: <IntlMessages id="admin.user.examRegistrations.table.max"/>,
                               dataIndex: "max_quantity",
                               width: 100,
                               sorter: true,
                           },
                           {
                               key: "min_quantity",
                               title: <IntlMessages id="admin.user.examRegistrations.table.min"/>,
                               dataIndex: "min_quantity",
                               width: 100,
                               sorter: true,
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

export default ExamSchedulePage;
