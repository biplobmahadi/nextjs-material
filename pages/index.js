import React from "react";
import Container from "@material-ui/core/Container";
import Head from "next/head";
import ButtonAppBar from "../components/ButtonAppBar";
import Carousel from "../components/Carousel";
import Card from "../components/Card";
import MensShirt from "../components/MensShirt";
import WomensPant from "../components/WomensPant";
import MainFooter from "../components/MainFooter";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import parseCookies from "../lib/parseCookies";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "../src/Link";

export default function Index({
    config,
    trending,
    myBag,
    mensShirtProducts,
    womensPantProducts,
}) {
    useEffect(() => {
        console.log("mounted");
    });

    return (
        <div>
            <Head>
                <title>
                    Logo - Experience Best (Only one premium e-commerce in
                    Bangladesh)
                </title>
                <link rel="icon" href="/a.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                ></meta>
            </Head>
            <ButtonAppBar
                totalProductInBag={myBag && myBag.product_with_quantity.length}
            />
            <Box pb={8} style={{ backgroundColor: "#E6E6FA" }}>
                <Box pt={11} px={3}>
                    <Carousel />
                </Box>

                <Box mx={3} mt={8}>
                    <Box
                        p={2}
                        borderRadius="borderRadius"
                        style={{ backgroundColor: "white" }}
                    >
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <Typography variant="h5" component="h5">
                                    <strong>Trending Now</strong>
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Link href="/trending-season/winter">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="secondary"
                                    >
                                        <Box px={3}>See All</Box>
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            {trending &&
                                trending.trending_outfit &&
                                trending.trending_outfit
                                    .slice(0, 6)
                                    .map((trending_outfit) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            xl={2}
                                        >
                                            <Card
                                                trending_outfit={
                                                    trending_outfit
                                                }
                                            />
                                        </Grid>
                                    ))}
                        </Grid>
                    </Box>
                    {!trending && (
                        <Box mt={2}>
                            <Alert severity="error">
                                <AlertTitle>Sorry Dear</AlertTitle>
                                We Have No Trending Outfit Now —{" "}
                                <strong>Hope It Will Come Soon!</strong>
                            </Alert>
                        </Box>
                    )}
                </Box>

                <MensShirt
                    myBag={myBag}
                    mensShirtProducts={mensShirtProducts}
                    config={config}
                />

                <WomensPant
                    myBag={myBag}
                    womensPantProducts={womensPantProducts}
                    config={config}
                />
            </Box>
            <Box mx={3} mt={6}>
                <MainFooter />
            </Box>
        </div>
    );
}

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

const fetchDataForMensShirt = async () =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/category/mens-shirt/`)
        .then((res) => ({
            mensShirt: res.data,
        }))
        .catch((err) => ({
            error: err.response,
        }));

const fetchDataForWomensPant = async () =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/category/womens-pant/`)
        .then((res) => ({
            womensPant: res.data,
        }))
        .catch((err) => ({
            error: err.response,
        }));

const fetchDataForTrending = async (params) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/trending/winter/`)
        .then((res) => ({
            trending: res.data,
        }))
        .catch((err) => ({
            error: err.response,
        }));

export async function getServerSideProps({ req, params }) {
    const cookies = parseCookies(req);
    const haha_ecom_bangla_token = cookies.haha_ecom_bangla_token
        ? cookies.haha_ecom_bangla_token
        : null;
    // when there have no cookies in browser it will return undefined that is not serializable, thats why set it as null
    // very import comment

    const config = {
        headers: {
            Authorization: "Token " + haha_ecom_bangla_token,
        },
    };

    const dataBags = await fetchDataForBags(config);

    // ###### Here for bag
    // always create bag first if this page has add to bag avaiable
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

    const dataMensShirt = await fetchDataForMensShirt();
    let mensShirt = dataMensShirt.mensShirt;
    let mensShirtProducts = mensShirt ? mensShirt.product.slice(0, 6) : null;

    const dataWomensPant = await fetchDataForWomensPant();
    let womensPant = dataWomensPant.womensPant;
    let womensPantProducts = womensPant ? womensPant.product.slice(0, 6) : null;

    const dataTrending = await fetchDataForTrending(params);
    const trending = dataTrending.trending ? dataTrending.trending : null;

    return {
        props: {
            mensShirtProducts,
            womensPantProducts,
            myBag,
            config,
            trending,
        },
    };
}
