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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
const config = {
    headers: {
        Authorization: 'Token ' + Cookies.get('haha_ecom_bangla_token'),
    },
};
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
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

export default function ReceiverForm({ receiverOrderCode }) {
    const classes = useStyles();
    const router = useRouter();
    const receiverNext = (values, setSubmitting) => {
        axios
            .patch(
                `http://localhost:8000/my-order/${receiverOrderCode}/`,
                values,
                config
            )
            .then((res) => {
                console.log(res.data);
                setSubmitting(false);
                router.push(`/payment/${res.data.order_code}`);
            })
            .catch((err) => {
                console.log(err.response);
                setSubmitting(false);
            });
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component='h5' variant='h5'>
                    Receiver Address
                </Typography>
                <div className={classes.form}>
                    <Formik
                        initialValues={{
                            receiver_name: '',
                            receiver_phone: '',
                            receiver_other_phone: '',
                            receiver_division: '',
                            receiver_city: '',
                            receiver_area: '',
                            receiver_address: '',
                            is_confirm: true,
                        }}
                        validationSchema={Yup.object({
                            receiver_name: Yup.string()
                                .trim('Required')
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            receiver_phone: Yup.string()
                                .matches(
                                    /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
                                    'Not valid bd phone number'
                                )
                                // .max(11, 'It is not a valid phone number')
                                // .min(11, 'It is not a valid phone number')
                                .required('Required'),
                            receiver_other_phone: Yup.string().matches(
                                /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
                                'Not valid bd phone number'
                            ),
                            // .max(11, 'It is not a valid phone number')
                            // .min(11, 'It is not a valid phone number')
                            receiver_division: Yup.string()
                                .trim('Required')
                                .required('Required'),
                            receiver_city: Yup.string()
                                .trim('Required')
                                .required('Required'),
                            receiver_area: Yup.string()
                                .trim('Required')
                                .required('Required'),
                            receiver_address: Yup.string()
                                .trim('Required')
                                .required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            receiverNext(values, setSubmitting);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <div>
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Field
                                                name='receiver_name'
                                                type='text'
                                                component={TextField}
                                                label='Full Name *'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                name='receiver_phone'
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
                                                name='receiver_other_phone'
                                                type='text'
                                                component={TextField}
                                                label='Other Phone Number'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                name='receiver_division'
                                                type='text'
                                                component={TextField}
                                                label='Division *'
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                name='receiver_city'
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
                                                name='receiver_area'
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
                                                name='receiver_address'
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
                                        Continue
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
