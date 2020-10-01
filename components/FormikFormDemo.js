import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, LinearProgress, Box } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { DatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { InputBase } from 'formik-material-ui';
import { SimpleFileUpload } from 'formik-material-ui';
import { Switch } from 'formik-material-ui';

import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { CheckboxWithLabel } from 'formik-material-ui';
import { FormControlLabel, Radio } from '@material-ui/core';
import { RadioGroup } from 'formik-material-ui';

import { Select } from 'formik-material-ui';

import EventIcon from '@material-ui/icons/Event';
// Depending on the library you picked
import DateFnsUtils from '@date-io/date-fns';

export default function SignupForm() {
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    date: '',
                    tags: '',
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    lastName: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    date: Yup.date().required('Required'),
                    age: Yup.number().required('Required'),
                    inputBase: Yup.number().required('Required'),
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
                    <Box p={12}>
                        <Form>
                            <Field
                                component={TextField}
                                type='text'
                                name='tags'
                                select={true}
                                label='Division'
                                variant='outlined'
                                size='small'
                                fullWidth
                                // SelectProps={{
                                //     multiple: true,
                                // }}
                            >
                                <MenuItem value='dogs'>Dogs</MenuItem>
                                <MenuItem value='cats'>Cats</MenuItem>
                                <MenuItem value='rats'>Rats</MenuItem>
                                <MenuItem value='snakes'>Snakes</MenuItem>
                            </Field>
                            <br />
                            <br />
                            <Field component={RadioGroup} name='activity'>
                                <FormControlLabel
                                    value='painting'
                                    control={<Radio disabled={isSubmitting} />}
                                    label='Painting'
                                    disabled={isSubmitting}
                                />
                                <FormControlLabel
                                    value='drawing'
                                    control={<Radio disabled={isSubmitting} />}
                                    label='Drawing'
                                    disabled={isSubmitting}
                                />
                                <FormControlLabel
                                    value='none'
                                    control={<Radio disabled={isSubmitting} />}
                                    label='None'
                                    disabled
                                />
                            </Field>
                            <br />
                            <br />
                            <Field
                                component={Switch}
                                type='checkbox'
                                name='switch'
                            />
                            <br />
                            <Field
                                component={CheckboxWithLabel}
                                type='checkbox'
                                name='checked'
                                Label={{ label: 'Checkbox' }}
                            />
                            <br />
                            {/* <label htmlFor='firstName'>First Name</label> */}
                            <Field
                                component={TextField}
                                type='number'
                                name='inputBase'
                                label='Input Name'
                                variant='outlined'
                                size='small'
                                fullWidth
                            />
                            <br />
                            <Field
                                name='firstName'
                                type='text'
                                component={TextField}
                                label='First Name'
                                variant='outlined'
                                size='small'
                                fullWidth
                            />
                            <br />
                            <br />
                            {/* <ErrorMessage name='firstName' /> */}
                            {/* <label htmlFor='lastName'>Last Name</label>/ */}
                            <Field
                                name='lastName'
                                type={values.showPassword ? 'text' : 'password'}
                                component={TextField}
                                label='Password'
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
                                                {values.showPassword ? (
                                                    <Visibility fontSize='small' />
                                                ) : (
                                                    <VisibilityOff fontSize='small' />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <br />
                            <br />
                            {/* <ErrorMessage name='lastName' /> */}
                            {/* <label htmlFor='email'>Email Address</label> */}
                            <Field
                                name='email'
                                type='email'
                                fullWidth
                                variant='outlined'
                                component={TextField}
                                label='Email'
                                size='small'
                            />
                            <br />
                            <br />
                            {/* <ErrorMessage name='email' /> */}
                            {isSubmitting && <LinearProgress />}
                            <br />
                            <br />
                            <Field
                                component={DatePicker}
                                autoOk
                                fullWidth
                                disablePast
                                inputVariant='outlined'
                                label='Date'
                                format='dd/MM/yyyy'
                                size='small'
                                name='date'
                                initialFocusedDate={null}
                                defaultValue={null}
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
                                                <EventIcon fontSize='small' />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <br />
                            <Button
                                variant='contained'
                                color='primary'
                                disabled={isSubmitting}
                                type='submit'
                            >
                                Submit
                            </Button>
                            {/* <button type='submit'>Submit</button> */}
                        </Form>
                    </Box>
                )}
            </Formik>
        </MuiPickersUtilsProvider>
    );
}
