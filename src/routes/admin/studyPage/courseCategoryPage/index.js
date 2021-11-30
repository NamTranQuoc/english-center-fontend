import React, {useEffect, useState} from "react";
import {Button, Card, Col, Dropdown, Form, Input, Menu, Modal, Row, Select, Table, Tag, Tooltip} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {
    addCourseCategory,
    getListCourseCategory,
    onHideModal,
    onSelectIndex,
    onShowModal, updateCourseCategory,
} from "../../../../appRedux/actions";
import {getDate, getStatus, getStatusTagV2, getStatusV2} from "../../../../util/ParseUtils";
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
}

const CourseCategoryPage = () => {
    const dispatch = useDispatch();
    const {loaderTable, items, totalItems} = useSelector(({getList}) => getList);
    const {hasShowModal, selectIndex} = useSelector(({common}) => common);
    const [action, setAction] = useState("edit");
    const [desc, setDesc] = useState(null);

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
        dispatch(getListCourseCategory(param));
    }

    function onSearch(e) {
        param = {
            ...param,
            keyword: e.target.value,
            page: 1
        }
        dispatch(getListCourseCategory(param));
    }

    useEffect(() => {
        dispatch(getListCourseCategory(param));
        // eslint-disable-next-line
    }, []);

    function showTotalItems(total) {
        return <span><IntlMessages id="table.total.items"/>: {total}</span>;
    }

    function onSubmit(courseCategory) {
        if (selectIndex !== -1) {
            courseCategory = {
                ...courseCategory,
                id: items[selectIndex]._id,
                description: desc.replaceAll('"', "'").replaceAll('\n', ""),
            }
            dispatch(updateCourseCategory(courseCategory, param));
        } else {

            courseCategory = {
                ...courseCategory,
                description: desc.replaceAll('"', "'").replaceAll('\n', ""),
            }
            dispatch(addCourseCategory(courseCategory));
            param = {
                ...param,
                page: 1,
                size: 10
            }
        }
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
                status: items[selectIndex].status,
            };
        } else {
            return {
                status: "active"
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
        title={<IntlMessages id="admin.user.categoryCourse.info"/>}
        visible={hasShowModal && action !== "delete"}
        footer={
            <Button type="primary" form="add-edit-form" htmlType="submit">{<IntlMessages
                id="admin.user.form.save"/>}</Button>
        }
        onCancel={showModal}
        bodyStyle={{overflowY: "scroll", height: "550px"}}
        centered
        width={1250}>
        <Form
            onFinish={onSubmit}
            id="add-edit-form"
            initialValues={getInitValueModal()}>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.categoryCourse.table.name"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.categoryCourse.form.name"/>,
                            },
                        ]}>
                        <Input placeholder="Toeic"/>
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
        <Card title={<h2><IntlMessages id="admin.user.categoryCourse.title"/></h2>}
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
                               key: "_id",
                               title: <IntlMessages id="admin.user.student.table.id"/>,
                               dataIndex: "_id",
                               width: 250,
                               sorter: true
                           },
                           {
                               key: "name",
                               title: <IntlMessages id="admin.categoryCourse.table.name"/>,
                               dataIndex: "name",
                               width: 250,
                               sorter: true
                           },
                           {
                               key: "status",
                               title: <IntlMessages id="admin.categoryCourse.table.status"/>,
                               dataIndex: "status",
                               render: (status) => getStatusTagV2(status),
                               width: 100,
                               sorter: true,
                           },
                           {
                               key: "create_date",
                               title: <IntlMessages id="admin.user.student.table.createdDate"/>,
                               dataIndex: "create_date",
                               render: (create_date) => getDate(create_date),
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

export default CourseCategoryPage;
