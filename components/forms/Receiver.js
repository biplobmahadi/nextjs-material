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

export default function SignupForm() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Formik
            initialValues={{
                name: '',
                phone: '',
                otherPhone: '',
                division: '',
                city: '',
                area: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                phone: Yup.string()
                    .matches(
                        /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
                        'Not valid bd phone number'
                    )
                    // .max(11, 'It is not a valid phone number')
                    // .min(11, 'It is not a valid phone number')
                    .required('Required'),
                otherPhone: Yup.string().matches(
                    /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
                    'Not valid bd phone number'
                ),
                // .max(11, 'It is not a valid phone number')
                // .min(11, 'It is not a valid phone number')
                division: Yup.string().required('Required'),
                city: Yup.string().required('Required'),
                area: Yup.string().trim('Required').required('Required'),

                password: Yup.string().required('Required'),
                confirmPassword: Yup.string().required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <div>
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    name='name'
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
                                    name='otherPhone'
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
                                    name='division'
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
                                    multiline={true}
                                    rows={4}
                                    component={TextField}
                                    label='Area *'
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
    );
}
