import React from "react";
import {Avatar, Timeline} from "antd";
import WidgetHeader from "../../../components/WidgetHeader/index";
import ActivityItem from "./ActivityItem";
import IntlMessages from "../../../util/IntlMessages";

function getName(task) {
    if (task.avatar === '') {
        let nameSplit = task.name.split(" ");
        if (task.name.split(" ").length === 1) {
            const initials = nameSplit[0].charAt(0).toUpperCase();
            return <Avatar shape={"circle"} className="gx-size-40 gx-bg-primary">{initials}</Avatar>
        } else {
            const initials = nameSplit[0].charAt(0).toUpperCase() + nameSplit[1].charAt(0).toUpperCase();
            return <Avatar shape={"circle"} className="gx-size-40 gx-bg-cyan">{initials}</Avatar>
        }
    } else {
        return <Avatar shape={"circle"} className="gx-size-40" src={task.avatar}/>;
    }
}

const RecentActivity = (props) => {
    return (
        <div className="gx-entry-sec" style={{height: "564px"}}>
            <WidgetHeader title={<IntlMessages id="report.action.recent"/>}/>
                <div className="gx-timeline-info" key={"activity"} style={{margin: "auto"}}>
                    <Timeline>
                        {props.tasks.map((task) => {
                            return <div style={{marginTop: "19px"}}>
                                {getName(task)}
                                <ActivityItem task={task}/>
                            </div>
                        })}
                    </Timeline>
                </div>
        </div>
    );
};

export default RecentActivity;
