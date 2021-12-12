import React, {useEffect} from "react";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import IntlMessages from "../../../util/IntlMessages";
import {Button, Card, Input, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {getDate, getGender} from "../../../util/ParseUtils";
import {getListStudentAbsent, saveAbsent, showMessage} from "../../../appRedux/actions";
import Checkbox from "antd/es/checkbox/Checkbox";

const MusterPage = () => {
    const dispatch = useDispatch();
    const {loaderTable, items, schedule, schedule_id} = useSelector(({getList}) => getList);

    useEffect(() => {
        dispatch(getListStudentAbsent({schedule_id: schedule_id}));
        // eslint-disable-next-line
    }, [])

    const checkBox = (index) => (
        <Checkbox onClick={() => {
            items[index].selected = !items[index].selected
        }} defaultChecked={items[index].selected}/>
    )

    function onSubmit() {
        if (schedule !== null) {
            const ids = items.filter(item => item.selected).map(item => item._id);
            dispatch(saveAbsent({
                schedule_id: schedule._id,
                student_ids: ids
            }));
        } else {
            dispatch(showMessage("param_not_null"));
        }
    }

    return (
        <Card title={<h2><IntlMessages id="admin.user.muster.title"/></h2>}
              extra={<Button type={"primary"} onClick={onSubmit}><IntlMessages id="admin.user.form.save"/></Button>}
              className="gx-card">
            <IntlMessages id="table.search">
                {placeholder => <Input
                    placeholder={placeholder}
                    prefix={<SearchOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                    // onPressEnter={onSearch}
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
                               key: "email",
                               title: <IntlMessages id="admin.user.student.table.email"/>,
                               dataIndex: "email",
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
                               key: "action",
                               title: <IntlMessages id="admin.user.student.table.absent"/>,
                               dataIndex: "index",
                               render: (text, record, index) => checkBox(index),
                               fixed: 'right',
                               align: "center",
                               width: 80,
                           },
                       ]
                   }
                   loading={loaderTable}
                   scroll={{y: 520}}
                   pagination={false}/>
        </Card>
    );
};

export default MusterPage;
