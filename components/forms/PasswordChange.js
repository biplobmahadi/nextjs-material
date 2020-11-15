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
import Alert from '@material-ui/lab/Alert';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    paper: {
        // marginTop: theme.spacing(2),
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

const usePasswordChange = () => {
    const token = useSelector((state) => state.loginReducer.token);

    const dispatch = useDispatch();

    let haha_ecom_bangla_token;
    if (typeof window !== 'undefined') {
        haha_ecom_bangla_token = localStorage.getItem('haha_ecom_bangla_token');
    }
    const config = {
        headers: {
            Authorization: 'Token ' + haha_ecom_bangla_token,
        },
    };
    // need to show msg for user not register yet or some other msg
    const passwordChange = (values, setSubmitting) => {
        axios
            .post(
                'http://localhost:8000/rest-auth/password/change/',
                values,
                config
            )
            .then((res) => {
                console.log(res.data);
                setSubmitting(false);
            })
            .catch((err) => {
                console.log(err.response);
                setSubmitting(false);
            });
    };
    return { token, passwordChange };
};

export default function SignupForm() {
    const classes = useStyles();
    const { token, passwordChange } = usePasswordChange();

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
                    Change Password
                </Typography>
                <Box mt={2}>
                    <Alert severity='error'>
                        This is an error alert — check it out!
                    </Alert>
                </Box>
                <div className={classes.form}>
                    <Formik
                        initialValues={{
                            old_password: '',
                            new_password1: '',
                            new_password2: '',
                        }}
                        validationSchema={Yup.object({
                            old_password: Yup.string()
                                .matches(
                                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    'Need min 8 characters with at least one letter and one number'
                                )
                                .required('Required'),
                            new_password1: Yup.string()
                                .matches(
                                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    'Need min 8 characters with at least one letter and one number'
                                )
                                .required('Required'),
                            new_password2: Yup.string()
                                .oneOf(
                                    [Yup.ref('new_password1'), null],
                                    'Both password must match'
                                )
                                .required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            passwordChange(values, setSubmitting);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <div>
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Field
                                                name='old_password'
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
                                                name='new_password1'
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
                                                name='new_password2'
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
                                        Change Password
                                    </Button>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </Container>
    );
}
