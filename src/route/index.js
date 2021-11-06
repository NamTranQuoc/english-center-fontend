import {connect} from "react-redux";
import {setInitUrl} from "../appRedux/actions";
import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import SignIn from "./SignInAndUp/SignIn";
import SignUp from "./SignInAndUp/SignUp";
import {IntlProvider} from "react-intl";
import {ConfigProvider} from "antd";
import AppLocale from "../lngProvider";
import MainApp from "./admin/MainApp";
import Home from "./user";
import CircularProgress from "../components/CircularProgress";
import {NotificationContainer} from "react-notifications";

const RestrictedRoute = ({component: Component, authUser, ...rest}) =>
    <Route
        {...rest}
        render={props =>
            authUser
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/signin',
                        state: {from: props.location}
                    }}
                />}
    />;

function AppRoute(props) {
    const currentAppLocale = AppLocale[props.locale.locale];
    if (props.initURL === "/signin") {
        if (props.authUser != null) {
            props.setInitUrl("/admin/dashboard");
            return (<Redirect to={"/admin/dashboard"}/>);
        }
    } else {
        if (props.authUser == null) {
            props.setInitUrl("/signin");
        } else {
            props.setInitUrl(props.history.location.pathname);
        }
    }
    return (
        <div>
            <ConfigProvider locale={currentAppLocale.antd}>
                <CircularProgress/>
                <IntlProvider
                    locale={currentAppLocale.locale}
                    messages={currentAppLocale.messages}>
                    <Switch>
                        <Route path={"/signin"} component={SignIn}/>
                        <Route path={"/signup"} component={SignUp}/>
                        <RestrictedRoute path={"/admin"} authUser={props.authUser} component={MainApp}/>
                        <Route path={"/"} component={Home}/>
                    </Switch>
                </IntlProvider>
                <IntlProvider
                    locale={currentAppLocale.locale}
                    messages={currentAppLocale.messages}>
                    <NotificationContainer/>
                </IntlProvider>
            </ConfigProvider>
        </div>
    );
}

const mapStateToProps = ({settings, auth, common}) => {
    const {locale} = settings;
    const {authUser} = auth;
    const {initURL, loader} = common;
    return {locale, authUser, initURL, loader}
};
export default connect(mapStateToProps, {setInitUrl})(AppRoute);