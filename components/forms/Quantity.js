import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';

export default function SignupForm({setQuantity}) {
    
    return (
        <Formik
            initialValues={{
                inputBase: '',
            }}
            validationSchema={Yup.object({
                inputBase: Yup.number().required('Required'),
            })}
            onSubmit={(values) => {
                setQuantity(values.inputBase)
            }}
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
                    // onChange={onSubmit}
                />
            </Form>
        </Formik>
    );
}
