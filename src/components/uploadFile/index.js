import React from 'react';
import './index.css';
import {Button, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {createNotification} from "../Notification";

const Document = (props) => {
    const a = {
        beforeUpload: (file) => {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                createNotification("size_deny");
            }
            return isLt2M;
        },
        customRequest: ({file, onSuccess}) => {
            setTimeout(() => {
                onSuccess("ok");
            }, 0);
        },
        onChange: ({file}) => {
            props.setFile(file);
        },
        maxCount: 1,
        defaultFileList: props.initFile == null ? [] : [props.initFile]
    };
    return (
        <Upload {...a}>
            <Button icon={<UploadOutlined/>} style={{width: "100%"}}/>
        </Upload>
    );
};

export default Document;
