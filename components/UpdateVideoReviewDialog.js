import { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

import UpdateIcon from '@material-ui/icons/Update';
import Grid from '@material-ui/core/Grid';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

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

export default function UpdateVideoReviewDialog({
    videoReviewId,
    handleUpdateForVideoReview,
    product,
    myBag,
    changeProduct,
    changeMyBag,
    config,
    loading,
    setLoading,
}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
            <Button
                variant='contained'
                color='primary'
                size='small'
                startIcon={<UpdateIcon />}
                onClick={handleClickOpen('paper')}
            >
                <Box px={1}>Update</Box>
            </Button>
            <Dialog
                fullWidth
                maxWidth='md'
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogTitle id='scroll-dialog-title'>
                    Update Your Video Review
                </DialogTitle>

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
                    onSubmit={(values, { setSubmitting }) => {
                        handleUpdateForVideoReview(
                            values,
                            setSubmitting,
                            videoReviewId,
                            product,
                            myBag,
                            changeProduct,
                            changeMyBag,
                            config,
                            setOpen,
                            setLoading
                        );
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <DialogContent dividers={scroll === 'paper'}>
                                <Field
                                    name='link'
                                    type='text'
                                    component={TextField}
                                    variant='outlined'
                                    label='Youtube Video Link *'
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color='primary'>
                                    Cancel
                                </Button>
                                <div className={classes.root}>
                                    <div className={classes.wrapper}>
                                        <Button
                                            type='submit'
                                            size='small'
                                            variant='contained'
                                            color='primary'
                                            disabled={loading || isSubmitting}
                                        >
                                            <Box px={3}>Update</Box>
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
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    );
}
