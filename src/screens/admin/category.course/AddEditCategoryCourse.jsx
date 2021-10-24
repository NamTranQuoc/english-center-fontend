import React, {useState} from "react";
import 'antd/dist/antd.css';
import {showNotification} from "../../../components/common/NotifyCation";
import {addCategoryCourse, updateCategoryCourse} from "../../../service/CategoryCourseService";

const dateFormatList = "DD/MM/YYYY";

function AddEditCategoryCourse(props) {
    const [name, setName] = useState("");
    const [status, setStatus] = useState(props.category_course.status);
    const [description, setDescription] = useState("");

    function onSubmit(e) {
        if (props.category_course._id === -1) {
            addCategoryCourse(name, status, description).then((Response) => {
                if (Response.data.code !== -9999) {
                    showNotification("success_add");
                    props.close_modal();
                    props.reload();
                } else {
                    showNotification(Response.data.message);
                }
            });
        } else {
            updateCategoryCourse(props.category_course._id, name, status, description).then(
                (Response) => {
                    if (Response.data.code !== -9999) {
                        showNotification("success_update");
                        props.close_modal();
                        props.reload();
                    } else {
                        showNotification(Response.data.message);
                    }
                }
            );
        }
    }

    function onChangeStatus(e) {
        setStatus(e.target.value);
    }

    return (
        <div hidden={!props.show_add} className="custom-css-001">
            <div
                className="custom-css-002"
                onClick={() => props.close_modal()}
            />
            <div className="modal-content custom-css-003">
                {/*<form className="needs-validation" noValidate>*/}
                <div className="modal-header">
                    <h4>Thông tin loại khóa học</h4>
                    <button
                        className="btn btn-link"
                        onClick={() => props.close_modal()}
                    >
                        <i className="fas fa-times"/>
                    </button>
                </div>
                <div className="modal-body custom-css-004">
                    <div className="form-group"/>
                    <div className="row">
                        <div className="form-group col-6">
                            <label>Tên loại khóa học</label>
                            <input
                                id="name"
                                type="text"
                                className="form-control"
                                onChange={(event) => {
                                    setName(event.target.value)
                                }}
                                required
                                value={
                                    name === ""
                                        ? props.category_course.name
                                        : name
                                }
                            />
                            <div className="invalid-feedback">What's your name?</div>
                        </div>
                        <div className="form-group col-6">
                            <label>Trạng thái</label>
                            <select className="custom-select" onChange={onChangeStatus} defaultValue={status}>
                                <option value="ACTIVE">Hoạt động</option>
                                <option value="INACTIVE">Không hoạt động</option>
                            </select>

                            <div className="invalid-feedback">What's your name?</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Mô tả</label>
                        <textarea
                            className="form-control"
                            style={{height: "100px"}}
                            onChange={(event) => {
                                setDescription(event.target.value)
                            }}
                            required
                            value={
                                description === ""
                                    ? props.category_course.description
                                    : description
                            }
                        />
                    </div>
                </div>
                <div className="modal-footer text-right">
                    <button className="btn btn-primary" onClick={onSubmit}>
                        Submit
                    </button>
                </div>
            </div>
            {/*</form>*/}
        </div>
    );
}

AddEditCategoryCourse.defaultProps = {
    show_add: false,
};

export default AddEditCategoryCourse;
