import React, {useEffect} from "react";
import {Card, Form, Table} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import {
    getListMember,
} from "../../../appRedux/actions";
import {connect} from "react-redux";

const columns = [
    {
        title: <IntlMessages id="admin.user.student.table.index"/>,
        dataIndex: "index",
        render: (text, record, index) => index + 1,
        width: '10%',
    },
    {
        title: <IntlMessages id="admin.user.student.table.id"/>,
        dataIndex: "name",
        width: "20%"
    },
    {
        title: <IntlMessages id="admin.user.student.table.name"/>,
        dataIndex: "name",
        width: "30%"
    },
    {
        title: <IntlMessages id="admin.user.student.table.email"/>,
        dataIndex: "name",
        width: "20%"
    },
    {
        title: <IntlMessages id="admin.user.student.table.createdDate"/>,
        dataIndex: "name",
        width: "20%"
    },
];

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

function StudentPage() {
    useEffect(() => {
        const param = {
            page: 1,
            size: 10
        }
        getListMember(param);
    });
    return (
        <Card title={<IntlMessages id="admin.user.student.title"/>}>
            <Table dataSource={data} columns={columns} scroll={{y: 520}} pagination={{
                size: "small",
                total: 1000,
                showSizeChanger: true,
                showQuickJumper: true,
                defaultPageSize: 10,
                pageSizeOptions: ["10", "15", "20"]
            }}/>
        </Card>
    );
}

const WrappedNormalLoginForm = Form.create()(StudentPage);

const mapStateToProps = ({member}) => {
    const {loader, alertMessage, showMessage, authUser, indexSelected, items, totalItems } = member;
    return {loader, alertMessage, showMessage, authUser, indexSelected, items, totalItems}
};

export default connect(mapStateToProps, {getListMember})(WrappedNormalLoginForm);
