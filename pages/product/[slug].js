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

import Chip from '@material-ui/core/Chip';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PaymentIcon from '@material-ui/icons/Payment';
import RestoreIcon from '@material-ui/icons/Restore';
import InfoIcon from '@material-ui/icons/Info';
import RedeemIcon from '@material-ui/icons/Redeem';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import ReactImageMagnify from 'react-image-magnify';
import Zoom from 'react-medium-image-zoom';

import Cookies from 'js-cookie';
import parseCookies from '../../lib/parseCookies';
import axios from 'axios';
import { useEffect } from 'react';

import ReactImageZoom from 'react-image-zoom';
import { Button } from '@material-ui/core';

let productRe;
let myBagRe;

export default function Product(props) {
    const [value, setValue] = React.useState('/s1.jpg');
    const [quantity, setQuantity] = React.useState(1);
    const [reRender, setReRender] = React.useState(false);

    let product = productRe ? productRe : props.dataProduct.product;
    let { user } = props.dataUser;
    let config = props.config;
    let categoryProducts = props.categoryProducts;

    let myBag = myBagRe ? myBagRe : props.myBag;

    // these changeProduct & changeMyBag will call at adding product in bag and also at a time
    // so use reRender will done one time here
    // changeProduct is the last, so here reRender call
    const changeProduct = (value) => {
        productRe = value;
        console.log('product now', productRe);

        // setReRender(!reRender);
    };

    const changeMyBag = (value) => {
        myBagRe = value;
        console.log('my bag now', myBagRe);

        setReRender(!reRender);
    };

    // here useEffect -> when component mount and update myBagRe & productRe will undefined
    // because, when we change route then myBagRe & productRe again remain previous one which is not
    // updated one, that's why we make it undefined and bag & product will server rendered

    useEffect(() => {
        myBagRe = undefined;
        productRe = undefined;
    });

    const handleImageClick = (value) => {
        setValue(value);
    };

    // console.log('here', { props.dataProduct, props.myBag, props.config, props.dataUser });
    console.log('here product', product);
    // console.log('here user', user);
    console.log('here bag', myBag);
    console.log('bag Re', myBagRe);
    console.log('product Re', productRe);

    // productExitsInBag made here, because if not exist then trial add not shown
    let productExitsInBag;
    if (myBag) {
        productExitsInBag = myBag.product.filter(
            (filterProduct) => filterProduct.product.id === product.id
        );
    }

    const handleAddToBag = () => {
        let addToBag = {
            product: product.id,
            quantity: quantity,
            cost: product.price * quantity,
        };

        console.log('productExitsInBag', productExitsInBag);
        // I use productExitsInBag.length !== 0, because [] == true.. if [] then loop will continue
        if (productExitsInBag && productExitsInBag.length !== 0) {
            axios
                .patch(
                    `http://localhost:8000/product-with-quantity/${productExitsInBag[0].id}/`,
                    {
                        quantity: productExitsInBag[0].quantity + 1,
                        cost: productExitsInBag[0].cost + product.price,
                    },
                    config
                )
                .then((res) => {
                    // console.log(res.data);
                    let pk = [];
                    myBag.product.map(
                        (product) => (pk = pk.concat(product.id))
                    );
                    console.log(pk);
                    axios
                        .patch(
                            `http://localhost:8000/my-bag/${myBag.id}/`,
                            {
                                product: pk,
                                sub_total: myBag.sub_total + product.price,
                            },
                            config
                        )
                        .then((res) => {
                            axios
                                .patch(
                                    `http://localhost:8000/product-update-only-quantity/${product.productavailable.id}/`,
                                    {
                                        available_quantity:
                                            product.productavailable
                                                .available_quantity - quantity,
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
                                            changeProduct(res.data);
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
                                                    changeMyBag(res.data);
                                                    console.log(
                                                        'bag after updated quantity',
                                                        res.data
                                                    );
                                                    // setTotalBagProduct(res.data.product.length);
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
                        })
                        .catch((err) => console.log(err.response));
                })
                .catch((err) => console.log(err.response));
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
                        myBag.product.map(
                            (product) => (pk = pk.concat(product.id))
                        );
                        console.log('bag e onno product ase - pk', pk);
                        axios
                            .patch(
                                `http://localhost:8000/my-bag/${myBag.id}/`,
                                {
                                    product: pk.concat(res.data.id),
                                    sub_total: myBag.sub_total + res.data.cost,
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
                                                product.productavailable
                                                    .available_quantity -
                                                quantity,
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
                                                changeProduct(res.data);
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
                                                        changeMyBag(res.data);
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
                                                console.log(err.response)
                                            );
                                    })
                                    .catch((err) => console.log(err.response));
                            })
                            .catch((err) => console.log(err.response));
                    } else {
                        axios
                            .post(
                                'http://localhost:8000/my-bag/',
                                {
                                    product: [res.data.id],
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
                                                product.productavailable
                                                    .available_quantity -
                                                quantity,
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
                                                changeProduct(res.data);
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
                                                        changeMyBag(res.data);
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
                                                console.log(err.response)
                                            );
                                    })
                                    .catch((err) => console.log(err.response));
                            })
                            .catch((err) => console.log(err.response));
                    }
                })
                .catch((err) => console.log(err.response));
        }
    };

    return (
        <div>
            <Head>
                <title>Product Details - {product && product.name}</title>
                <link rel='icon' href='/a.ico' />
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar totalProductInBag={myBag && myBag.product.length} />
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
                                        <StarIcon color='secondary' />
                                        <StarIcon color='secondary' />
                                        <StarIcon color='secondary' />
                                        <StarIcon color='secondary' />
                                        <StarIcon color='secondary' />
                                        <span>
                                            <Box pl={1}>
                                                <Typography> |</Typography>
                                            </Box>
                                        </span>
                                        <span>
                                            <Box pl={1}>
                                                <Typography>
                                                    {' '}
                                                    {product.review.length}{' '}
                                                    Rating & Review
                                                </Typography>
                                            </Box>
                                        </span>
                                    </Grid>
                                </Box>
                                <Box py={3}>
                                    {/* <Typography>
                                        <strong>Product Code:</strong>{' '}
                                        {product && product.code}
                                    </Typography> */}

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
                                    {product.has_size && (
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
                                            <Chip
                                                label={
                                                    product.productavailable
                                                        .available_quantity !==
                                                    0
                                                        ? 'In Stock'
                                                        : 'Not In Stock'
                                                }
                                                color='secondary'
                                                size='small'
                                            />
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
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                onClick={handleAddToBag}
                                                disabled={
                                                    product.productavailable
                                                        .available_quantity ===
                                                    0
                                                }
                                            >
                                                <Box textAlign='center' px={4}>
                                                    Add To Bag
                                                </Box>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            {product.has_trial &&
                                                productExitsInBag &&
                                                productExitsInBag.length !==
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
                                                        changeProduct={
                                                            changeProduct
                                                        }
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
                />
            </Box>
            <Box mx={3} mt={6}>
                <MainFooter />
            </Box>
        </div>
    );
}

// const fetchDataForPaths = async () =>
//     await axios
//         .get('http://localhost:8000/products/')
//         .then((res) => ({
//             products: res.data,
//         }))
//         .catch((err) => ({
//             error: err.response.data,
//         }));
// const fetchDataForProps = async (params) =>
//     await axios
//         .get(`http://localhost:8000/products/${params.slug}/`)
//         .then((res) => ({
//             products: res.data,
//         }))
//         .catch((err) => ({
//             error: err.response.data,
//         }));
// res data products must be same name for paths and props

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

// export async function getStaticPaths() {
//     const data = await fetchDataForPaths();

//     const paths = data.products.map((product) => ({
//         params: { slug: product.slug },
//     }));

//     return { paths, fallback: true };
// }

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

    let myBag = null;
    if (dataBag.bag) {
        let allMyBag = dataBag.bag;
        let myBagNotSendToMyOrder = allMyBag.filter(
            (myBag) => myBag.is_send_to_my_order === false
        );
        // console.log(myBagNotSendToMyOrder[0])
        if (myBagNotSendToMyOrder[0]) {
            myBag = myBagNotSendToMyOrder[0];
        }
    }

    const product = dataProduct.product;
    const category_slug = product.category.slug;
    const dataCategory = await fetchDataForCategory(category_slug);
    const category = dataCategory.category;
    const allCategoryProducts = category.product;
    let filteredCategoryProducts = allCategoryProducts.filter(
        (categoryProduct) => categoryProduct.id !== product.id
    );

    let categoryProducts = filteredCategoryProducts.slice(0, 6);

    return {
        props: {
            dataProduct,
            myBag,
            config,
            dataUser,
            categoryProducts,
        },
    };
}
