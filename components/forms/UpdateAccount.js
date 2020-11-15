import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import MenuItem from '@material-ui/core/MenuItem';
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

const useUpdateAccount = () => {
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
    const updateAccount = (values, setSubmitting) => {
        axios
            .patch('http://localhost:8000/rest-auth/user/', values, config)
            .then((res) => {
                console.log(res.data);
                setSubmitting(false);
            })
            .catch((err) => {
                console.log(err.response);
                setSubmitting(false);
            });
    };
    return { token, updateAccount };
};

export default function SignupForm() {
    const classes = useStyles();
    const { token, updateAccount } = useUpdateAccount();

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Account Update
                </Typography>
                <Box mt={2}>
                    <Alert severity='success'>
                        This is an error alert — check it out!
                    </Alert>
                </Box>
                <div className={classes.form}>
                    <Formik
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            phone: '',
                            division: '',
                            city: '',
                            area: '',
                            address: '',
                        }}
                        validationSchema={Yup.object({
                            first_name: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            last_name: Yup.string()
                                .max(20, 'Must be 20 characters or less')
                                .required('Required'),
                            phone: Yup.string()
                                .matches(
                                    /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
                                    'Not valid bd phone number'
                                )
                                .required('Required'),
                            division: Yup.string().required('Required'),
                            city: Yup.string().required('Required'),
                            area: Yup.string().required('Required'),
                            address: Yup.string()
                                .trim('Required')
                                .required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            updateAccount(values, setSubmitting);
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
                                                name='phone'
                                                type='text'
                                                component={TextField}
                                                label='Phone Number *'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                name='division'
                                                component={TextField}
                                                type='text'
                                                select={true}
                                                label='Division *'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                            >
                                                <MenuItem value='Dhaka'>
                                                    Dhaka
                                                </MenuItem>
                                                <MenuItem value='cats'>
                                                    Rajshahi
                                                </MenuItem>
                                                <MenuItem value='rats'>
                                                    Chottogram
                                                </MenuItem>
                                                <MenuItem value='snakes'>
                                                    Sylhet
                                                </MenuItem>
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                name='city'
                                                type='text'
                                                component={TextField}
                                                label='City *'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                name='area'
                                                type='text'
                                                component={TextField}
                                                label='Area *'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                name='address'
                                                type='text'
                                                multiline={true}
                                                rows={4}
                                                component={TextField}
                                                label='Address *'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
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
                                        Update Account
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
