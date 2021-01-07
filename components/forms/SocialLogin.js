import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function SocialLogin() {
    const router = useRouter();

    const responseFacebook = (response) => {
        console.log('response', response);
        if (response.status !== 'unknown') {
            axios
                .post('http://localhost:8000/rest-auth/facebook/', {
                    access_token: response.accessToken,
                })
                .then((res) => {
                    console.log('got facebook', res.data);
                    Cookies.set('haha_ecom_bangla_token', res.data.key, {
                        expires: 7,
                    });
                    router.push('/my-account');
                })
                .catch((err) => {
                    console.log(err.response);
                    // error response do not handling yet. it will be added when access of internet available
                });
        }
    };

    const responseGoogle = (response) => {
        console.log('response', response);
        // if we cross the popup because we don't want to login then what happened
        // for facebook we get response.status = unknown, but what for google
if (!response.error) {
        axios
            .post('http://localhost:8000/rest-auth/google/', {
                access_token: response.accessToken,
            })
            .then((res) => {
                console.log('got google', res.data);
                Cookies.set('haha_ecom_bangla_token', res.data.key, {
                    expires: 7,
                });
                router.push('/my-account');
            })
            .catch((err) => {
                console.log(err.response);
                // error response do not handling yet. it will be added when access of internet available
            });
    }};

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FacebookLogin
                    appId='221049159230997'
                    autoLoad={false}
                    fields='name,email,picture'
                    callback={responseFacebook}
                />
            </Grid>
            <Grid item xs={12}>
                <GoogleLogin
                    clientId='699909175796-tbimuqfjf0ujgordqb8471k5vonlalr2.apps.googleusercontent.com'
                    buttonText='Login'
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </Grid>
        </Grid>
    );
}
