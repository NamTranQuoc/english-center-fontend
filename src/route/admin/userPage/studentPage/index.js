import React, {useEffect, useState} from "react";
import {Button, Card, Form, Icon, Input, Select, Table} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {getListMember, showLoader} from "../../../../appRedux/actions";
import {connect} from "react-redux";
import {getDate, getGender} from "../../../../util/ParseUtils";
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

function StudentPage(props) {
    const [param, setParam] = useState({
        page: 1,
        size: 10,
        sort: {
            is_asc: true,
            field: "_id"
        },
        types: ["student"],
    })

    function onChange(pagination, filters, sorter) {
        if (sorter != null && sorter.columnKey != null && sorter.order != null) {
            setParam(param => ({
                ...param,
                sort: {
                    is_asc: sorter.order === "ascend",
                    field: sorter.columnKey
                }
            }));
        }
        setParam(param => ({
            ...param,
            page: pagination.current,
            size: pagination.pageSize
        }));
        if (filters.hasOwnProperty("gender")) {
            setParam(param => ({
                ...param,
                genders: filters.gender
            }));
        }
        props.getListMember(param);
    }

    function onSearch(e) {
        const value = e.target.value
        setParam(param => ({
            ...param,
            keyword: value,
        }));
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
        setParam(param => ({
            ...param,
            genders: genders
        }));
        props.getListMember(param);
    }

    return (
        <Card title={<h2><IntlMessages id="admin.user.student.title"/></h2>}
            extra={<Button type="primary" shape="circle" icon="plus" size="large" style={{float: "right"}} />}>
            <Form layout="inline" style={{marginBottom: "10px", marginTop: "10px"}}>
                <Form.Item label={<IntlMessages id="admin.user.student.table.gender"/>}
                           name="genders"
                           style={{marginLeft: "10px", marginRight: "10px"}}>
                    <Select mode="multiple" style={{minWidth: "100px"}} onChange={onFilterGender}>
                        <Select.Option key="male">{getGender("male")}</Select.Option>
                        <Select.Option key="female">{getGender("female")}</Select.Option>
                        <Select.Option key="other">{getGender("other")}</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label={<IntlMessages id="admin.user.student.table.createdDate"/>}
                           name="createdDate">
                    <RangePicker showTime style={{width: "auto"}}/>
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
        </Card>
    );
}

const WrappedNormalLoginForm = Form.create()(StudentPage);

const mapStateToProps = ({getList, common}) => {
    const {loaderTable, items, totalItems} = getList;
    const {alertMessage, showMessage} = common;
    return {loaderTable, alertMessage, showMessage, items, totalItems}
};

export default connect(mapStateToProps, {getListMember, showLoader})(WrappedNormalLoginForm);
