import Head from 'next/head';
import ButtonAppBar from '../../../../components/ButtonAppBar';

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

import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

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

export default function PasswordResetConfirm() {
    const classes = useStyles();
    const router = useRouter();
    const { uid, token } = router.query;
    const [responseData, setResponseData] = React.useState('');

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = (values, setSubmitting) => {
        console.log(uid, token);
        axios
            .post('http://localhost:8000/rest-auth/password/reset/confirm/', {
                new_password1: values.new_password1,
                new_password2: values.new_password2,
                uid: uid,
                token: token,
            })
            .then((res) => {
                console.log(res.data);
                setResponseData(res.data);
                setSubmitting(false);
            })
            .catch((err) => {
                console.log(err.response);
                setSubmitting(false);
            });
    };
    return (
        <div>
            <Head>
                <title>Password Reset Confirm</title>
                <link rel='icon' href='/a.ico' />
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar />
            <Box mt={14} mb={10}>
                <Container component='main' maxWidth='xs'>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Password Reset Confirm
                        </Typography>
                        {responseData && (
                            <Box mt={2}>
                                <Alert severity='success'>Confirmed.</Alert>
                            </Box>
                        )}
                        <div className={classes.form}>
                            <Formik
                                initialValues={{
                                    new_password1: '',
                                    new_password2: '',
                                }}
                                validationSchema={Yup.object({
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
                                    handleSubmit(values, setSubmitting);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <div>
                                        <Form>
                                            <Grid container spacing={2}>
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
                                                Confirm Password
                                            </Button>
                                        </Form>
                                    </div>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Container>
            </Box>
        </div>
    );
}
