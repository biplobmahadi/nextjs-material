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
import UpdateVideoReviewDialog from './UpdateVideoReviewDialog';
import DeleteVideoReviewDialog from './DeleteVideoReviewDialog';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import StarHalfIcon from '@material-ui/icons/StarHalf';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';
import Rating from '@material-ui/lab/Rating';
import ReactPlayer from 'react-player/youtube';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
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

export default function SingleVideoReview({
    video_review,
    user,
    handleUpdateForVideoReview,
    handleDeleteForVideoReview,
    handleAgreeForVideoReview,
    handleDisagreeForVideoReview,
}) {
    const classes = useStyles();
    const [
        videoReviewAgreeLoading,
        setVideoReviewAgreeLoading,
    ] = React.useState(false);
    const [
        videoReviewDisagreeLoading,
        setVideoReviewDisagreeLoading,
    ] = React.useState(false);

    return (
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
            <Box
                borderRadius='borderRadius'
                style={{ backgroundColor: 'white' }}
            >
                {video_review.user.pk === (user && user.pk) && (
                    <Box pt={1} textAlign='center'>
                        <UpdateVideoReviewDialog
                            videoReviewId={video_review.id}
                            handleUpdateForVideoReview={
                                handleUpdateForVideoReview
                            }
                        />
                        <Box py={1}>
                            <DeleteVideoReviewDialog
                                videoReviewId={video_review.id}
                                handleDeleteForVideoReview={
                                    handleDeleteForVideoReview
                                }
                            />
                        </Box>
                    </Box>
                )}
                <ReactPlayer
                    width='100%'
                    height='260px'
                    controls
                    light
                    url={video_review.link}
                />
                <Box p={1}>{video_review.created_at}</Box>
                <Box px={3} py={1} textAlign='center'>
                    <Box>
                        <div className={classes.root}>
                            <div className={classes.wrapper}>
                                <Button
                                    size='small'
                                    variant='contained'
                                    color={
                                        video_review.videoreviewcountforagree.user.includes(
                                            user && user.pk
                                        )
                                            ? 'secondary'
                                            : 'default'
                                    }
                                    startIcon={<ThumbUpIcon />}
                                    onClick={() =>
                                        handleAgreeForVideoReview(
                                            JSON.stringify(video_review),
                                            setVideoReviewAgreeLoading
                                        )
                                    }
                                    // use this type of value sending in bag page
                                    disabled={
                                        videoReviewAgreeLoading ||
                                        video_review.user.pk ===
                                            (user && user.pk)
                                    }
                                >
                                    Agreed (
                                    {video_review.videoreviewcountforagree &&
                                        video_review.videoreviewcountforagree
                                            .agreed}
                                    )
                                </Button>
                                {videoReviewAgreeLoading && (
                                    <CircularProgress
                                        size={24}
                                        className={classes.buttonProgress}
                                    />
                                )}
                            </div>
                        </div>
                    </Box>
                    <Box mt={1}>
                        <div className={classes.root}>
                            <div className={classes.wrapper}>
                                <Button
                                    size='small'
                                    variant='contained'
                                    color={
                                        video_review.videoreviewcountfordisagree.user.includes(
                                            user && user.pk
                                        )
                                            ? 'secondary'
                                            : 'default'
                                    }
                                    startIcon={<ThumbDownIcon />}
                                    onClick={() =>
                                        handleDisagreeForVideoReview(
                                            JSON.stringify(video_review),
                                            setVideoReviewDisagreeLoading
                                        )
                                    }
                                    // use this type of value sending in bag page
                                    disabled={
                                        videoReviewDisagreeLoading ||
                                        video_review.user.pk ===
                                            (user && user.pk)
                                    }
                                >
                                    Disagreed (
                                    {video_review.videoreviewcountfordisagree &&
                                        video_review.videoreviewcountfordisagree
                                            .disagreed}
                                    )
                                </Button>
                                {videoReviewDisagreeLoading && (
                                    <CircularProgress
                                        size={24}
                                        className={classes.buttonProgress}
                                    />
                                )}
                            </div>
                        </div>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
}
