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

import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    loader: {
        position: 'fixed',
        top: '40%',
        left: '47%',
        transform: 'translate(-50%, -50%)',
        transform: '-webkit-translate(-50%, -50%)',
        transform: '-moz-translate(-50%, -50%)',
        transform: '-ms-translate(-50%, -50%)',
    },
}));

NProgress.configure({
    minimum: 0.3,
    easing: 'ease',
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

export default function MyApp(props) {
    const [loaded, setLoaded] = useState(false);
    const classes = useStyles();
    const visibleStyle = {
        display: '',
        transition: 'display 3s',
    };
    const inVisibleStyle = {
        display: 'none',
        transition: 'display 3s',
    };

    const { Component, pageProps } = props;
    const store = useStore(pageProps.initialReduxState);

    useEffect(() => {
        setLoaded(true);
        Router.events.on('routeChangeStart', () => setLoaded(false));
        Router.events.on('routeChangeComplete', () => setLoaded(true));
        Router.events.on('routeChangeError', () => setLoaded(true));
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <meta
                    name='viewport'
                    content='minimum-scale=1, initial-scale=1, width=device-width'
                />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Provider store={store}>
                    <>
                        <span style={loaded ? inVisibleStyle : visibleStyle}>
                            <div className={classes.loader}>
                                <ReactLoading
                                    type='spinningBubbles'
                                    color='#556cd6'
                                />
                            </div>
                        </span>
                        <span style={loaded ? visibleStyle : inVisibleStyle}>
                            <Component {...pageProps} />
                        </span>
                    </>
                </Provider>
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
