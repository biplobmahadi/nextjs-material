import Head from "next/head";
import ButtonAppBar from "../../components/ButtonAppBar";
import ProductDetails from "../../components/ProductDetails";
import ProductDetailsFirstPart from "../../components/ProductDetailsFirstPart";
import Size from "../../components/forms/Size";
import Quantity from "../../components/forms/Quantity";
import MainFooter from "../../components/MainFooter";
import AddForTrialDialog from "../../components/AddForTrialDialog";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Snackbar from "@material-ui/core/Snackbar";

import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import PaymentIcon from "@material-ui/icons/Payment";
import RestoreIcon from "@material-ui/icons/Restore";
import InfoIcon from "@material-ui/icons/Info";
import RedeemIcon from "@material-ui/icons/Redeem";
import Zoom from "react-medium-image-zoom";

import Cookies from "js-cookie";
import parseCookies from "../../lib/parseCookies";
import axios from "axios";
import { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

export default function Product(props) {
    let product = props.product;
    let user = props.user;
    let config = props.config;
    let categoryProducts = props.categoryProducts;

    console.log("first product", product);

    let myBag = props.myBag;

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

    // console.log('here product', product);
    console.log("re render happened");
    // console.log('here bag', myBag);
    // console.log('bag Re', myBagRe);
    // console.log('product Re', productRe);

    return (
        <div>
            <Head>
                <title>Product - {product ? product.name : "Not Valid"}</title>
                <link rel="icon" href="/a.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                ></meta>
            </Head>
            <ButtonAppBar
                totalProductInBag={myBag && myBag.product_with_quantity.length}
            />
            {!product ? (
                <Box
                    textAlign="center"
                    pt={18}
                    pb={12}
                    style={{ backgroundColor: "#E6E6FA" }}
                >
                    <Typography variant="h4" color="secondary">
                        <strong>Sorry - There have nothing !</strong>
                    </Typography>
                </Box>
            ) : (
                <Box pb={8} style={{ backgroundColor: "#E6E6FA" }}>
                    <ProductDetailsFirstPart
                        product={product && product}
                        config={config}
                        myBag={myBag}
                        avgRating={avgRating}
                        categoryProducts={categoryProducts}
                    />

                    <ProductDetails
                        product={product && product}
                        user={user && user}
                        categoryProducts={categoryProducts}
                        config={config}
                        myBag={myBag}
                        avgRating={avgRating}
                    />
                </Box>
            )}
            <Box mx={3} mt={6}>
                <MainFooter />
            </Box>
        </div>
    );
}

const fetchDataForProduct = async (params) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/product/${params.slug}/`)
        .then((res) => ({
            product: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForBag = async (config) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bags/`, config)
        .then((res) => ({
            bag: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForBagCreate = async (config) =>
    await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bags/`, {}, config)
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

const fetchDataForCategory = async (category_slug) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/category/${category_slug}/`)
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
            Authorization: "Token " + haha_ecom_bangla_token,
        },
    };

    const dataProduct = await fetchDataForProduct(params);
    const dataBag = await fetchDataForBag(config);
    const dataUser = await fetchDataForUser(config);

    const user = dataUser.user ? dataUser.user : null;

    // ###### only here
    // always create bag first if this page has add to bag avaiable
    // it's not good to create bag again again for visiting this page
    // if user already has an non order bag then find that, there have many in worst case, so find the 1st one
    // if user have no non order bag then create one bag for this user
    // if user not logged in then also they can view this page, so here we don't
    // get any bag and user, so myBag will null in this case -> no bug will occur
    let myBag = null;
    if (dataBag.bag && dataBag.bag.length !== 0) {
        let allMyBag = dataBag.bag;
        myBag = allMyBag[0];
    } else if (dataBag.bag && dataBag.bag.length === 0) {
        const dataBagCreate = await fetchDataForBagCreate(config);
        myBag = dataBagCreate.bag;
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
