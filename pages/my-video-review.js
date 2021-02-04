import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import ProductCard from '../components/ProductCard';
import MyReviewedProduct from '../components/MyReviewedProduct';
import NotReviewedProduct from '../components/NotReviewedProduct';
import AccountOptionList from '../components/AccountOptionList';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Hidden from '@material-ui/core/Hidden';
import parseCookies from '../lib/parseCookies';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: '16px',
    },
});
export default function MyReview({
    mainProductReviewed,
    allProductReviewed,
    notReviewedProduct,
    myOrderedAllProducts,
    myBag,
    user,
}) {
    const classes = useStyles();
    const router = useRouter();

    useEffect(() => {
        if (!Cookies.get('haha_ecom_bangla_token')) {
            router.push('/login');
        }
    }, []);

    const [value, setValue] = React.useState('0');
    let output;
    if (value === '0') {
        output = (
            <MyReviewedProduct
                mainProductReviewed={mainProductReviewed && mainProductReviewed}
            />
        );
    } else {
        output = (
            <NotReviewedProduct
                notReviewedProduct={notReviewedProduct && notReviewedProduct}
            />
        );
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // console.log('all reviewed', allProductReviewed);
    // console.log('main', mainProductReviewed);

    // console.log('all ordered', myOrderedAllProducts);

    // console.log('not', notReviewedProduct);
    return (
        <div>
            {' '}
            <Head>
                <title>My Video Review</title>
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
                <Box pt={11} px={3}>
                    <Box
                        p={2}
                        boxShadow={1}
                        textAlign='center'
                        borderRadius='borderRadius'
                        style={{ backgroundColor: 'white' }}
                    >
                        <img
                            src='/aa.jpg'
                            alt=''
                            srcset=''
                            height='60'
                            width='60'
                            style={{ borderRadius: '50%' }}
                        />
                        <Typography variant='h5'>
                            <strong>
                                {user &&
                                    user.first_name.toUpperCase() +
                                        ' ' +
                                        user.last_name.toUpperCase()}
                            </strong>
                        </Typography>
                    </Box>
                    <Box mt={3}>
                        <Grid container spacing={3}>
                            <Hidden lgDown>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={3}
                                >
                                    <Box
                                        p={1}
                                        boxShadow={1}
                                        borderRadius='borderRadius'
                                        style={{ backgroundColor: 'white' }}
                                    >
                                        <AccountOptionList />
                                    </Box>
                                </Grid>
                            </Hidden>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={9}>
                                <Box
                                    p={2}
                                    boxShadow={1}
                                    borderRadius='borderRadius'
                                    style={{ backgroundColor: 'white' }}
                                >
                                    <Typography variant='h5'>
                                        <strong>
                                            My Video Reviews & Ratings
                                        </strong>
                                    </Typography>
                                </Box>
                                <Paper className={classes.root}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor='primary'
                                        textColor='primary'
                                        variant='fullWidth'
                                    >
                                        <Tab
                                            label='Video Reviewed Product'
                                            value='0'
                                        />
                                        <Tab
                                            label='Not Video Reviewed Product You Buy'
                                            value='1'
                                        />
                                    </Tabs>
                                </Paper>

                                {output}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <Box mx={3} mt={6}>
                <MainFooter />
            </Box>
        </div>
    );
}

const fetchDataForBag = async (config) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/`, config)
        .then((res) => ({
            bag: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForUser = async (config) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/rest-auth/user/`, config)
        .then((res) => ({
            user: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForReview = async (config) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/video-reviews-read/`, config)
        .then((res) => ({
            reviews: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForMyOrderProducts = async (config) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/my-order/`, config)
        .then((res) => ({
            myOrders: res.data,
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

    const dataBag = await fetchDataForBag(config);

    let myBag = null;
    if (dataBag.bag) {
        let allMyBag = dataBag.bag;
        let myBagNotSendToMyOrder = allMyBag.filter(
            (myBag) => myBag.is_send_to_my_order === false
        );
        // console.log(myBagNotSendToMyOrder[0])
        if (myBagNotSendToMyOrder[0]) {
            myBag = myBagNotSendToMyOrder[0];
            // We got exact bag for user
            // 1st we filter out the bags whose not send to my order
            // then there have many bags for that user because of backend, hacker can do anything!!
            // the 1st created one is selected as myBag
        }
    }

    const dataReview = await fetchDataForReview(config);
    const dataMyOrders = await fetchDataForMyOrderProducts(config);

    let reviews = dataReview.reviews;
    let myOrders = dataMyOrders.myOrders;

    // for reviewed products -> start here

    let allProductReviewed = [];
    let mainProductReviewed = [];

    reviews &&
        reviews.forEach((review) => {
            allProductReviewed.push(review.product);
        });
    // console.log(allProductReviewed);

    mainProductReviewed =
        allProductReviewed.length !== 0
            ? mainProductReviewed.concat(allProductReviewed[0])
            : [];

    allProductReviewed &&
        allProductReviewed.forEach((product) => {
            let mainProductReviewedId = [];
            mainProductReviewed.forEach((product) => {
                mainProductReviewedId = mainProductReviewedId.concat(
                    product.id
                );
            });

            if (!mainProductReviewedId.includes(product.id)) {
                mainProductReviewed = mainProductReviewed.concat(product);
            }
        });

    // console.log(mainProductReviewed);

    // for not reviewed products -> start here

    let myOrderedAllProducts = [];
    myOrders &&
        myOrders.forEach((myOrder) => {
            myOrder.my_bag.product_with_quantity.forEach(
                (product_with_quantity) => {
                    myOrderedAllProducts = myOrderedAllProducts.concat(
                        product_with_quantity.product
                    );
                }
            );
        });

    // console.log('myOrderedAllProducts', myOrderedAllProducts)

    // let allProduct = [];
    // products &&
    //     products.forEach((product) => {
    //         allProduct.push(product);
    //     });
    let notReviewedProduct = [];
    myOrderedAllProducts &&
        myOrderedAllProducts.forEach((product) => {
            let mainProductReviewedId = [];
            let notReviewedProductId = [];
            mainProductReviewed.forEach((product) => {
                mainProductReviewedId = mainProductReviewedId.concat(
                    product.id
                );
            });
            notReviewedProduct.length !== 0 &&
                notReviewedProduct.forEach((product) => {
                    notReviewedProductId = notReviewedProductId.concat(
                        product.id
                    );
                });
            if (
                !mainProductReviewedId.includes(product.id) &&
                !notReviewedProductId.includes(product.id)
            ) {
                notReviewedProduct = notReviewedProduct.concat(product);
            }
        });

    const dataUser = await fetchDataForUser(config);
    const user = dataUser.user ? dataUser.user : null;

    return {
        props: {
            mainProductReviewed,
            allProductReviewed,
            notReviewedProduct,
            myOrderedAllProducts,
            myBag,
            user,
        },
    };
}
