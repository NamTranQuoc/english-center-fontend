import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Form, Input, Modal, Row, Select} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {getAllRooms, getAllTeachers, getSchedule, updateSchedule} from "../../../../appRedux/actions";
import "../index.css";
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import "./index.css";

const localizer = momentLocalizer(moment);

let param = {
    to_date: null,
    from_date: null
}

const SchedulePage = () => {
    const dispatch = useDispatch();
    const [initValue, setInitValue] = useState({});
    const [id, setId] = useState(null);
    const {items,} = useSelector(({schedule}) => schedule);
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const {rooms,} = useSelector(({room}) => room);
    const {teachers,} = useSelector(({teacher}) => teacher);

    useEffect(() => {
        let start = moment().startOf('month').startOf('week');
        let end = moment().endOf('month').endOf('week');
        param = {
            from_date: start.unix() * 1000,
            to_date: end.unix() * 1000
        }
        dispatch(getSchedule(param))
        dispatch(getAllRooms());
        dispatch(getAllTeachers());
        // eslint-disable-next-line
    }, []);

    function onSubmit(values) {
        values = {
            ...values,
            id: id,
        }
        dispatch(updateSchedule(values, param));
        setShowGenerateModal(!showGenerateModal);
    }

    function showModalGenerate(value) {
        setId(value.id);
        setInitValue({
            name: value.title,
            teacher_id: value.teacher_id,
            room_id: value.room_id,
            start: moment.unix(value.start / 1000),
            end: moment.unix(value.end / 1000),
        })
        setShowGenerateModal(!showGenerateModal);
    }

    const modalGenerate = () => (
        <Modal
            title={<IntlMessages id="admin.user.form.schedule.detail"/>}
            visible={showGenerateModal}
            footer={
                <Button type="primary" form="add-edit-form" htmlType="submit">{<IntlMessages
                    id="admin.user.form.save"/>}</Button>
            }
            onCancel={showModalGenerate}
            centered
            width={500}>
            <Form
                onFinish={onSubmit}
                id="add-edit-form"
                initialValues={initValue}>
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
                            label={<IntlMessages id="admin.user.schedule.table.start"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="start">
                            <DatePicker disabled={true} style={{width: "100%"}} showTime/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<IntlMessages id="admin.user.schedule.table.end"/>}
                                   name="end"
                                   labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                            <DatePicker disabled={true} style={{width: "100%"}} showTime/>
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
                                {rooms.map(item => {
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
                                {teachers.map(item => {
                                    return <Select.Option value={item._id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )

    return (
        <Card title={<h2 style={{paddingTop: "22px"}}><IntlMessages id="admin.user.schedule.table.title"/></h2>}
              className="gx-card">
            <Calendar
                localizer={localizer}
                popup={2}
                views={["month", "week"]}
                events={items}
                onSelectEvent={event => showModalGenerate(event)}
                onRangeChange={range => {
                    console.log(range)
                    if (range.hasOwnProperty("end")) {
                        param = {
                            from_date: range.start.getTime(),
                            to_date: range.end.getTime(),
                        }
                        dispatch(getSchedule(param));
                    } else {
                        param = {
                            from_date: range[0].getTime(),
                            to_date: range[6].getTime() + 86399999
                        }
                        dispatch(getSchedule(param));
                    }

                }}
                defaultDate={new Date()}
            />
            {showGenerateModal && modalGenerate()}
        </Card>
    );
};

export default SchedulePage;
