import React from "react";
import IntlMessages from "../../../util/IntlMessages";

const ActivityItem = ({task}) => {

    return (
        <div style={{display: "inline-block", marginLeft: "10px"}}>
            <span className="gx-link" style={{marginRight: "4px"}}>{task.perform_name}</span>
            <span style={{marginRight: "4px"}}><IntlMessages id={`action.${task.action}`}/></span>
            <span style={{marginRight: "4px"}}><IntlMessages id={`report.collection.${task.class_name}`}/></span>
            <span style={{marginRight: "4px"}}><IntlMessages id={"report.name"}/></span>
            <span style={{marginRight: "4px"}}>{task.name}</span>
        </div>
    );
};

export default ActivityItem;
