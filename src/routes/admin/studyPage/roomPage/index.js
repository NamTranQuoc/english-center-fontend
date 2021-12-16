import React, {useEffect, useState} from "react";
import {Button, Card, Col, Dropdown, Form, Input, Menu, Modal, Row, Select, Table, Tag, Tooltip} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {addRoom, getListRoom, onHideModal, onSelectIndex, onShowModal, updateRoom} from "../../../../appRedux/actions";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import "../index.css";
import {getStatus} from "../../../../util/ParseUtils";

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

const RoomPage = () => {
    const dispatch = useDispatch();
    const {loaderTable, items, totalItems} = useSelector(({getList}) => getList);
    const {hasShowModal, selectIndex} = useSelector(({common}) => common);
    const [action, setAction] = useState("edit");

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
        dispatch(getListRoom(param));
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
        dispatch(getListRoom(param));
        // eslint-disable-next-line
    }, []);

    function showTotalItems(total) {
        return <span><IntlMessages id="table.total.items"/>: {total}</span>;
    }

    function onSubmit(values) {
        if (selectIndex !== -1) {
            values = {
                id: items[selectIndex]._id,
                name: values.name,
                capacity: values.capacity,
                status: values.status,
            }
            dispatch(updateRoom(values, param));
        } else {
            values = {
                name: values.name,
                capacity: values.capacity,
                status: values.status,
            }
            dispatch(addRoom(values));
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
                capacity: items[selectIndex].capacity,
                status: items[selectIndex].status,
            };
        } else {
            return {
                status: "ACTIVE",
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
                            <Select.Option value="SHUTDOWN">{getStatus("SHUTDOWN")}</Select.Option>
                            <Select.Option value="MAINTENANCE">{getStatus("MAINTENANCE")}</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>);

    return (
        <Card title={<h2><IntlMessages id="admin.user.room.title"/></h2>}
              extra={<Tooltip placement="bottom" title={<IntlMessages id="admin.button.add"/>}>
                  <Button type="primary"
                          shape="circle"
                          icon={<PlusOutlined/>}
                          size="large"
                          style={{float: "right"}}
                          onClick={showModal}/>
              </Tooltip>}
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
                               key: "name",
                               title: <IntlMessages id="admin.user.room.table.name"/>,
                               dataIndex: "name",
                               width: 200,
                               sorter: true
                           },
                           {
                               key: "from",
                               title: <IntlMessages id="admin.user.room.table.capacity"/>,
                               dataIndex: "capacity",
                               width: 125,
                               sorter: true,
                           },
                           {
                               key: "status",
                               title: <IntlMessages id="admin.categoryCourse.table.status"/>,
                               dataIndex: "status",
                               render: (status) => <Tag color={status === "ACTIVE" ? "blue" : "red"}>{getStatus(status)}</Tag>,
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

export default RoomPage;
