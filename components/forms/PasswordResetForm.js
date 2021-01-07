import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';

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

import axios from 'axios';

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
        marginTop: theme.spacing(5),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function PasswordResetForm() {
    const classes = useStyles();
    const [errMessage, setErrMessage] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');

    const handleSubmit = (values, setSubmitting) => {
        axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/rest-auth/password/reset/`,
                values
            )
            .then((res) => {
                console.log(res.data);
                setSuccessMessage(res.data.detail);
                setErrMessage('');
                setSubmitting(false);
            })
            .catch((err) => {
                console.log(err.response);
                setErrMessage(err.response.data.email);
                setSuccessMessage('');
                setSubmitting(false);
            });
    };
    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Password Reset
                </Typography>

                {errMessage &&
                    errMessage.map((errMessage) => (
                        <Box mt={2}>
                            <Alert severity='error'>{errMessage}</Alert>
                        </Box>
                    ))}

                {successMessage && (
                    <Box mt={2}>
                        <Alert severity='success'>{successMessage}</Alert>
                    </Box>
                )}
                <div className={classes.form}>
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email('Invalid email address')
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
                                                name='email'
                                                type='email'
                                                fullWidth
                                                variant='outlined'
                                                component={TextField}
                                                label='Email *'
                                                size='small'
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
                                        Reset Password
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
