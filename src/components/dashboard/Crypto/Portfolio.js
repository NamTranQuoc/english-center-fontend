import React from "react";
import Widget from "components/Widget/index";
import {Col, Row} from "antd";
import LineIndicator from "./LineIndicator";
import IntlMessages from "../../../util/IntlMessages";
import {getMoney} from "../../../util/ParseUtils";

const Portfolio = ({data, title, subTitle}) => {
    return (
        <Widget>
            <h2 className="h2 gx-mb-3"><IntlMessages id={title}/></h2>
            <Row>
                <Col lg={12} md={12} sm={12} xs={24}>

                    <div className="ant-row-flex">
                        <h2 className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">{getMoney(data.total)}</h2>
                        <h4 className="gx-pt-2 gx-chart-up">{data.percent}% <i className="icon icon-menu-up gx-fs-sm"/></h4>
                    </div>
                    <p className="gx-text-grey"><IntlMessages id={subTitle}/></p>
                </Col>
                <Col lg={12} md={12} sm={12} xs={24}>
                    <div className="gx-site-dash">
                        <h3 className="gx-mb-3"><IntlMessages id="admin.status.statisticByCourse"/></h3>
                        <ul className="gx-line-indicator gx-fs-sm gx-pb-1 gx-pb-sm-0">
                            <li>
                                <LineIndicator width={data.details[0].percent} title={data.details[0].name} title2={getMoney(data.details[0].total)} color="primary" value={`${data.details[0].percent}%`}/>
                            </li>
                            <li>
                                <LineIndicator width={data.details[1].percent} title={data.details[1].name} title2={getMoney(data.details[1].total)} color="pink" value={`${data.details[1].percent}%`}/>
                            </li>
                            <li>
                                <LineIndicator width={data.details[2].percent} title={data.details[2].name} title2={getMoney(data.details[2].total)} color="orange" value={`${data.details[2].percent}%`}/>
                            </li>
                        </ul>
                        <p className="gx-text-primary gx-pointer gx-d-block gx-d-sm-none gx-mb-0 gx-mt-3">
                            <i className="icon icon-add-circle gx-fs-lg gx-d-inline-flex gx-vertical-align-middle"/> Add
                            New Wallet
                        </p>
                    </div>
                </Col>
            </Row>
        </Widget>
    );
};

export default Portfolio;
