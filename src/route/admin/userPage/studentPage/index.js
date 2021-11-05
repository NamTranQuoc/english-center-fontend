import React, {useEffect} from "react";
import {Card, Form, Table} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {getListMember, showLoader} from "../../../../appRedux/actions";
import {connect} from "react-redux";
import {getDate, getGender} from "../../../../util/ParseUtils";

const columns = [
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
        filters: [
            {
                text: getGender("male"),
                value: "male",
            },
            {
                text: getGender("female"),
                value: "female",
            },
            {
                text: getGender("other"),
                value: "other",
            }
        ],
        filterSearch: true,
        sorter: true
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
];

function StudentPage(props) {
    let param = {
        page: 1,
        size: 10,
        sort: {
            is_asc: true,
            field: "_id"
        },
        types: ["student"],
    };

    function onChange(pagination, filters, sorter) {
        if (sorter != null && sorter.columnKey != null && sorter.order != null) {
            param = {
                ...param,
                sort: {
                    is_asc: sorter.order === "ascend",
                    field: sorter.columnKey
                },
            };
        }
        param = {
            ...param,
            page: pagination.current,
            size: pagination.pageSize
        }
        console.log();
        if (filters.hasOwnProperty("gender")) {
            param = {
                ...param,
                genders: filters.gender
            }
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

    return (
        <Card title={<IntlMessages id="admin.user.student.title"/>}>
            <Table dataSource={props.items}
                   columns={columns}
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
