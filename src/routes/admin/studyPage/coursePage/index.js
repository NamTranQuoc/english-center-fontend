import React, {useEffect, useState} from "react";
import {Button, Card, Col, Dropdown, Form, Input, Menu, Modal, Row, Select, Table} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllCourseCategory,
    getListCourse,
    getListCourseCategory,
    onHideModal,
    onSelectIndex,
    onShowModal,
} from "../../../../appRedux/actions";
import {getImageURL, getItemNameById} from "../../../../util/ParseUtils";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import moment from 'moment';
import "../index.css";
import DeleteModal from "./deleteModal";
import MyEditor from "../../../../components/editor";

moment.updateLocale('vi', {
    weekdaysMin: ["Cn", "T2", "T3", "T4", "T5", "T6", "T7"],
    monthsShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
});

//const {RangePicker} = DatePicker;
let param = {
    page: 1,
    size: 10,
    sort: {
        is_asc: false,
        field: "_id"
    },
    keyword: "",
    genders: []
}

const CoursePage = () => {
    const dispatch = useDispatch();
    const {loaderTable, items, totalItems} = useSelector(({getList}) => getList);
    const {hasShowModal, selectIndex} = useSelector(({common}) => common);
    const [urlAvatar, setUrlAvatar] = useState(null);
    const [action, setAction] = useState("edit");
    const {courseCategories} = useSelector(({courseCategory}) => courseCategory);

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
        dispatch(getListCourse(param));
    }

    function onSearch(e) {
        param = {
            ...param,
            keyword: e.target.value,
            page: 1
        }
        dispatch(getListCourse(param));
    }

    useEffect(() => {
        dispatch(getListCourse(param));
        dispatch(getAllCourseCategory());
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
        dispatch(getListCourseCategory(param));
    }

    function onSubmit(member) {
        //dispatch(uploadFile(file, "text.doc"));
        /*if (selectIndex !== -1) {
            member = {
                ...member,
                _id: items[selectIndex]._id,
                dob: member.dob.unix() * 1000,
                type: "student",
                avatar: image
            }
            dispatch(updateMember(member, param));
        } else {
            member = {
                ...member,
                dob: member.dob.unix() * 1000,
                type: "student",
                avatar: image
            }
            dispatch(addMember(member));
            param = {
                ...param,
                page: 1
            }
        }*/
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
                getImageURL(items[selectIndex].avatar).then(value => {
                    if (value !== "") {
                        setUrlAvatar(value);
                    }
                });
            }
            return {
                name: items[selectIndex].name,
                gender: items[selectIndex].gender,
                phone_number: items[selectIndex].phone_number,
                email: items[selectIndex].email,
                dob: moment.unix(items[selectIndex].dob / 1000),
                address: items[selectIndex].address
            };
        } else {
            return {
                gender: "male",
                address: "",
                dob: moment()
            };
        }
    }

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
        <Menu.Item key="delete"><IntlMessages id="admin.user.form.delete"/></Menu.Item>
    </Menu>);

    const modal = () => (<Modal
        title={<IntlMessages id="admin.user.form.course.title"/>}
        visible={hasShowModal && action !== "delete"}
        footer={
            <Button type="primary" form="add-edit-form" htmlType="submit">{<IntlMessages
                id="admin.user.form.save"/>}</Button>
        }
        onCancel={showModal}
        bodyStyle={{overflowY: "scroll", height: "550px"}}
        centered
        width={1200}>
        <Form
            onFinish={onSubmit}
            id="add-edit-form"
            initialValues={getInitValueModal()}>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.course.table.name"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.course.form.name"/>,
                            },
                        ]}>
                        <Input placeholder="Toeic 600+"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<IntlMessages id="admin.course.table.type"/>}
                               name="type"
                               labelCol={{span: 24}}
                               wrapperCol={{span: 24}}
                               rules={[
                                   {
                                       required: true,
                                       message: <IntlMessages id="admin.course.form.type"/>,
                                   },
                               ]}>
                        <Select>
                            {courseCategories.map(item => {
                                return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.course.table.numberOfShift"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.course.form.numberOfShift"/>,
                            },
                        ]}>
                        <Input placeholder="60"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.course.table.tuition"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.course.form.tuition"/>,
                            },
                        ]}>
                        <Input placeholder="2000000"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item
                        label={<IntlMessages id="admin.categoryCourse.table.description"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="address">
                        <MyEditor />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>);

    return (
        <Card title={<h2><IntlMessages id="admin.user.course.title"/></h2>}
              extra={<Button type="primary"
                             shape="circle"
                             icon={<PlusOutlined/>}
                             size="large"
                             style={{float: "right"}}
                             onClick={showModal}/>}
              className="gx-card">
            <Form layout="inline" style={{marginBottom: "10px", marginTop: "10px"}}>
                <Form.Item label={<IntlMessages id="admin.course.table.type"/>}
                           name="genders"
                           style={{marginLeft: "10px", marginRight: "10px"}}>
                    <IntlMessages id="filter.select">
                        {placeholder =>
                            <Select mode="multiple"
                                    style={{minWidth: "100px"}}
                                    onChange={onFilterGender}
                                    placeholder={placeholder}>
                                {courseCategories.map(item => {
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
                               key: "_id",
                               title: <IntlMessages id="admin.user.student.table.id"/>,
                               dataIndex: "_id",
                               width: 250,
                               sorter: true
                           },
                           {
                               key: "name",
                               title: <IntlMessages id="admin.course.table.name"/>,
                               dataIndex: "name",
                               width: 200,
                               sorter: true
                           },
                           {
                               key: "category_course_id",
                               title: <IntlMessages id="admin.course.table.type"/>,
                               dataIndex: "category_course_id",
                               render: (category_course_id) => getItemNameById(courseCategories, category_course_id),
                               width: 150,
                               sorter: true,
                           },
                           {
                               key: "number_of_shift",
                               title: <IntlMessages id="admin.course.table.numberOfShift"/>,
                               dataIndex: "number_of_shift",
                               width: 120,
                               sorter: true
                           },
                           {
                               key: "tuition",
                               title: <IntlMessages id="admin.course.table.tuition"/>,
                               dataIndex: "tuition",
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
        </Card>
    );
};

export default CoursePage;
