import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Form, Input, Modal, Row, Select, Table, Tag} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllMemberByTypeAndStatus,
    getAllRooms,
    getAllRoomsByStatus,
    getListExamSchedule,
    registerExam,
} from "../../../appRedux/actions";
import {SearchOutlined} from "@ant-design/icons";
import {getDateTime, getItemNameById, getLength, getMemberIdCurrent, getStatusTagV2} from "../../../util/ParseUtils";
import moment from "moment";
import "./index.css";

let param = {
    page: 1,
    size: 10,
    sort: {
        is_asc: false,
        field: "_id"
    },
    keyword: "",
    statuses: ["register"],
}
const {RangePicker} = DatePicker;
const ExamSchedulePage = () => {
    const dispatch = useDispatch();
    const {loaderTable, items, totalItems} = useSelector(({getList}) => getList);
    const [action] = useState("edit");
    const [index, setIndex] = useState(-1);
    const {locale} = useSelector(({settings}) => settings);
    const {roomsByStatus, rooms} = useSelector(({room}) => room);
    const {membersByStatus} = useSelector(({teacher}) => teacher);
    const [style, setStyle] = useState("150px");
    const [hasShowModal, setHasShowModal] = useState(false);
    const [selectIndex, setSelectIndex] = useState(-1);

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
            page: 1,
            statuses: "register",
        }
        dispatch(getListExamSchedule(param));
    }

    useEffect(() => {
        dispatch(getListExamSchedule(param));
        dispatch(getAllRooms());
        dispatch(getAllRoomsByStatus("ACTIVE", 0));
        dispatch(getAllMemberByTypeAndStatus("receptionist", "active"));
        // eslint-disable-next-line
    }, []);

    function showTotalItems(total) {
        return <span><IntlMessages id="table.total.items"/>: {total}</span>;
    }

    function onRegister() {
        dispatch(registerExam(getMemberIdCurrent(), items[index]._id, param));
        setHasShowModal(!hasShowModal);
    }


    function showModal(index) {
        setIndex(index);
        if (hasShowModal === false) {
            setSelectIndex(index);
        } else {
            setSelectIndex(-1);
        }
        setHasShowModal(!hasShowModal);
    }

    const showRegister = (index) => (
        <Button
            type="text"
            onClick={() => {showModal(index)}}>
            <i className="gx-icon-btn icon icon-picker"/>
        </Button>
    )

    const getInitValueModal = () => {
        if (selectIndex !== -1 && items != null && items.length > selectIndex) {
            return {
                name: items[selectIndex].name,
                room_id: items[selectIndex].room_id,
                member_ids: items[selectIndex].member_ids,
                min_quantity: items[selectIndex].min_quantity,
                max_quantity: items[selectIndex].max_quantity,
                time: [moment.unix(items[selectIndex].start_time / 1000), moment.unix(items[selectIndex].end_time / 1000)]
            };
        } else {
            return {};
        }
    }

    const modal = () => (<Modal
        title={<IntlMessages id="admin.user.form.examSchedule.title"/>}
        visible={hasShowModal && action !== "delete"}
        footer={
            <Button type="primary" form="add-edit-form" htmlType="submit">{<IntlMessages
                id="admin.user.form.registerExam"/>}</Button>
        }
        onCancel={showModal}
        centered
        width={600}>
        <Form
            onFinish={onRegister}
            id="add-edit-form"
            initialValues={getInitValueModal()}>
            <Row>
                <Col span={24}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.examSchedule.table"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="time"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.time"/>,
                            },
                        ]}>
                        <RangePicker showTime
                                     disabled={true}
                                     placeholder={locale.locale === "vi" ? ["Từ", "Đến"] : ["From", "To"]}
                                     style={{width: "100%"}}
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
                        name="room_id"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.room"/>,
                            },
                        ]}>
                        <Select
                            disabled={true}
                            showSearch
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {roomsByStatus.map(item => {
                                return <Select.Option value={item._id}>{item.name}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<IntlMessages id="sidebar.managerUser.receptionist"/>}
                               name="member_ids"
                               labelCol={{span: 24}}
                               wrapperCol={{span: 24}}
                               rules={[
                                   {
                                       required: true,
                                       message: <IntlMessages id="admin.class.form.receptionist"/>,
                                   },
                               ]}>
                        <Select
                            disabled={true}
                            mode={"multiple"}
                            showSearch
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {membersByStatus.map(item => {
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
                        <Input type="number" placeholder="20" disabled={true}/>
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
                        <Input type="number" placeholder="50" disabled={true}/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>);

    function onFilterDate(dates) {
        if (dates !== null && dates[0] != null && dates[1] != null) {
            setStyle("370px");
            param = {
                ...param,
                start_time: dates[0].unix() * 1000,
                end_time: dates[1].unix() * 1000,
                page: 1
            }
            dispatch(getListExamSchedule(param));
        }
    }

    function onChangeDatePicker(dates) {
        if (dates === null || dates.length === 0) {
            setStyle("150px");
            param = {
                ...param,
                start_time: null,
                end_time: null,
                page: 1
            }
            dispatch(getListExamSchedule(param));
        }
    }

    return (
        <Card title={<h2><IntlMessages id="admin.user.exam.title"/></h2>}
              className="gx-card">
            <Form layout="inline" style={{marginBottom: "10px", marginTop: "10px"}}>
                <Form.Item label={<IntlMessages id="admin.user.examSchedule.table"/>}
                           name="examTime">
                    <DatePicker.RangePicker showTime style={{width: style}}
                                            onOk={onFilterDate}
                                            onChange={onChangeDatePicker}
                                            placeholder={locale.locale === "vi" ? ["Từ", "Đến"] : ["From", "To"]}
                    />
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
                               key: "status",
                               title: <IntlMessages id="admin.categoryCourse.table.status"/>,
                               dataIndex: "status",
                               render: (status) => getStatusTagV2(status),
                               width: 200,
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
                                           return <Tag color={"green"}>{getItemNameById(membersByStatus, item)}</Tag>;
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
                               key: "min_quantity",
                               title: <IntlMessages id="admin.user.examRegistrations.table.current"/>,
                               dataIndex: "student_ids",
                               render: (student_ids) => getLength(student_ids),
                               width: 100,
                               sorter: true,
                           },
                           {
                               key: "action",
                               dataIndex: "index",
                               render: (text, record, index) => showRegister(index),
                               fixed: 'right',
                               align: 'center',
                               width: 90,
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
