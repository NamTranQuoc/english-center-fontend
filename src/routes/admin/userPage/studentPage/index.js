import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Dropdown, Form, Input, Menu, Modal, Row, Select, Table, Tooltip} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {
    addMember, exportMember,
    getListMember,
    importUpdateScoreFile,
    onHideModal,
    onSelectIndex,
    onShowModal,
    showMessage,
    updateMember
} from "../../../../appRedux/actions";
import {getDate, getGender, getImageURL, getStatusTagV2, getStatusV2} from "../../../../util/ParseUtils";
import {DownloadOutlined, PlusOutlined, SearchOutlined, UploadOutlined} from "@ant-design/icons";
import Image from "../../../../components/uploadImage";
import moment from 'moment';
import "../index.css";
import DeleteModal from "./deleteModal";
import Document from "../../../../components/uploadFile";

moment.updateLocale('vi', {
    weekdaysMin: ["Cn", "T2", "T3", "T4", "T5", "T6", "T7"],
    monthsShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
});

const {RangePicker} = DatePicker;
let param = {
    page: 1,
    size: 10,
    sort: {
        is_asc: false,
        field: "_id"
    },
    types: ["student"],
    keyword: "",
    genders: []
}

const StudentPage = () => {
    const dispatch = useDispatch();
    const {loaderTable, items, totalItems} = useSelector(({getList}) => getList);
    const {locale} = useSelector(({settings}) => settings);
    const {hasShowModal, selectIndex} = useSelector(({common}) => common);
    const [style, setStyle] = useState("150px");
    const [image, setImage] = useState(null);
    const [urlAvatar, setUrlAvatar] = useState(null);
    const [action, setAction] = useState("edit");
    const [hasShowModalImport, setHasShowModalImport] = useState(false);
    const [file, setFile] = useState(null);

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
        dispatch(getListMember(param));
    }

    useEffect(() => {
        dispatch(getListMember(param));
        // eslint-disable-next-line
    }, []);

    function showTotalItems(total) {
        return <span><IntlMessages id="table.total.items"/>: {total}</span>;
    }

    function onFilterGender(e) {
        const genders = Array.isArray(e) ? e.map((x) => x) : []
        param = {
            ...param,
            genders: genders,
            page: 1
        }
        dispatch(getListMember(param));
    }

    function onFilterDate(dates) {
        if (dates !== null && dates[0] != null && dates[1] != null) {
            setStyle("370px");
            param = {
                ...param,
                from_date: dates[0].unix() * 1000,
                to_date: dates[1].unix() * 1000,
                page: 1
            }
            dispatch(getListMember(param));
        }
    }

    function onChangeDatePicker(dates) {
        if (dates === null || dates.length === 0) {
            setStyle("150px");
            param = {
                ...param,
                from_date: null,
                to_date: null,
                page: 1
            }
            dispatch(getListMember(param));
        }
    }

    function onSubmit(member) {
        console.log(member);
        if (selectIndex !== -1) {
            member = {
                ...member,
                _id: items[selectIndex]._id,
                dob: member.dob.unix() * 1000,
                type: "student",
                avatar: image,
                guardian: {
                    name: member.guardian_name,
                    phone_number: member.guardian_phone_number,
                    relationship: member.guardian_relationship
                }
            }
            dispatch(updateMember(member, param));
        } else {
            member = {
                ...member,
                dob: member.dob.unix() * 1000,
                type: "student",
                avatar: image,
                guardian: {
                    name: member.guardian_name,
                    phone_number: member.guardian_phone_number,
                    relationship: member.guardian_relationship
                }
            }
            dispatch(addMember(member));
            param = {
                ...param,
                size: 10,
                page: 1,
                sort: {
                    is_asc: false,
                    field: "_id"
                },
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
                name: items[selectIndex].name,
                gender: items[selectIndex].gender,
                phone_number: items[selectIndex].phone_number,
                email: items[selectIndex].email,
                dob: moment.unix(items[selectIndex].dob / 1000),
                address: items[selectIndex].address,
                current_score: items[selectIndex].current_score.total,
                input_score: items[selectIndex].input_score.total,
                note: items[selectIndex].note,
                guardian_relationship: items[selectIndex].guardian.relationship,
                guardian_phone_number: items[selectIndex].guardian.phone_number,
                guardian_name: items[selectIndex].guardian.name,
                status: items[selectIndex].status
            };
        } else {
            return {
                gender: "male",
                address: "",
                dob: moment(),
                current_score: 0,
                input_score: 0,
                status: "active"
            };
        }
    }

    function onShowModalImportFile() {
        setHasShowModalImport(!hasShowModalImport);
    }

    async function onSubmitImportFile() {
        const pathFile = "import-" + moment().unix() + ".xlsx";
        try {
            if (file === null) {
                // eslint-disable-next-line
                throw "param_not_null";
            } else {
                const e = file.name.split(".")
                if (e[1] !== "xlsx") {
                    // eslint-disable-next-line
                    throw "type_deny";
                }
                dispatch(importUpdateScoreFile(file.originFileObj, pathFile));
                param = {
                    page: 1,
                    size: 10,
                    sort: {
                        is_asc: false,
                        field: "_id"
                    }
                }
            }
            onShowModalImportFile();
        } catch (e) {
            dispatch(showMessage(e));
        }
    }

    const modalImportFile = () => (<Modal
        title={<IntlMessages id="admin.upload.file.title"/>}
        visible={hasShowModalImport}
        footer={
            <Button type="primary" form="import-file-form" htmlType="submit">{<IntlMessages
                id="admin.user.form.save"/>}</Button>
        }
        onCancel={onShowModalImportFile}
        centered
        width={300}>
        <Form
            onFinish={onSubmitImportFile}
            id="import-file-form">
            <Document setFile={setFile} initFile={null}/>
        </Form>
    </Modal>);

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
        title={<>
            <span>
                <IntlMessages id="admin.user.form.student.title"/>
            </span>
            <span style={{marginLeft: "4px", fontSize: "15px", fontWeight: "bold"}}>
                <i>{selectIndex !== -1 ? items[selectIndex].code : ""}</i>
            </span></>}
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
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.student.table.name"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.user.form.name"/>,
                            },
                        ]}>
                        <Input placeholder="Nguyen Van A"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.student.table.nick_name"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="nick_name">
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item label={<IntlMessages id="admin.user.student.table.gender"/>}
                               name="gender"
                               labelCol={{span: 24}}
                               wrapperCol={{span: 24}}
                               rules={[
                                   {
                                       required: true,
                                       message: <IntlMessages id="admin.user.form.gender"/>,
                                   },
                               ]}>
                        <Select>
                            <Select.Option value="male">{getGender("male")}</Select.Option>
                            <Select.Option value="female">{getGender("female")}</Select.Option>
                            <Select.Option value="other">{getGender("other")}</Select.Option>
                        </Select>
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
                        <Select disabled={selectIndex === -1}>
                            <Select.Option value="active">{getStatusV2("active")}</Select.Option>
                            <Select.Option value="block">{getStatusV2("block")}</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.student.table.phoneNumber"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="phone_number"
                        rules={[
                            {
                                required: false,
                                message: <IntlMessages id="admin.user.form.phoneNumber"/>,
                                pattern: new RegExp("[0-9]{10}"),
                            },
                        ]}>
                        <Input placeholder="0987654321"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.student.table.dob"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="dob"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.user.form.dob"/>,
                            },
                        ]}>
                        <DatePicker style={{width: "100%"}} format={'DD/MM/YYYY'}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row style={selectIndex === -1 ? {display: "none"} : {}}>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.student.table.input_score"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="input_score"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.user.form.input_score"/>,
                            },
                        ]}>
                        <Input placeholder="0" disabled={true}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.student.table.current_score"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="current_score"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.user.form.current_score"/>,
                            },
                        ]}>
                        <Input placeholder="0" disabled={true}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.student.table.email"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.user.form.email"/>,
                                type: "email"
                            },
                        ]}>
                        <Input placeholder="nguyenvan@gmail.com" disabled={selectIndex !== -1}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.student.table.guardian_name"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="guardian_name">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.student.table.guardian_phone_number"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="guardian_phone_number"
                        rules={[
                            {
                                required: false,
                                message: <IntlMessages id="admin.user.form.phoneNumber"/>,
                                pattern: new RegExp("[0-9]{10}"),
                            },
                        ]}>
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.student.table.guardian_relationship"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="guardian_relationship">
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.student.table.note"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="note">
                        <Input.TextArea rows={4}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.student.table.address"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="address">
                        <Input.TextArea rows={4}/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>);

    function onExportMember() {
        dispatch(exportMember(param));
    }

    return (
        <Card title={<h2><IntlMessages id="admin.user.student.title"/></h2>}
              extra={<>
                  <Tooltip placement="bottom" title={<IntlMessages id="admin.button.add"/>}>
                      <Button type="primary"
                              shape="circle"
                              icon={<PlusOutlined/>}
                              size="large"
                              style={{float: "right"}}
                              onClick={showModal}/>
                  </Tooltip>
                  <Tooltip placement="bottom" title={<IntlMessages id="admin.button.import"/>}>
                      <Button type="primary"
                              shape="circle"
                              icon={<UploadOutlined/>}
                              size="large"
                              style={{float: "right", marginRight: "10px"}}
                              onClick={onShowModalImportFile}/>
                  </Tooltip>
                  <Tooltip placement="bottom" title={<IntlMessages id="admin.button.export"/>}>
                      <Button type="primary"
                              shape="circle"
                              icon={<DownloadOutlined/>}
                              size="large"
                              style={{float: "right", marginRight: "10px"}}
                              onClick={onExportMember}/>
                  </Tooltip>
              </>}
              className="gx-card">
            <Form layout="inline" style={{marginBottom: "10px", marginTop: "10px"}}>
                <Form.Item label={<IntlMessages id="admin.user.student.table.gender"/>}
                           name="genders"
                           style={{marginLeft: "10px", marginRight: "10px"}}>
                    <IntlMessages id="filter.select">
                        {placeholder =>
                            <Select mode="multiple"
                                    style={{minWidth: "100px"}}
                                    onChange={onFilterGender}
                                    placeholder={placeholder}>
                                <Select.Option key="male" value="male">{getGender("male")}</Select.Option>
                                <Select.Option key="female" value="female">{getGender("female")}</Select.Option>
                                <Select.Option key="other" value="other">{getGender("other")}</Select.Option>
                            </Select>
                        }
                    </IntlMessages>
                </Form.Item>
                <Form.Item label={<IntlMessages id="admin.user.student.table.createdDate"/>}
                           name="createdDate">
                    <RangePicker showTime style={{width: style}}
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
                               key: "status",
                               title: <IntlMessages id="admin.categoryCourse.table.status"/>,
                               dataIndex: "status",
                               render: (status) => getStatusTagV2(status),
                               width: 120,
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
            <DeleteModal showModal={showModal} getInitValueModal={getInitValueModal} urlAvatar={urlAvatar}
                         action={action} param={param}/>}
            {hasShowModalImport && modalImportFile()}
        </Card>
    );
};

export default StudentPage;
