import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import "react-medium-image-zoom/dist/styles.css";

// for redux
import { Provider } from "react-redux";
import { useStore } from "../store/store";

import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

import { useEffect } from "react";

NProgress.configure({
    minimum: 0.3,
    easing: "ease",
    speed: 800,
});
Router.onRouteChangeStart = () => {
    NProgress.start();
};
Router.onRouteChangeComplete = () => {
    NProgress.done();
};
Router.onRouteChangeError = () => {
    NProgress.done();
};

// crisp
import dynamic from "next/dynamic";

const CrispWithNoSSR = dynamic(() => import("../components/crisp"), {
    ssr: false,
});

export default function MyApp(props) {
    const { Component, pageProps } = props;
    const store = useStore(pageProps.initialReduxState);

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </ThemeProvider>
            <CrispWithNoSSR />
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
