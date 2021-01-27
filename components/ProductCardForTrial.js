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

export default function ProductForTrialCard({
    product,
    myBag,
    config,
    changeMyBag,
    changeCategoryProducts,
    needDisabled,
    setNeedDisabled,
}) {
    const classes = useStyles();
    console.log('got product for card in trial', product);

    const [loading, setLoading] = React.useState(false);
    const [openForAdd, setOpenForAdd] = React.useState(false);
    const [openForNotInStock, setOpenForNotInStock] = React.useState(false);
    const [openForAddAsTrial, setOpenForAddAsTrial] = React.useState(false);
    const [openForTwoAlreadyAdded, setOpenForTwoAlreadyAdded] = React.useState(
        false
    );

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
    const handleCloseForTwoAlreadyAdded = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenForTwoAlreadyAdded(false);
    };

    const handleAddToBag = () => {
        // create a loading
        setLoading(true);
        // others will disabled when add specific one
        setNeedDisabled(true);

        let addToBag = {
            product: product.id,
            quantity: 1,
            cost: 0,
            add_as_trial: true,
        };

        // here find, this product exist or not in bag. it will get only one product

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

        // need to get the trial product of same category in myBag
        // because, if trial product of same category is 2 then, it will not add more
        // so 1st find all trial product of same category in myBag
        let trialProductsWithQuantityOfSameCategoryInBag;
        if (myBag) {
            trialProductsWithQuantityOfSameCategoryInBag = myBag.product_with_quantity.filter(
                (filterProduct) =>
                    filterProduct.product.category.id === product.category.id &&
                    filterProduct.add_as_trial
            );
        }
        console.log(
            'trialProductsWithQuantityOfSameCategoryInBag',
            trialProductsWithQuantityOfSameCategoryInBag
        );

        // ######### Most Important, if anybody add multiple product of same category then also
        // 2 product can be added as trial of this category ######

        // 1st we need to get the available quantity for this product
        // if not available then nothing will perform
        // if available then check, is 2 product already added as trial for similar category
        // if 2 similar category product add already, then this one will not added as trial
        // when not 2 product added, then check is this product already added as trial
        // if already added this product then actions will close here
        // if not added then it will added successfully

        // ##### First of there have to have any product in bag
        if (myBag && myBag.length !== 0) {
            axios
                .get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/product-update-only-quantity/${product.productavailable.id}/`,
                    config
                )
                .then((res) => {
                    // if product available then this will run from below
                    // add to bag process will start from here
                    if (res.data.available_quantity > 0) {
                        if (
                            trialProductsWithQuantityOfSameCategoryInBag.length >
                            1
                        ) {
                            console.log(
                                'you cant add more than 2 product of same category as trial'
                            );
                            setLoading(false);
                            setNeedDisabled(false);
                            setOpenForTwoAlreadyAdded(true);
                        } else {
                            // I use productWithQuantityExistInBag.length !== 0, because [] == true.. if [] then loop will continue
                            if (
                                productWithQuantityExistInBag &&
                                productWithQuantityExistInBag.length !== 0
                            ) {
                                console.log(
                                    'already product add in bag or add as trial'
                                );
                                setLoading(false);
                                setNeedDisabled(false);
                                setOpenForAddAsTrial(true);
                                // here in bag, user can't add more quantity to trial, only one product can trial
                                // when user add this for buy then it can't be add as trial
                            } else {
                                axios
                                    .post(
                                        `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/`,
                                        addToBag,
                                        config
                                    )
                                    .then((res) => {
                                        // console.log('bag nai - pwq', res.data);

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
                                                                1,
                                                        },
                                                        config
                                                    )
                                                    .then((res) => {
                                                        // console.log('updated quantity', res.data)
                                                        // final get will be after all post, patch done
                                                        axios
                                                            .get(
                                                                `${process.env.NEXT_PUBLIC_BASE_URL}/category/${product.category.slug}/`
                                                            )
                                                            .then((res) => {
                                                                changeCategoryProducts(
                                                                    res.data
                                                                        .product
                                                                );
                                                                axios
                                                                    .get(
                                                                        `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                                                        config
                                                                    )
                                                                    .then(
                                                                        (
                                                                            res
                                                                        ) => {
                                                                            setLoading(
                                                                                false
                                                                            );
                                                                            setNeedDisabled(
                                                                                false
                                                                            );
                                                                            setOpenForAdd(
                                                                                true
                                                                            );
                                                                            changeMyBag(
                                                                                res.data
                                                                            );
                                                                            console.log(
                                                                                'bag after updated quantity',
                                                                                res.data
                                                                            );
                                                                            // setTotalBagProduct(res.data.product.length);
                                                                        }
                                                                    )
                                                                    .catch(
                                                                        (err) =>
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
                                                        console.log(
                                                            err.response
                                                        )
                                                    );
                                            })
                                            .catch((err) =>
                                                console.log(err.response)
                                            );
                                    })
                                    .catch((err) => console.log(err.response));
                            }
                        }
                    } else {
                        console.log('product not available');
                        setLoading(false);
                        setNeedDisabled(false);
                        setOpenForNotInStock(true);
                    }
                })
                .catch((err) => console.log(err.response));
        } else {
            console.log(
                'there have no product in myBag, so can not add any product as trail'
            );
            setLoading(false);
            setNeedDisabled(false);
        }
    };

    return (
        <Card className={classes.boot}>
            <Link
                href={`/product/${product && product.slug}`}
                color='inherit'
                underline='none'
            >
                <CardActionArea>
                    <Box className={classes.imgHover} p={2}>
                        <CardMedia
                            className={classes.imgHoverZoom}
                            component='img'
                            alt='Product'
                            height='180'
                            image={product.product_image[0].image}
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
                            <Box textAlign='center'>
                                Tk. {product && product.price}
                            </Box>
                        </Typography>
                    </CardContent>
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
                                <Box textAlign='center' px={3}>
                                    {product.productavailable
                                        .available_quantity === 0
                                        ? 'No Stock'
                                        : 'Add For Trial'}
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
                            Successfully Product Added To Bag As Trial!
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
                            Already Add as Trial Or Add to Bag, Can't Add More!
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

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={openForTwoAlreadyAdded}
                        autoHideDuration={4000}
                        onClose={handleCloseForTwoAlreadyAdded}
                    >
                        <Alert severity='info' variant='filled'>
                            Already Add 2 Similar Product as Trial, Can't Add
                            More!
                        </Alert>
                    </Snackbar>
                </CardActions>
            </Box>
        </Card>
    );
}
