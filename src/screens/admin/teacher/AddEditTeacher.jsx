import React, {useState} from "react";
import {addMember, updateMember} from "../../../service/MemberService";
import {showNotification} from "../../../components/common/NotifyCation";
import ImageUpload from "../../../components/common/ImageUpload";
import {storage} from "../../../components/common/firebase/Config";
import {DatePicker} from 'antd';
import 'antd/dist/antd.css';
import {getTimestamp, timeNow} from "../../../components/common/Utils";
import moment from "moment";

const dateFormatList = "DD/MM/YYYY";

function AddEditTeacher(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState(props.teacher.gender);
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState(moment(props.teacher.dob != null ? props.teacher.dob : timeNow()));
    const [phone_number, setPhone_number] = useState("");
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(props.url_avatar);
    const [salary, setSalary] = useState(props.teacher.salary);
    const [certificate, setCertificate] = useState(props.teacher.certificate);

    function onSubmit(e) {
        if (props.teacher._id === -1) {
            addMember(name, email, address, gender, getTimestamp(dob), phone_number, "teacher", Number(salary),
                            certificate).then((Response) => {
                if (Response.data.code !== -9999) {
                    handleUpload("avatar-" + Response.data.payload._id);
                    showNotification("success_add");
                    props.close_modal();
                    props.reload();
                } else {
                    showNotification(Response.data.message);
                }
            });
        } else {
            updateMember(props.teacher._id, name, gender, phone_number, address, getTimestamp(dob), salary, certificate).then(
                (Response) => {
                    if (Response.data.code !== -9999) {
                        handleUpload("avatar-" + props.teacher._id);
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

    function handleUpload(name) {
        console.log(image);
        storage.ref(`images/${name}.png`).put(image);
    }

    function handleImageChange(e) {
        if (e.target.files.length > 0) {
            let reader = new FileReader();
            let file = e.target.files[0];
            setImage(file);
            reader.onloadend = () => {
                setUrl(reader.result.toString());
            };

            reader.readAsDataURL(file);
        }
    }

    function onChangeGender(e) {
        setGender(e.target.value);
    }

    function onChangeCertificateCode(e) {
        setCertificate({
            type: e.target.value,
            score: certificate.score,
            code: certificate.code,
        });
    }

    function onChangeDob(date) {
        console.log(date);
        setDob(date);
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
                    <h4>Thông tin giảng viên</h4>
                    <button
                        className="btn btn-link"
                        onClick={() => props.close_modal()}
                    >
                        <i className="fas fa-times"/>
                    </button>
                </div>
                <div className="modal-body custom-css-004">
                    <div className="form-group"/>
                    <div className="form-group">
                        <ImageUpload url={url} handleImageChange={handleImageChange}/>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <label>Họ và tên</label>
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
                                        ? props.teacher.name
                                        : name
                                }
                            />
                            <div className="invalid-feedback">What's your name?</div>
                        </div>
                        <div className="form-group col-6">
                            <label>Giới tính</label>
                            <select className="custom-select" onChange={onChangeGender} defaultValue={gender}>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="different">Khác</option>
                            </select>

                            <div className="invalid-feedback">What's your name?</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <label>Số điện thoại</label>
                            <input
                                id="phone_number"
                                type="phone"
                                className="form-control"
                                onChange={(event) => {
                                    setPhone_number(event.target.value)
                                }}
                                required
                                value={
                                    phone_number === ""
                                        ? props.teacher.phone_number
                                        : phone_number
                                }
                            />
                            <div className="invalid-feedback">Oh no! Email is invalid.</div>
                        </div>
                        <div
                            className="form-group col-6"
                        >
                            <label>Ngày sinh</label>
                            <div className="form-control">
                                <DatePicker
                                    onChange={onChangeDob}
                                    defaultValue={dob}
                                    bordered={false}
                                    style={{padding: 0, width: "inherit"}}
                                    format={dateFormatList}/>
                            </div>
                            <div className="valid-feedback">Good job!</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <label>Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
                                required
                                value={
                                    email === ""
                                        ? props.teacher.email
                                        : email
                                }
                            />
                            <div className="invalid-feedback">Oh no! Email is invalid.</div>
                        </div>
                        <div className="form-group col-6">
                            <label>Lương</label>
                            <input
                                id="salary"
                                type="number"
                                className="form-control"
                                onChange={(event) => {
                                    setSalary(event.target.value)
                                }}
                                required
                                value={
                                    salary === ""
                                        ? props.teacher.salary
                                        : salary
                                }
                            />
                            <div className="invalid-feedback">Oh no! Email is invalid.</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <label>Chứng chỉ</label>
                            <select className="custom-select" onChange={onChangeCertificateCode} defaultValue={certificate}>
                                <option value="toeic">Toeic</option>
                                <option value="ielts">Ielts</option>
                            </select>

                            <div className="invalid-feedback">What's your name?</div>
                        </div>
                        <div className="form-group col-4">
                            <label>Điểm số</label>
                            <input
                                id="score"
                                type="number"
                                className="form-control"
                                onChange={(event) => {
                                    setCertificate({
                                        type: certificate.type,
                                        score: event.target.value,
                                        code: certificate.code,
                                    })
                                }}
                                required
                                value={
                                    certificate.score === ""
                                        ? props.teacher.certificate.score
                                        : certificate.score
                                }
                            />
                            <div className="invalid-feedback">Oh no! Email is invalid.</div>
                        </div>
                        <div className="form-group col-4">
                            <label>Mã số chứng chỉ</label>
                            <input
                                id="certificateCode"
                                type="text"
                                className="form-control"
                                onChange={(event) => {
                                    setCertificate({
                                        type: certificate.type,
                                        score: certificate.score,
                                        code: event.target.value,
                                    })
                                }}
                                required
                                value={
                                    certificate.code === ""
                                        ? props.teacher.certificate.code
                                        : certificate.code
                                }
                            />
                            <div className="invalid-feedback">Oh no! Email is invalid.</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ</label>
                        <textarea
                            className="form-control"
                            style={{height: "100px"}}
                            onChange={(event) => {
                                setAddress(event.target.value)
                            }}
                            required
                            value={
                                address === ""
                                    ? props.teacher.address
                                    : address
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

AddEditTeacher.defaultProps = {
    show_add: false,
    teacher: {
        name: "",
        email: "",
        avatar: null,
        dob: timeNow(),
        gender: "male",
        address: "",
        phone_number: "",
        salary: 0,
    },
};

export default AddEditTeacher;
