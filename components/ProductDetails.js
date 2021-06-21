import ProductCard from "./ProductCard";
import ProductDetailsTable from "../components/ProductDetailsTable";
import Review from "./forms/Review";
import VideoReview from "./forms/VideoReview";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Snackbar from "@material-ui/core/Snackbar";

import Rating from "@material-ui/lab/Rating";
import ReactPlayer from "react-player/youtube";

import SingleVideoReview from "./SingleVideoReview";
import SingleReview from "./SingleReview";

import axios from "axios";
import Cookies from "js-cookie";

export default function ProductDetails({
    categoryProducts,
    myBag,
    config,
    product,
    user,
    avgRating,
    reviewArrayInState,
    setReviewArrayInState,
    videoReviewArrayInState,
    setVideoReviewArrayInState,
}) {
    const [needDisabled, setNeedDisabled] = React.useState(false);
    const [openForLogin, setOpenForLogin] = React.useState(false);

    // alert close function
    const handleCloseForLogin = (event, reason) => {
        if (reason === "clickaway") {
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
    if (reviewArrayInState && reviewArrayInState.length !== 0) {
        totalOneRating = reviewArrayInState.filter(
            (review) => review.rating_star === 1
        );
        totalTwoRating = reviewArrayInState.filter(
            (review) => review.rating_star === 2
        );
        totalThreeRating = reviewArrayInState.filter(
            (review) => review.rating_star === 3
        );
        totalFourRating = reviewArrayInState.filter(
            (review) => review.rating_star === 4
        );
        totalFiveRating = reviewArrayInState.filter(
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
        if (Cookies.get("haha_ecom_bangla_token")) {
            const review = {
                review_detail: values.review,
                rating_star: value,
                product: product.id,
            };

            setSubmitting(false);
            setValue(3);
            resetForm();
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/review-create/`,
                    review,
                    config
                )
                .then((res) => {
                    console.log(res.data);
                    // user can add more than one review, so use an array as state
                    // state need to update with all element, so need to concat with previous element
                    const newReviewArrayInState = reviewArrayInState.concat(
                        res.data
                    );
                    setReviewArrayInState(newReviewArrayInState);
                })
                .catch((err) => console.log(err.response));
        } else {
            setOpenForLogin(true);
            setSubmitting(false);
            setValue(3);
            resetForm();
        }
    };

    const handleAgree = (
        review,
        setReviewAgreeLoading,
        setOpenForAlreadyDone,
        userDidAgreedState,
        userDidDisagreedState,
        setUserDidAgreedState,
        setUserDidDisagreedState,
        setLengthForAgreed,
        setLengthForDisagreed,
        reviewCountId,
        setReviewCountId
    ) => {
        // start loading
        setReviewAgreeLoading(true);

        // if user not login then need login msg showing
        if (Cookies.get("haha_ecom_bangla_token")) {
            // ####### Process of agreed
            // 1st check is userDidAgreed, if true then msg will already done
            // if not userDidAgreed then check is userDidDisagreed
            // if userDidDisagreed then patch with agreed and state for agreed will plus, disagreed will minus
            // if not userDidDisagreed then post with agreed and state for agreed will plus
            if (!userDidAgreedState) {
                if (!userDidDisagreedState) {
                    const reviewCountForAgree = {
                        vote: "agreed",
                        review: review.id,
                    };

                    setReviewAgreeLoading(false);
                    setUserDidAgreedState(true);
                    setLengthForAgreed((prevState) => prevState + 1);
                    axios
                        .post(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/review-count-create/`,
                            reviewCountForAgree,
                            config
                        )
                        .then((res) => {
                            setReviewCountId(res.data.id);
                        })
                        .catch((err) => console.log(err.response));
                } else {
                    setReviewAgreeLoading(false);
                    setUserDidAgreedState(true);
                    setUserDidDisagreedState(false);
                    setLengthForAgreed((prevState) => prevState + 1);
                    setLengthForDisagreed((prevState) => prevState - 1);
                    axios
                        .patch(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/review-count-update/${reviewCountId}/`,
                            { vote: "agreed" },
                            config
                        )
                        .then((res) => {
                            console.log(res.data);
                        })
                        .catch((err) => console.log(err.response));
                }
            } else {
                setReviewAgreeLoading(false);
                setOpenForAlreadyDone(true);
            }
        } else {
            setReviewAgreeLoading(false);
            setOpenForLogin(true);
        }
    };

    const handleDisagree = (
        review,
        setReviewDisagreeLoading,
        setOpenForAlreadyDone,
        userDidAgreedState,
        userDidDisagreedState,
        setUserDidAgreedState,
        setUserDidDisagreedState,
        setLengthForAgreed,
        setLengthForDisagreed,
        reviewCountId,
        setReviewCountId
    ) => {
        // start loading
        setReviewDisagreeLoading(true);

        if (Cookies.get("haha_ecom_bangla_token")) {
            // ###########  Same process like agreed but opposite
            if (!userDidDisagreedState) {
                if (!userDidAgreedState) {
                    const reviewCountForAgree = {
                        vote: "disagreed",
                        review: review.id,
                    };

                    setReviewDisagreeLoading(false);
                    setUserDidDisagreedState(true);
                    setLengthForDisagreed((prevState) => prevState + 1);
                    axios
                        .post(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/review-count-create/`,
                            reviewCountForAgree,
                            config
                        )
                        .then((res) => {
                            setReviewCountId(res.data.id);
                        })
                        .catch((err) => console.log(err.response));
                } else {
                    setReviewDisagreeLoading(false);
                    setUserDidDisagreedState(true);
                    setUserDidAgreedState(false);
                    setLengthForDisagreed((prevState) => prevState + 1);
                    setLengthForAgreed((prevState) => prevState - 1);
                    axios
                        .patch(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/review-count-update/${reviewCountId}/`,
                            { vote: "disagreed" },
                            config
                        )
                        .then((res) => {
                            console.log(res.data);
                        })
                        .catch((err) => console.log(err.response));
                }
            } else {
                setReviewDisagreeLoading(false);
                setOpenForAlreadyDone(true);
            }
        } else {
            setReviewDisagreeLoading(false);
            setOpenForLogin(true);
        }
    };

    const handleUpdate = (values, setSubmitting, reviewId, setOpen, value) => {
        const reviewUpdate = {
            review_detail: values.review,
            rating_star: value,
        };

        setSubmitting(false);
        setOpen(false);
        axios
            .patch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/review/${reviewId}/`,
                reviewUpdate,
                config
            )
            .then((res) => {
                // when user update his review then just change that specific review by mapping
                // which review id is matched for this new patched review id will change
                const newReviewArrayInState = reviewArrayInState.map(
                    (review) => {
                        if (review.id === reviewId) {
                            review = res.data;
                        }
                        return review;
                    }
                );
                setReviewArrayInState(newReviewArrayInState);
            })
            .catch((err) => console.log(err.response));
    };

    const handleDelete = (reviewId, setOpen) => {
        setOpen(false);
        axios
            .delete(
                `${process.env.NEXT_PUBLIC_BASE_URL}/review/${reviewId}/`,
                config
            )
            .then((res) => {
                // when user delete this review, then just filter previous all review
                // without this review all review will added to state
                const newReviewArrayInState = reviewArrayInState.filter(
                    (review) => review.id !== reviewId
                );
                setReviewArrayInState(newReviewArrayInState);
            })
            .catch((err) => console.log(err.response));
    };

    // ####### start for video review

    const handleSubmitForVideoReview = (values, setSubmitting, resetForm) => {
        if (Cookies.get("haha_ecom_bangla_token")) {
            const videoReview = {
                link: values.link,
                product: product.id,
            };

            setSubmitting(false);
            resetForm();
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/video-review-create/`,
                    videoReview,
                    config
                )
                .then((res) => {
                    console.log(res.data);
                    // user can add more than one video review, so use an array as state
                    // state need to update with all element, so need to concat with previous element
                    const newVideoReviewArrayInState =
                        videoReviewArrayInState.concat(res.data);
                    setVideoReviewArrayInState(newVideoReviewArrayInState);
                })
                .catch((err) => console.log(err.response));
        } else {
            setOpenForLogin(true);
            setSubmitting(false);
            resetForm();
        }
    };

    const handleAgreeForVideoReview = (
        videoReview,
        setVideoReviewAgreeLoading,
        setOpenForAlreadyDone,
        userDidAgreedState,
        userDidDisagreedState,
        setUserDidAgreedState,
        setUserDidDisagreedState,
        setLengthForAgreed,
        setLengthForDisagreed,
        videoReviewCountId,
        setVideoReviewCountId
    ) => {
        // start loading
        setVideoReviewAgreeLoading(true);

        if (Cookies.get("haha_ecom_bangla_token")) {
            // ####### Process of agreed
            // 1st check is userDidAgreed, if true then msg will already done
            // if not userDidAgreed then check is userDidDisagreed
            // if userDidDisagreed then patch with agreed and state for agreed will plus, disagreed will minus
            // if not userDidDisagreed then post with agreed and state for agreed will plus
            if (!userDidAgreedState) {
                if (!userDidDisagreedState) {
                    const videoReviewCountForAgree = {
                        vote: "agreed",
                        video_review: videoReview.id,
                    };

                    setVideoReviewAgreeLoading(false);
                    setUserDidAgreedState(true);
                    setLengthForAgreed((prevState) => prevState + 1);
                    axios
                        .post(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/video-review-count-create/`,
                            videoReviewCountForAgree,
                            config
                        )
                        .then((res) => {
                            setVideoReviewCountId(res.data.id);
                        })
                        .catch((err) => console.log(err.response));
                } else {
                    setVideoReviewAgreeLoading(false);
                    setUserDidAgreedState(true);
                    setUserDidDisagreedState(false);
                    setLengthForAgreed((prevState) => prevState + 1);
                    setLengthForDisagreed((prevState) => prevState - 1);
                    axios
                        .patch(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/video-review-count-update/${videoReviewCountId}/`,
                            { vote: "agreed" },
                            config
                        )
                        .then((res) => {
                            console.log(res.data);
                        })
                        .catch((err) => console.log(err.response));
                }
            } else {
                setVideoReviewAgreeLoading(false);
                setOpenForAlreadyDone(true);
            }
        } else {
            setVideoReviewAgreeLoading(false);
            setOpenForLogin(true);
        }
    };

    const handleDisagreeForVideoReview = (
        videoReview,
        setVideoReviewDisagreeLoading,
        setOpenForAlreadyDone,
        userDidAgreedState,
        userDidDisagreedState,
        setUserDidAgreedState,
        setUserDidDisagreedState,
        setLengthForAgreed,
        setLengthForDisagreed,
        videoReviewCountId,
        setVideoReviewCountId
    ) => {
        // start loading
        setVideoReviewDisagreeLoading(true);

        if (Cookies.get("haha_ecom_bangla_token")) {
            // ###########  Same process like agreed but opposite
            if (!userDidDisagreedState) {
                if (!userDidAgreedState) {
                    const videoReviewCountForAgree = {
                        vote: "disagreed",
                        video_review: videoReview.id,
                    };

                    setVideoReviewDisagreeLoading(false);
                    setUserDidDisagreedState(true);
                    setLengthForDisagreed((prevState) => prevState + 1);
                    axios
                        .post(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/video-review-count-create/`,
                            videoReviewCountForAgree,
                            config
                        )
                        .then((res) => {
                            setVideoReviewCountId(res.data.id);
                        })
                        .catch((err) => console.log(err.response));
                } else {
                    setVideoReviewDisagreeLoading(false);
                    setUserDidDisagreedState(true);
                    setUserDidAgreedState(false);
                    setLengthForDisagreed((prevState) => prevState + 1);
                    setLengthForAgreed((prevState) => prevState - 1);
                    axios
                        .patch(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/video-review-count-update/${videoReviewCountId}/`,
                            { vote: "disagreed" },
                            config
                        )
                        .then((res) => {
                            console.log(res.data);
                        })
                        .catch((err) => console.log(err.response));
                }
            } else {
                setVideoReviewDisagreeLoading(false);
                setOpenForAlreadyDone(true);
            }
        } else {
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

        setSubmitting(false);
        setOpen(false);
        axios
            .patch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/video-review/${videoReviewId}/`,
                videoReviewUpdate,
                config
            )
            .then((res) => {
                // when user update his video review then just change that specific video review by mapping
                // which video review id is matched for this new patched video review id will change
                const newVideoReviewArrayInState = videoReviewArrayInState.map(
                    (videoReview) => {
                        if (videoReview.id === videoReviewId) {
                            videoReview = res.data;
                        }
                        return videoReview;
                    }
                );
                setVideoReviewArrayInState(newVideoReviewArrayInState);
            })
            .catch((err) => console.log(err.response));
    };

    const handleDeleteForVideoReview = (videoReviewId, setOpen) => {
        setOpen(false);
        axios
            .delete(
                `${process.env.NEXT_PUBLIC_BASE_URL}/video-review/${videoReviewId}/`,
                config
            )
            .then((res) => {
                // when user delete this video review, then just filter previous all video review
                // without this video review all video review will added to state
                const newVideoReviewArrayInState =
                    videoReviewArrayInState.filter(
                        (videoReview) => videoReview.id !== videoReviewId
                    );
                setVideoReviewArrayInState(newVideoReviewArrayInState);
            })
            .catch((err) => console.log(err.response));
    };

    return (
        <div>
            <Box mx={3} mt={8}>
                <Grid container spacing={2} alignItems="stretch">
                    <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                        <Box height="100%">
                            <Box
                                p={2}
                                textAlign="center"
                                borderRadius="borderRadius"
                                style={{ backgroundColor: "white" }}
                            >
                                <Typography variant="h5">
                                    <strong>Product Details</strong>
                                </Typography>
                            </Box>

                            <Box mt={2} borderRadius="borderRadius">
                                <ProductDetailsTable
                                    product={product && product}
                                />
                            </Box>
                            {product && product.product_detail.length === 0 && (
                                <Alert severity="error">
                                    <AlertTitle>Sorry Dear</AlertTitle>
                                    Here Are No Product Details Included Yet —{" "}
                                    <strong>Hope It Will Come Soon!</strong>
                                </Alert>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                        <Box height="100%">
                            <Box
                                p={2}
                                textAlign="center"
                                borderRadius="borderRadius"
                                style={{ backgroundColor: "white" }}
                            >
                                <Typography variant="h5">
                                    <strong>Video Details</strong>
                                </Typography>
                            </Box>
                            <Box mt={2}>
                                <ReactPlayer
                                    width="100%"
                                    height="280px"
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
                    textAlign="center"
                    borderRadius="borderRadius"
                    style={{ backgroundColor: "white" }}
                >
                    <Typography variant="h5">
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
                                        needDisabled={needDisabled}
                                        setNeedDisabled={setNeedDisabled}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </Box>
                {categoryProducts.length === 0 && (
                    <Box mt={2}>
                        <Alert severity="error">
                            <AlertTitle>Sorry Dear</AlertTitle>
                            Here Are No Similar Category Products Included Yet —{" "}
                            <strong>Hope It Will Come Soon!</strong>
                        </Alert>
                    </Box>
                )}
            </Box>

            <Box mx={3} mt={8}>
                <Box
                    px={2}
                    py={1}
                    borderRadius="borderRadius"
                    style={{ backgroundColor: "white" }}
                >
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Typography variant="h5" component="h5">
                                <strong>Customer Video Review</strong>
                            </Typography>
                        </Grid>
                        {/* snackbar is set here */}
                        <Snackbar
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                            open={openForLogin}
                            autoHideDuration={4000}
                            onClose={handleCloseForLogin}
                        >
                            <Alert severity="info" variant="filled">
                                Please Login First!
                            </Alert>
                        </Snackbar>

                        <Grid item>
                            <Box my={1}>
                                <VideoReview
                                    handleSubmitForVideoReview={
                                        handleSubmitForVideoReview
                                    }
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={2}>
                    <Grid container spacing={2}>
                        {/* {product &&
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
                            ))} */}
                        {/* no need to loop previous all, so created videoReview only loop here, user can create multiple at a time, so need array */}
                        {videoReviewArrayInState &&
                            videoReviewArrayInState.length !== 0 &&
                            videoReviewArrayInState.map((video_review) => (
                                <SingleVideoReview
                                    videoReview={video_review}
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
                        <Alert severity="error">
                            <AlertTitle>Sorry Dear</AlertTitle>
                            Here Are No Video Review Created By Customer Yet —{" "}
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
                    textAlign="center"
                    borderRadius="borderRadius"
                    style={{ backgroundColor: "white" }}
                >
                    <Typography variant="h5">
                        <strong>Reviews & Ratings</strong>
                    </Typography>
                </Box>

                <Box mt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            <Box
                                style={{ backgroundColor: "white" }}
                                p={2}
                                height="100%"
                                textAlign="center"
                                borderRadius="borderRadius"
                            >
                                <Box>
                                    <Typography variant="h4" component="h4">
                                        {avgRating}
                                        {".0"}
                                    </Typography>
                                    <Rating
                                        name="read-only"
                                        value={
                                            avgRating !== 0 ? avgRating : null
                                        }
                                        readOnly
                                    />

                                    <Typography>
                                        {reviewArrayInState &&
                                            reviewArrayInState.length}{" "}
                                        Review & Rating
                                    </Typography>
                                </Box>
                                <Box mt={3}>
                                    <Box>
                                        <Grid
                                            container
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Rating
                                                name="read-only"
                                                value={5}
                                                readOnly
                                            />{" "}
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {" "}
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
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Rating
                                                name="read-only"
                                                value={4}
                                                readOnly
                                            />{" "}
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {" "}
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
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Rating
                                                name="read-only"
                                                value={3}
                                                readOnly
                                            />{" "}
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {" "}
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
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Rating
                                                name="read-only"
                                                value={2}
                                                readOnly
                                            />{" "}
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {" "}
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
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Rating
                                                name="read-only"
                                                value={1}
                                                readOnly
                                            />{" "}
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {" "}
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
                                style={{ backgroundColor: "white" }}
                                p={2}
                                height="100%"
                                textAlign="center"
                                borderRadius="borderRadius"
                            >
                                <Box>
                                    <Review handleSubmit={handleSubmit} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* {product &&
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
                    ))} */}
                {reviewArrayInState &&
                    reviewArrayInState.length !== 0 &&
                    reviewArrayInState.map((review) => (
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
                        <Alert severity="error">
                            <AlertTitle>Sorry Dear</AlertTitle>
                            Here Are No Review Created By Customer Yet —{" "}
                            <strong>Hope Customer Will Add Review Soon!</strong>
                        </Alert>
                    </Box>
                )}
            </Box>
        </div>
    );
}
