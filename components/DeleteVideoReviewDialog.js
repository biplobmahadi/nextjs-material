import { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function DeleteVideoReviewDialog({
    videoReviewId,
    handleDeleteForVideoReview,
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
        <>
            <Button
                variant='contained'
                color='primary'
                size='small'
                startIcon={<DeleteForeverIcon />}
                onClick={handleClickOpen('paper')}
            >
                <Box px={1}>Delete</Box>
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
                    Delete Your Video Review?
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button
                        onClick={() =>
                            handleDeleteForVideoReview(videoReviewId, setOpen)
                        }
                        color='primary'
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
