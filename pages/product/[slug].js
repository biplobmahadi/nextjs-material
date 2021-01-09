import Head from 'next/head';
import ButtonAppBar from '../../components/ButtonAppBar';
import ProductDetails from '../../components/ProductDetails';
import Size from '../../components/forms/Size';
import Quantity from '../../components/forms/Quantity';
import MainFooter from '../../components/MainFooter';
import AddForTrialDialog from '../../components/AddForTrialDialog';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PaymentIcon from '@material-ui/icons/Payment';
import RestoreIcon from '@material-ui/icons/Restore';
import InfoIcon from '@material-ui/icons/Info';
import RedeemIcon from '@material-ui/icons/Redeem';
import Zoom from 'react-medium-image-zoom';

import Cookies from 'js-cookie';
import parseCookies from '../../lib/parseCookies';
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

let productRe;
let myBagRe;
let categoryProductsRe;

export default function Product(props) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState('/s1.jpg');
    const [quantity, setQuantity] = React.useState(1);
    // const [reRender, setReRender] = React.useState(false);

    let product = productRe ? productRe : props.product;
    let user = props.user;
    let config = props.config;
    let categoryProducts = categoryProductsRe
        ? categoryProductsRe
        : props.categoryProducts;

    let myBag = myBagRe ? myBagRe : props.myBag;

    // these changeProduct & changeMyBag & changeCategoryProducts will call at adding product in bag and also at a time
    // so use reRender will done one time here
    const changeProduct = (value) => {
        productRe = value;
        console.log('product now', productRe);

        // setReRender(!reRender);
    };

    const changeCategoryProducts = (value) => {
        categoryProductsRe = value;

        // setReRender(!reRender);
    };

    // changeMyBag is the last when get fetch req, so here reRender call
    const changeMyBag = (value) => {
        myBagRe = value;
        console.log('my bag now', myBagRe);
        setLoading(false);

        // set loading state will make the re render process
        // setReRender(!reRender);
    };

    // here useEffect -> when component mount and update myBagRe & productRe & categoryProductsRe will undefined
    // because, when we change route then myBagRe & productRe & categoryProductsRe again remain previous one which is not
    // updated one, that's why we make it undefined and bag & product & categoryProducts will server rendered

    useEffect(() => {
        myBagRe = undefined;
        productRe = undefined;
        categoryProductsRe = undefined;
    });

    const handleImageClick = (value) => {
        setValue(value);
    };

    // ### Calculate product review rating
    let avgRating = 0;
    let totalRating = 0;

    product &&
        product.review &&
        product.review.length !== 0 &&
        product.review.forEach((review) => {
            totalRating += review.rating_star;
            let fractionalAvgRating = totalRating / product.review.length;
            console.log('fractionalAvgRating', fractionalAvgRating);
            avgRating = Math.floor(fractionalAvgRating);
        });
    console.log('totalRating', totalRating);
    console.log('avgRating', avgRating);

    // console.log('here', { props.dataProduct, props.myBag, props.config, props.dataUser });
    console.log('here product', product);
    // console.log('here user', user);
    console.log('here bag', myBag);
    console.log('bag Re', myBagRe);
    console.log('product Re', productRe);

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
                `http://localhost:8000/product-update-only-quantity/${product.productavailable.id}/`,
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
                        } else {
                            axios
                                .patch(
                                    `http://localhost:8000/product-with-quantity/${productWithQuantityExistInBag[0].id}/`,
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
                                                            quantity, // here state quantity used
                                                    },
                                                    config
                                                )
                                                .then((res) => {
                                                    // console.log('updated quantity', res.data)
                                                    // final get will be after all post, patch done
                                                    axios
                                                        .get(
                                                            `http://localhost:8000/products/${product.slug}/`
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
                                                                    `http://localhost:8000/my-bag/${myBag.id}/`,
                                                                    config
                                                                )
                                                                .then((res) => {
                                                                    // new myBag need to add to state
                                                                    changeMyBag(
                                                                        res.data
                                                                    );
                                                                    console.log(
                                                                        'bag after updated quantity',
                                                                        res.data
                                                                    );
                                                                    // setTotalBagProduct(res.data.product.length);
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
                                'http://localhost:8000/product-with-quantity/',
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
                                                            quantity, // here state quantity used
                                                    },
                                                    config
                                                )
                                                .then((res) => {
                                                    // console.log('updated quantity', res.data)
                                                    // final get will be after all post, patch done
                                                    axios
                                                        .get(
                                                            `http://localhost:8000/products/${product.slug}/`
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
                                                                    `http://localhost:8000/my-bag/${myBag.id}/`,
                                                                    config
                                                                )
                                                                .then((res) => {
                                                                    // new myBag need to add to state
                                                                    changeMyBag(
                                                                        res.data
                                                                    );
                                                                    console.log(
                                                                        'bag after updated quantity',
                                                                        res.data
                                                                    );
                                                                    // setTotalBagProduct(res.data.product.length);
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
                                            // console.log(res.data);
                                            axios
                                                .patch(
                                                    `http://localhost:8000/product-update-only-quantity/${product.productavailable.id}/`,
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
                                                            `http://localhost:8000/products/${product.slug}/`
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
                                                                    `http://localhost:8000/my-bag/${myBag.id}/`,
                                                                    config
                                                                )
                                                                .then((res) => {
                                                                    // new myBag need to add to state
                                                                    changeMyBag(
                                                                        res.data
                                                                    );
                                                                    console.log(
                                                                        'bag after updated quantity',
                                                                        res.data
                                                                    );
                                                                    // setTotalBagProduct(res.data.product.length);
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
                }
            })
            .catch((err) => console.log(err.response));
    };

    return (
        <div>
            <Head>
                <title>Product Details - {product && product.name}</title>
                <link rel='icon' href='/a.ico' />

                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar
                totalProductInBag={myBag && myBag.product_with_quantity.length}
            />
            <Box pb={8} style={{ backgroundColor: '#E6E6FA' }}>
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
                                            value={
                                                avgRating !== 0
                                                    ? avgRating
                                                    : null
                                            }
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
                                                        product.review
                                                            .length}{' '}
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
                                        <strong>
                                            Tk. {product && product.price}
                                        </strong>
                                    </Typography>
                                </Box>
                                <Box pt={3}>
                                    {product && product.has_size && (
                                        <Grid
                                            container
                                            spacing={2}
                                            alignItems='center'
                                        >
                                            <Grid item xs={12} sm>
                                                <Size />
                                            </Grid>
                                            <Grid item xs={12} sm>
                                                <Button
                                                    variant='contained'
                                                    color='secondary'
                                                    size='small'
                                                >
                                                    <Box
                                                        textAlign='center'
                                                        px={2}
                                                    >
                                                        Size Guide
                                                    </Box>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Box>
                                <Box pt={2}>
                                    <Grid
                                        container
                                        spacing={2}
                                        alignItems='center'
                                    >
                                        <Grid item xs={12} sm>
                                            <Quantity
                                                setQuantity={setQuantity}
                                            />
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
                                    <Grid
                                        container
                                        spacing={2}
                                        alignItems='center'
                                    >
                                        <Grid item xs={12} sm={6}>
                                            <div className={classes.root}>
                                                <div
                                                    className={classes.wrapper}
                                                >
                                                    <Button
                                                        variant='contained'
                                                        color='primary'
                                                        onClick={handleAddToBag}
                                                        disabled={
                                                            loading ||
                                                            (product &&
                                                                product
                                                                    .productavailable
                                                                    .available_quantity ===
                                                                    0)
                                                        }
                                                    >
                                                        <Box
                                                            textAlign='center'
                                                            px={4}
                                                        >
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
                                                        changeMyBag={
                                                            changeMyBag
                                                        }
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
                                            <strong>You Will Get</strong>
                                        </Typography>
                                    </Box>
                                    {product &&
                                        product.you_will_get.map(
                                            (youWillGet) => (
                                                <Box pt={1}>
                                                    <Grid
                                                        container
                                                        alignItems='center'
                                                    >
                                                        <RedeemIcon color='secondary' />
                                                        <span>
                                                            <Box pl={2}>
                                                                <Typography>
                                                                    {' '}
                                                                    {
                                                                        youWillGet.gift
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        </span>
                                                    </Grid>
                                                </Box>
                                            )
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
                                        product.product_info.map(
                                            (productInfo) => (
                                                <Box pt={1}>
                                                    <Grid
                                                        container
                                                        alignItems='center'
                                                    >
                                                        <InfoIcon color='secondary' />
                                                        <span>
                                                            <Box pl={2}>
                                                                <Typography>
                                                                    {' '}
                                                                    {
                                                                        productInfo.info
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        </span>
                                                    </Grid>
                                                </Box>
                                            )
                                        )}

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

                <ProductDetails
                    product={product && product}
                    changeProduct={changeProduct}
                    user={user && user}
                    categoryProducts={categoryProducts}
                    config={config}
                    myBag={myBag}
                    changeMyBag={changeMyBag}
                    changeCategoryProducts={changeCategoryProducts}
                    avgRating={avgRating}
                />
            </Box>
            <Box mx={3} mt={6}>
                <MainFooter />
            </Box>
        </div>
    );
}

const fetchDataForProduct = async (params) =>
    await axios
        .get(`http://localhost:8000/products/${params.slug}/`)
        .then((res) => ({
            product: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForBag = async (config) =>
    await axios
        .get(`http://localhost:8000/my-bag/`, config)
        .then((res) => ({
            bag: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForUser = async (config) =>
    await axios
        .get('http://localhost:8000/rest-auth/user/', config)
        .then((res) => ({
            user: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForCategory = async (category_slug) =>
    await axios
        .get(`http://localhost:8000/category/${category_slug}/`)
        .then((res) => ({
            category: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

export async function getServerSideProps({ req, params }) {
    const cookies = parseCookies(req);
    const haha_ecom_bangla_token = cookies.haha_ecom_bangla_token
        ? cookies.haha_ecom_bangla_token
        : null;
    // when there have no cookies in browser it will return undefined that is not serializable, thats why set it as null

    const config = {
        headers: {
            Authorization: 'Token ' + haha_ecom_bangla_token,
        },
    };

    const dataProduct = await fetchDataForProduct(params);
    const dataBag = await fetchDataForBag(config);
    const dataUser = await fetchDataForUser(config);

    const user = dataUser.user ? dataUser.user : null;

    let myBag = null;
    if (dataBag.bag) {
        let allMyBag = dataBag.bag;
        let myBagNotSendToMyOrder = allMyBag.filter(
            (myBag) => myBag.is_send_to_my_order === false
        );

        if (myBagNotSendToMyOrder[0]) {
            myBag = myBagNotSendToMyOrder[0];
        }
    }

    const product = dataProduct.product ? dataProduct.product : null;
    const category_slug = product && product.category.slug;
    const dataCategory = await fetchDataForCategory(category_slug);
    const category = dataCategory.category;
    const allCategoryProducts = category && category.product;
    let filteredCategoryProducts =
        allCategoryProducts &&
        allCategoryProducts.filter(
            (categoryProduct) => categoryProduct.id !== product.id
        );

    let categoryProducts = filteredCategoryProducts
        ? filteredCategoryProducts.slice(0, 6)
        : null;

    return {
        props: {
            product,
            myBag,
            config,
            user,
            categoryProducts,
        },
    };
}
