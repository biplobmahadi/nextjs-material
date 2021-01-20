import { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FilterProduct from './FilterProduct';
import Box from '@material-ui/core/Box';

export default function FilterProductDialog({
    setPriceFilter100TK,
    setPriceFilter500TK,
    setPriceFilter1000TK,
    setPriceFilter2000TK,
    setPriceFilter5000TK,
    handlePriceFilter100TK,
    handlePriceFilter500TK,
    handlePriceFilter1000TK,
    handlePriceFilter2000TK,
    handlePriceFilter5000TK,
}) {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
        setPriceFilter100TK(0);
        setPriceFilter500TK(0);
        setPriceFilter1000TK(0);
        setPriceFilter2000TK(0);
        setPriceFilter5000TK(0);
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
                size='small'
                onClick={handleClickOpen('paper')}
            >
                <Box px={3}>Filter By Price</Box>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogTitle id='scroll-dialog-title'>
                    Product Filter By Price
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id='scroll-dialog-description'
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <FilterProduct
                            handlePriceFilter100TK={handlePriceFilter100TK}
                            handlePriceFilter500TK={handlePriceFilter500TK}
                            handlePriceFilter1000TK={handlePriceFilter1000TK}
                            handlePriceFilter2000TK={handlePriceFilter2000TK}
                            handlePriceFilter5000TK={handlePriceFilter5000TK}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color='primary'>
                        Filter
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
