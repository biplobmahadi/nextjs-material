import { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

import UpdateIcon from '@material-ui/icons/Update';
import Grid from '@material-ui/core/Grid';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';

const label = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

const useStyles = makeStyles((theme) => ({
    boot: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
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

export default function UpdateReviewDialog({ reviewId, handleUpdate }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const [valueAgain, setValueAgain] = React.useState(4);
    const [hoverAgain, setHoverAgain] = React.useState(-1);

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
                fullWidth
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
                    Update Your Review
                </DialogTitle>

                <Formik
                    initialValues={{
                        review: '',
                    }}
                    validationSchema={Yup.object({
                        review: Yup.string()
                            .trim('Required')
                            .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        handleUpdate(
                            values,
                            setSubmitting,
                            reviewId,
                            setOpen,
                            valueAgain
                        );
                    }}
                >
                    {({ isSubmitting }) => (
                        <div>
                            <Form>
                                <DialogContent dividers={scroll === 'paper'}>
                                    <Field
                                        name='review'
                                        type='text'
                                        multiline={true}
                                        rows={4}
                                        component={TextField}
                                        variant='outlined'
                                        label='Give Review *'
                                        fullWidth
                                    />
                                    <Box py={5}>
                                        <Grid
                                            container
                                            direction='row'
                                            justify='center'
                                            alignItems='flex-end'
                                            spacing={3}
                                        >
                                            <Grid item>
                                                <div className={classes.boot}>
                                                    <Rating
                                                        name='hover-feedback-for update'
                                                        // name are changed here to get different value here
                                                        // name not required when readOnly
                                                        // but in one page if there have multiple Rating
                                                        // then name must be different
                                                        value={valueAgain}
                                                        size='large'
                                                        onChange={(
                                                            event,
                                                            newValueAgain
                                                        ) => {
                                                            setValueAgain(
                                                                newValueAgain
                                                            );
                                                        }}
                                                        onChangeActive={(
                                                            event,
                                                            newHoverAgain
                                                        ) => {
                                                            setHoverAgain(
                                                                newHoverAgain
                                                            );
                                                        }}
                                                    />
                                                    {valueAgain !== null && (
                                                        <Box ml={2}>
                                                            {
                                                                label[
                                                                    hoverAgain !==
                                                                    -1
                                                                        ? hoverAgain
                                                                        : valueAgain
                                                                ]
                                                            }
                                                        </Box>
                                                    )}
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={handleClose}
                                        color='primary'
                                    >
                                        Cancel
                                    </Button>
                                    <div className={classes.root}>
                                        <div className={classes.wrapper}>
                                            <Button
                                                type='submit'
                                                size='small'
                                                variant='contained'
                                                color='primary'
                                                disabled={
                                                    isSubmitting ||
                                                    valueAgain === null
                                                }
                                            >
                                                <Box px={3}>Update</Box>
                                            </Button>
                                            {isSubmitting && (
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
                        </div>
                    )}
                </Formik>
            </Dialog>
        </>
    );
}
