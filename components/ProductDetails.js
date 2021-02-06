import Head from 'next/head';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import ProductCard from '../components/ProductCard';
import ProductDetailsTable from '../components/ProductDetailsTable';
import Review from './forms/Review';
import VideoReview from './forms/VideoReview';
import UpdateReviewDialog from './UpdateReviewDialog';
import DeleteReviewDialog from './DeleteReviewDialog';
import UpdateVideoReviewDialog from './UpdateVideoReviewDialog';
import DeleteVideoReviewDialog from './DeleteVideoReviewDialog';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Snackbar from '@material-ui/core/Snackbar';

import StarHalfIcon from '@material-ui/icons/StarHalf';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';
import Rating from '@material-ui/lab/Rating';
import ReactPlayer from 'react-player/youtube';

import SingleVideoReview from './SingleVideoReview';
import SingleReview from './SingleReview';

import axios from 'axios';
import Cookies from 'js-cookie';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// 1. when anything change on state the component will re render
// 2. we use useEffect only if we need anything to do before component mount or willmount
// 3. these two are most important about react component
// 4. Don't depend on state for data, which related to backend. because state can be changed from devtools
//    if state change then in server everything will be changed which is too harmful..
// 5. we can't change component props. so this is secure
// 6. formik to get form value, here also no need to use state.

