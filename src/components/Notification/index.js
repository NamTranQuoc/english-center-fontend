import React from "react";
import {NotificationManager} from "react-notifications";
import IntlMessages from "../../util/IntlMessages";

const errors = {
    success_register_absent: {
        message: <IntlMessages id="notification.success_register_absent"/>,
        type: "success",
    },
    absent_exist: {
        message: <IntlMessages id="notification.absent_exist"/>,
        type: "warning",
    },
    cannot_register_absent: {
        message: <IntlMessages id="notification.cannot_register_absent"/>,
        type: "warning",
    },
    not_during_muster_time: {
        message: <IntlMessages id="notification.not_during_muster_time"/>,
        type: "warning",
    },
    document_extension_not_match: {
        message: <IntlMessages id="notification.document_extension_not_match"/>,
        type: "error",
    },
    param_not_null: {
        message: <IntlMessages id="notification.param_not_null"/>,
        type: "warning",
    },
    member_not_exist: {
        message: <IntlMessages id="notification.member_not_exist"/>,
        type: "info",
    },
    password_incorrect: {
        message: <IntlMessages id="notification.password_incorrect"/>,
        type: "info",
    },
    member_exist: {
        message: <IntlMessages id="notification.member_exist"/>,
        type: "info",
    },
    member_type_deny: {
        message: <IntlMessages id="notification.member_type_deny"/>,
        type: "error",
    },
    success_add: {
        message: <IntlMessages id="notification.success_add"/>,
        type: "success",
    },
    success_update: {
        message: <IntlMessages id="notification.success_update"/>,
        type: "success",
    },
    success_delete: {
        message: <IntlMessages id="notification.success_delete"/>,
        type: "success",
    },
    type_deny: {
        message: <IntlMessages id="notification.type_deny"/>,
        type: "error",
    },
    size_deny: {
        message: <IntlMessages id="notification.size_deny"/>,
        type: "error",
    },
    bad_request: {
        message: <IntlMessages id="notification.bad_request"/>,
        type: "error",
    },
    success_reset: {
        message: <IntlMessages id="notification.success_reset"/>,
        type: "success",
    },
    confirm_password_incorrect: {
        message: <IntlMessages id="notification.confirm_password_incorrect"/>,
        type: "success",
    },
    check_mail: {
        message: <IntlMessages id="notification.check_mail"/>,
        type: "info",
    },
    shift_not_exist: {
        message: <IntlMessages id="notification.shift_not_exist"/>,
        type: "warning",
    },
    room_not_exist: {
        message: <IntlMessages id="notification.room_not_exist"/>,
        type: "warning",
    },
    classroom_not_exist: {
        message: <IntlMessages id="notification.classroom_not_exist"/>,
        type: "warning",
    },
    start_date_not_allow: {
        message: <IntlMessages id="notification.start_date_not_allow"/>,
        type: "warning",
    },
    generate_success: {
        message: <IntlMessages id="notification.generate_success"/>,
        type: "success",
    },
    schedule_not_exist: {
        message: <IntlMessages id="notification.schedule_not_exist"/>,
        type: "warning",
    },
    teacher_not_available: {
        message: <IntlMessages id="notification.teacher_not_available"/>,
        type: "warning",
    },
    room_not_empty: {
        message: <IntlMessages id="notification.room_not_empty"/>,
        type: "warning",
    },
    phone_number_used: {
        message: <IntlMessages id="notification.phone_number_used"/>,
        type: "warning",
    },
    success_export: {
        message: <IntlMessages id="notification.success_export"/>,
        type: "success",
    },
    room_not_available: {
        message: <IntlMessages id="notification.room_not_available"/>,
        type: "error",
    },
    cannot_when_status_not_is_register: {
        message: <IntlMessages id="notification.cannot_when_status_not_is_register"/>,
        type: "error",
    },
    cannot_when_status_not_is_create: {
        message: <IntlMessages id="notification.cannot_when_status_not_is_create"/>,
        type: "error",
    },
    can_only_generate_with_status_is_create: {
        message: <IntlMessages id="notification.can_only_generate_with_status_is_create"/>,
        type: "error",
    },
    schedule_exist: {
        message: <IntlMessages id="notification.schedule_exist"/>,
        type: "error",
    },
    can_not_update: {
        message: <IntlMessages id="notification.can_not_update"/>,
        type: "warning",
    },
    exam_schedule_exist: {
        message: <IntlMessages id="notification.exam_schedule_exist"/>,
        type: "warning",
    },
    receptionist_not_available: {
        message: <IntlMessages id="notification.receptionist_not_available"/>,
        type: "warning",
    },
    room_capacity_is_not_enough: {
        message: <IntlMessages id="notification.room_capacity_is_not_enough"/>,
        type: "warning",
    },
    unsubscribe_timeout: {
        message: <IntlMessages id="notification.unsubscribe_timeout"/>,
        type: "error",
    },
    register_not_in_time_register: {
        message: <IntlMessages id="notification.register_not_in_time_register"/>,
        type: "error",
    },
    register_already: {
        message: <IntlMessages id="notification.register_already"/>,
        type: "error",
    },
    success_register: {
        message: <IntlMessages id="notification.success_register"/>,
        type: "success",
    },
    exam_schedule_conflict: {
        message: <IntlMessages id="notification.exam_schedule_conflict"/>,
        type: "error",
    },
};

export function createNotification(message) {
    try {
        if (!errors.hasOwnProperty(message)) {
            return NotificationManager.error(message);
        } else {
            switch (errors[message].type) {
                case "info":
                    return NotificationManager.info(errors[message].message);
                case "success":
                    return NotificationManager.success(errors[message].message);
                case "warning":
                    return NotificationManager.warning(errors[message].message);
                case "error":
                    return NotificationManager.error(errors[message].message);
                default:
                    return NotificationManager.error(errors[message].message);
            }
        }
    } catch (e) {
        return NotificationManager.error(e);
    }
}
