import React, {useEffect} from "react";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {getImageAdvertisement, viewCourseCategory} from "../../../appRedux/actions";
import ItemCard from "./item/item";

const HomePage = () => {
    const dispatch = useDispatch();
    const {views} = useSelector(({courseCategory}) => courseCategory);

    useEffect(() => {
        dispatch(getImageAdvertisement());
        dispatch(viewCourseCategory());
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {views.map(item => {
                return <ItemCard item={item.courses} title={item.name}/>
            })}
        </>
    );
};

export default HomePage;
