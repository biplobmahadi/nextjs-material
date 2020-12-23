import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import ProductDetails from '../components/ProductDetails';
import Size from '../components/forms/Size';
import Quantity from '../components/forms/Quantity';
import MainFooter from '../components/MainFooter';
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
import parseCookies from '../lib/parseCookies';
import axios from 'axios';
import { useEffect } from 'react';

import ReactImageZoom from 'react-image-zoom';
import { Button } from '@material-ui/core';

let myBagRe;

export default function Product(props) {
    const [value, setValue] = React.useState('/s1.jpg');
    const [quantity, setQuantity] = React.useState(1);
    const [reRender, setReRender] = React.useState(false);

    let { product } = props.dataProduct;
    let { user } = props.dataUser;  
    let config = props.config
    let subCategoryProducts = props.subCategoryProducts

    let myBag = myBagRe ? myBagRe : props.myBag;

    const changeMyBag = (value) => {
        myBagRe = value;
        console.log('my bag now', myBagRe);

        setReRender(!reRender);
    };

    // here useEffect -> when component mount and update myBagRe will undefined
    // because, when we change route then myBagRe again remain previous one which is not 
    // updated one, that's why we make it undefined and bag will server rendered

    useEffect(() => {
        myBagRe = undefined
    });

    
    const handleImageClick = (value) => {
        setValue(value);
    };

    // console.log('here', { props.dataProduct, props.myBag, props.config, props.dataUser });
    console.log('here product', product);
    console.log('here user', user);
    console.log('updated bag', myBag);

    const handleAddToBag = () => {
        let addToBag = {
            product: product.id,
            quantity: quantity,
            cost: product.price * quantity,
        };

        // if bag complete but order not complete then you can't create new bag
        // that's why this filter
        // if (!this.state.orderId){

        let productExitsInBag;
        if (myBag) {
            productExitsInBag = myBag.product.filter(
                (filterProduct) => filterProduct.product.id === product.id
            );
        }
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
                    console.log(res.data);
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
                            console.log(res.data);
                            axios
                                .get(
                                    `http://localhost:8000/my-bag/${res.data.id}/`,
                                    config
                                )
                                .then((res) => {
                                    // new myBag need to add to state
                                    changeMyBag(res.data);
                                    // setTotalBagProduct(res.data.product.length);
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
                    console.log('bag nai - pwq', res.data);
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
                                    .get(
                                        `http://localhost:8000/my-bag/${res.data.id}/`,
                                        config
                                    )
                                    .then((res) => {
                                        // new myBag need to add to state
                                        changeMyBag(res.data);
                                        // setTotalBagProduct(
                                        //     res.data.product.length
                                        // );
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
                                console.log(res.data);
                                axios
                                    .get(
                                        `http://localhost:8000/my-bag/${res.data.id}/`,
                                        config
                                    )
                                    .then((res) => {
                                        // new myBag need to add to state
                                        changeMyBag(res.data);
                                        // setTotalBagProduct(
                                        //     res.data.product.length
                                        // );
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
            <ButtonAppBar totalProductInBag={ myBag && myBag.product.length}/>
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
                                                    8 Ratings & Reviews
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
                                                <Box textAlign='center' px={2}>
                                                    Size Guide
                                                </Box>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box pt={2}>
                                    <Grid
                                        container
                                        spacing={2}
                                        alignItems='center'
                                    >
                                        <Grid item xs={12} sm>
                                            <Quantity />
                                        </Grid>
                                        <Grid item xs={12} sm>
                                            <Chip
                                                label='In Stock'
                                                color='secondary'
                                                size='small'
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box pt={3}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={handleAddToBag}
                                    >
                                        <Box textAlign='center' px={4}>
                                            Add To Bag
                                        </Box>
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                            <Box
                                p={2}
                                mt={2}
                                height='100%'
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <Typography variant='h5' component='h5'>
                                    <strong>You Will Get</strong>
                                </Typography>
                                <Box pt={2}>
                                    <Grid container alignItems='center'>
                                        <RedeemIcon color='secondary' />
                                        <span>
                                            <Box pl={2}>
                                                <Typography>
                                                    {' '}
                                                    1 Ti-Shirt
                                                </Typography>
                                            </Box>
                                        </span>
                                    </Grid>
                                </Box>
                                <Box pt={1}>
                                    <Grid container alignItems='center'>
                                        <RedeemIcon color='secondary' />
                                        <span>
                                            <Box pl={2}>
                                                <Typography>
                                                    {' '}
                                                    1 Galaxy A50
                                                </Typography>
                                            </Box>
                                        </span>
                                    </Grid>
                                </Box>
                                <Box pt={1}>
                                    <Grid container alignItems='center'>
                                        <RedeemIcon color='secondary' />
                                        <span>
                                            <Box pl={2}>
                                                <Typography>
                                                    {' '}
                                                    2 Lottery
                                                </Typography>
                                            </Box>
                                        </span>
                                    </Grid>
                                </Box>
                                <Box py={2}>
                                    <Divider variant='middle' />
                                </Box>
                                <Typography variant='h5' component='h5'>
                                    <strong>Information</strong>
                                </Typography>
                                <Box pt={2}>
                                    <Grid container alignItems='center'>
                                        <InfoIcon color='secondary' />
                                        <span>
                                            <Box pl={2}>
                                                <Typography>
                                                    {' '}
                                                    6 Months Warranty
                                                </Typography>
                                            </Box>
                                        </span>
                                    </Grid>
                                </Box>
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
                        </Grid>
                    </Grid>
                </Box>

                <ProductDetails
                    product={product && product}
                    user={user && user}
                    subCategoryProducts={subCategoryProducts}
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


const fetchDataForSubCategory = async (sub_category_name) =>
await axios
    .get(`http://localhost:8000/sub-categories/${sub_category_name}/`)
    .then((res) => ({
        subCategory: res.data,
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

    const product = dataProduct.product
    const sub_category_name = product.sub_category.sub_category_name
    const dataSubCategory = await fetchDataForSubCategory(sub_category_name);
    const subCategory = dataSubCategory.subCategory;
    const allSubCategoryProducts = subCategory.product;
    let subCategoryProducts = allSubCategoryProducts.filter(subProduct => subProduct.id !== product.id)


    return {
        props: {
            dataProduct,
            myBag,
            config,
            dataUser,
            subCategoryProducts
        },
    };
}
