import Head from "next/head";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import ProductDetailsTable from "./ProductDetailsTable";
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
import React from "react";

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

export default function SingleVideoReview(props) {
    const classes = useStyles();
    const [videoReview, setVideoReview] = React.useState(props.video_review);
    const {
        user,
        handleUpdateForVideoReview,
        handleDeleteForVideoReview,
        handleAgreeForVideoReview,
        handleDisagreeForVideoReview,
    } = props;

    const [videoReviewAgreeLoading, setVideoReviewAgreeLoading] =
        React.useState(false);
    const [videoReviewDisagreeLoading, setVideoReviewDisagreeLoading] =
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
        videoReview &&
        videoReview.video_review_count.filter(
            (video_review_count) =>
                video_review_count.user.pk === user.pk &&
                video_review_count.vote === "agreed"
        );

    const [userDidAgreedState, setUserDidAgreedState] = React.useState(
        userDidAgreed.length !== 0 ? true : false
    );

    const userDidDisagreed =
        videoReview &&
        videoReview.video_review_count.filter(
            (video_review_count) =>
                video_review_count.user.pk === user.pk &&
                video_review_count.vote === "disagreed"
        );

    const [userDidDisagreedState, setUserDidDisagreedState] = React.useState(
        userDidDisagreed.length !== 0 ? true : false
    );

    const [videoReviewCountId, setVideoReviewCountId] = React.useState(
        userDidAgreed.length !== 0
            ? userDidAgreed[0].id
            : userDidDisagreed.length !== 0
            ? userDidDisagreed[0].id
            : null
    );

    const countForAgreed =
        videoReview &&
        videoReview.video_review_count.filter(
            (video_review_count) => video_review_count.vote === "agreed"
        );

    const countForDisagreed =
        videoReview &&
        videoReview.video_review_count.filter(
            (video_review_count) => video_review_count.vote === "disagreed"
        );

    const [lengthForAgreed, setLengthForAgreed] = React.useState(
        countForAgreed ? countForAgreed.length : 0
    );
    const [lengthForDisagreed, setLengthForDisagreed] = React.useState(
        countForDisagreed ? countForDisagreed.length : 0
    );

    if (videoReview) {
        return (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <Box
                    borderRadius="borderRadius"
                    style={{ backgroundColor: "white" }}
                >
                    {videoReview.user.pk === (user && user.pk) && (
                        <Box p={2}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item xs={12} sm>
                                    <Box textAlign="center">
                                        <UpdateVideoReviewDialog
                                            videoReviewId={videoReview.id}
                                            handleUpdateForVideoReview={
                                                handleUpdateForVideoReview
                                            }
                                            setVideoReview={setVideoReview}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm>
                                    <Box textAlign="center">
                                        <DeleteVideoReviewDialog
                                            videoReviewId={videoReview.id}
                                            handleDeleteForVideoReview={
                                                handleDeleteForVideoReview
                                            }
                                            setVideoReview={setVideoReview}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                    <ReactPlayer
                        width="100%"
                        height="260px"
                        controls
                        light
                        url={videoReview.link}
                    />
                    <Box p={2}>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} sm>
                                <Box textAlign="center">
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
                                                    handleAgreeForVideoReview(
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
                                                    )
                                                }
                                                // use this type of value sending in bag page
                                                disabled={
                                                    videoReviewAgreeLoading ||
                                                    videoReviewDisagreeLoading ||
                                                    videoReview.user.pk ===
                                                        (user && user.pk)
                                                }
                                            >
                                                Agreed ({lengthForAgreed})
                                            </Button>
                                            {videoReviewAgreeLoading && (
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
                            </Grid>
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
                            <Grid item xs={12} sm>
                                <Box textAlign="center">
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
                                                    handleDisagreeForVideoReview(
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
                                                    )
                                                }
                                                // use this type of value sending in bag page
                                                disabled={
                                                    videoReviewDisagreeLoading ||
                                                    videoReviewAgreeLoading ||
                                                    videoReview.user.pk ===
                                                        (user && user.pk)
                                                }
                                            >
                                                Disagreed ({lengthForDisagreed})
                                            </Button>
                                            {videoReviewDisagreeLoading && (
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
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        );
    } else {
        return <></>;
    }
}
