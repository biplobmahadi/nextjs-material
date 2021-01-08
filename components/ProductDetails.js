import Head from 'next/head';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import ProductDetailsTable from './ProductDetailsTable';
import ProductCardForSimilarCategory from '../components/ProductCardForSimilarCategory';
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

// 1. when anything change on state the component will re render
// 2. we use useEffect only if we need anything to do before component mount or willmount
// 3. these two are most important about react component
// 4. Don't depend on state for data, which related to backend. because state can be changed from devtools
//    if state change then in server everything will be changed which is too harmful..
// 5. we can't change component props. so this is secure
// 6. formik to get form value, here also no need to use state.

export default function ProductDetails(props) {
    let contained = 'contained';

    let categoryProducts = props.categoryProducts;
    let myBag = props.myBag;
    let config = props.config;
    let changeProduct = props.changeProduct;
    let changeMyBag = props.changeMyBag;

    let product = props.product;
    let user = props.user;

    let changeCategoryProducts = props.changeCategoryProducts;

    // console.log('got user', user);
    console.log('got product', product);

    const handleSubmit = (values, setSubmitting, value) => {
        const review = {
            review_detail: values.review,
            rating_star: value,
            product: product.id,
        };

        axios
            .post('http://localhost:8000/reviews-create/', review, config)
            .then((res) => {
                console.log(res.data);
                // final get will be after all post, patch done
                axios
                    .get(`http://localhost:8000/products/${product.slug}/`)
                    .then((res) => {
                        changeProduct(res.data);
                        axios
                            .get(
                                `http://localhost:8000/my-bag/${myBag.id}/`,
                                config
                            )
                            .then((res) => {
                                // new myBag need to add to state
                                changeMyBag(res.data);
                                // setTotalBagProduct(res.data.product.length);
                            })
                            .catch((err) => console.log(err.response));
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
                                // final get will be after all post, patch done
                                axios
                                    .get(
                                        `http://localhost:8000/products/${product.slug}/`
                                    )
                                    .then((res) => {
                                        changeProduct(res.data);
                                        axios
                                            .get(
                                                `http://localhost:8000/my-bag/${myBag.id}/`,
                                                config
                                            )
                                            .then((res) => {
                                                // new myBag need to add to state
                                                changeMyBag(res.data);
                                                // setTotalBagProduct(res.data.product.length);
                                            })
                                            .catch((err) =>
                                                console.log(err.response)
                                            );
                                    })
                                    .catch((err) => console.log(err.response));
                            })
                            .catch((err) => console.log(err.response));
                    } else {
                        // final get will be after all post, patch done
                        axios
                            .get(
                                `http://localhost:8000/products/${product.slug}/`
                            )
                            .then((res) => {
                                changeProduct(res.data);
                                axios
                                    .get(
                                        `http://localhost:8000/my-bag/${myBag.id}/`,
                                        config
                                    )
                                    .then((res) => {
                                        // new myBag need to add to state
                                        changeMyBag(res.data);
                                        // setTotalBagProduct(res.data.product.length);
                                    })
                                    .catch((err) => console.log(err.response));
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
                                // final get will be after all post, patch done
                                axios
                                    .get(
                                        `http://localhost:8000/products/${product.slug}/`
                                    )
                                    .then((res) => {
                                        changeProduct(res.data);
                                        axios
                                            .get(
                                                `http://localhost:8000/my-bag/${myBag.id}/`,
                                                config
                                            )
                                            .then((res) => {
                                                // new myBag need to add to state
                                                changeMyBag(res.data);
                                                // setTotalBagProduct(res.data.product.length);
                                            })
                                            .catch((err) =>
                                                console.log(err.response)
                                            );
                                    })
                                    .catch((err) => console.log(err.response));
                            })
                            .catch((err) => console.log(err.response));
                    } else {
                        // final get will be after all post, patch done
                        axios
                            .get(
                                `http://localhost:8000/products/${product.slug}/`
                            )
                            .then((res) => {
                                changeProduct(res.data);
                                axios
                                    .get(
                                        `http://localhost:8000/my-bag/${myBag.id}/`,
                                        config
                                    )
                                    .then((res) => {
                                        // new myBag need to add to state
                                        changeMyBag(res.data);
                                        // setTotalBagProduct(res.data.product.length);
                                    })
                                    .catch((err) => console.log(err.response));
                            })
                            .catch((err) => console.log(err.response));
                    }
                })
                .catch((err) => console.log(err.response));
        } else {
            console.log('you cant disagree with your review or already done');
        }
    };

    const handleUpdate = (values, setSubmitting, review, setOpen, value) => {
        const reviewUpdate = {
            review_detail: values.review,
            rating_star: value,
        };

        axios
            .patch(
                `http://localhost:8000/reviews/${review.id}/`,
                reviewUpdate,
                config
            )
            .then((res) => {
                // final get will be after all post, patch done
                axios
                    .get(`http://localhost:8000/products/${product.slug}/`)
                    .then((res) => {
                        changeProduct(res.data);
                        axios
                            .get(
                                `http://localhost:8000/my-bag/${myBag.id}/`,
                                config
                            )
                            .then((res) => {
                                // new myBag need to add to state
                                changeMyBag(res.data);
                                setSubmitting(false);
                                setOpen(false);
                                // setTotalBagProduct(res.data.product.length);
                            })
                            .catch((err) => console.log(err.response));
                    })
                    .catch((err) => console.log(err.response));
            })
            .catch((err) => console.log(err.response));
    };

    const handleDelete = (review, setOpen) => {
        axios
            .delete(`http://localhost:8000/reviews/${review.id}/`, config)
            .then((res) => {
                // final get will be after all post, patch done
                axios
                    .get(`http://localhost:8000/products/${product.slug}/`)
                    .then((res) => {
                        changeProduct(res.data);
                        axios
                            .get(
                                `http://localhost:8000/my-bag/${myBag.id}/`,
                                config
                            )
                            .then((res) => {
                                // new myBag need to add to state
                                changeMyBag(res.data);
                                setOpen(false);
                                // setTotalBagProduct(res.data.product.length);
                            })
                            .catch((err) => console.log(err.response));
                    })
                    .catch((err) => console.log(err.response));
            })
            .catch((err) => console.log(err.response));
    };

    return (
        <div>
            <Box mx={3} mt={8}>
                <Grid container spacing={2} alignItems='stretch'>
                    <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                        <Box height='100%'>
                            <Box
                                p={2}
                                textAlign='center'
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <Typography variant='h4'>
                                    Product Details
                                </Typography>
                            </Box>

                            <Box mt={2} borderRadius='borderRadius'>
                                <ProductDetailsTable
                                    product={product && product}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                        <Box height='100%'>
                            <Box
                                p={2}
                                textAlign='center'
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <Typography variant='h4'>
                                    Video Details
                                </Typography>
                            </Box>
                            <Box mt={2}>
                                <ReactPlayer
                                    width='100%'
                                    height='324px'
                                    controls
                                    light
                                    url={product && product.video_details}
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
                        {categoryProducts &&
                            categoryProducts.map((categoryProduct) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <ProductCardForSimilarCategory
                                        product={categoryProduct}
                                        myBag={myBag}
                                        config={config}
                                        changeMyBag={changeMyBag}
                                        changeCategoryProducts={
                                            changeCategoryProducts
                                        }
                                        mainProduct={product}
                                    />
                                </Grid>
                            ))}
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
                        {product &&
                            product.video_review &&
                            product.video_review.length !== 0 &&
                            product.video_review.map((video_review) => (
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
                                            url={video_review.link}
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
                                                    startIcon={
                                                        <ThumbDownIcon />
                                                    }
                                                >
                                                    Disagreed (02)
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
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
                                    <Review handleSubmit={handleSubmit} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {product &&
                    product.review &&
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
                                        {review.user.pk !==
                                        (user && user.pk) ? (
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
                                                        handleUpdate={
                                                            handleUpdate
                                                        }
                                                    />
                                                </Box>
                                                <Box mt={1}>
                                                    <DeleteReviewDialog
                                                        review={review}
                                                        handleDelete={
                                                            handleDelete
                                                        }
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

// {product.productavailable.available_quantity === 0 &&
//     <Box textAlign='center'>
//         <Chip
//             label='Not In Stock'
//             color='secondary'
//             size='small'
//         />
//     </Box>}

//
// disabled={product.productavailable.available_quantity === 0}
