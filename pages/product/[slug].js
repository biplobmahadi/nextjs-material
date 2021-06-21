import Head from "next/head";
import ButtonAppBar from "../../components/ButtonAppBar";
import ProductDetails from "../../components/ProductDetails";
import ProductDetailsFirstPart from "../../components/ProductDetailsFirstPart";
import Size from "../../components/forms/Size";
import Quantity from "../../components/forms/Quantity";
import MainFooter from "../../components/MainFooter";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import parseCookies from "../../lib/parseCookies";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Product({
    product,
    user,
    config,
    categoryProducts,
    myBag,
}) {
    // set all review and video review as state, when we change any one then full page will re-render
    // then rating, review, video review all will updated
    const [reviewArrayInState, setReviewArrayInState] = useState([]);
    const [videoReviewArrayInState, setVideoReviewArrayInState] = useState([]);

    // ######## VVI code
    // here we filter out same category productWithQuantity which already exist in bag
    // this is for trial product adding
    let allCategoryProductsWithQuantityExistInBag = [];
    if (myBag) {
        if (categoryProducts) {
            categoryProducts.forEach((product) => {
                let oneCategoryProductsWithQuantityExistInBag =
                    myBag.product_with_quantity.filter(
                        (productWithQuantity) =>
                            productWithQuantity.product.id === product.id
                    );
                if (oneCategoryProductsWithQuantityExistInBag.length !== 0) {
                    allCategoryProductsWithQuantityExistInBag.push(
                        oneCategoryProductsWithQuantityExistInBag[0]
                    );
                }
            });
        }
    }
    // when category product added to bag from trial or category section, need to update it
    const [
        categoryProductsWithQuantityExistInBag,
        setCategoryProductsWithQuantityExistInBag,
    ] = useState();

    useEffect(() => {
        // when user 1st navigate this page it will happend, state will assign herer
        // when user navigate same page again with other product then
        // it will happend to change review, video review
        // because same page navigation when happend, state not change by default in nextjs
        // so need to re-assign state for new product
        setReviewArrayInState(product && product.review ? product.review : []);
        setVideoReviewArrayInState(
            product && product.video_review ? product.video_review : []
        );
        setCategoryProductsWithQuantityExistInBag(
            allCategoryProductsWithQuantityExistInBag
        );
    }, [product]);

    // ### Calculate product review rating
    // it will show in productDetailsFirst part, and also review and rating section
    let avgRating = 0;
    let totalRating = 0;

    reviewArrayInState &&
        reviewArrayInState.length !== 0 &&
        reviewArrayInState.forEach((review) => {
            totalRating += review.rating_star;
            let fractionalAvgRating = totalRating / reviewArrayInState.length;
            avgRating = Math.floor(fractionalAvgRating);
        });

    console.log("re render - slug");

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
                        reviewArrayInState={reviewArrayInState}
                        videoReviewArrayInState={videoReviewArrayInState}
                        categoryProductsWithQuantityExistInBag={
                            categoryProductsWithQuantityExistInBag
                        }
                        setCategoryProductsWithQuantityExistInBag={
                            setCategoryProductsWithQuantityExistInBag
                        }
                    />

                    <ProductDetails
                        product={product && product}
                        user={user && user}
                        categoryProducts={categoryProducts}
                        config={config}
                        myBag={myBag}
                        avgRating={avgRating}
                        reviewArrayInState={reviewArrayInState}
                        setReviewArrayInState={setReviewArrayInState}
                        videoReviewArrayInState={videoReviewArrayInState}
                        setVideoReviewArrayInState={setVideoReviewArrayInState}
                        setCategoryProductsWithQuantityExistInBag={
                            setCategoryProductsWithQuantityExistInBag
                        }
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

const fetchDataForBags = async (config) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bags/`, config)
        .then((res) => ({
            bags: res.data,
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
    const dataBags = await fetchDataForBags(config);
    const dataUser = await fetchDataForUser(config);

    const user = dataUser.user ? dataUser.user : null;

    // ###### Here for bag
    // always create bag first if this page has add to bag available
    // it's not good to create bag again again for visiting this page
    // if user already has an non order bag then find that, there have many in worst case, so find the 1st one
    // if user have no non order bag then create one bag for this user
    // if user not logged in then also they can view this page, so here we don't
    // get any bag and user, so myBag will null in this case -> no bug will occur
    let myBag = null;
    if (dataBags.bags && dataBags.bags.length !== 0) {
        let allMyBag = dataBags.bags;
        myBag = allMyBag[0];
    } else if (dataBags.bags && dataBags.bags.length === 0) {
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
