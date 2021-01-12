import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import { InputBase } from 'formik-material-ui';

export default function SignupForm({ setQuantity }) {
    const handleChange = (event) => {
        // console.log('ev1', event.target.inputBase);
        console.log('ev2', event.target.value);
    };
    return (
        <Formik
            initialValues={{
                inputBase: 1,
            }}
            validationSchema={Yup.object({
                inputBase: Yup.number().required('Required'),
            })}
        >
            
                <Form>
                    <Field
                        component={TextField}
                        type='number'
                        name='inputBase'
                        label='Quantity *'
                        variant='outlined'
                        size='small'
                        fullWidth
                    />
                </Form>
            
        </Formik>
    );
}
