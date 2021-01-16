import Link from '../src/Link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
    boot: {
        maxWidth: '100%',
    },
    imgHover: {
        overflow: 'hidden',
    },
    imgHoverZoom: {
        transition: 'transform .5s ease',
        '&:hover': { transform: 'scale(1.1)' },
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

export default function ProductCard({
    product,
    myBag,
    config,
    changeMyBag,
    changeCardProducts,
    urlForChangeCardProducts,
    needDisabled,
    setNeedDisabled,
}) {
    const classes = useStyles();
    console.log('got product for card', product);

    const [loading, setLoading] = React.useState(false);
    const [openForAdd, setOpenForAdd] = React.useState(false);
    const [openForNotInStock, setOpenForNotInStock] = React.useState(false);
    const [openForAddAsTrial, setOpenForAddAsTrial] = React.useState(false);

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

    // ####### Full feature of add productWithQuantity to bag
    // 1st check is product quantity available or not
    // if not available then show a msg that, product not available
    // it's important to check product available or not, because for 1st render it can show available
    // but in that time other user can add it and it can be not available
    // so check it 1st

    // ## Now, check productWithQuantity already in bag or not
    // if already in bag, then check is it in trial or not
    // if in trial then show a msg that, productWithQuantity already add as trial
    // because we can't add more than 1 productWithQuantity as trial
    // if not in trial then add 1 quantity extra with this existing productWithQuantity in bag
    // then also remove 1 quantity from original product available quantity
    // because we always track the quantity of product that available or not

    // ## if productWithQuantity not exist in bag
    // then create productWithQuantity
    // ### Now, check is there any productWithQuantity in Bag or not
    // if there have some other productWithQuantity in bag then update bag with newly created productWithQuantity
    // by following previous process
    // if there have no productWithQuantity, mean no productWithQuantity in bag
    // then create a bag with this productWithQuantity then follow the next steps
    // Done #########

    const handleAddToBag = () => {
        // start loading
        setLoading(true);
        // others will disabled when add specific one
        setNeedDisabled(true);

        let addToBag = {
            product: product.id,
            quantity: 1,
            cost: product.price,
        };

        // check productWithQuantity exist in bag or not
        let productWithQuantityExistInBag;
        if (myBag) {
            productWithQuantityExistInBag = myBag.product_with_quantity.filter(
                (filterProduct) => filterProduct.product.id === product.id
            );
        }
        console.log(
            'productWithQuantityExistInBag',
            productWithQuantityExistInBag
        );

        // 1st we need to get the available quantity for this product
        // if product available then we can add it
        // else we send a msg that, product not available
        axios
            .get(
                `http://localhost:8000/product-update-only-quantity/${product.productavailable.id}/`,
                config
            )
            .then((res) => {
                // if product available then this will run from below
                // add to bag process will start from here
                if (res.data.available_quantity > 0) {
                    // I use productWithQuantityExistInBag.length !== 0, because [] == true.. if [] then loop will continue
                    if (
                        productWithQuantityExistInBag &&
                        productWithQuantityExistInBag.length !== 0
                    ) {
                        // if productWithQuantity is already exist in bag as trial than not add more
                        if (productWithQuantityExistInBag[0].add_as_trial) {
                            console.log('this product already add as trial');
                            setLoading(false);
                            setNeedDisabled(false);
                            setOpenForAddAsTrial(true);
                        } else {
                            axios
                                .patch(
                                    `http://localhost:8000/product-with-quantity/${productWithQuantityExistInBag[0].id}/`,
                                    {
                                        quantity:
                                            productWithQuantityExistInBag[0]
                                                .quantity + 1,
                                        cost:
                                            productWithQuantityExistInBag[0]
                                                .cost + product.price,
                                    },
                                    config
                                )
                                .then((res) => {
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
                                            `http://localhost:8000/my-bag/${myBag.id}/`,
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
                                                    `http://localhost:8000/product-update-only-quantity/${product.productavailable.id}/`,
                                                    {
                                                        available_quantity:
                                                            product
                                                                .productavailable
                                                                .available_quantity -
                                                            1,
                                                    },
                                                    config
                                                )
                                                .then((res) => {
                                                    // final get will be after all post, patch done
                                                    // everything will update here for user
                                                    axios
                                                        .get(
                                                            urlForChangeCardProducts
                                                        )
                                                        .then((res) => {
                                                            changeCardProducts(
                                                                res.data.product
                                                            );
                                                            axios
                                                                .get(
                                                                    `http://localhost:8000/my-bag/${myBag.id}/`,
                                                                    config
                                                                )
                                                                .then((res) => {
                                                                    setLoading(
                                                                        false
                                                                    );
                                                                    setNeedDisabled(
                                                                        false
                                                                    );
                                                                    setOpenForAdd(
                                                                        true
                                                                    );
                                                                    // new myBag need to update
                                                                    changeMyBag(
                                                                        res.data
                                                                    );
                                                                })
                                                                .catch((err) =>
                                                                    console.log(
                                                                        err.response
                                                                    )
                                                                );
                                                        })
                                                        .catch((err) => ({
                                                            error:
                                                                err.response
                                                                    .data,
                                                        }));
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
                                'http://localhost:8000/product-with-quantity/',
                                addToBag,
                                config
                            )
                            .then((res) => {
                                if (myBag && myBag.length !== 0) {
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
                                            `http://localhost:8000/my-bag/${myBag.id}/`,
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
                                                    `http://localhost:8000/product-update-only-quantity/${product.productavailable.id}/`,
                                                    {
                                                        available_quantity:
                                                            product
                                                                .productavailable
                                                                .available_quantity -
                                                            1,
                                                    },
                                                    config
                                                )
                                                .then((res) => {
                                                    // final get will be after all post, patch done
                                                    axios
                                                        .get(
                                                            urlForChangeCardProducts
                                                        )
                                                        .then((res) => {
                                                            changeCardProducts(
                                                                res.data.product
                                                            );
                                                            axios
                                                                .get(
                                                                    `http://localhost:8000/my-bag/${myBag.id}/`,
                                                                    config
                                                                )
                                                                .then((res) => {
                                                                    setLoading(
                                                                        false
                                                                    );
                                                                    setNeedDisabled(
                                                                        false
                                                                    );
                                                                    setOpenForAdd(
                                                                        true
                                                                    );
                                                                    // new myBag need to update
                                                                    changeMyBag(
                                                                        res.data
                                                                    );
                                                                })
                                                                .catch((err) =>
                                                                    console.log(
                                                                        err.response
                                                                    )
                                                                );
                                                        })
                                                        .catch((err) => ({
                                                            error:
                                                                err.response
                                                                    .data,
                                                        }));
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
                                            'http://localhost:8000/my-bag/',
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
                                            const myBagId = res.data.id;
                                            // use this myBagId when we get requ in myBag
                                            axios
                                                .patch(
                                                    `http://localhost:8000/product-update-only-quantity/${product.productavailable.id}/`,
                                                    {
                                                        available_quantity:
                                                            product
                                                                .productavailable
                                                                .available_quantity -
                                                            1,
                                                    },
                                                    config
                                                )
                                                .then((res) => {
                                                    // final get will be after all post, patch done
                                                    axios
                                                        .get(
                                                            urlForChangeCardProducts
                                                        )
                                                        .then((res) => {
                                                            changeCardProducts(
                                                                res.data.product
                                                            );
                                                            axios
                                                                .get(
                                                                    `http://localhost:8000/my-bag/${myBagId}/`,
                                                                    config
                                                                )
                                                                .then((res) => {
                                                                    setLoading(
                                                                        false
                                                                    );
                                                                    setNeedDisabled(
                                                                        false
                                                                    );
                                                                    setOpenForAdd(
                                                                        true
                                                                    );
                                                                    // new myBag need to update
                                                                    changeMyBag(
                                                                        res.data
                                                                    );
                                                                })
                                                                .catch((err) =>
                                                                    console.log(
                                                                        err.response
                                                                    )
                                                                );
                                                        })
                                                        .catch((err) => ({
                                                            error: err.response,
                                                        }));
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
                    setNeedDisabled(false);
                    setOpenForNotInStock(true);
                }
            })
            .catch((err) => console.log(err.response));
    };

    return (
        <Card className={classes.boot}>
            <Link href={`/product/${product && product.slug}`}>
                <CardActionArea>
                    <Box className={classes.imgHover} p={2}>
                        <CardMedia
                            className={classes.imgHoverZoom}
                            component='img'
                            alt='Product'
                            height='180'
                            image='/s2.jpg'
                            title='Product'
                        />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom>
                            <Box textAlign='center'>
                                {product && product.name}
                            </Box>
                        </Typography>
                        <Typography gutterBottom variant='h6' component='h6'>
                            <Box textAlign='center' color='secondary.main'>
                                Tk. {product && product.price}
                            </Box>
                        </Typography>
                    </CardContent>
                    {product &&
                        product.productavailable.available_quantity === 0 && (
                            <Box textAlign='center'>
                                <Chip
                                    label='Not In Stock'
                                    color='secondary'
                                    size='small'
                                />
                            </Box>
                        )}
                </CardActionArea>
            </Link>
            <Box pb={1}>
                <CardActions style={{ justifyContent: 'center' }}>
                    <div className={classes.root}>
                        <div className={classes.wrapper}>
                            <Button
                                variant='contained'
                                size='small'
                                color='primary'
                                onClick={handleAddToBag}
                                disabled={
                                    needDisabled ||
                                    loading ||
                                    product.productavailable
                                        .available_quantity === 0
                                }
                            >
                                <Box textAlign='center' px={4}>
                                    Add To Bag
                                </Box>
                            </Button>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    className={classes.buttonProgress}
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
                        <Alert severity='success' variant='filled'>
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
                            Already Add as Trial, Can't Add More!
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
                </CardActions>
            </Box>
        </Card>
    );
}
