import { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FilterProduct from './FilterProduct';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import Rating from '@material-ui/lab/Rating';

const label = {
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

export default function ScrollDialog({ review, handleUpdate }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const [valueAgain, setValueAgain] = React.useState(2);
    const [hoverAgain, setHoverAgain] = React.useState(-1);

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleUpdate = (values, setSubmitting) => {
    //     const reviewUpdate = {
    //         review_detail: values.review,
    //         rating_star: value,
    //     };

    //     axios
    //         .patch(
    //             `http://localhost:8000/reviews/${review.id}/`,
    //             reviewUpdate,
    //             config
    //         )
    //         .then((res) => {
    //             axios
    //                 .get(`http://localhost:8000/products/${product.slug}/`)
    //                 .then((res) => {
    //                     setStateProduct(res.data);
    //                     setSubmitting(false);
    //                     setOpen(false);
    //                 })
    //                 .catch((err) => console.log(err.response));
    //         })
    //         .catch((err) => console.log(err.response));
    // };

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
        <div>
            <Button
                variant='contained'
                color='primary'
                size='small'
                startIcon={<UpdateIcon />}
                fullWidth
                onClick={handleClickOpen('paper')}
            >
                <Box px={3}>Update</Box>
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
                            review,
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
                                                        value={valueAgain}
                                                        precision={0.5}
                                                        onChange={(
                                                            event,
                                                            newValue
                                                        ) => {
                                                            setValueAgain(
                                                                newValue
                                                            );
                                                        }}
                                                        onChangeActive={(
                                                            event,
                                                            newHover
                                                        ) => {
                                                            setHoverAgain(
                                                                newHover
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
                                    <Button
                                        type='submit'
                                        size='small'
                                        variant='contained'
                                        color='secondary'
                                        // className={classes.submit}
                                        disabled={isSubmitting}
                                    >
                                        <Box px={3}>Update</Box>
                                    </Button>
                                </DialogActions>
                            </Form>
                        </div>
                    )}
                </Formik>

                {/* <DialogTitle id='scroll-dialog-title'>
                    Product Filter
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id='scroll-dialog-description'
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <FilterProduct />
                    </DialogContentText>
                </DialogContent> */}
            </Dialog>
        </div>
    );
}
