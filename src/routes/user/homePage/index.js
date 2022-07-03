import React, {useEffect} from "react";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {getCourseSuggest, getImageAdvertisement, viewCourseCategory} from "../../../appRedux/actions";
import ItemCard from "./item/item";
import IntlMessages from "../../../util/IntlMessages";

const HomePage = () => {
    const dispatch = useDispatch();
    const {views} = useSelector(({courseCategory}) => courseCategory);
    const {member} = useSelector(({common}) => common);
    const {courses} = useSelector(({course}) => course);

    useEffect(() => {
        dispatch(getImageAdvertisement());
        dispatch(viewCourseCategory());
        if (member !== null) {
            dispatch(getCourseSuggest());
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {member !== null ? <ItemCard item={courses} title={<IntlMessages id="label.courseSuggest"/>}/> : null}
            {views.map(item => {
                return <ItemCard item={item.courses} title={item.name}/>
            })}
        </>
    );
};

export default HomePage;
