import React, {Component} from "react";
import ReactPlaceholder from "react-placeholder";
import "nprogress/nprogress.css";
import image from "../assets/images/loader.svg"

import "react-placeholder/lib/reactPlaceholder.css";

export default function asyncComponent(importComponent) {
    class AsyncFunc extends Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            };
        }

        componentWillUnmount() {
            this.mounted = false;
        }

        async componentDidMount() {
            this.mounted = true;
            const {default: Component} = await importComponent();
            if (this.mounted) {
                this.setState({
                    component: <Component {...this.props} />
                });
            }
        }

        render() {
            const Component = this.state.component || (<div style={{
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                zIndex: "99999"
            }}>
                <img height={100} width={100} src={image} alt="loader"/>
            </div>);
            return (
                <ReactPlaceholder ready={Component !== null}>
                    {Component}
                </ReactPlaceholder>
            );
        }
    }

    return AsyncFunc;
}
