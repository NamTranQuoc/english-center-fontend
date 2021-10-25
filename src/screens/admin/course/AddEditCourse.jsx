import React, {useState} from "react";
import 'antd/dist/antd.css';
import {showNotification} from "../../../components/common/NotifyCation";
import {addCourse, updateCourse} from "../../../service/CourseService";

const storage_category_courses = JSON.parse(localStorage.getItem('category_course'));

function AddEditCourse(props) {
    const [name, setName] = useState("");
    const [tuition, setTuition] = useState("");
    const [number_of_shift, setNumber_of_shift] = useState("");
    const [description, setDescription] = useState("");
    const [category_course, setCategory_course] = useState(storage_category_courses[0].value);

    function onSubmit(e) {
        if (props.course._id === -1) {
            addCourse(name, category_course, tuition, number_of_shift, description).then((Response) => {
                if (Response.data.code !== -9999) {
                    showNotification("success_add");
                    props.close_modal();
                    props.reload();
                } else {
                    showNotification(Response.data.message);
                }
            });
        } else {
            updateCourse(props.course._id, name, category_course, tuition, number_of_shift, description).then(
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

    function onChangeCategoryCourse(e) {
        setCategory_course(e.target.value);
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
                    <h4>Thông tin khóa học</h4>
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
                            <label>Loại khóa học</label>
                            <select className="custom-select" onChange={onChangeCategoryCourse} defaultValue={category_course}>
                                {storage_category_courses.map((item) => {
                                    return <option value={item.value}>{item.label}</option>
                                })}
                            </select>
                            <div className="invalid-feedback">What's your name?</div>
                        </div>
                        <div className="form-group col-6">
                            <label>Tên khóa học</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(event) => {
                                    setName(event.target.value)
                                }}
                                required
                                value={
                                    name === ""
                                        ? props.course.name
                                        : name
                                }
                            />
                            <div className="invalid-feedback">What's your name?</div>
                        </div>
                        <div className="form-group col-6">
                            <label>Học phí</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(event) => {
                                    setTuition(event.target.value)
                                }}
                                required
                                value={
                                    tuition === ""
                                        ? props.course.tuition
                                        : tuition
                                }
                            />
                            <div className="invalid-feedback">What's your name?</div>
                        </div>
                        <div className="form-group col-6">
                            <label>Số buổi học</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(event) => {
                                    setNumber_of_shift(event.target.value)
                                }}
                                required
                                value={
                                    number_of_shift === ""
                                        ? props.course.number_of_shift
                                        : number_of_shift
                                }
                            />
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
                                    ? props.course.description
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

AddEditCourse.defaultProps = {
    show_add: false,
};

export default AddEditCourse;
