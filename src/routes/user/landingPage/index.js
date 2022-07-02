import { useState, useEffect } from "react";
import { Navigation } from "./subItem/navigation";
import { Header } from "./subItem/header";
import { Features } from "./subItem/features";
import { About } from "./subItem/about";
import { Services } from "./subItem/services";
import { Gallery } from "./subItem/gallery";
import { Testimonials } from "./subItem/testimonials";
import { Team } from "./subItem/Team";
import { Contact } from "./subItem/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {getImageAdvertisement, viewCourseCategory} from "../../../appRedux/actions";

export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
});

const LandingPage = () => {
    const [landingPageData, setLandingPageData] = useState({});
    const dispatch = useDispatch();
    const {advertisement} = useSelector(({document}) => document);
    const {views} = useSelector(({courseCategory}) => courseCategory);
    useEffect(() => {
        dispatch(getImageAdvertisement());
        dispatch(viewCourseCategory());
        setLandingPageData(JsonData);
    }, []);

    return (
        <div>
            <Navigation/>
            <Header data={landingPageData.Header} />
            <Features data={landingPageData.Features} />
            <About data={landingPageData.About} />
            <Services data={landingPageData.Services} />
            <Gallery data={landingPageData.Gallery}/>
            <Testimonials data={landingPageData.Testimonials} />
            <Team data={landingPageData.Team} />
            <Contact data={landingPageData.Contact} />
        </div>
    );
};

export default LandingPage;
