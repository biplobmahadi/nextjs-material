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

export default function SizeForm() {
    const classes = useStyles();

    const handleChange = (event) => {
        console.log(event.target.value);
    };

    return (
        <Formik
            initialValues={{
                tags: '',
            }}
            validationSchema={Yup.object({
                tags: Yup.string().required('Required'),
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
                        <Field
                            component={TextField}
                            type='text'
                            name='tags'
                            select={true}
                            label='Select Size *'
                            variant='outlined'
                            size='small'
                            fullWidth
                            // onChange={(event) => handleChange(event)}
                            // SelectProps={{
                            //     multiple: true,
                            // }}
                        >
                            <MenuItem value='dogs'>S</MenuItem>
                            <MenuItem value='cats'>M</MenuItem>
                            <MenuItem value='rats'>L</MenuItem>
                            <MenuItem value='snakes'>XL</MenuItem>
                            <MenuItem value='snakes'>XXL</MenuItem>
                        </Field>
                    </Form>
                </div>
            )}
        </Formik>
    );
}
