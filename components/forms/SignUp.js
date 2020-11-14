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
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

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

const useRegister = () => {
    const token = useSelector((state) => state.loginReducer.token);

    const dispatch = useDispatch();
    // need to show msg for email already used and password error with payload
    const register = (userInfo, setSubmitting) => {
        axios
            .post('http://localhost:8000/rest-auth/registration/', userInfo)
            .then((res) => {
                console.log(res.data);
                dispatch({ type: 'REGISTER', payload: res.data });
                setSubmitting(false);
            })
            .catch((err) => {
                console.log(err.response);
                setSubmitting(false);
            });
    };
    return { token, register };
};

export default function SignupForm() {
    const classes = useStyles();
    const { token, register } = useRegister();

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
                    Register
                </Typography>
                <div className={classes.form}>
                    <Formik
                        initialValues={{
                            email: '',
                            password1: '',
                            password2: '',
                            first_name: '',
                            last_name: '',
                        }}
                        validationSchema={Yup.object({
                            first_name: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            last_name: Yup.string()
                                .max(20, 'Must be 20 characters or less')
                                .required('Required'),
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('Required'),

                            password1: Yup.string()
                                .matches(
                                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    'Need min 8 characters with at least one letter and one number'
                                )
                                .required('Required'),
                            password2: Yup.string()
                                .oneOf(
                                    [Yup.ref('password1'), null],
                                    'Both password must match'
                                )
                                .required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            register(values, setSubmitting);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <div>
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name='first_name'
                                                type='text'
                                                component={TextField}
                                                label='First Name *'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name='last_name'
                                                type='text'
                                                component={TextField}
                                                label='Last Name *'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                            />
                                        </Grid>
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
                                                name='password1'
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
                                        <Grid item xs={12}>
                                            <Field
                                                name='password2'
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                component={TextField}
                                                label='Confirm Password *'
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
                                        Register
                                    </Button>
                                </Form>

                                <Grid container justify='flex-end'>
                                    <Grid item>
                                        <Link href='#' variant='body2'>
                                            Already have an account? Login
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
