import Head from 'next/head';

import Size from './forms/Size';
import Quantity from './forms/Quantity';

import AddForTrialDialog from './AddForTrialDialog';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Snackbar from '@material-ui/core/Snackbar';

import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PaymentIcon from '@material-ui/icons/Payment';
import RestoreIcon from '@material-ui/icons/Restore';
import InfoIcon from '@material-ui/icons/Info';
import RedeemIcon from '@material-ui/icons/Redeem';
import Zoom from 'react-medium-image-zoom';

import axios from 'axios';
import { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
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

export default function ProductDetailsFirstPart({
    product,
    changeProduct,
    config,
    myBag,
    changeMyBag,
    avgRating,
    categoryProducts,
    changeCategoryProducts,
}) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState('/s1.jpg');
    const [quantity, setQuantity] = React.useState(1);
    const [openForAdd, setOpenForAdd] = React.useState(false);
    const [openForNotInStock, setOpenForNotInStock] = React.useState(false);
    const [openForAddAsTrial, setOpenForAddAsTrial] = React.useState(false);

    const handleImageClick = (value) => {
        setValue(value);
    };

    // this is for alert close
    const handleCloseForAdd = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenForAdd(false);
    };
    const handleCloseForNotInStock = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenForNotInStock(false);
    };
    const handleCloseForAddAsTrial = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenForAddAsTrial(false);
    };

    // productWithQuantityExistInBag made here, because if not exist then trial add not shown
    let productWithQuantityExistInBag;
    if (myBag) {
        productWithQuantityExistInBag = myBag.product_with_quantity.filter(
            (filterProduct) => filterProduct.product.id === product.id
        );
    }

    const handleAddToBag = () => {
        // ######## here always quantity can be selected by user
        // if productWithQuantity already exist then also user can select quantity
        // if user not select quantity then it will be 1 always

        // create a loading
        setLoading(true);

        let addToBag = {
            product: product.id,
            quantity: quantity,
            cost: product.price * quantity,
        };

        console.log(
            'productWithQuantityExistInBag',
            productWithQuantityExistInBag
        );

        // 1st we need to get the available quantity for this product
        axios
            .get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product-update-only-quantity/${product.productavailable.id}/`,
                config
            )
            .then((res) => {
                // if product available then this will run from below
                // add to bag process will start from here
                if (res.data.available_quantity > 0) {
                    // I use productWithQuantityExistInBag.length !== 0, because [] == true.. if [] then loop will continue
                    // this is very important
                    if (
                        productWithQuantityExistInBag &&
                        productWithQuantityExistInBag.length !== 0
                    ) {
                        if (productWithQuantityExistInBag[0].add_as_trial) {
                            console.log('this product already add as trial');
                            setLoading(false);
                            setOpenForAddAsTrial(true);
                        } else {
                            axios
                                .patch(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${productWithQuantityExistInBag[0].id}/`,
                                    {
                                        quantity:
                                            productWithQuantityExistInBag[0]
                                                .quantity + quantity, // here state quantity used
                                        cost:
                                            productWithQuantityExistInBag[0]
                                                .cost + product.price,
                                    },
                                    config
                                )
                                .then((res) => {
                                    // console.log(res.data);
                                    let pk = [];
                                    myBag.product_with_quantity.map(
                                        (product_with_quantity) =>
                                            (pk = pk.concat(
                                                product_with_quantity.id
                                            ))
                                    );
                                    console.log(pk);
                                    axios
                                        .patch(
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                            {
                                                product_with_quantity: pk,
                                                sub_total:
                                                    myBag.sub_total +
                                                    product.price,
                                            },
                                            config
                                        )
                                        .then((res) => {
                                            axios
                                                .patch(
                                                    `${process.env.NEXT_PUBLIC_BASE_URL}/product-update-only-quantity/${product.productavailable.id}/`,
                                                    {
                                                        available_quantity:
                                                            product
                                                                .productavailable
                                                                .available_quantity -
                                                            quantity, // here state quantity used
                                                    },
                                                    config
                                                )
                                                .then((res) => {
                                                    // console.log('updated quantity', res.data)
                                                    // final get will be after all post, patch done
                                                    axios
                                                        .get(
                                                            `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                                                        )
                                                        .then((res) => {
                                                            changeProduct(
                                                                res.data
                                                            );
                                                            console.log(
                                                                'product after updated quantity',
                                                                res.data
                                                            );
                                                            axios
                                                                .get(
                                                                    `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                                                    config
                                                                )
                                                                .then((res) => {
                                                                    // new myBag need to add to state
                                                                    changeMyBag(
                                                                        res.data
                                                                    );
                                                                    setLoading(
                                                                        false
                                                                    );
                                                                    setOpenForAdd(
                                                                        true
                                                                    );
                                                                })
                                                                .catch((err) =>
                                                                    console.log(
                                                                        err.response
                                                                    )
                                                                );
                                                        })
                                                        .catch((err) =>
                                                            console.log(
                                                                err.response
                                                            )
                                                        );
                                                })
                                                .catch((err) =>
                                                    console.log(err.response)
                                                );
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                })
                                .catch((err) => console.log(err.response));
                        }
                    } else {
                        axios
                            .post(
                                `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/`,
                                addToBag,
                                config
                            )
                            .then((res) => {
                                // console.log('bag nai - pwq', res.data);
                                if (myBag && myBag.length !== 0) {
                                    // console.log(res.data.id, myBag.product.id, myBag.product) .. middle is not correct
                                    let pk = [];
                                    myBag.product_with_quantity.map(
                                        (product_with_quantity) =>
                                            (pk = pk.concat(
                                                product_with_quantity.id
                                            ))
                                    );
                                    console.log(
                                        'bag e onno product ase - pk',
                                        pk
                                    );
                                    axios
                                        .patch(
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                            {
                                                product_with_quantity: pk.concat(
                                                    res.data.id
                                                ),
                                                sub_total:
                                                    myBag.sub_total +
                                                    res.data.cost,
                                            },
                                            config
                                        )
                                        .then((res) => {
                                            console.log(
                                                'bag e product ase - patch bag',
                                                res.data
                                            );

                                            axios
                                                .patch(
                                                    `${process.env.NEXT_PUBLIC_BASE_URL}/product-update-only-quantity/${product.productavailable.id}/`,
                                                    {
                                                        available_quantity:
                                                            product
                                                                .productavailable
                                                                .available_quantity -
                                                            quantity, // here state quantity used
                                                    },
                                                    config
                                                )
                                                .then((res) => {
                                                    // console.log('updated quantity', res.data)
                                                    // final get will be after all post, patch done
                                                    axios
                                                        .get(
                                                            `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                                                        )
                                                        .then((res) => {
                                                            changeProduct(
                                                                res.data
                                                            );
                                                            console.log(
                                                                'product after updated quantity',
                                                                res.data
                                                            );
                                                            axios
                                                                .get(
                                                                    `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                                                    config
                                                                )
                                                                .then((res) => {
                                                                    // new myBag need to add to state
                                                                    changeMyBag(
                                                                        res.data
                                                                    );
                                                                    setLoading(
                                                                        false
                                                                    );
                                                                    setOpenForAdd(
                                                                        true
                                                                    );
                                                                })
                                                                .catch((err) =>
                                                                    console.log(
                                                                        err.response
                                                                    )
                                                                );
                                                        })
                                                        .catch((err) =>
                                                            console.log(
                                                                err.response
                                                            )
                                                        );
                                                })
                                                .catch((err) =>
                                                    console.log(err.response)
                                                );
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                } else {
                                    axios
                                        .post(
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/`,
                                            {
                                                product_with_quantity: [
                                                    res.data.id,
                                                ],
                                                sub_total: res.data.cost,
                                            },
                                            config
                                        )
                                        .then((res) => {
                                            // when there is no bag available then this promise will done
                                            // so here we don't have any myBag id
                                            // need to assign it here
                                            const myBagId = res.data.id
                                            // use this myBagId when we get requ in myBag 
                                            axios
                                                .patch(
                                                    `${process.env.NEXT_PUBLIC_BASE_URL}/product-update-only-quantity/${product.productavailable.id}/`,
                                                    {
                                                        available_quantity:
                                                            product
                                                                .productavailable
                                                                .available_quantity -
                                                            quantity, // here state quantity used
                                                    },
                                                    config
                                                )
                                                .then((res) => {
                                                    // console.log('updated quantity', res.data)
                                                    // final get will be after all post, patch done
                                                    axios
                                                        .get(
                                                            `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}/`
                                                        )
                                                        .then((res) => {
                                                            changeProduct(
                                                                res.data
                                                            );
                                                            console.log(
                                                                'product after updated quantity',
                                                                res.data
                                                            );
                                                            axios
                                                                .get(
                                                                    `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBagId}/`,
                                                                    config
                                                                )
                                                                .then((res) => {
                                                                    // new myBag need to add to state
                                                                    changeMyBag(
                                                                        res.data
                                                                    );
                                                                    setLoading(
                                                                        false
                                                                    );
                                                                    setOpenForAdd(
                                                                        true
                                                                    );
                                                                })
                                                                .catch((err) =>
                                                                    console.log(
                                                                        err.response
                                                                    )
                                                                );
                                                        })
                                                        .catch((err) =>
                                                            console.log(
                                                                err.response
                                                            )
                                                        );
                                                })
                                                .catch((err) =>
                                                    console.log(err.response)
                                                );
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                }
                            })
                            .catch((err) => console.log(err.response));
                    }
                } else {
                    console.log('product not available');
                    setLoading(false);
                    setOpenForNotInStock(true);
                }
            })
            .catch((err) => console.log(err.response));
    };

    return (
        <Box mx={3} mt={6} pt={4}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <Box
                        px={2}
                        pt={2}
                        mt={2}
                        height='100%'
                        borderRadius='borderRadius'
                        style={{ backgroundColor: 'white' }}
                    >
                        <Zoom>
                            <img
                                alt='that wanaka tree'
                                src={value}
                                width='100%'
                                height='100%'
                            />
                        </Zoom>
                        <Box pt={2}>
                            <Grid
                                container
                                spacing={2}
                                direction='row'
                                justify='center'
                                alignItems='center'
                            >
                                <Grid item>
                                    <img
                                        alt='that wanaka tree'
                                        src='/s1.jpg'
                                        width='60px'
                                        height='50px'
                                        onClick={() =>
                                            handleImageClick('/s1.jpg')
                                        }
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Grid>
                                <Grid item>
                                    <img
                                        alt='that wanaka tree'
                                        src='/s2.jpg'
                                        width='60px'
                                        height='50px'
                                        onClick={() =>
                                            handleImageClick('/s2.jpg')
                                        }
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Grid>
                                <Grid item>
                                    <img
                                        alt='that wanaka tree'
                                        src='/s3.jpg'
                                        width='60px'
                                        height='50px'
                                        onClick={() =>
                                            handleImageClick('/s3.jpg')
                                        }
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                    <Box
                        pt={2}
                        px={2}
                        mt={2}
                        height='100%'
                        borderRadius='borderRadius'
                        style={{ backgroundColor: 'white' }}
                    >
                        <Typography variant='h5' component='h5'>
                            <strong>{product && product.name}</strong>
                        </Typography>
                        <Box pt={1}>
                            <Grid container alignItems='center'>
                                <Rating
                                    name='read-only'
                                    value={avgRating !== 0 ? avgRating : null}
                                    readOnly
                                />
                                <span>
                                    <Box pl={1}>
                                        <Typography> |</Typography>
                                    </Box>
                                </span>
                                <span>
                                    <Box pl={1}>
                                        <Typography>
                                            {' '}
                                            {product &&
                                                product.review.length}{' '}
                                            Rating & Review
                                        </Typography>
                                    </Box>
                                </span>
                            </Grid>
                        </Box>
                        <Box py={3}>
                            <Typography>
                                <strong>Brand:</strong>{' '}
                                {product && product.brand.brand_name}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant='h4' component='h4'>
                                <strong>Tk. {product && product.price}</strong>
                            </Typography>
                        </Box>
                        <Box pt={3}>
                            {product && product.has_size && (
                                <Grid container spacing={2} alignItems='center'>
                                    <Grid item xs={12} sm>
                                        <Size />
                                    </Grid>
                                    <Grid item xs={12} sm>
                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            size='small'
                                        >
                                            <Box textAlign='center' px={2}>
                                                Size Guide
                                            </Box>
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                        <Box pt={2}>
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item xs={12} sm>
                                    <Quantity setQuantity={setQuantity} />
                                </Grid>
                                <Grid item xs={12} sm>
                                    {product &&
                                    product.productavailable
                                        .available_quantity !== 0 ? (
                                        <Chip
                                            label='In Stock'
                                            color='primary'
                                            size='small'
                                        />
                                    ) : (
                                        <Chip
                                            label='Not In Stock'
                                            color='secondary'
                                            size='small'
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                        <Box pt={6}>
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item xs={12} sm={6}>
                                    <div className={classes.root}>
                                        <div className={classes.wrapper}>
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                onClick={handleAddToBag}
                                                disabled={
                                                    loading ||
                                                    (product &&
                                                        product.productavailable
                                                            .available_quantity ===
                                                            0)
                                                }
                                            >
                                                <Box textAlign='center' px={4}>
                                                    Add To Bag
                                                </Box>
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
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                        open={openForAdd}
                                        autoHideDuration={4000}
                                        onClose={handleCloseForAdd}
                                    >
                                        <Alert
                                            severity='success'
                                            variant='filled'
                                        >
                                            Successfully Product Added To Bag!
                                        </Alert>
                                    </Snackbar>
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                        open={openForAddAsTrial}
                                        autoHideDuration={4000}
                                        onClose={handleCloseForAddAsTrial}
                                    >
                                        <Alert severity='info' variant='filled'>
                                            Already Add as Trial, Can't Add
                                            More!
                                        </Alert>
                                    </Snackbar>
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                        open={openForNotInStock}
                                        autoHideDuration={4000}
                                        onClose={handleCloseForNotInStock}
                                    >
                                        <Alert severity='info' variant='filled'>
                                            Sorry, Product Not In Stock Now!
                                        </Alert>
                                    </Snackbar>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {product &&
                                        product.has_trial &&
                                        productWithQuantityExistInBag &&
                                        productWithQuantityExistInBag.length !==
                                            0 && (
                                            <AddForTrialDialog
                                                categoryProducts={
                                                    categoryProducts
                                                }
                                                config={config}
                                                myBag={myBag}
                                                changeMyBag={changeMyBag}
                                                changeCategoryProducts={
                                                    changeCategoryProducts
                                                }
                                                product={product}
                                            />
                                        )}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                    <Box height='100%'>
                        <Box
                            p={2}
                            mt={2}
                            borderRadius='borderRadius'
                            style={{ backgroundColor: 'white' }}
                        >
                            <Box pb={1}>
                                <Typography variant='h5' component='h5'>
                                    <strong>Gift With This</strong>
                                </Typography>
                            </Box>
                            {product &&
                                product.you_will_get.map((youWillGet) => (
                                    <Box pt={1}>
                                        <Grid container alignItems='center'>
                                            <RedeemIcon color='secondary' />
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {' '}
                                                        {youWillGet.gift}
                                                    </Typography>
                                                </Box>
                                            </span>
                                        </Grid>
                                    </Box>
                                ))}

                            {product && product.you_will_get.length === 0 && (
                                <Box pt={1}>
                                    <Alert severity='error'>
                                        <AlertTitle>Sorry Dear</AlertTitle>
                                        No Gift Included With This Product Yet —{' '}
                                        <strong>
                                            Hope Gift Will Include Soon!
                                        </strong>
                                    </Alert>
                                </Box>
                            )}
                        </Box>

                        <Box
                            p={2}
                            mt={2}
                            borderRadius='borderRadius'
                            style={{ backgroundColor: 'white' }}
                        >
                            <Box pb={1}>
                                <Typography variant='h5' component='h5'>
                                    <strong>Information</strong>
                                </Typography>
                            </Box>
                            {product &&
                                product.product_info.map((productInfo) => (
                                    <Box pt={1}>
                                        <Grid container alignItems='center'>
                                            <InfoIcon color='secondary' />
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {' '}
                                                        {productInfo.info}
                                                    </Typography>
                                                </Box>
                                            </span>
                                        </Grid>
                                    </Box>
                                ))}

                            <Box pt={1}>
                                <Grid container alignItems='center'>
                                    <PaymentIcon color='secondary' />
                                    <span>
                                        <Box pl={2}>
                                            <Typography>
                                                {' '}
                                                Cash On Delivery
                                            </Typography>
                                        </Box>
                                    </span>
                                </Grid>
                            </Box>
                            <Box pt={1}>
                                <Grid container alignItems='center'>
                                    <AccountBalanceWalletIcon color='secondary' />
                                    <span>
                                        <Box pl={2}>
                                            <Typography>
                                                {' '}
                                                50 TK. Delivery
                                            </Typography>
                                        </Box>
                                    </span>
                                </Grid>
                            </Box>
                            <Box pt={1}>
                                <Grid container alignItems='center'>
                                    <RestoreIcon color='secondary' />
                                    <span>
                                        <Box pl={2}>
                                            <Typography>
                                                {' '}
                                                7 Days Happy Return
                                            </Typography>
                                        </Box>
                                    </span>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
