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
import ProductCardForTrial from '../components/ProductCardForTrial';

export default function ScrollDialog({
    categoryProducts,
    myBag,
    changeMyBag,
    config,
    changeCategoryProducts,
    product,
}) {
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
        <div>
            <Button
                variant='contained'
                color='primary'
                onClick={handleClickOpen('paper')}
            >
                <Box textAlign='center' px={3}>
                    Trial Similar
                </Box>
            </Button>
            <Dialog
                fullWidth
                maxWidth='xl'
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogTitle id='scroll-dialog-title'>
                    <Box textAlign='center'>
                        You Can Add Similar Product As Trial To Your Bag
                    </Box>
                </DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>
                    <Grid container spacing={5}>
                        {categoryProducts &&
                            categoryProducts.map((categoryProduct) => (
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <ProductCardForTrial
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
                </DialogContent>
            </Dialog>
        </div>
    );
}