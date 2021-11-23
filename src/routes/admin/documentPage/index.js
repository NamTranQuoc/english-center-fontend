import React, {useEffect, useState} from "react";
import {Button, Card, Col, Dropdown, Form, Input, Menu, Modal, Row, Select, Table, Tag} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {
    addDocument,
    getAllCourse,
    getListDocument,
    onHideModal,
    onSelectIndex,
    onShowModal,
    updateDocument,
} from "../../../appRedux/actions";
import {getFileURL, getItemNameById, getType} from "../../../util/ParseUtils";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import "./index.css";
import Document from "../../../components/uploadFile";
import {Link} from "react-router-dom";

let param = {
    page: 1,
    size: 10,
    sort: {
        is_asc: false,
        field: "_id"
    },
    keyword: "",
    types: null,
}

const CourseCategoryPage = () => {
    const dispatch = useDispatch();
    const {loaderTable, items, totalItems} = useSelector(({getList}) => getList);
    const {hasShowModal, selectIndex} = useSelector(({common}) => common);
    const [action, setAction] = useState("edit");
    const {courses} = useSelector(({course}) => course);
    const [file, setFile] = useState(null);
    const [initFile, setInitFile] = useState(null);

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
        dispatch(getListDocument(param));
    }

    function onSearch(e) {
        param = {
            ...param,
            keyword: e.target.value,
            page: 1
        }
        dispatch(getListDocument(param));
    }

    useEffect(() => {
        dispatch(getListDocument(param));
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
                file: file == null ? null : file.originFileObj,
                path: file == null ? initFile.name : file.name,
            }
            dispatch(updateDocument(values, param));
        } else {
            values = {
                ...values,
                file: file == null ? null : file.originFileObj,
                path: file == null ? initFile.name : file.name,
            }
            dispatch(addDocument(values));
            param = {
                ...param,
                page: 1,
                size: 10
            }
        }
    }

    function showModal() {
        dispatch(onSelectIndex(-1));
        setInitFile(null);
        setAction("edit");
        setFile(null);
        if (hasShowModal) {
            dispatch(onHideModal());
        } else {
            dispatch(onShowModal());
        }
    }

    const getInitValueModal = () => {
        if (selectIndex !== -1 && items != null && items.length > selectIndex) {
            if (initFile == null) {
                setInitFile({
                    uid: '1',
                    name: items[selectIndex].path,
                    status: 'done',
                    url: getFileURL(items[selectIndex].path),
                })
            }
            return {
                course_ids: items[selectIndex].course_ids,
                type: items[selectIndex].type,
                name: items[selectIndex].name,
            };
        } else {
            return {
                course_ids: [],
                type: "doc"
            };
        }
    }

    const menus = (index) => (<Menu onClick={(e) => {
        if (e.key === "download") {
            window.open(getFileURL(items[index].path), "_blank");
        } else if(e.key === "copy") {
            navigator.clipboard.writeText(getFileURL(items[index].path));
        } else {
            setInitFile(null);
            setFile(null);
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
        <Menu.Item key="download"><IntlMessages id="table.download.document"/></Menu.Item>
        <Menu.Item key="copy"><IntlMessages id="table.copy.url.document"/></Menu.Item>
    </Menu>);

    const modal = () => (<Modal
        title={<IntlMessages id="admin.user.document.info"/>}
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
                        label={<IntlMessages id="admin.document.table.name"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.document.form.name"/>,
                            },
                        ]}>
                        <Input placeholder="ETS LC"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<IntlMessages id="admin.document.table.type"/>}
                               name="type"
                               labelCol={{span: 24}}
                               wrapperCol={{span: 24}}
                               rules={[
                                   {
                                       required: true,
                                       message: <IntlMessages id="admin.document.form.type"/>,
                                   },
                               ]}>
                        <Select disabled={selectIndex !== -1}>
                            <Select.Option value="image">{getType("image")}</Select.Option>
                            <Select.Option value="doc">{getType("doc")}</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item
                        label={<IntlMessages id="admin.categoryCourse.table.path"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        rules={[
                            {
                                required: file === null && initFile === null,
                                message: <IntlMessages id="admin.document.form.path"/>,
                            },
                        ]}
                        name="path">
                        <Document setFile={setFile} initFile={initFile}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item
                        label={<IntlMessages id="admin.categoryCourse.table.courseIds"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="course_ids">
                        <Select mode={"multiple"} placeholder={"Select"}>
                            {courses.map(item => {
                                return <Select.Option value={item._id}>{item.name}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>);

    function onFilterCourses(e) {
        const course_ids = Array.isArray(e) ? e.map((x) => x) : []
        param = {
            ...param,
            course_ids: course_ids,
            page: 1
        }
        dispatch(getListDocument(param));
    }

    function onFilterType(e) {
        const types = Array.isArray(e) ? e.map((x) => x) : []
        param = {
            ...param,
            types: types,
            page: 1
        }
        dispatch(getListDocument(param));
    }

    return (
        <Card title={<h2><IntlMessages id="admin.user.document.title"/></h2>}
              extra={<Button type="primary"
                             shape="circle"
                             icon={<PlusOutlined/>}
                             size="large"
                             style={{float: "right"}}
                             onClick={showModal}/>}
              className="gx-card">
            <Form layout="inline" style={{marginBottom: "10px", marginTop: "10px"}}>
                <Form.Item label={<IntlMessages id="admin.categoryCourse.table.courseIds"/>}
                           name="genders"
                           style={{marginLeft: "10px", marginRight: "10px"}}>
                    <IntlMessages id="filter.select">
                        {placeholder =>
                            <Select mode="multiple"
                                    style={{minWidth: "100px"}}
                                    onChange={onFilterCourses}
                                    placeholder={placeholder}>
                                {courses.map(item => {
                                    return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        }
                    </IntlMessages>
                </Form.Item>
                <Form.Item label={<IntlMessages id="admin.document.table.type"/>}
                           name="genders"
                           style={{marginLeft: "10px", marginRight: "10px"}}>
                    <IntlMessages id="filter.select">
                        {placeholder =>
                            <Select mode="multiple"
                                    style={{minWidth: "130px"}}
                                    onChange={onFilterType}
                                    placeholder={placeholder}>
                                <Select.Option value="image">{getType("image")}</Select.Option>
                                <Select.Option value="doc">{getType("doc")}</Select.Option>
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
                               title: <IntlMessages id="admin.categoryCourse.table.name"/>,
                               dataIndex: "name",
                               width: 250,
                               sorter: true
                           },
                           {
                               key: "type",
                               title: <IntlMessages id="admin.categoryCourse.table.type"/>,
                               dataIndex: "type",
                               render: (type) => <Tag color={type === "doc" ? "blue" : "green"}>{getType(type)}</Tag>,
                               width: 200,
                               sorter: true,
                           },
                           {
                               key: "course_ids",
                               title: <IntlMessages id="admin.user.student.table.course_ids"/>,
                               dataIndex: "course_ids",
                               render: (course_ids) => (
                                   <div>
                                       {course_ids.map(item => {
                                           return <Tag color={"yellow"}>{getItemNameById(courses, item)}</Tag>
                                       })}
                                   </div>
                               ),
                               width: 300,
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

export default CourseCategoryPage;
