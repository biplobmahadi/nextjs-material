import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(1, 0, 1),
    },
    root: {
        marginTop: theme.spacing(1),
        // alignItems: 'center',
    },
    wrapper: {
        // margin: theme.spacing(1),
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

export default function VideoReviewForm({
    handleSubmitForVideoReview,
    product,
    myBag,
    changeProduct,
    changeMyBag,
    config,
}) {
    const classes = useStyles();
    return (
        <Formik
            initialValues={{
                link: '',
            }}
            validationSchema={Yup.object({
                link: Yup.string()
                    .matches(
                        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
                        'Need valid youtube link'
                    )
                    .trim('Required')
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                handleSubmitForVideoReview(
                    values,
                    setSubmitting,
                    resetForm,
                    product,
                    myBag,
                    changeProduct,
                    changeMyBag,
                    config
                );
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field
                        name='link'
                        type='text'
                        size='small'
                        component={TextField}
                        variant='outlined'
                        label='Youtube Video Link *'
                        fullWidth
                    />
                    <div className={classes.root}>
                        <div className={classes.wrapper}>
                            <Button
                                type='submit'
                                size='small'
                                fullWidth
                                variant='contained'
                                color='primary'
                                classeName={classes.submit}
                                disabled={isSubmitting}
                            >
                                Submit
                            </Button>
                            {isSubmitting && (
                                <CircularProgress
                                    size={24}
                                    className={classes.buttonProgress}
                                />
                            )}
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
