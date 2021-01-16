import Head from 'next/head';
import ButtonAppBar from '../../components/ButtonAppBar';
import ProductDetails from '../../components/ProductDetails';
import ProductDetailsFirstPart from '../../components/ProductDetailsFirstPart';
import Size from '../../components/forms/Size';
import Quantity from '../../components/forms/Quantity';
import MainFooter from '../../components/MainFooter';
import AddForTrialDialog from '../../components/AddForTrialDialog';
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

import Cookies from 'js-cookie';
import parseCookies from '../../lib/parseCookies';
import axios from 'axios';
import { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

let productRe;
let myBagRe;
let categoryProductsRe;

export default function Product(props) {
    const [reRender, setReRender] = React.useState(false);

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
        // here I got all the product because product card will use in everywhere
        // so need to filter
        let allCategoryProducts = value;
        let filteredCategoryProducts = allCategoryProducts.filter(
            (categoryProduct) => categoryProduct.id !== product.id
        );
        categoryProductsRe = filteredCategoryProducts.slice(0, 6);

        // setReRender(!reRender);
    };

    // changeMyBag is the last when get fetch req, so here reRender call
    const changeMyBag = (value) => {
        myBagRe = value;
        console.log('my bag now', myBagRe);

        setReRender(!reRender);
    };

    // here useEffect -> when component mount and update myBagRe & productRe & categoryProductsRe will undefined
    // because, when we change route then myBagRe & productRe & categoryProductsRe again remain previous one which is not
    // updated one, that's why we make it undefined and bag & product & categoryProducts will server rendered

    useEffect(() => {
        myBagRe = undefined;
        productRe = undefined;
        categoryProductsRe = undefined;
    });

    // ### Calculate product review rating
    let avgRating = 0;
    let totalRating = 0;

    product &&
        product.review &&
        product.review.length !== 0 &&
        product.review.forEach((review) => {
            totalRating += review.rating_star;
            let fractionalAvgRating = totalRating / product.review.length;
            avgRating = Math.floor(fractionalAvgRating);
        });

    console.log('here product', product);
    console.log('re render happend');
    console.log('here bag', myBag);
    console.log('bag Re', myBagRe);
    console.log('product Re', productRe);

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
                <ProductDetailsFirstPart
                    product={product && product}
                    changeProduct={changeProduct}
                    config={config}
                    myBag={myBag}
                    changeMyBag={changeMyBag}
                    avgRating={avgRating}
                    categoryProducts={categoryProducts}
                    changeCategoryProducts={changeCategoryProducts}
                />

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
