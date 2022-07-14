import React, {useEffect} from "react";
import {Card, Dropdown, Form, Input, Menu, Select, Table, Tag} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {getAllCourse, getListDocument,} from "../../../appRedux/actions";
import {getFileURL, getItemNameById, getType} from "../../../util/ParseUtils";
import {SearchOutlined} from "@ant-design/icons";
import "./index.css";

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

const DocumentPage = () => {
    const dispatch = useDispatch();
    const {loaderTable, items, totalItems} = useSelector(({getList}) => getList);
    const {courses} = useSelector(({course}) => course);

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

    const menus = (index) => (<Menu onClick={(e) => {
        if (e.key === "download") {
            window.open(getFileURL(items[index].path), "_self");
        } else if (e.key === "copy") {
            navigator.clipboard.writeText(getFileURL(items[index].path));
        }
    }}>
        <Menu.Item key="download"><IntlMessages id="table.download.document"/></Menu.Item>
        <Menu.Item key="copy"><IntlMessages id="table.copy.url.document"/></Menu.Item>
    </Menu>);

    function onFilterCourses(e) {
        const course_ids = Array.isArray(e) ? e.map((x) => x) : []
        param = {
            ...param,
            course_ids: course_ids,
            page: 1
        }
        dispatch(getListDocument(param));
    }

    return (
        <Card title={<h2><IntlMessages id="admin.user.document.title"/></h2>}
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
                               width: 250,
                               sorter: true
                           },
                           {
                               key: "name",
                               title: <IntlMessages id="admin.document.table.name"/>,
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
        </Card>
    );
};

export default DocumentPage;
