import React, {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import {ConfigProvider} from 'antd';
import {IntlProvider} from "react-intl";
import AppLocale from "../../lngProvider";
import MainApp from "./MainApp";
import HomeApp from "./HomeApp";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import {setInitUrl, toggleCollapsedSideNav} from "../../appRedux/actions";
import {NotificationContainer} from "react-notifications";
import {
    LAYOUT_TYPE_BOXED,
    LAYOUT_TYPE_FRAMED,
    LAYOUT_TYPE_FULL,
    NAV_STYLE_ABOVE_HEADER,
    NAV_STYLE_BELOW_HEADER,
    NAV_STYLE_DARK_HORIZONTAL,
    NAV_STYLE_DEFAULT_HORIZONTAL,
    NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
    THEME_TYPE_DARK
} from "../../constants/ThemeSetting";
import CircularProgress from "../../components/CircularProgress";
import {getRoleCurrent} from "../../util/ParseUtils";
import RequestForgetPassword from "../ResquestForgetPassword";
import ForgetPassword from "../ForgetPassword";

const RestrictedRoute = ({component: Component, location, authUser, ...rest}) =>
    <Route
        {...rest}
        render={props =>
            authUser
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/signin',
                        state: {from: location}
                    }}
                />}
    />;

const setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
        document.body.classList.remove('boxed-layout');
        document.body.classList.remove('framed-layout');
        document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
        document.body.classList.remove('full-layout');
        document.body.classList.remove('framed-layout');
        document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
        document.body.classList.remove('boxed-layout');
        document.body.classList.remove('full-layout');
        document.body.classList.add('framed-layout');
    }
};

const setNavStyle = (navStyle) => {
    if (navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
        navStyle === NAV_STYLE_DARK_HORIZONTAL ||
        navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
        navStyle === NAV_STYLE_ABOVE_HEADER ||
        navStyle === NAV_STYLE_BELOW_HEADER) {
        document.body.classList.add('full-scroll');
        document.body.classList.add('horizontal-layout');
    } else {
        document.body.classList.remove('full-scroll');
        document.body.classList.remove('horizontal-layout');
    }
};

const App = () => {
    const locale = useSelector(({settings}) => settings.locale);
    const navStyle = useSelector(({settings}) => settings.navStyle);
    const layoutType = useSelector(({settings}) => settings.layoutType);
    const themeType = useSelector(({settings}) => settings.themeType);
    const isDirectionRTL = useSelector(({settings}) => settings.isDirectionRTL);
    const pathname = useSelector(({common}) => common.pathname);
    const {authUser} = useSelector(({auth}) => auth);
    const dispatch = useDispatch();

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (isDirectionRTL) {
            document.documentElement.classList.add('rtl');
            document.documentElement.setAttribute('data-direction', 'rtl')
        } else {
            document.documentElement.classList.remove('rtl');
            document.documentElement.setAttribute('data-direction', 'ltr')
        }
    }, [isDirectionRTL]);

    useEffect(() => {
        if (locale)
            document.documentElement.lang = locale.locale;
    }, [locale]);

    useEffect(() => {
        if (themeType === THEME_TYPE_DARK) {
            document.body.classList.add('dark-theme');
        } else if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
        }
    }, [themeType]);

    useEffect(() => {
        if (pathname !== location.pathname) {
            dispatch(setInitUrl(location.pathname));
        }
        // eslint-disable-next-line
    }, [location])

    useEffect(() => {
        if (pathname !== location.pathname) {
            dispatch(setInitUrl(location.pathname));
        } else {
            if (pathname === '/signin' || pathname === '/signup' || pathname === '/request_forget_password' || pathname.substring(0, 16) === '/forget_password') {
                history.push(pathname);
            } else if (pathname === "/home/schedule" || pathname === "/home/document") {
                history.push(pathname);
                dispatch(toggleCollapsedSideNav(false));
            } else if (pathname === '/' || pathname === '' || pathname === '/home') {
                history.push('/home');
                dispatch(toggleCollapsedSideNav(false));
            } else if (authUser === null) {
                history.push('/home');
            } else if (pathname === '/signin') {
                const role = getRoleCurrent();
                if (role === "admin" || role === "receptionist") {
                    history.push('/admin/dashboard');
                } else {
                    history.push('/home');
                }
            } else {
                history.push(pathname);
            }
        }
        // eslint-disable-next-line
    }, [authUser, pathname]);

    useEffect(() => {
        setLayoutType(layoutType);
        setNavStyle(navStyle);
    }, [layoutType, navStyle]);

    const currentAppLocale = AppLocale[locale.locale];

    return (
        <ConfigProvider locale={currentAppLocale.antd} direction={isDirectionRTL ? 'rtl' : 'ltr'}>
            <CircularProgress/>
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}>
                <Switch>
                    <Route exact path="/signin" component={SignIn}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/request_forget_password" component={RequestForgetPassword}/>
                    <Route path="/forget_password" component={ForgetPassword}/>
                    <RestrictedRoute path="/admin" authUser={authUser} location={location} component={MainApp}/>
                    <Route path="/home" location={location} component={HomeApp}/>
                </Switch>
            </IntlProvider>
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}>
                <NotificationContainer/>
            </IntlProvider>
        </ConfigProvider>
    )
};

export default memo(App);
