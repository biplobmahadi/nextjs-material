import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import 'react-medium-image-zoom/dist/styles.css';

// for redux
import { Provider } from 'react-redux';
import { useStore } from '../store/store';

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

NProgress.configure({
    minimum: 0.3,
    easing: 'ease',
    speed: 800,
});
//Binding events.
// Router.events.on('routeChangeStart', () => NProgress.start());
// Router.events.on('routeChangeComplete', () => NProgress.done());
// Router.events.on('routeChangeError', () => NProgress.done());
Router.onRouteChangeStart = () => {
    // console.log('onRouteChangeStart triggered');
    NProgress.start();
};

Router.onRouteChangeComplete = () => {
    // console.log('onRouteChangeComplete triggered');
    NProgress.done();
};

Router.onRouteChangeError = () => {
    // console.log('onRouteChangeError triggered');
    NProgress.done();
};
export default function MyApp(props) {
    const { Component, pageProps } = props;
    const store = useStore(pageProps.initialReduxState);

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>My page</title>
                <meta
                    name='viewport'
                    content='minimum-scale=1, initial-scale=1, width=device-width'
                />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
