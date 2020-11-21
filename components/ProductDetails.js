import Head from 'next/head';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import ProductDetailsTable from './ProductDetailsTable';
import ProductCard from '../components/ProductCard';
import Review from './forms/Review';
import VideoReview from './forms/VideoReview';
import UpdateReviewDialog from './UpdateReviewDialog';
import DeleteReviewDialog from './DeleteReviewDialog';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Chip from '@material-ui/core/Chip';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import StarHalfIcon from '@material-ui/icons/StarHalf';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import ReactPlayer from 'react-player/youtube';

import Cookies from 'js-cookie';
import axios from 'axios';

const config = {
    headers: {
        Authorization: 'Token ' + Cookies.get('haha_ecom_bangla_token'),
    },
};

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

const useStyles = makeStyles({
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
});

let productRe;

export default function ProductDetails(props) {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    let contained = 'contained';

    const classes = useStyles();

    const [reRender, setReRender] = React.useState(false);
    let product = productRe ? productRe : props.product;
    let user = props.user;

    console.log('got user', user);
    console.log('got product', product);

    const changeProduct = (value) => {
        productRe = value;
        console.log('product now', productRe);

        setReRender(!reRender);
    };
    React.useEffect(() => {
        console.log('re render happend');
        console.log('final product now', product);
    }, [reRender]);

    const handleSubmit = (values, setSubmitting) => {
        const review = {
            review_detail: values.review,
            rating_star: value,
            product: product.id,
        };

        axios
            .post('http://localhost:8000/reviews-create/', review, config)
            .then((res) => {
                console.log(res.data);
                axios
                    .get(`http://localhost:8000/products/${product.slug}/`)
                    .then((res) => {
                        changeProduct(res.data);
                        console.log('review done', res.data);
                        setSubmitting(false);
                    })
                    .catch((err) => console.log(err.response));
            })
            .catch((err) => console.log(err.response));
    };

    const handleAgree = (stringifyReview) => {
        const review = JSON.parse(stringifyReview);
        console.log('kire', user);
        // user who own this review, can't make agreed
        if (
            !review.reviewcountforagree.user.includes(user.pk) &&
            review.user.pk !== user.pk
        ) {
            const reviewCountForAgree = {
                agreed: review.reviewcountforagree.agreed + 1,
                user: review.reviewcountforagree.user.concat(user.pk),
            };

            axios
                .patch(
                    `http://localhost:8000/reviews-count-for-agree-update/${review.reviewcountforagree.id}/`,
                    reviewCountForAgree,
                    config
                )
                .then((res) => {
                    if (review.reviewcountfordisagree.user.includes(user.pk)) {
                        let arr = review.reviewcountfordisagree.user;
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i] === user.pk) {
                                arr.splice(i, 1);
                                i--;
                            }
                        }
                        let finalArr = arr;
                        const reviewCountForDisagree = {
                            disagreed:
                                review.reviewcountfordisagree.disagreed - 1,
                            user: finalArr,
                        };

                        axios
                            .patch(
                                `http://localhost:8000/reviews-count-for-disagree-update/${review.reviewcountfordisagree.id}/`,
                                reviewCountForDisagree,
                                config
                            )
                            .then((res) => {
                                axios
                                    .get(
                                        `http://localhost:8000/products/${product.slug}/`
                                    )
                                    .then((res) => {
                                        // setStateProduct(res.data);
                                        changeProduct(res.data);
                                        console.log(
                                            'review Now agreed - product',
                                            res.data
                                        );
                                    })
                                    .catch((err) => console.log(err.response));
                            })
                            .catch((err) => console.log(err.response));
                    } else {
                        axios
                            .get(
                                `http://localhost:8000/products/${product.slug}/`
                            )
                            .then((res) => {
                                // setStateProduct(res.data);
                                changeProduct(res.data);
                                console.log(
                                    'review Now agreed - product',
                                    res.data
                                );
                            })
                            .catch((err) => console.log(err.response));
                    }
                })
                .catch((err) => console.log(err.response));
        } else {
            console.log('you cant agree with your review or already done');
        }
    };

    const handleDisagree = (stringifyReview) => {
        // const review = JSON.parse(event.target.value);

        const review = JSON.parse(stringifyReview);

        console.log('kire dis', user);
        // user who own this review, can't make disagreed
        if (
            !review.reviewcountfordisagree.user.includes(user.pk) &&
            review.user.pk !== user.pk
        ) {
            const reviewCountForDisagree = {
                disagreed: review.reviewcountfordisagree.disagreed + 1,
                user: review.reviewcountfordisagree.user.concat(user.pk),
            };

            axios
                .patch(
                    `http://localhost:8000/reviews-count-for-disagree-update/${review.reviewcountfordisagree.id}/`,
                    reviewCountForDisagree,
                    config
                )
                .then((res) => {
                    if (review.reviewcountforagree.user.includes(user.pk)) {
                        let arr = review.reviewcountforagree.user;
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i] === user.pk) {
                                arr.splice(i, 1);
                                i--;
                            }
                        }
                        let finalArr = arr;
                        const reviewCountForAgree = {
                            agreed: review.reviewcountforagree.agreed - 1,
                            user: finalArr,
                        };

                        axios
                            .patch(
                                `http://localhost:8000/reviews-count-for-agree-update/${review.reviewcountforagree.id}/`,
                                reviewCountForAgree,
                                config
                            )
                            .then((res) => {
                                axios
                                    .get(
                                        `http://localhost:8000/products/${product.slug}/`
                                    )
                                    .then((res) => {
                                        // setStateProduct(res.data);
                                        changeProduct(res.data);
                                        console.log(
                                            'review Now disagreed - product',
                                            res.data
                                        );
                                    })
                                    .catch((err) => console.log(err.response));
                            })
                            .catch((err) => console.log(err.response));
                    } else {
                        axios
                            .get(
                                `http://localhost:8000/products/${product.slug}/`
                            )
                            .then((res) => {
                                // setStateProduct(res.data);
                                changeProduct(res.data);
                                console.log(
                                    'review Now disagreed - product',
                                    res.data
                                );
                            })
                            .catch((err) => console.log(err.response));
                    }
                })
                .catch((err) => console.log(err.response));
        } else {
            console.log('you cant disagree with your review or already done');
        }
    };

    return (
        <div>
            <Box mx={3} mt={8}>
                <Grid container spacing={2} alignItems='stretch'>
                    <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                        <Box
                            p={2}
                            height='100%'
                            borderRadius='borderRadius'
                            textAlign='center'
                            style={{ backgroundColor: 'white' }}
                        >
                            <Typography variant='h4' component='h4'>
                                Product Details
                            </Typography>
                            <Box mt={2}>
                                <Divider variant='middle' />
                            </Box>

                            <Box mt={2} borderRadius='borderRadius'>
                                <ProductDetailsTable />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                        <Box
                            p={2}
                            height='100%'
                            textAlign='center'
                            borderRadius='borderRadius'
                            style={{ backgroundColor: 'white' }}
                        >
                            <Typography variant='h4'>Video Details</Typography>
                            <Box mt={2}>
                                <Divider variant='middle' />
                            </Box>
                            <Box mt={2}>
                                <ReactPlayer
                                    width='100%'
                                    height='324px'
                                    controls
                                    light
                                    url='https://www.youtube.com/watch?v=pAPQFqdFDdY'
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box mx={3} mt={8} textAlign='center'>
                <Box
                    p={2}
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Typography variant='h4'>You May Like</Typography>
                </Box>
                <Box mt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <ProductCard />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <ProductCard />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <ProductCard />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <ProductCard />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <ProductCard />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <ProductCard />
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box mx={3} mt={8}>
                <Box
                    px={2}
                    py={1}
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Grid
                        container
                        direction='row'
                        justify='space-between'
                        alignItems='center'
                    >
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Typography variant='h4' component='h4'>
                                Customer Video Review
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Box>
                                <VideoReview />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                            <Box
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <ReactPlayer
                                    width='100%'
                                    height='260px'
                                    controls
                                    light
                                    url='https://www.youtube.com/watch?v=pAPQFqdFDdY'
                                />
                                <Box px={3} py={1}>
                                    <Box>
                                        <Button
                                            size='small'
                                            startIcon={<ThumbUpIcon />}
                                            fullWidth
                                        >
                                            Agreed (12)
                                        </Button>
                                    </Box>
                                    <Box mt={1}>
                                        <Button
                                            fullWidth
                                            size='small'
                                            startIcon={<ThumbDownIcon />}
                                        >
                                            Disagreed (02)
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                            <Box
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <ReactPlayer
                                    width='100%'
                                    height='260px'
                                    controls
                                    light
                                    url='https://www.youtube.com/watch?v=pAPQFqdFDdY'
                                />
                                <Box px={3} py={1}>
                                    <Box>
                                        <Button
                                            size='small'
                                            startIcon={<ThumbUpIcon />}
                                            fullWidth
                                        >
                                            Agreed (12)
                                        </Button>
                                    </Box>
                                    <Box mt={1}>
                                        <Button
                                            fullWidth
                                            size='small'
                                            startIcon={<ThumbDownIcon />}
                                        >
                                            Disagreed (02)
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                            <Box
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <ReactPlayer
                                    width='100%'
                                    height='260px'
                                    controls
                                    light
                                    url='https://www.youtube.com/watch?v=pAPQFqdFDdY'
                                />
                                <Box px={3} py={1}>
                                    <Box>
                                        <Button
                                            size='small'
                                            startIcon={<ThumbUpIcon />}
                                            fullWidth
                                        >
                                            Agreed (12)
                                        </Button>
                                    </Box>
                                    <Box mt={1}>
                                        <Button
                                            fullWidth
                                            size='small'
                                            startIcon={<ThumbDownIcon />}
                                        >
                                            Disagreed (02)
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                            <Box
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <ReactPlayer
                                    width='100%'
                                    height='260px'
                                    controls
                                    light
                                    url='https://www.youtube.com/watch?v=pAPQFqdFDdY'
                                />
                                <Box px={3} py={1}>
                                    <Box>
                                        <Button
                                            size='small'
                                            startIcon={<ThumbUpIcon />}
                                            fullWidth
                                        >
                                            Agreed (12)
                                        </Button>
                                    </Box>
                                    <Box mt={1}>
                                        <Button
                                            fullWidth
                                            size='small'
                                            startIcon={<ThumbDownIcon />}
                                        >
                                            Disagreed (02)
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box mx={3} mt={8}>
                <Box
                    p={2}
                    textAlign='center'
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Typography variant='h4'>Review & Ratings</Typography>
                </Box>

                <Box mt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            <Box
                                style={{ backgroundColor: 'white' }}
                                p={2}
                                height='100%'
                                textAlign='center'
                                borderRadius='borderRadius'
                            >
                                <Box>
                                    <Typography variant='h4' component='h4'>
                                        4.5
                                    </Typography>
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <Typography>45 Rating & Review</Typography>
                                </Box>
                                <Box mt={3}>
                                    <Box>
                                        <Grid
                                            container
                                            justify='center'
                                            alignItems='center'
                                        >
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />{' '}
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {' '}
                                                        [10]
                                                    </Typography>
                                                </Box>
                                            </span>
                                        </Grid>
                                    </Box>
                                    <Box mt={1}>
                                        <Grid
                                            container
                                            justify='center'
                                            alignItems='center'
                                        >
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />{' '}
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {' '}
                                                        [10]
                                                    </Typography>
                                                </Box>
                                            </span>
                                        </Grid>
                                    </Box>
                                    <Box mt={1}>
                                        <Grid
                                            container
                                            justify='center'
                                            alignItems='center'
                                        >
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />{' '}
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {' '}
                                                        [10]
                                                    </Typography>
                                                </Box>
                                            </span>
                                        </Grid>
                                    </Box>
                                    <Box mt={1}>
                                        <Grid
                                            container
                                            justify='center'
                                            alignItems='center'
                                        >
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />{' '}
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {' '}
                                                        [10]
                                                    </Typography>
                                                </Box>
                                            </span>
                                        </Grid>
                                    </Box>
                                    <Box mt={1}>
                                        <Grid
                                            container
                                            justify='center'
                                            alignItems='center'
                                        >
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />
                                            <StarIcon color='secondary' />{' '}
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {' '}
                                                        [10]
                                                    </Typography>
                                                </Box>
                                            </span>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            <Box
                                style={{ backgroundColor: 'white' }}
                                p={2}
                                height='100%'
                                textAlign='center'
                                borderRadius='borderRadius'
                            >
                                <Box>
                                    <Formik
                                        initialValues={{
                                            review: '',
                                        }}
                                        validationSchema={Yup.object({
                                            review: Yup.string()
                                                .trim('Required')
                                                .required('Required'),
                                        })}
                                        onSubmit={(
                                            values,
                                            { setSubmitting }
                                        ) => {
                                            handleSubmit(values, setSubmitting);
                                        }}
                                        // here I got some bugs, without submitting this component render again and again
                                        // but by hovering to form and star
                                        // need to fix it later..
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
                                                                <div
                                                                    className={
                                                                        classes.root
                                                                    }
                                                                >
                                                                    <Rating
                                                                        name='hover-feedback'
                                                                        value={
                                                                            value
                                                                        }
                                                                        precision={
                                                                            0.5
                                                                        }
                                                                        onChange={(
                                                                            event,
                                                                            newValue
                                                                        ) => {
                                                                            setValue(
                                                                                newValue
                                                                            );
                                                                        }}
                                                                        onChangeActive={(
                                                                            event,
                                                                            newHover
                                                                        ) => {
                                                                            setHover(
                                                                                newHover
                                                                            );
                                                                        }}
                                                                    />
                                                                    {value !==
                                                                        null && (
                                                                        <Box
                                                                            ml={
                                                                                2
                                                                            }
                                                                        >
                                                                            {
                                                                                labels[
                                                                                    hover !==
                                                                                    -1
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
                                                                    disabled={
                                                                        isSubmitting
                                                                    }
                                                                >
                                                                    <Box px={3}>
                                                                        Submit
                                                                    </Box>
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Form>
                                            </div>
                                        )}
                                    </Formik>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {product.review &&
                    product.review.length !== 0 &&
                    product.review.map((review) => (
                        <Box
                            p={2}
                            mt={2}
                            borderRadius='borderRadius'
                            style={{ backgroundColor: 'white' }}
                        >
                            <Grid container spacing={2}>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={3}
                                    xl={2}
                                >
                                    <Box textAlign='center'>
                                        <img
                                            src='/aa.jpg'
                                            alt=''
                                            srcset=''
                                            height='50'
                                            width='50'
                                            style={{ borderRadius: '50%' }}
                                        />
                                        <Typography variant='h6' component='h6'>
                                            {review.user.first_name.toUpperCase() +
                                                ' ' +
                                                review.user.last_name.toUpperCase()}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={7}
                                    xl={8}
                                >
                                    <Box pr={2} pl={1}>
                                        {review.rating_star === 1.0 && (
                                            <Box>
                                                <StarIcon color='secondary' />
                                                <StarBorderIcon color='secondary' />
                                                <StarBorderIcon color='secondary' />
                                                <StarBorderIcon color='secondary' />
                                                <StarBorderIcon color='secondary' />
                                            </Box>
                                        )}

                                        {review.rating_star === 2.0 && (
                                            <Box>
                                                <StarIcon color='secondary' />
                                                <StarIcon color='secondary' />
                                                <StarBorderIcon color='secondary' />
                                                <StarBorderIcon color='secondary' />
                                                <StarBorderIcon color='secondary' />
                                            </Box>
                                        )}
                                        {review.rating_star === 3.0 && (
                                            <Box>
                                                <StarIcon color='secondary' />
                                                <StarIcon color='secondary' />
                                                <StarIcon color='secondary' />
                                                <StarBorderIcon color='secondary' />
                                                <StarBorderIcon color='secondary' />
                                            </Box>
                                        )}
                                        {review.rating_star === 4.0 && (
                                            <Box>
                                                <StarIcon color='secondary' />
                                                <StarIcon color='secondary' />
                                                <StarIcon color='secondary' />
                                                <StarIcon color='secondary' />
                                                <StarBorderIcon color='secondary' />
                                            </Box>
                                        )}
                                        {review.rating_star === 5.0 && (
                                            <Box>
                                                <StarIcon color='secondary' />
                                                <StarIcon color='secondary' />
                                                <StarIcon color='secondary' />
                                                <StarIcon color='secondary' />
                                                <StarIcon color='secondary' />
                                            </Box>
                                        )}

                                        <Typography>
                                            {review.review_detail}
                                        </Typography>
                                        <Box pt={3}>
                                            <Typography variant='p'>
                                                19 February, 2020.
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={2}
                                    xl={2}
                                >
                                    <Box px={3}>
                                        {review.user.pk !== user.pk ? (
                                            <>
                                                <Box>
                                                    <Button
                                                        size='small'
                                                        startIcon={
                                                            <ThumbUpIcon />
                                                        }
                                                        fullWidth
                                                        onClick={() =>
                                                            handleAgree(
                                                                JSON.stringify(
                                                                    review
                                                                )
                                                            )
                                                        }
                                                        // value={JSON.stringify(
                                                        //     review
                                                        // )}
                                                    >
                                                        Agreed (
                                                        {review.reviewcountforagree &&
                                                            review
                                                                .reviewcountforagree
                                                                .agreed}
                                                        )
                                                    </Button>
                                                </Box>
                                                <Box mt={1}>
                                                    <Button
                                                        fullWidth
                                                        size='small'
                                                        startIcon={
                                                            <ThumbDownIcon />
                                                        }
                                                        onClick={() =>
                                                            handleDisagree(
                                                                JSON.stringify(
                                                                    review
                                                                )
                                                            )
                                                        }
                                                        value={JSON.stringify(
                                                            review
                                                        )}
                                                    >
                                                        Disagreed (
                                                        {review.reviewcountfordisagree &&
                                                            review
                                                                .reviewcountfordisagree
                                                                .disagreed}
                                                        )
                                                    </Button>
                                                </Box>
                                            </>
                                        ) : (
                                            <>
                                                <Box>
                                                    <UpdateReviewDialog
                                                        review={review}
                                                    />
                                                </Box>
                                                <Box mt={1}>
                                                    <DeleteReviewDialog
                                                        review={review}
                                                    />
                                                </Box>
                                            </>
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
            </Box>
        </div>
    );
}
