import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import Rating from '@material-ui/lab/Rating';

const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
}));

export default function ReviewForm({ handleSubmit }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(-1);

    return (
        <>
            <Formik
                initialValues={{
                    review: '',
                }}
                validationSchema={Yup.object({
                    review: Yup.string().trim('Required').required('Required'),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    handleSubmit(
                        values,
                        setSubmitting,
                        value,
                        setValue,
                        resetForm
                    );
                }}
            >
                {({ isSubmitting }) => (
                    <div>
                        <Form>
                            <Field
                                name='review'
                                type='text'
                                multiline={true}
                                rows={4}
                                component={TextField}
                                variant='outlined'
                                label='Give Review *'
                                fullWidth
                            />
                            <Box pt={8}>
                                <Grid
                                    container
                                    direction='row'
                                    justify='center'
                                    alignItems='flex-end'
                                    spacing={7}
                                >
                                    <Grid item>
                                        <div className={classes.root}>
                                            <Rating
                                                name='hover-feedback'
                                                value={value}
                                                size='large'
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                                onChangeActive={(
                                                    event,
                                                    newHover
                                                ) => {
                                                    setHover(newHover);
                                                }}
                                            />
                                            {value !== null && (
                                                <Box ml={2}>
                                                    {
                                                        labels[
                                                            hover !== -1
                                                                ? hover
                                                                : value
                                                        ]
                                                    }
                                                </Box>
                                            )}
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            type='submit'
                                            size='small'
                                            variant='contained'
                                            color='primary'
                                            disabled={isSubmitting}
                                        >
                                            <Box px={3}>Submit</Box>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    );
}
