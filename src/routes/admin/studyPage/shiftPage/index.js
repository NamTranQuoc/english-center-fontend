import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Dropdown, Form, Input, InputNumber, Menu, Modal, Row, Select, Table} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {
    addMember,
    getListMember, getListShift,
    onHideModal,
    onSelectIndex,
    onShowModal,
    updateMember
} from "../../../../appRedux/actions";
import {getDate, getGender, getImageURL, getMoney} from "../../../../util/ParseUtils";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import Image from "../../../../components/uploadImage";
import moment from 'moment';
import "../index.css";
import DeleteModal from "./deleteModal";
import ResetPassword from "../ResetPassword";
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

const ShiftPage = () => {
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
        dispatch(getListMember(param));
    }

    function onSearch(e) {
        param = {
            ...param,
            keyword: e.target.value,
            page: 1
        }
        dispatch(getListShift(param));
    }

    useEffect(() => {
        dispatch(getListShift(param));
        // eslint-disable-next-line
    }, []);

    function showTotalItems(total) {
        return <span><IntlMessages id="table.total.items"/>: {total}</span>;
    }

    function onSubmit(member) {
        if (selectIndex !== -1) {
            member = {
                ...member,
                _id: items[selectIndex]._id,
                dob: member.dob.unix() * 1000,
                type: "teacher",
                avatar: image,
                certificate: {
                    type: member.certificateType,
                    code: member.certificateCode,
                    score: member.certificateScore
                }
            }
            dispatch(updateMember(member, param));
        } else {
            member = {
                ...member,
                dob: member.dob.unix() * 1000,
                type: "teacher",
                avatar: image,
                certificate: {
                    type: member.certificateType,
                    code: member.certificateCode,
                    score: member.certificateScore
                }
            }
            dispatch(addMember(member));
            param = {
                ...param,
                page: 1
            }
        }
    }

    function showModal() {
        dispatch(onSelectIndex(-1));
        setUrlAvatar(null);
        setAction("edit");
        if (hasShowModal) {
            dispatch(onHideModal());
        } else {
            dispatch(onShowModal());
        }
    }

    const getInitValueModal = () => {
        if (selectIndex !== -1 && items != null && items.length > selectIndex) {
            if (urlAvatar == null) {
                setUrlAvatar(getImageURL(items[selectIndex].avatar));
            }
            return {
                certificateType: items[selectIndex].certificate.type,
                certificateCode: items[selectIndex].certificate.code,
                certificateScore: items[selectIndex].certificate.score,
                name: items[selectIndex].name,
                gender: items[selectIndex].gender,
                phone_number: items[selectIndex].phone_number,
                email: items[selectIndex].email,
                dob: moment.unix(items[selectIndex].dob / 1000),
                address: items[selectIndex].address,
                salary: items[selectIndex].salary
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
            setResetPassword(!resetPassword);
        } else {
            setAction("edit");
            dispatch(onSelectIndex(index));
            dispatch(onShowModal());
        }
    }}>
        <Menu.Item key="edit"><IntlMessages id="admin.user.form.edit"/></Menu.Item>
        <Menu.Item key="delete"><IntlMessages id="admin.user.form.delete"/></Menu.Item>
    </Menu>);

    const modal = () => (<Modal
        title={<IntlMessages id="admin.user.form.shift.title"/>}
        visible={hasShowModal && action !== "delete"}
        footer={
            <Button type="primary" form="add-edit-form" htmlType="submit">{<IntlMessages
                id="admin.user.form.save"/>}</Button>
        }
        onCancel={showModal}
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
                <Col span={24}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.shift.table.name"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.shift.form.name"/>,
                            },
                        ]}>
                        <Input placeholder="Ca 1"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.shift.table.from"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="phone_number"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.shift.form.from"/>,
                            },
                        ]}>
                        <Input placeholder={"0987654321"}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.shift.table.to"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="dob"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.shift.form.to"/>,
                            },
                        ]}>
                        <DatePicker style={{width: "100%"}} format={'DD/MM/YYYY'}/>
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
                               title: <IntlMessages id="admin.user.shift.table.name"/>,
                               dataIndex: "name",
                               width: 250,
                               sorter: true
                           },
                           {
                               key: "from",
                               title: <IntlMessages id="admin.user.shift.table.from"/>,
                               dataIndex: "from",
                               width: 100,
                               sorter: true,
                           },
                           {
                               key: "to",
                               title: <IntlMessages id="admin.user.shift.table.to"/>,
                               dataIndex: "to",
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
        </Card>
    );
};

export default ShiftPage;

