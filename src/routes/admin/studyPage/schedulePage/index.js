import React, {useEffect, useState} from "react";
import {Button, Card, Col, Dropdown, Form, Input, Menu, Modal, Row, Select, Table, Tag} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {
    addRoom,
    getListRoom,
    getListShift, getSchedule,
    onHideModal,
    onSelectIndex,
    onShowModal,
    updateRoom
} from "../../../../appRedux/actions";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import "../index.css";
import {getStatus} from "../../../../util/ParseUtils";
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import "./index.css";
import dates from 'react-big-calendar/lib/utils/dates';

const localizer = momentLocalizer(moment);

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

const SchedulePage = () => {
    const dispatch = useDispatch();
    const {hasShowModal, selectIndex} = useSelector(({common}) => common);
    const [action, setAction] = useState("edit");
    const {items, } = useSelector(({schedule}) => schedule);

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
        dispatch(getListShift(param));
    }

    function onSearch(e) {
        param = {
            ...param,
            keyword: e.target.value,
            page: 1
        }
        dispatch(getListRoom(param));
    }

    useEffect(() => {
        let start = moment().startOf('month').startOf('week');
        let end = moment().endOf('month').endOf('week');
        dispatch(getSchedule({
            from_date: start.unix() * 1000,
            to_date: end.unix() * 1000
        }))
        // eslint-disable-next-line
    }, []);

    function showTotalItems(total) {
        return <span><IntlMessages id="table.total.items"/>: {total}</span>;
    }

    function onSubmit(values) {
        // if (selectIndex !== -1) {
        //     values = {
        //         id: items[selectIndex]._id,
        //         name: values.name,
        //         capacity: values.capacity,
        //         status: values.status,
        //     }
        //     dispatch(updateRoom(values, param));
        // } else {
        //     values = {
        //         name: values.name,
        //         capacity: values.capacity,
        //         status: values.status,
        //     }
        //     dispatch(addRoom(values));
        //     param = {
        //         ...param,
        //         page: 1,
        //         size: 10
        //     }
        // }
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
                // name: items[selectIndex].name,
                // capacity: items[selectIndex].capacity,
                // status: items[selectIndex].status,
            };
        } else {
            return {
                // status: "ACTIVE",
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
        title={<IntlMessages id="admin.user.form.room.title"/>}
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
                    <Form.Item
                        label={<IntlMessages id="admin.user.room.table.name"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.room.form.name"/>,
                            },
                        ]}>
                        <Input placeholder="Room 01"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.room.table.capacity"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="capacity"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.room.form.capacity"/>,
                            },
                        ]}>
                        <Input type="number" placeholder="50"/>
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
                            <Select.Option value="ACTIVE">{getStatus("ACTIVE")}</Select.Option>
                            <Select.Option value="INACTIVE">{getStatus("INACTIVE")}</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>);

    return (
        <Card title={<h2><IntlMessages id="admin.user.room.title"/></h2>}
              extra={<Button type="primary"
                             shape="circle"
                             icon={<PlusOutlined/>}
                             size="large"
                             style={{float: "right"}}
                             onClick={showModal}/>}
              className="gx-card">
            <Calendar
                localizer={localizer}
                popup={2}
                views={["month", "week"]}
                events={items}
                onRangeChange={range => {
                    console.log(range)
                    if (range.hasOwnProperty("end")) {
                        dispatch(getSchedule({
                            from_date: range.start.getTime(),
                            to_date: range.end.getTime(),
                        }))
                    } else {
                        dispatch(getSchedule({
                            from_date: range[0].getTime(),
                            to_date: range[6].getTime() + 86399999
                        }))
                    }

                }}
                defaultDate={new Date()}
            />
            {hasShowModal && modal()}
        </Card>
    );
};

export default SchedulePage;
