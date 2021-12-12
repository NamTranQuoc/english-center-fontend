import React, {useEffect} from "react";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {getAllShift} from "../../../appRedux/actions";
import ItemCard from "./item/item";
import {useHistory} from "react-router-dom";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const {classByCourseId, CourseNameSelect} = useSelector(({classRoom}) => classRoom);
    const history = useHistory();

    useEffect(() => {
        if (CourseNameSelect === null) {
            history.push("/home");
        }
        dispatch(getAllShift());
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <ItemCard item={classByCourseId} title={CourseNameSelect}/>
        </>
    );
};

export default RegisterPage;
