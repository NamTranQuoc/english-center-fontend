import React from "react";
import Widget from "../../../components/Widget/index";


const ChartCard = (props) => {
    return (
        <Widget styleName={`gx-card-full`}>
            <div className={`gx-fillchart gx-bg-${props.bgColor} gx-overlay-fillchart`}>
                {props.children}
                <div className="gx-fillchart-content">
                    <div className="ant-card-head-title gx-mb-3">{props.title}</div>
                    <h2 className="gx-mb-2 gx-fs-xxxl gx-font-weight-medium">{props.prize}</h2>
                    {props.percent > 0}
                    <p className="gx-mb-0 gx-fs-sm">{props.percent}%</p>
                </div>
            </div>
        </Widget>
    );
};

export default ChartCard;
