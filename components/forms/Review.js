import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    boot: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: '#3f50b5',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function ReviewForm({ handleSubmit, loading, setLoading }) {
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
                                        <div className={classes.boot}>
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
                                        <div className={classes.root}>
                                            <div className={classes.wrapper}>
                                                <Button
                                                    type='submit'
                                                    size='small'
                                                    variant='contained'
                                                    color='primary'
                                                    disabled={
                                                        loading || isSubmitting
                                                    }
                                                >
                                                    <Box px={3}>Submit</Box>
                                                </Button>
                                                {loading && (
                                                    <CircularProgress
                                                        size={24}
                                                        className={
                                                            classes.buttonProgress
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
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
