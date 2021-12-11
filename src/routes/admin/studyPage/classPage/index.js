import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    Col,
    DatePicker,
    Dropdown,
    Form,
    Input,
    Menu,
    Modal,
    Row,
    Select,
    Table,
    Tag,
    Tooltip
} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {
    addClass,
    exportRegister,
    generateSchedule,
    getAllCourse,
    getAllCourseByStatus,
    getAllMemberByTypeAndStatus,
    getAllRoomsByStatus,
    getAllShift,
    getListClass,
    onHideModal,
    onSelectIndex,
    onShowModal,
    updateClass
} from "../../../../appRedux/actions";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import "../index.css";
import moment from "moment";
import {getDate, getDOW, getItemNameById, getStatusTagV2, getStatusV2} from "../../../../util/ParseUtils";

let param = {
    page: 1,
    size: 10,
    sort: {
        is_asc: false,
        field: "_id"
    },
    types: ["teacher"],
    keyword: "",
    genders: []
}

moment.updateLocale('vi', {
    weekdaysMin: ["Cn", "T2", "T3", "T4", "T5", "T6", "T7"],
    monthsShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
});

const MyDOW = [2, 3, 4, 5, 6, 7, 1];

const ClassPage = () => {
    const dispatch = useDispatch();
    const {loaderTable, items, totalItems} = useSelector(({getList}) => getList);
    const {roomsByStatus} = useSelector(({room}) => room);
    const {membersByStatus} = useSelector(({teacher}) => teacher);
    const {hasShowModal, selectIndex} = useSelector(({common}) => common);
    const {locale} = useSelector(({settings}) => settings);
    const [action, setAction] = useState("edit");
    const {courses} = useSelector(({course}) => course);
    const {shifts} = useSelector(({shift}) => shift);
    const [style, setStyle] = useState("150px");
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const {coursesAdd} = useSelector(({course}) => course);

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
        dispatch(getListClass(param));
    }

    function onSearch(e) {
        param = {
            ...param,
            keyword: e.target.value,
            page: 1
        }
        dispatch(getListClass(param));
    }

    useEffect(() => {
        dispatch(getListClass(param));
        dispatch(getAllShift());
        dispatch(getAllCourse());
        dispatch(getAllCourseByStatus("active"))
        // eslint-disable-next-line
    }, []);

    function showTotalItems(total) {
        return <span><IntlMessages id="table.total.items"/>: {total}</span>;
    }

    function onFilterDate(dates) {
        if (dates !== null && dates[0] != null && dates[1] != null) {
            setStyle("370px");
            param = {
                ...param,
                start_from_date: dates[0].unix() * 1000,
                start_to_date: dates[1].unix() * 1000,
                page: 1
            }
            dispatch(getListClass(param));
        }
    }

    function onChangeDatePicker(dates) {
        if (dates === null || dates.length === 0) {
            setStyle("150px");
            param = {
                ...param,
                start_from_date: null,
                start_to_date: null,
                page: 1
            }
            dispatch(getListClass(param));
        }
    }

    function onFilterCourse(e) {
        const values = Array.isArray(e) ? e.map((x) => x) : []
        param = {
            ...param,
            course_ids: values,
            page: 1
        }
        dispatch(getListClass(param));
    }

    function onFilterShift(e) {
        const values = Array.isArray(e) ? e.map((x) => x) : []
        param = {
            ...param,
            shift_ids: values,
            page: 1
        }
        dispatch(getListClass(param));
    }

    function onFilterDOW(e) {
        const values = Array.isArray(e) ? e.map((x) => x) : []
        param = {
            ...param,
            dow: values,
            page: 1
        }
        dispatch(getListClass(param));
    }

    function onSubmit(values) {
        if (selectIndex !== -1) {
            values = {
                ...values,
                _id: items[selectIndex]._id,
                start_date: values.start_date.unix() * 1000,
            }
            dispatch(updateClass(values, param));
        } else {
            values = {
                ...values,
                start_date: values.start_date.unix() * 1000,
            }
            dispatch(addClass(values));
            param = {
                ...param,
                page: 1,
                size: 10
            }
        }
    }

    function onSubmitGenerate(values) {
        values = {
            ...values,
            classroom_id: items[selectIndex]._id
        }
        dispatch(generateSchedule(values));
        showModalGenerate();
    }

    function showModal() {
        dispatch(onSelectIndex(-1));
        setAction("edit");
        if (hasShowModal) {
            dispatch(onHideModal());
        } else {
            dispatch(onShowModal());
        }
    }

    const getInitValueModal = () => {
        if (selectIndex !== -1 && items != null && items.length > selectIndex) {
            return {
                name: items[selectIndex].name,
                max_student: items[selectIndex].max_student,
                dow: items[selectIndex].dow,
                course_id: items[selectIndex].course_id,
                start_date: moment.unix(items[selectIndex].start_date / 1000),
                shift_id: items[selectIndex].shift_id,
                status: items[selectIndex].status,
                min_student: items[selectIndex].min_student
            };
        } else {
            return {
                status: "create"
            };
        }
    }

    const menus = (index) => (<Menu onClick={(e) => {
        if (e.key === "export") {
            dispatch(exportRegister(items[index]._id));
        } else if (e.key === "generate") {
            dispatch(onSelectIndex(index));
            showModalGenerate(index)
        } else {
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
        <Menu.Item key="export"><IntlMessages id="admin.button.export"/></Menu.Item>
        {items[index].status === "create" ?
            <Menu.Item key="generate"><IntlMessages id="admin.user.form.generate"/></Menu.Item> : null}
    </Menu>);

    function showModalGenerate(index) {
        if (!showGenerateModal) {
            dispatch(getAllRoomsByStatus("ACTIVE", items[index].max_student));
            dispatch(getAllMemberByTypeAndStatus("teacher", "active", items[index].course_id))
        }
        setShowGenerateModal(!showGenerateModal);
    }

    const modalGenerate = () => (
        <Modal
            title={<IntlMessages id="admin.user.form.generate.title"/>}
            visible={showGenerateModal}
            footer={
                <Button type="primary" form="add-edit-form" htmlType="submit">{<IntlMessages
                    id="admin.user.form.create"/>}</Button>
            }
            onCancel={showModalGenerate}
            centered
            width={500}>
            <Form
                onFinish={onSubmitGenerate}
                id="add-edit-form"
                initialValues={{
                    name: items[selectIndex].name
                }}>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.class.table.name"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="name">
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.room.table.room"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="room_id">
                            <Select
                                showSearch
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {roomsByStatus.map(item => {
                                    return <Select.Option value={item._id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<IntlMessages id="sidebar.managerUser.teacher"/>}
                                   name="teacher_id"
                                   labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                            <Select
                                showSearch
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {membersByStatus.map(item => {
                                    return <Select.Option value={item._id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )

    const modal = () => (<Modal
        title={<IntlMessages id="admin.user.form.class.title"/>}
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
                <Col span={24}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.class.table.name"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.name"/>,
                            },
                        ]}>
                        <Input placeholder="Toeic 550"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.examSchedule.table.min"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="min_student"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.min_student"/>,
                            },
                        ]}>
                        <Input placeholder="10" type={"number"}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.examSchedule.table.max"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="max_student"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.max_student"/>,
                            },
                        ]}>
                        <Input placeholder="20" type={"number"}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.class.table.course"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="course_id"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.course"/>,
                            },
                        ]}>
                        <Select placeholder={"Select"} disabled={selectIndex !== -1}>
                            {coursesAdd.map(item => {
                                return <Select.Option value={item._id}>{item.name}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.class.table.startDate"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="start_date"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.startDate"/>,
                            },
                        ]}>
                        <DatePicker style={{width: "100%"}} format={'DD/MM/YYYY'}
                                    disabled={selectIndex !== -1 && items[selectIndex].status !== "create"}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.class.table.dow"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="dow"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.dow"/>,
                            },
                        ]}>
                        <Select placeholder={"Select"} mode={"multiple"} disabled={selectIndex !== -1}>
                            {MyDOW.map(item => {
                                return <Select.Option value={item}>{getDOW(item)}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label={<IntlMessages id="admin.user.class.table.shift"/>}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="shift_id"
                        rules={[
                            {
                                required: true,
                                message: <IntlMessages id="admin.class.form.shift"/>,
                            },
                        ]}>
                        <Select placeholder={"Select"} disabled={selectIndex !== -1}>
                            {shifts.map(item => {
                                return <Select.Option value={item._id}>{item.name}</Select.Option>
                            })}
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
                        <Select disabled={selectIndex !== -1 && items[selectIndex].status !== "create"}>
                            <Select.Option value="create" disabled={true}>{getStatusV2("create")}</Select.Option>
                            <Select.Option value="register" disabled={true}>{getStatusV2("register")}</Select.Option>
                            <Select.Option value="coming" disabled={true}>{getStatusV2("coming")}</Select.Option>
                            <Select.Option value="cancel">{getStatusV2("cancel")}</Select.Option>
                            <Select.Option value="finish" disabled={true}>{getStatusV2("finish")}</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>);

    return (
        <Card title={<h2><IntlMessages id="admin.user.classroom.title"/></h2>}
              extra={<Tooltip placement="bottom" title={<IntlMessages id="admin.button.add"/>}>
                  <Button type="primary"
                          shape="circle"
                          icon={<PlusOutlined/>}
                          size="large"
                          style={{float: "right"}}
                          onClick={showModal}/>
              </Tooltip>}
              className="gx-card">
            <Form layout="inline" style={{marginBottom: "10px", marginTop: "10px"}}>
                <Form.Item label={<IntlMessages id="admin.user.class.table.course"/>}
                           name="course_ids"
                           style={{marginLeft: "10px", marginRight: "10px"}}>
                    <IntlMessages id="filter.select">
                        {placeholder =>
                            <Select mode="multiple"
                                    style={{minWidth: "100px"}}
                                    onChange={onFilterCourse}
                                    placeholder={placeholder}>
                                {courses.map(item => {
                                    return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        }
                    </IntlMessages>
                </Form.Item>
                <Form.Item label={<IntlMessages id="admin.user.class.table.shift"/>}
                           name="shift_ids"
                           style={{marginLeft: "10px", marginRight: "10px"}}>
                    <IntlMessages id="filter.select">
                        {placeholder =>
                            <Select mode="multiple"
                                    style={{minWidth: "100px"}}
                                    onChange={onFilterShift}
                                    placeholder={placeholder}>
                                {shifts.map(item => {
                                    return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        }
                    </IntlMessages>
                </Form.Item>
                <Form.Item label={<IntlMessages id="admin.user.class.table.dow"/>}
                           name="dow"
                           style={{marginLeft: "10px", marginRight: "10px"}}>
                    <IntlMessages id="filter.select">
                        {placeholder =>
                            <Select mode="multiple"
                                    style={{minWidth: "100px"}}
                                    onChange={onFilterDOW}
                                    placeholder={placeholder}>
                                {MyDOW.map(item => {
                                    return <Select.Option key={item} value={item}>{getDOW(item)}</Select.Option>
                                })}
                            </Select>
                        }
                    </IntlMessages>
                </Form.Item>
                <Form.Item label={<IntlMessages id="admin.user.class.table.startDate"/>}
                           name="createdDate">
                    <DatePicker.RangePicker showTime style={{width: style}}
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
                               key: "_id",
                               title: <IntlMessages id="admin.user.student.table.id"/>,
                               dataIndex: "_id",
                               width: 250,
                               sorter: true
                           },
                           {
                               key: "name",
                               title: <IntlMessages id="admin.user.class.table.name"/>,
                               dataIndex: "name",
                               width: 200,
                               sorter: true
                           },
                           {
                               key: "max_student",
                               title: <IntlMessages id="admin.user.class.table.max_student"/>,
                               dataIndex: "max_student",
                               width: 130,
                               sorter: true
                           },
                           {
                               key: "course_id",
                               title: <IntlMessages id="admin.user.class.table.course"/>,
                               dataIndex: "course_id",
                               render: (course_id) => getItemNameById(courses, course_id),
                               width: 200,
                               sorter: true
                           },
                           {
                               key: "dow",
                               title: <IntlMessages id="admin.user.class.table.dow"/>,
                               dataIndex: "dow",
                               render: (dow) => (
                                   <div>
                                       {dow.map(item => {
                                           return <Tag color={"green"}>{getDOW(item)}</Tag>
                                       })}
                                   </div>
                               ),
                               width: 300,
                               sorter: true
                           },
                           {
                               key: "shift_id",
                               title: <IntlMessages id="admin.user.class.table.shift"/>,
                               dataIndex: "shift_id",
                               render: (shift_id) => getItemNameById(shifts, shift_id),
                               width: 200,
                               sorter: true
                           },
                           {
                               key: "start_date",
                               title: <IntlMessages id="admin.user.class.table.startDate"/>,
                               dataIndex: "start_date",
                               render: (start_date) => getDate(start_date),
                               width: 200,
                               sorter: true
                           },
                           {
                               key: "status",
                               title: <IntlMessages id="admin.categoryCourse.table.status"/>,
                               dataIndex: "status",
                               render: (status) => getStatusTagV2(status),
                               width: 160,
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
            {showGenerateModal && modalGenerate()}
        </Card>
    );
};

export default ClassPage;

