import React, { useState, useEffect } from "react";
import { Features } from "./subItem/features";
import { About } from "./subItem/about";
import { Services } from "./subItem/services";
import { Gallery } from "./subItem/gallery";
import JsonData from "./data/data.json";
import JsonDataEnglish from "./data/dataEnglish.json";
import SmoothScroll from "smooth-scroll";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {getImageAdvertisement, viewCourseCategory} from "../../../appRedux/actions";
import {Carousel} from "antd";

export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
});

const LandingPage = () => {
    const [landingPageData, setLandingPageData] = useState({});
    const dispatch = useDispatch();
    const {advertisement} = useSelector(({document}) => document);
    const {locale} = useSelector(({settings}) => settings);
    useEffect(() => {
        dispatch(getImageAdvertisement());
        dispatch(viewCourseCategory());
        if(locale.name === "English") {
            setLandingPageData(JsonDataEnglish);
        } else {
            setLandingPageData(JsonData);
        }
    }, []);

    return (
        <div>
            <Carousel autoplay>
                {advertisement.map(item => {
                    return <div>
                        <img alt="" className="contentStyle" src={item}/>
                    </div>
                })}
            </Carousel>
            <About data={landingPageData.About} />
            <Features data={landingPageData.Features} />
            <Services data={landingPageData.Testimonials} />
            <Gallery data={landingPageData.Gallery}/>
        </div>
    );
};

export default LandingPage;
