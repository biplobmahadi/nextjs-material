import Head from "next/head";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import ProductCard from "../components/ProductCard";
import Review from "./forms/Review";
import VideoReview from "./forms/VideoReview";
import UpdateReviewDialog from "./UpdateReviewDialog";
import DeleteReviewDialog from "./DeleteReviewDialog";
import UpdateVideoReviewDialog from "./UpdateVideoReviewDialog";
import DeleteVideoReviewDialog from "./DeleteVideoReviewDialog";
import MainFooter from "../components/MainFooter";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Snackbar from "@material-ui/core/Snackbar";

import StarHalfIcon from "@material-ui/icons/StarHalf";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import UpdateIcon from "@material-ui/icons/Update";
import EditIcon from "@material-ui/icons/Edit";
import Rating from "@material-ui/lab/Rating";
import ReactPlayer from "react-player/youtube";

import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        alignItems: "center",
    },
    wrapper: {
        position: "relative",
    },
    buttonProgress: {
        color: "#3f50b5",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function SingleReview({
    review,
    user,
    handleUpdate,
    handleDelete,
    handleAgree,
    handleDisagree,
}) {
    const classes = useStyles();
    const [reviewAgreeLoading, setReviewAgreeLoading] = React.useState(false);
    const [reviewDisagreeLoading, setReviewDisagreeLoading] =
        React.useState(false);

    const [openForAlreadyDone, setOpenForAlreadyDone] = React.useState(false);
    // this is for alert close
    const handleCloseForAlreadyDone = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenForAlreadyDone(false);
    };

    const userDidAgreed =
        review &&
        review.review_count.filter(
            (review_count) =>
                review_count.user.pk === user.pk &&
                review_count.vote === "agreed"
        );

    const [userDidAgreedState, setUserDidAgreedState] = React.useState(
        userDidAgreed && userDidAgreed.length !== 0 ? true : false
    );

    const userDidDisagreed =
        review &&
        review.review_count.filter(
            (review_count) =>
                review_count.user.pk === user.pk &&
                review_count.vote === "disagreed"
        );

    const [userDidDisagreedState, setUserDidDisagreedState] = React.useState(
        userDidDisagreed && userDidDisagreed.length !== 0 ? true : false
    );

    const [reviewCountId, setReviewCountId] = React.useState(
        userDidAgreed && userDidAgreed.length !== 0
            ? userDidAgreed[0].id
            : userDidDisagreed && userDidDisagreed.length !== 0
            ? userDidDisagreed[0].id
            : null
    );

    const countForAgreed =
        review &&
        review.review_count.filter(
            (review_count) => review_count.vote === "agreed"
        );

    const countForDisagreed =
        review &&
        review.review_count.filter(
            (review_count) => review_count.vote === "disagreed"
        );

    const [lengthForAgreed, setLengthForAgreed] = React.useState(
        countForAgreed ? countForAgreed.length : 0
    );
    const [lengthForDisagreed, setLengthForDisagreed] = React.useState(
        countForDisagreed ? countForDisagreed.length : 0
    );

    if (review) {
        return (
            <Box
                p={2}
                mt={2}
                borderRadius="borderRadius"
                style={{ backgroundColor: "white" }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={3} xl={2}>
                        <Box textAlign="center">
                            <img
                                src="/aa.jpg"
                                alt=""
                                srcset=""
                                height="50"
                                width="50"
                                style={{ borderRadius: "50%" }}
                            />
                            <Typography variant="h6" component="h6">
                                {review.user.first_name.toUpperCase() +
                                    " " +
                                    review.user.last_name.toUpperCase()}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={8}>
                        <Box pr={2} pl={1}>
                            <Rating
                                name="read-only"
                                value={review.rating_star}
                                readOnly
                            />

                            <Typography>{review.review_detail}</Typography>

                            <Box pt={3}>
                                <Typography variant="p">
                                    {review.created_at}
                                </Typography>
                            </Box>
                            {review.user.pk === (user && user.pk) && (
                                <Box pt={2}>
                                    <Grid
                                        container
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <Grid item xs={12} sm>
                                            <UpdateReviewDialog
                                                reviewId={review.id}
                                                handleUpdate={handleUpdate}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm>
                                            <DeleteReviewDialog
                                                reviewId={review.id}
                                                handleDelete={handleDelete}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm></Grid>
                                        <Grid item xs={12} sm></Grid>
                                        <Grid item xs={12} sm></Grid>
                                    </Grid>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={3} xl={2}>
                        <Box px={3} textAlign="center">
                            <div className={classes.root}>
                                <div className={classes.wrapper}>
                                    <Button
                                        size="small"
                                        fullWidth
                                        variant="contained"
                                        color={
                                            userDidAgreedState
                                                ? "secondary"
                                                : "default"
                                        }
                                        startIcon={<ThumbUpIcon />}
                                        onClick={() =>
                                            handleAgree(
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
                                            )
                                        }
                                        // use this type of value sending in bag page
                                        disabled={
                                            reviewAgreeLoading ||
                                            reviewDisagreeLoading ||
                                            review.user.pk === (user && user.pk)
                                        }
                                    >
                                        Agreed ({lengthForAgreed})
                                    </Button>
                                    {reviewAgreeLoading && (
                                        <CircularProgress
                                            size={24}
                                            className={classes.buttonProgress}
                                        />
                                    )}
                                </div>
                            </div>
                            {/* this snackbar is used by both agree disagree */}
                            <Snackbar
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                }}
                                open={openForAlreadyDone}
                                autoHideDuration={2000}
                                onClose={handleCloseForAlreadyDone}
                            >
                                <Alert severity="success" variant="filled">
                                    Already Done !
                                </Alert>
                            </Snackbar>
                            <Box mt={1}>
                                <div className={classes.root}>
                                    <div className={classes.wrapper}>
                                        <Button
                                            size="small"
                                            fullWidth
                                            variant="contained"
                                            color={
                                                userDidDisagreedState
                                                    ? "secondary"
                                                    : "default"
                                            }
                                            startIcon={<ThumbDownIcon />}
                                            onClick={() =>
                                                handleDisagree(
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
                                                )
                                            }
                                            // use this type of value sending in bag page
                                            disabled={
                                                reviewDisagreeLoading ||
                                                reviewAgreeLoading ||
                                                review.user.pk ===
                                                    (user && user.pk)
                                            }
                                        >
                                            Disagreed ({lengthForDisagreed})
                                        </Button>
                                        {reviewDisagreeLoading && (
                                            <CircularProgress
                                                size={24}
                                                className={
                                                    classes.buttonProgress
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        );
    } else {
        return <></>;
    }
}
