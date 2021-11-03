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

    console.log(props.initURL)
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
        <ConfigProvider locale={currentAppLocale.antd}>
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}>
                <Switch>
                    <Route exact path={`${props.match.url}`} component={Home}/>
                    <Route path={`${props.match.url}signin`} component={SignIn}/>
                    <Route path={`${props.match.url}signup`} component={SignUp}/>
                    <RestrictedRoute path={`${props.match.url}`} authUser={props.authUser} component={MainApp}/>
                </Switch>
            </IntlProvider>
        </ConfigProvider>
    );
}

const mapStateToProps = ({settings, auth, common}) => {
    const {locale, navStyle, themeType, layoutType} = settings;
    const {authUser} = auth;
    const {initURL} = common;
    return {locale, navStyle, themeType, layoutType, authUser, initURL}
};
export default connect(mapStateToProps, {setInitUrl})(AppRoute);