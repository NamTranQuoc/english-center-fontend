import React, {useEffect} from "react";
import {Col, Row} from "antd";
import {Area, AreaChart, ResponsiveContainer, Tooltip} from "recharts";

import Auxiliary from "util/Auxiliary";
import ChartCard from "../../../components/dashboard/Listing/ChartCard";
import {citiesData, propertiesData, queriesData, visitsData} from "./Metrics/data";
import Portfolio from "../../../components/dashboard/Crypto/Portfolio";
import RecentActivity from "../../../components/dashboard/CRM/RecentActivity";
import Widget from "../../../components/Widget";
import {useDispatch, useSelector} from "react-redux";
import {reportActionRecent, reportCount} from "../../../appRedux/actions";
import IntlMessages from "../../../util/IntlMessages";

const DashBoardPage = () => {
    const dispatch = useDispatch();
    const {counter, actionRecent} = useSelector(({report}) => report);

    useEffect(() => {
        dispatch(reportCount());
        dispatch(reportActionRecent());
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log(actionRecent);
    }, [actionRecent])

    return (
        <Auxiliary>
            <Row>
                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                    <ChartCard title={<IntlMessages id="admin.user.examSchedule.table.student"/>} prize={counter.student.count} bgColor='primary' percent={counter.student.percent}
                               children={<ResponsiveContainer width="100%" height={75}>
                                   <AreaChart data={propertiesData}
                                              margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                                       <Area dataKey='properties' strokeWidth={0} stackId="2" stroke='#092453'
                                             fill="#092453"
                                             fillOpacity={1}/>
                                   </AreaChart>
                               </ResponsiveContainer>}
                    />

                </Col>
                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                    <ChartCard title={<IntlMessages id="sidebar.managerUser.teacher"/>} prize={counter.teacher.count} bgColor='orange' percent={counter.teacher.percent}
                               children={<ResponsiveContainer width="100%" height={75}>
                                   <AreaChart data={citiesData}
                                              margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                                       <Area dataKey='cities' type='monotone' strokeWidth={0} stackId="2"
                                             stroke='#C87000'
                                             fill="#C87000"
                                             fillOpacity={1}/>
                                   </AreaChart>
                               </ResponsiveContainer>}
                    />
                </Col>
                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                    <ChartCard title={<IntlMessages id="sidebar.managerUser.receptionist"/>} prize={counter.receptionist.count} bgColor='teal' percent={counter.receptionist.percent}
                               children={<ResponsiveContainer width="100%" height={75}>
                                   <AreaChart data={visitsData}
                                              margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                                       <Tooltip/>
                                       <Area dataKey='visit' strokeWidth={0} stackId="2" stroke='#158765' fill="#158765"
                                             fillOpacity={1}/>
                                   </AreaChart>
                               </ResponsiveContainer>}
                    />
                </Col>
                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                    <ChartCard title={<IntlMessages id="sidebar.managerStudy.class"/>} prize={counter.classroom.count} bgColor='pink' percent={counter.classroom.percent}
                               children={<ResponsiveContainer width="100%" height={75}>
                                   <AreaChart data={queriesData}
                                              margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                                       <Tooltip/>
                                       <Area dataKey='queries' strokeWidth={0} stackId="2" stroke='#BB1258'
                                             fill="#BB1258"
                                             fillOpacity={1}/>
                                   </AreaChart>
                               </ResponsiveContainer>}
                    />
                </Col>
            </Row>
            <Row>
                <Col xl={12} lg={24} md={12} sm={24} xs={24}>
                    <Portfolio/>
                    <Portfolio/>
                </Col>
                <Col xl={12} lg={24} md={12} sm={24} xs={24}>
                    <Widget>
                        <RecentActivity tasks={actionRecent}/>
                    </Widget>
                </Col>
            </Row>
        </Auxiliary>
    );
};

export default DashBoardPage;
