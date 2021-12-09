import React, {useEffect} from "react";
import {Carousel} from "antd";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {getImageAdvertisement, viewCourseCategory} from "../../../appRedux/actions";
import ItemCard from "./item/item";

const HomePage = () => {
    const dispatch = useDispatch();
    const {advertisement} = useSelector(({document}) => document);
    const {views} = useSelector(({courseCategory}) => courseCategory);

    useEffect(() => {
        dispatch(getImageAdvertisement());
        dispatch(viewCourseCategory());
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Carousel autoplay>
                {advertisement.map(item => {
                    return <div>
                        <img alt="" className="contentStyle" src={item}/>
                    </div>
                })}
            </Carousel>
            {views.map(item => {
                console.log(item.name);
                return <ItemCard item={item.courses} title={item.name}/>
            })}
        </>
    );
};

export default HomePage;
