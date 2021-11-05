import React from "react";
import image from "../../assets/images/loader.svg"
import {Form} from "antd";
import {connect} from "react-redux";

function CircularProgress(props) {
    console.log(props.loader);
    if (props.loader) {
        return (
            <div style={{    width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                zIndex: "99999"
            }}>
                <img height={100} width={100} src={image} alt="loader"/>
            </div>
        );
    }
    return null;
}

const WrappedNormalLoginForm = Form.create()(CircularProgress);

const mapStateToProps = ({common}) => {
    const {loader} = common;
    return {loader}
};

export default connect(mapStateToProps, {})(WrappedNormalLoginForm);