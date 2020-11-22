import { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FilterProduct from './FilterProduct';
import Box from '@material-ui/core/Box';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function ScrollDialog({ review, handleDelete }) {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // const handleDelete = () => {
    //     axios
    //         .delete(`http://localhost:8000/reviews/${review.id}/`, config)
    //         .then((res) => {
    //             axios
    //                 .get(`http://localhost:8000/products/${product.slug}/`)
    //                 .then((res) => {
    //                     setStateProduct(res.data);
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
                fullWidth
                startIcon={<DeleteForeverIcon />}
                onClick={handleClickOpen('paper')}
            >
                <Box px={3}>Delete</Box>
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
                    Delete Your Review?
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleDelete(review, setOpen)}
                        color='primary'
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
