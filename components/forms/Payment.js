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

export default function PaymentForm({ paymentOrderCode }) {
    const classes = useStyles();
    const router = useRouter();
    const paymentNext = (values, setSubmitting) => {
        // if (this.state.myOrder.is_confirm === true){
        //     if (this.state.myOrder.is_payment_confirm === false){
        axios
            .patch(
                `http://localhost:8000/my-order/${paymentOrderCode}/`,
                {
                    payment: values.payment,
                    is_payment_confirm: true,
                    is_processing: true,
                },
                config
            )
            .then((res) => {
                console.log(res.data);
                setSubmitting(false);
                router.push(`/my-order-details/${res.data.order_code}`);
                //   this.setState({
                //     loading: false,
                //     submitted: true
                //   });
            })
            .catch((err) => {
                console.log(err.response);
                setSubmitting(false);
                // error response do not handling yet. it will be added when access of internet available
                //   this.setState({
                //     loading: false,
                //     submitted: false
                //   });
            });
        // }
        //   } else {
        //     this.setState({message: 'You need to complete the receiver address first...!!', loading: false})
        //   }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component='h5' variant='h5'>
                    Payment Method
                </Typography>
                <div className={classes.form}>
                    <Formik
                        initialValues={{
                            payment: '',
                        }}
                        validationSchema={Yup.object({
                            payment: Yup.string().required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            paymentNext(values, setSubmitting);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <div>
                                <Form>
                                    <Field
                                        component={TextField}
                                        type='text'
                                        name='payment'
                                        select={true}
                                        label='Select Payment Method *'
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        // SelectProps={{
                                        //     multiple: true,
                                        // }}
                                    >
                                        <MenuItem value='Cash On Delivery'>
                                            Cash On Delivery
                                        </MenuItem>
                                    </Field>
                                    <Button
                                        type='submit'
                                        fullWidth
                                        variant='contained'
                                        color='primary'
                                        className={classes.submit}
                                        disabled={isSubmitting}
                                    >
                                        Confirm Your Order
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
