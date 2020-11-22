import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Rating from '@material-ui/lab/Rating';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
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
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    // const handleSubmit = (values, setSubmitting) => {
    //     const review = {
    //         review_detail: values.review,
    //         rating_star: value,
    //         product: product.id,
    //     };

    //     axios
    //         .post('http://localhost:8000/reviews-create/', review, config)
    //         .then((res) => {
    //             console.log(res.data);
    //             const productID = parseInt(product.id);
    //             axios
    //                 .get(`http://localhost:8000/products/${product.slug}/`)
    //                 .then((res) => {
    //                     setStateProduct(res.data);
    //                     console.log('review done', product);
    //                     setSubmitting(false);
    //                 })
    //                 .catch((err) => console.log(err.response));
    //         })
    //         .catch((err) => console.log(err.response));
    // };

    return (
        <>
            <Formik
                initialValues={{
                    review: '',
                }}
                validationSchema={Yup.object({
                    review: Yup.string().trim('Required').required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values, setSubmitting, value);
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
                                label='Give Review *'
                                fullWidth
                            />
                            <Box pt={8}>
                                <Grid
                                    container
                                    direction='row'
                                    justify='center'
                                    alignItems='flex-end'
                                    spacing={3}
                                >
                                    <Grid item>
                                        <div className={classes.root}>
                                            <Rating
                                                name='hover-feedback'
                                                value={value}
                                                precision={0.5}
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
                                            color='secondary'
                                            // className={classes.submit}
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
