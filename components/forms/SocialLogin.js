import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import axios from 'axios';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function SocialLogin() {
    const classes = useStyles();
    const router = useRouter();
    const [errMessage, setErrMessage] = React.useState('');

    const responseFacebook = (response) => {
        console.log('response', response);
        if (response.status !== 'unknown') {
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/rest-auth/facebook/`,
                    {
                        access_token: response.accessToken,
                    }
                )
                .then((res) => {
                    setErrMessage('');
                    console.log('got facebook', res.data);
                    Cookies.set('haha_ecom_bangla_token', res.data.key, {
                        expires: 7,
                    });
                    router.push('/my-account');
                })
                .catch((err) => {
                    console.log(err.response);
                    setErrMessage(err.response.data);
                    // error response do not handling yet. it will be added when access of internet available
                });
        }
    };

    const responseGoogle = (response) => {
        // console.log('response', response);
        // if we cross the popup because we don't want to login then what happened
        // for facebook we get response.status = unknown, but what for google
        if (!response.error) {
            axios
                .post(`${process.env.NEXT_PUBLIC_BASE_URL}/rest-auth/google/`, {
                    access_token: response.accessToken,
                })
                .then((res) => {
                    setErrMessage('');
                    // console.log('got google', res.data);
                    Cookies.set('haha_ecom_bangla_token', res.data.key, {
                        expires: 7,
                    });
                    router.push('/my-account');
                })
                .catch((err) => {
                    setErrMessage(err.response.data);
                    // console.log(err.response);
                    // error response do not handling yet. it will be added when access of internet available
                });
        }
    };

    return (
        <Box textAlign='center'>
            {errMessage &&
                errMessage.detail &&
                errMessage.detail.map((detail) => (
                    <Box textAlign='center'>
                        <Alert severity='error'>{detail}</Alert>
                    </Box>
                ))}
            {errMessage &&
                errMessage.non_field_errors &&
                errMessage.non_field_errors.map((non_field_errors) => (
                    <Box textAlign='center'>
                        <Box textAlign='center'>
                            <Alert severity='error'>{non_field_errors}</Alert>
                        </Box>
                        <Box my={2} textAlign='center'>
                            <Alert severity='error'>
                                Please Login With Your Email & Password!
                            </Alert>
                        </Box>
                    </Box>
                ))}
            <GoogleLogin
                clientId='699909175796-tbimuqfjf0ujgordqb8471k5vonlalr2.apps.googleusercontent.com'
                buttonText='Login'
                render={(renderProps) => (
                    <Button
                        color='primary'
                        variant='outlined'
                        onClick={renderProps.onClick}
                    >
                        Login With Google
                    </Button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </Box>
    );
}
