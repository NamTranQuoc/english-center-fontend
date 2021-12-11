import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Form, Input, Modal, Row} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {getAllRooms, getAllTeachers, getSchedule, selectSchedule} from "../../../appRedux/actions";
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import "./index.css";
import {useForm} from "antd/es/form/Form";
import {getItemNameById, getRoleCurrent} from "../../../util/ParseUtils";
import {useHistory} from "react-router-dom";

const localizer = momentLocalizer(moment);

let param = {
    to_date: null,
    from_date: null
}

const SchedulePage = () => {
    const dispatch = useDispatch();
    const {items,} = useSelector(({schedule}) => schedule);
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const {rooms} = useSelector(({room}) => room);
    const {teachers} = useSelector(({teacher}) => teacher);
    const [form] = useForm();
    const roleCurrent = getRoleCurrent();
    const history = useHistory();

    useEffect(() => {
        let start = moment().startOf('month').startOf('week');
        let end = moment().endOf('month').endOf('week');
        param = {
            from_date: start.unix() * 1000,
            to_date: end.unix() * 1000
        }
        dispatch(getSchedule(param));
        dispatch(getAllTeachers());
        dispatch(getAllRooms());
        // eslint-disable-next-line
    }, []);

    // function onSubmit(values) {
    //     values = {
    //         ...values,
    //         id: id,
    //         start_time: values.start.unix() * 1000,
    //         end_time: values.end.unix() * 1000,
    //     }
    //     dispatch(updateSchedule(values, param));
    //     setShowGenerateModal(!showGenerateModal);
    // }

    function showModalGenerate(value) {
        if (showGenerateModal) {
            dispatch(selectSchedule(null));
        } else {
            dispatch(selectSchedule(value.id));
        }
        // setDistance(value.end - value.start);
        form.setFieldsValue({
            name: value.title,
            teacher_name: getItemNameById(teachers, value.teacher_id),
            room_name: getItemNameById(rooms, value.room_id),
            start: moment.unix(value.start / 1000),
            end: moment.unix(value.end / 1000),
            session: value.session
        })
        setShowGenerateModal(!showGenerateModal);
    }

    const modalGenerate = () => (
        <Modal
            title={<IntlMessages id="admin.user.form.schedule.detail"/>}
            visible={showGenerateModal}
            footer={roleCurrent !== "teacher" ?
                <Button type="primary" form="add-edit-form" htmlType="submit">{<IntlMessages
                    id="admin.user.form.save"/>}</Button> : <Button type="primary" onClick={() => {
                        history.push("/home/muster");
                    }
                }>{<IntlMessages
                    id="sidebar.home.muster"/>}</Button>
            }
            onCancel={showModalGenerate}
            centered
            width={500}>
            <Form
                // onFinish={onSubmit}
                id="add-edit-form"
                form={form}>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.class.table.name"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="name">
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.class.table.session"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="session">
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
                            name="start"
                            rules={[
                                {
                                    required: true,
                                    message: <IntlMessages id="admin.class.form.start"/>,
                                },
                            ]}>
                            <DatePicker disabled={true} style={{width: "100%"}} showTime/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<IntlMessages id="admin.user.schedule.table.end"/>}
                                   name="end"
                                   labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}
                                   rules={[
                                       {
                                           required: true,
                                           message: <IntlMessages id="admin.class.form.end"/>,
                                       },
                                   ]}>
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
                            name="room_name">
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={<IntlMessages id="sidebar.managerUser.teacher"/>}
                            name="teacher_name"
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}>
                            <Input disabled={true}/>
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
