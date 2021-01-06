import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import Link from '../../src/Link';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const useLogin = () => {
    const token = useSelector((state) => state.loginReducer.token);

    const dispatch = useDispatch();
    // need to show msg for user not register yet or some other msg
    const login = (userInfo, setSubmitting, router) => {
        axios
            .post('http://localhost:8000/rest-auth/login/', userInfo)
            .then((res) => {
                console.log(res.data);
                dispatch({ type: 'LOGIN', payload: res.data });
                Cookies.set('haha_ecom_bangla_token', res.data.key, {
                    expires: 7,
                });
                router.push('/my-account');
                setSubmitting(false);
            })
            .catch((err) => {
                console.log(err.response);
                setSubmitting(false);
            });
    };
    return { token, login };
};

export default function SignupForm() {
    const router = useRouter();
    useEffect(() => {
        if (Cookies.get('haha_ecom_bangla_token')) {
            router.push('/my-account');
        } else {
            // Prefetch the dashboard page
            router.prefetch('/my-account');
        }
    }, []);
    const classes = useStyles();
    const { token, login } = useLogin();

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Login
                </Typography>
                <Box mt={2}>
                    <Alert severity='error'>
                        This is an error alert — check it out!
                    </Alert>
                </Box>
                <div className={classes.form}>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('Required'),

                            password: Yup.string().required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            login(values, setSubmitting, router);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <div>
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Field
                                                name='email'
                                                type='email'
                                                fullWidth
                                                variant='outlined'
                                                component={TextField}
                                                label='Email *'
                                                size='small'
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                name='password'
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                component={TextField}
                                                label='Password *'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <IconButton
                                                                aria-label='toggle password visibility'
                                                                onClick={
                                                                    handleClickShowPassword
                                                                }
                                                                onMouseDown={
                                                                    handleMouseDownPassword
                                                                }
                                                                edge='end'
                                                            >
                                                                {showPassword ? (
                                                                    <Visibility fontSize='small' />
                                                                ) : (
                                                                    <VisibilityOff fontSize='small' />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type='submit'
                                        fullWidth
                                        variant='contained'
                                        color='primary'
                                        className={classes.submit}
                                        disabled={isSubmitting}
                                    >
                                        Login
                                    </Button>
                                </Form>

                                <Grid container>
                                    <Grid item xs>
                                        <Link
                                            href='/password-reset'
                                            variant='body2'
                                        >
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href='#' variant='body2'>
                                            {"Don't have an account? Register"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </Container>
    );
}