export default function ProductDetails(props) {
    const [needDisabled, setNeedDisabled] = React.useState(false);
    const [openForLogin, setOpenForLogin] = React.useState(false);

    let categoryProducts = props.categoryProducts;
    let myBag = props.myBag;
    let config = props.config;
    let changeProduct = props.changeProduct;
    let changeMyBag = props.changeMyBag;

    let product = props.product;
    let user = props.user;

    let changeCategoryProducts = props.changeCategoryProducts;

    let avgRating = props.avgRating;

    // console.log('got re render for product details');
    // console.log('got product', product);

    // alert close function
    const handleCloseForLogin = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenForLogin(false);
    };

    // ###### total number of 1 or 2 or ..... rating added for this product is calculate here
    let totalOneRating = [];
    let totalTwoRating = [];
    let totalThreeRating = [];
    let totalFourRating = [];
    let totalFiveRating = [];
    if (product && product.review && product.review.length !== 0) {
        totalOneRating = product.review.filter(
            (review) => review.rating_star === 1
        );
        totalTwoRating = product.review.filter(
            (review) => review.rating_star === 2
        );
        totalThreeRating = product.review.filter(
            (review) => review.rating_star === 3
        );
        totalFourRating = product.review.filter(
            (review) => review.rating_star === 4
        );
        totalFiveRating = product.review.filter(
            (review) => review.rating_star === 5
        );
    }

    const handleSubmit = (
        values,
        setSubmitting,
        value,
        setValue,
        resetForm
    ) => {
        if (Cookies.get('haha_ecom_bangla_token')) {
            const review = {
                review_detail: values.review,
                rating_star: value,
                product: product.id,
            };

            axios
                .post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/reviews-create/`,
                    review,
                    config
                )
                .then((res) => {
                    // console.log(res.data);
                    // final get will be after all post, patch done
                    axios
                        .get(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                        )
                        .then((res) => {
                            changeProduct(res.data);
                            axios
                                .get(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                    config
                                )
                                .then((res) => {
                                    changeMyBag(res.data);
                                    setSubmitting(false);
                                    setValue(3);
                                    resetForm();
                                    // after submitting the rating value will default
                                    // and also need to clear form
                                })
                                .catch((err) => console.log(err.response));
                        })
                        .catch((err) => console.log(err.response));
                })
                .catch((err) => console.log(err.response));
        } else {
            // console.log('login first');
            setOpenForLogin(true);
            setSubmitting(false);
            setValue(3);
            resetForm();
        }
    };

    const handleAgree = (
        stringifyReview,
        setReviewAgreeLoading,
        setOpenForAlreadyDone
    ) => {
        // start loading
        setReviewAgreeLoading(true);

        if (Cookies.get('haha_ecom_bangla_token')) {
            const review = JSON.parse(stringifyReview);

            // ####### Process of agreed
            // 1st check this user is equal to the review made user or not
            // if same user, then user can't add agreed
            // if the user of this review is not same requested user
            // then check, is this user already agreed or not
            // if user already agreed than also show a msg, you cant agreed
            // if user not same of creator and also not agreed yet then the process will start
            // update the agreed backed with this user,
            // ### if this user disagreed before then need to remove from disagreed
            // so remove this user from disagreed and finally get updated product and bag for re render
            // ## if user not disagreed before then just get updated product and bag for re render
            // Done #######

            // ######### All in all, User can not agreed and disagreed at a time

            // check user who own this review,then user can't make agreed
            // also check, user already agreed or not
            // if already agreed then can not agreed now
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
                        `${process.env.NEXT_PUBLIC_BASE_URL}/reviews-count-for-agree-update/${review.reviewcountforagree.id}/`,
                        reviewCountForAgree,
                        config
                    )
                    .then((res) => {
                        // here, if user disagreed before then need to remove from disagreed
                        // because User can not agreed and disagreed at a time
                        if (
                            review.reviewcountfordisagree.user.includes(user.pk)
                        ) {
                            let arr = review.reviewcountfordisagree.user;
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i] === user.pk) {
                                    arr.splice(i, 1);
                                    i--;
                                }
                            }
                            const reviewCountForDisagree = {
                                disagreed:
                                    review.reviewcountfordisagree.disagreed - 1,
                                user: arr,
                            };

                            axios
                                .patch(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/reviews-count-for-disagree-update/${review.reviewcountfordisagree.id}/`,
                                    reviewCountForDisagree,
                                    config
                                )
                                .then((res) => {
                                    // final get will be after all post, patch done
                                    axios
                                        .get(
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                                        )
                                        .then((res) => {
                                            changeProduct(res.data);
                                            axios
                                                .get(
                                                    `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                                    config
                                                )
                                                .then((res) => {
                                                    setReviewAgreeLoading(
                                                        false
                                                    );
                                                    changeMyBag(res.data);
                                                })
                                                .catch((err) =>
                                                    console.log(err.response)
                                                );
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                })
                                .catch((err) => console.log(err.response));
                        } else {
                            // final get will be after all post, patch done
                            axios
                                .get(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                                )
                                .then((res) => {
                                    changeProduct(res.data);
                                    axios
                                        .get(
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                            config
                                        )
                                        .then((res) => {
                                            setReviewAgreeLoading(false);
                                            changeMyBag(res.data);
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                })
                                .catch((err) => console.log(err.response));
                        }
                    })
                    .catch((err) => console.log(err.response));
            } else {
                // console.log(
                //     'you cant agree with your own review or already done'
                // );
                setReviewAgreeLoading(false);
                setOpenForAlreadyDone(true);
            }
        } else {
            // console.log('login first');
            setReviewAgreeLoading(false);
            setOpenForLogin(true);
        }
    };

    const handleDisagree = (
        stringifyReview,
        setReviewDisagreeLoading,
        setOpenForAlreadyDone
    ) => {
        // start loading
        setReviewDisagreeLoading(true);

        if (Cookies.get('haha_ecom_bangla_token')) {
            const review = JSON.parse(stringifyReview);

            // console.log('setReviewDisagreeLoading', setReviewDisagreeLoading);

            // ###########  Same process like agreed
            // ######### All in all, User can not agreed and disagreed at a time

            // check user who own this review, then user can't make disagreed
            // also check, user already disagreed or not
            // if already disagreed then can not disagreed now
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
                        `${process.env.NEXT_PUBLIC_BASE_URL}/reviews-count-for-disagree-update/${review.reviewcountfordisagree.id}/`,
                        reviewCountForDisagree,
                        config
                    )
                    .then((res) => {
                        // here, if user agreed before then need to remove from agreed
                        // because User can not agreed and disagreed at a time

                        if (review.reviewcountforagree.user.includes(user.pk)) {
                            let arr = review.reviewcountforagree.user;
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i] === user.pk) {
                                    arr.splice(i, 1);
                                    i--;
                                }
                            }
                            const reviewCountForAgree = {
                                agreed: review.reviewcountforagree.agreed - 1,
                                user: arr,
                            };

                            axios
                                .patch(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/reviews-count-for-agree-update/${review.reviewcountforagree.id}/`,
                                    reviewCountForAgree,
                                    config
                                )
                                .then((res) => {
                                    // final get will be after all post, patch done
                                    axios
                                        .get(
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                                        )
                                        .then((res) => {
                                            changeProduct(res.data);
                                            axios
                                                .get(
                                                    `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                                    config
                                                )
                                                .then((res) => {
                                                    setReviewDisagreeLoading(
                                                        false
                                                    );
                                                    changeMyBag(res.data);
                                                })
                                                .catch((err) =>
                                                    console.log(err.response)
                                                );
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                })
                                .catch((err) => console.log(err.response));
                        } else {
                            // final get will be after all post, patch done
                            axios
                                .get(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                                )
                                .then((res) => {
                                    changeProduct(res.data);
                                    axios
                                        .get(
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                            config
                                        )
                                        .then((res) => {
                                            setReviewDisagreeLoading(false);
                                            changeMyBag(res.data);
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                })
                                .catch((err) => console.log(err.response));
                        }
                    })
                    .catch((err) => console.log(err.response));
            } else {
                // console.log(
                //     'you cant disagree with your review or already done'
                // );
                setReviewDisagreeLoading(false);
                setOpenForAlreadyDone(true);
            }
        } else {
            // console.log('login first');
            setReviewDisagreeLoading(false);
            setOpenForLogin(true);
        }
    };

    const handleUpdate = (values, setSubmitting, reviewId, setOpen, value) => {
        const reviewUpdate = {
            review_detail: values.review,
            rating_star: value,
        };

        axios
            .patch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${reviewId}/`,
                reviewUpdate,
                config
            )
            .then((res) => {
                // final get will be after all post, patch done
                axios
                    .get(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                    )
                    .then((res) => {
                        changeProduct(res.data);
                        axios
                            .get(
                                `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                config
                            )
                            .then((res) => {
                                changeMyBag(res.data);
                                setSubmitting(false);
                                setOpen(false);
                            })
                            .catch((err) => console.log(err.response));
                    })
                    .catch((err) => console.log(err.response));
            })
            .catch((err) => console.log(err.response));
    };

    const handleDelete = (reviewId, setOpen) => {
        axios
            .delete(
                `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${reviewId}/`,
                config
            )
            .then((res) => {
                // final get will be after all post, patch done
                axios
                    .get(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                    )
                    .then((res) => {
                        changeProduct(res.data);
                        axios
                            .get(
                                `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                config
                            )
                            .then((res) => {
                                changeMyBag(res.data);
                                setOpen(false);
                            })
                            .catch((err) => console.log(err.response));
                    })
                    .catch((err) => console.log(err.response));
            })
            .catch((err) => console.log(err.response));
    };

    // ####### start for video review

    const handleSubmitForVideoReview = (values, setSubmitting, resetForm) => {
        if (Cookies.get('haha_ecom_bangla_token')) {
            const videoReview = {
                link: values.link,
                product: product.id,
            };

            // console.log('clicked myBag', myBag);
            // console.log('clicked config', config);
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/video-reviews-create/`,
                    videoReview,
                    config
                )
                .then((res) => {
                    console.log(res.data);
                    // final get will be after all post, patch done
                    axios
                        .get(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                        )
                        .then((res) => {
                            changeProduct(res.data);
                            axios
                                .get(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                    config
                                )
                                .then((res) => {
                                    changeMyBag(res.data);
                                    setSubmitting(false);
                                    resetForm();
                                    // need to clear form
                                })
                                .catch((err) => console.log(err.response));
                        })
                        .catch((err) => console.log(err.response));
                })
                .catch((err) => console.log(err.response));
        } else {
            // console.log('login first');
            setOpenForLogin(true);
            setSubmitting(false);
            resetForm();
        }
    };

    const handleAgreeForVideoReview = (
        stringifyReview,
        setVideoReviewAgreeLoading,
        setOpenForAlreadyDone
    ) => {
        // start loading
        setVideoReviewAgreeLoading(true);

        if (Cookies.get('haha_ecom_bangla_token')) {
            const videoReview = JSON.parse(stringifyReview);

            // ####### Process of agreed
            // 1st check this user is equal to the videoReview made user or not
            // if same user, then user can't add agreed
            // if the user of this videoReview is not same requested user
            // then check, is this user already agreed or not
            // if user already agreed than also show a msg, you cant agreed
            // if user not same of creator and also not agreed yet then the process will start
            // update the agreed backed with this user,
            // ### if this user disagreed before then need to remove from disagreed
            // so remove this user from disagreed and finally get updated product and bag for re render
            // ## if user not disagreed before then just get updated product and bag for re render
            // Done #######

            // ######### All in all, User can not agreed and disagreed at a time

            // check user who own this videoReview,then user can't make agreed
            // also check, user already agreed or not
            // if already agreed then can not agreed now
            if (
                !videoReview.videoreviewcountforagree.user.includes(user.pk) &&
                videoReview.user.pk !== user.pk
            ) {
                const videoReviewCountForAgree = {
                    agreed: videoReview.videoreviewcountforagree.agreed + 1,
                    user: videoReview.videoreviewcountforagree.user.concat(
                        user.pk
                    ),
                };

                axios
                    .patch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/video-reviews-count-for-agree-update/${videoReview.videoreviewcountforagree.id}/`,
                        videoReviewCountForAgree,
                        config
                    )
                    .then((res) => {
                        // here, if user disagreed before then need to remove from disagreed
                        // because User can not agreed and disagreed at a time
                        if (
                            videoReview.videoreviewcountfordisagree.user.includes(
                                user.pk
                            )
                        ) {
                            let arr =
                                videoReview.videoreviewcountfordisagree.user;
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i] === user.pk) {
                                    arr.splice(i, 1);
                                    i--;
                                }
                            }
                            const videoReviewCountForDisagree = {
                                disagreed:
                                    videoReview.videoreviewcountfordisagree
                                        .disagreed - 1,
                                user: arr,
                            };

                            axios
                                .patch(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/video-reviews-count-for-disagree-update/${videoReview.videoreviewcountfordisagree.id}/`,
                                    videoReviewCountForDisagree,
                                    config
                                )
                                .then((res) => {
                                    // final get will be after all post, patch done
                                    axios
                                        .get(
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                                        )
                                        .then((res) => {
                                            changeProduct(res.data);
                                            axios
                                                .get(
                                                    `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                                    config
                                                )
                                                .then((res) => {
                                                    setVideoReviewAgreeLoading(
                                                        false
                                                    );
                                                    changeMyBag(res.data);
                                                })
                                                .catch((err) =>
                                                    console.log(err.response)
                                                );
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                })
                                .catch((err) => console.log(err.response));
                        } else {
                            // final get will be after all post, patch done
                            axios
                                .get(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                                )
                                .then((res) => {
                                    changeProduct(res.data);
                                    axios
                                        .get(
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                            config
                                        )
                                        .then((res) => {
                                            setVideoReviewAgreeLoading(false);
                                            changeMyBag(res.data);
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                })
                                .catch((err) => console.log(err.response));
                        }
                    })
                    .catch((err) => console.log(err.response));
            } else {
                // console.log(
                //     'you cant agree with your own review or already done'
                // );
                setVideoReviewAgreeLoading(false);
                setOpenForAlreadyDone(true);
            }
        } else {
            // console.log('login first');
            setVideoReviewAgreeLoading(false);
            setOpenForLogin(true);
        }
    };

    const handleDisagreeForVideoReview = (
        stringifyReview,
        setVideoReviewDisagreeLoading,
        setOpenForAlreadyDone
    ) => {
        // start loading
        setVideoReviewDisagreeLoading(true);

        if (Cookies.get('haha_ecom_bangla_token')) {
            const videoReview = JSON.parse(stringifyReview);

            // ###########  Same process like agreed
            // ######### All in all, User can not agreed and disagreed at a time

            // check user who own this videoReview, then user can't make disagreed
            // also check, user already disagreed or not
            // if already disagreed then can not disagreed now
            if (
                !videoReview.videoreviewcountfordisagree.user.includes(
                    user.pk
                ) &&
                videoReview.user.pk !== user.pk
            ) {
                const videoReviewCountForDisagree = {
                    disagreed:
                        videoReview.videoreviewcountfordisagree.disagreed + 1,
                    user: videoReview.videoreviewcountfordisagree.user.concat(
                        user.pk
                    ),
                };

                axios
                    .patch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/video-reviews-count-for-disagree-update/${videoReview.videoreviewcountfordisagree.id}/`,
                        videoReviewCountForDisagree,
                        config
                    )
                    .then((res) => {
                        // here, if user agreed before then need to remove from agreed
                        // because User can not agreed and disagreed at a time

                        if (
                            videoReview.videoreviewcountforagree.user.includes(
                                user.pk
                            )
                        ) {
                            let arr = videoReview.videoreviewcountforagree.user;
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i] === user.pk) {
                                    arr.splice(i, 1);
                                    i--;
                                }
                            }
                            const videoReviewCountForAgree = {
                                agreed:
                                    videoReview.videoreviewcountforagree
                                        .agreed - 1,
                                user: arr,
                            };

                            axios
                                .patch(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/video-reviews-count-for-agree-update/${videoReview.videoreviewcountforagree.id}/`,
                                    videoReviewCountForAgree,
                                    config
                                )
                                .then((res) => {
                                    // final get will be after all post, patch done
                                    axios
                                        .get(
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                                        )
                                        .then((res) => {
                                            changeProduct(res.data);
                                            axios
                                                .get(
                                                    `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                                    config
                                                )
                                                .then((res) => {
                                                    setVideoReviewDisagreeLoading(
                                                        false
                                                    );
                                                    changeMyBag(res.data);
                                                })
                                                .catch((err) =>
                                                    console.log(err.response)
                                                );
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                })
                                .catch((err) => console.log(err.response));
                        } else {
                            // final get will be after all post, patch done
                            axios
                                .get(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                                )
                                .then((res) => {
                                    changeProduct(res.data);
                                    axios
                                        .get(
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                            config
                                        )
                                        .then((res) => {
                                            setVideoReviewDisagreeLoading(
                                                false
                                            );
                                            changeMyBag(res.data);
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                })
                                .catch((err) => console.log(err.response));
                        }
                    })
                    .catch((err) => console.log(err.response));
            } else {
                // console.log(
                //     'you cant disagree with your review or already done'
                // );
                setVideoReviewDisagreeLoading(false);
                setOpenForAlreadyDone(true);
            }
        } else {
            // console.log('login first');
            setVideoReviewDisagreeLoading(false);
            setOpenForLogin(true);
        }
    };

    const handleUpdateForVideoReview = (
        values,
        setSubmitting,
        videoReviewId,
        setOpen
    ) => {
        const videoReviewUpdate = {
            link: values.link,
        };

        axios
            .patch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/video-reviews/${videoReviewId}/`,
                videoReviewUpdate,
                config
            )
            .then((res) => {
                // final get will be after all post, patch done
                axios
                    .get(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                    )
                    .then((res) => {
                        changeProduct(res.data);
                        axios
                            .get(
                                `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                config
                            )
                            .then((res) => {
                                changeMyBag(res.data);
                                setSubmitting(false);
                                setOpen(false);
                            })
                            .catch((err) => console.log(err.response));
                    })
                    .catch((err) => console.log(err.response));
            })
            .catch((err) => console.log(err.response));
    };

    const handleDeleteForVideoReview = (videoReviewId, setOpen) => {
        axios
            .delete(
                `${process.env.NEXT_PUBLIC_BASE_URL}/video-reviews/${videoReviewId}/`,
                config
            )
            .then((res) => {
                // final get will be after all post, patch done
                axios
                    .get(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                    )
                    .then((res) => {
                        changeProduct(res.data);
                        axios
                            .get(
                                `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                config
                            )
                            .then((res) => {
                                changeMyBag(res.data);
                                setOpen(false);
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
                                <Typography variant='h5'>
                                    <strong>Product Details</strong>
                                </Typography>
                            </Box>

                            <Box mt={2} borderRadius='borderRadius'>
                                <ProductDetailsTable
                                    product={product && product}
                                />
                            </Box>
                            {product && product.product_detail.length === 0 && (
                                <Alert severity='error'>
                                    <AlertTitle>Sorry Dear</AlertTitle>
                                    Here Are No Product Details Included Yet —{' '}
                                    <strong>Hope It Will Come Soon!</strong>
                                </Alert>
                            )}
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
                                <Typography variant='h5'>
                                    <strong>Video Details</strong>
                                </Typography>
                            </Box>
                            <Box mt={2}>
                                <ReactPlayer
                                    width='100%'
                                    height='280px'
                                    // height='324px'
                                    controls
                                    light
                                    url={product && product.video_details}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box mx={3} mt={8}>
                <Box
                    p={2}
                    textAlign='center'
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Typography variant='h5'>
                        <strong>You May Like</strong>
                    </Typography>
                </Box>
                <Box mt={2}>
                    <Grid container spacing={2}>
                        {categoryProducts &&
                            categoryProducts.map((categoryProduct) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <ProductCard
                                        product={categoryProduct}
                                        myBag={myBag}
                                        config={config}
                                        changeMyBag={changeMyBag}
                                        changeCardProducts={
                                            changeCategoryProducts
                                        }
                                        urlForChangeCardProducts={`${process.env.NEXT_PUBLIC_BASE_URL}/category/${categoryProduct.category.slug}/`}
                                        needDisabled={needDisabled}
                                        setNeedDisabled={setNeedDisabled}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </Box>
                {categoryProducts.length === 0 && (
                    <Box mt={2}>
                        <Alert severity='error'>
                            <AlertTitle>Sorry Dear</AlertTitle>
                            Here Are No Similar Category Products Included Yet —{' '}
                            <strong>Hope It Will Come Soon!</strong>
                        </Alert>
                    </Box>
                )}
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
                            <Typography variant='h5' component='h5'>
                                <strong>Customer Video Review</strong>
                            </Typography>
                        </Grid>
                        {/* snackbar is set here */}
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={openForLogin}
                            autoHideDuration={4000}
                            onClose={handleCloseForLogin}
                        >
                            <Alert severity='info' variant='filled'>
                                Please Login First!
                            </Alert>
                        </Snackbar>

                        <Grid item>
                            <Box my={1}>
                                <VideoReview
                                    handleSubmitForVideoReview={
                                        handleSubmitForVideoReview
                                    }
                                    product={product}
                                    myBag={myBag}
                                    changeProduct={changeProduct}
                                    changeMyBag={changeMyBag}
                                    config={config}
                                />
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
                                <SingleVideoReview
                                    video_review={video_review}
                                    user={user}
                                    handleUpdateForVideoReview={
                                        handleUpdateForVideoReview
                                    }
                                    handleDeleteForVideoReview={
                                        handleDeleteForVideoReview
                                    }
                                    handleAgreeForVideoReview={
                                        handleAgreeForVideoReview
                                    }
                                    handleDisagreeForVideoReview={
                                        handleDisagreeForVideoReview
                                    }
                                />
                            ))}
                    </Grid>
                </Box>
                {product && product.video_review.length === 0 && (
                    <Box mt={2}>
                        <Alert severity='error'>
                            <AlertTitle>Sorry Dear</AlertTitle>
                            Here Are No Video Review Created By Customer Yet —{' '}
                            <strong>
                                Hope Customer Will Add Video Review Soon!
                            </strong>
                        </Alert>
                    </Box>
                )}
            </Box>

            <Box mx={3} mt={8}>
                <Box
                    p={2}
                    textAlign='center'
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Typography variant='h5'>
                        <strong>Review & Ratings</strong>
                    </Typography>
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
                                        {avgRating}
                                        {'.0'}
                                    </Typography>
                                    <Rating
                                        name='read-only'
                                        value={
                                            avgRating !== 0 ? avgRating : null
                                        }
                                        readOnly
                                    />

                                    <Typography>
                                        {product && product.review.length}{' '}
                                        Rating & Review
                                    </Typography>
                                </Box>
                                <Box mt={3}>
                                    <Box>
                                        <Grid
                                            container
                                            justify='center'
                                            alignItems='center'
                                        >
                                            <Rating
                                                name='read-only'
                                                value={5}
                                                readOnly
                                            />{' '}
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {' '}
                                                        [
                                                        {totalFiveRating.length}
                                                        ]
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
                                            <Rating
                                                name='read-only'
                                                value={4}
                                                readOnly
                                            />{' '}
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {' '}
                                                        [
                                                        {totalFourRating.length}
                                                        ]
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
                                            <Rating
                                                name='read-only'
                                                value={3}
                                                readOnly
                                            />{' '}
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {' '}
                                                        [
                                                        {
                                                            totalThreeRating.length
                                                        }
                                                        ]
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
                                            <Rating
                                                name='read-only'
                                                value={2}
                                                readOnly
                                            />{' '}
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {' '}
                                                        [{totalTwoRating.length}
                                                        ]
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
                                            <Rating
                                                name='read-only'
                                                value={1}
                                                readOnly
                                            />{' '}
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {' '}
                                                        [{totalOneRating.length}
                                                        ]
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
                        <SingleReview
                            review={review}
                            user={user}
                            handleUpdate={handleUpdate}
                            handleDelete={handleDelete}
                            handleAgree={handleAgree}
                            handleDisagree={handleDisagree}
                        />
                    ))}
                {product && product.review.length === 0 && (
                    <Box mt={2}>
                        <Alert severity='error'>
                            <AlertTitle>Sorry Dear</AlertTitle>
                            Here Are No Review Created By Customer Yet —{' '}
                            <strong>Hope Customer Will Add Review Soon!</strong>
                        </Alert>
                    </Box>
                )}
            </Box>
        </div>
    );
}
