import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Form, Icon, Input, Modal, Row, Select, Table} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {getListMember, showLoader} from "../../../../appRedux/actions";
import {connect} from "react-redux";
import {getDate, getGender} from "../../../../util/ParseUtils";
import TextArea from "antd/es/input/TextArea";

const {RangePicker} = DatePicker;

let param = {
    page: 1,
    size: 10,
    sort: {
        is_asc: true,
        field: "_id"
    },
    types: ["student"],
    keyword: "",
    genders: []
}

function StudentPage(props) {
    const [showModal, setShowModal] = useState(false);
    const [style, setStyle] = useState("150px");

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
        props.getListMember(param);
    }

    function onSearch(e) {
        param = {
            ...param,
            keyword: e.target.value,
            page: 1
        }
        props.getListMember(param);
    }

    useEffect(() => {
        if (props.items.length === 0) {
            props.getListMember(param);
        }
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
        props.getListMember(param);
    }

    function onFilterDate(dates) {
        if (dates !== null && dates.length > 0) {
            setStyle("370px");
            param = {
                ...param,
                from_date: dates[0].unix() * 1000,
                to_date: dates[1].unix() * 1000,
                page: 1
            }
            props.getListMember(param);
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
            props.getListMember(param);
        }
    }

    function onShow() {
        console.log(showModal);
        setShowModal(!showModal);
    }

    return (
        <Card title={<h2><IntlMessages id="admin.user.student.title"/></h2>}
              extra={<Button type="primary" shape="circle" icon="plus" size="large" style={{float: "right"}}
                             onClick={onShow}/>}>
            <Form layout="inline" style={{marginBottom: "10px", marginTop: "10px"}}>
                <Form.Item label={<IntlMessages id="admin.user.student.table.gender"/>}
                           name="genders"
                           style={{marginLeft: "10px", marginRight: "10px"}}>
                    <IntlMessages id="filter.select">
                        {placeholder => <Select mode="multiple" style={{minWidth: "100px"}} onChange={onFilterGender}
                                                placeholder={placeholder}>
                            <Select.Option key="male">{getGender("male")}</Select.Option>
                            <Select.Option key="female">{getGender("female")}</Select.Option>
                            <Select.Option key="other">{getGender("other")}</Select.Option>
                        </Select>
                        }
                    </IntlMessages>
                </Form.Item>
                <Form.Item label={<IntlMessages id="admin.user.student.table.createdDate"/>}
                           name="createdDate">
                    <RangePicker showTime style={{width: style}}
                                 onOk={onFilterDate}
                                 onChange={onChangeDatePicker}
                                 placeholder={props.locale.locale === "vi" ? ["Từ", "Đến"] : ["From", "To"]}
                    />
                </Form.Item>
            </Form>
            <IntlMessages id="table.search">
                {placeholder => <Input
                    placeholder={placeholder}
                    prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    onPressEnter={onSearch}
                />}
            </IntlMessages>
            <Table dataSource={props.items}
                   columns={
                       [
                           {
                               key: "index",
                               title: <IntlMessages id="admin.user.student.table.index"/>,
                               dataIndex: "index",
                               render: (text, record, index) => index + 1,
                               width: '10%',
                           },
                           {
                               key: "_id",
                               title: <IntlMessages id="admin.user.student.table.id"/>,
                               dataIndex: "_id",
                               width: "25%",
                               sorter: true
                           },
                           {
                               key: "name",
                               title: <IntlMessages id="admin.user.student.table.name"/>,
                               dataIndex: "name",
                               width: "20%",
                               sorter: true
                           },
                           {
                               key: "gender",
                               title: <IntlMessages id="admin.user.student.table.gender"/>,
                               dataIndex: "gender",
                               render: (gender) => getGender(gender),
                               width: "10%",
                               sorter: true,
                           },
                           {
                               key: "email",
                               title: <IntlMessages id="admin.user.student.table.email"/>,
                               dataIndex: "email",
                               width: "20%",
                               sorter: true
                           },
                           {
                               key: "create_date",
                               title: <IntlMessages id="admin.user.student.table.createdDate"/>,
                               dataIndex: "create_date",
                               render: (create_date) => getDate(create_date),
                               width: "15%",
                               sorter: true
                           },
                       ]
                   }
                   loading={props.loaderTable}
                   onChange={onChange}
                   scroll={{y: 520}} pagination={
                {
                    size: "small",
                    total: props.totalItems,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: showTotalItems,
                    defaultPageSize: 10,
                    pageSizeOptions: ["10", "15", "20"]
                }
            }/>
            <Modal
                title="Thông tin loại khóa học"
                visible={showModal}
                footer={
                    <Button type="primary" form={"normal_login"} htmlType="submit">Lưu</Button>
                }
                onCancel={onShow}
            >
                <Form
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label={"Tên loại khóa học"}
                                name="category_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên loại khóa học!',
                                    },
                                ]}
                            >
                                <Input placeholder="Toeic"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Trạng thái"
                                       name="status"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Vui lòng nhập tên loại khóa học!',
                                           },
                                       ]}>
                                <Select>
                                    <Select.Option value="ACTIVE">Hoạt động</Select.Option>
                                    <Select.Option value="INACTIVE">Không hoạt động</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item label={"Mô tả"} name="description">
                                <TextArea rows={4}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Card>
    );
}

const WrappedNormalLoginForm = Form.create()(StudentPage);

const mapStateToProps = ({getList, common, settings}) => {
    const {loaderTable, items, totalItems} = getList;
    const {alertMessage, showMessage} = common;
    const {locale} = settings;
    return {loaderTable, alertMessage, showMessage, items, totalItems, locale}
};

export default connect(mapStateToProps, {getListMember, showLoader})(WrappedNormalLoginForm);
