import Head from "next/head";
import ButtonAppBar from "../components/ButtonAppBar";
import ProductWithQuantityInBag from "../components/ProductWithQuantityInBag";
import MainFooter from "../components/MainFooter";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import { useRouter } from "next/router";
import parseCookies from "../lib/parseCookies";
import axios from "axios";
import React from "react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Snackbar from "@material-ui/core/Snackbar";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function Bag(props) {
    const router = useRouter();

    const [myBag, setMyBag] = useState(props.myBag);

    const lengthProductWithQuantity = myBag.product_with_quantity.length;
    // product_with_quantity must be an [], so if product_with_quantity has nothing then it will set 0

    // ##### use for add, remove only.. no need to use it in delete
    const [subTotal, setSubTotal] = useState(0);
    // if we set state directly then when the dependent state change the value of this state not change
    // that's why change it from useEffect hooks

    useEffect(() => {
        setSubTotal(myBag.sub_total);
    }, [myBag]);

    // console.log("in bag", myBag);
    // console.log("subTotal", subTotal);

    const handleCheckout = () => {
        axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/my-orders/`,
                {
                    my_bag: myBag.id,
                },
                config
            )
            .then((res) => {
                // console.log(res.data);
                let orderCode = res.data.order_code;
                axios
                    .patch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                        { is_send_to_my_order: true },
                        config
                    )
                    .then((res) => {
                        // console.log(res.data);
                        router.push(`/receiver/${orderCode}`);
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    return (
        <div>
            <Head>
                <title>My Bag</title>
                <link rel="icon" href="/a.ico" />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                ></meta>
            </Head>
            <ButtonAppBar
                totalProductInBag={myBag.product_with_quantity.length}
            />
            <Box pb={8} style={{ backgroundColor: "#E6E6FA" }}>
                <Box pt={9} px={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={8}>
                            <Box
                                p={2}
                                mt={2}
                                boxShadow={1}
                                borderRadius="borderRadius"
                                style={{ backgroundColor: "white" }}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <Typography variant="h5" component="h5">
                                            <strong>My Bag</strong>{" "}
                                            <Chip
                                                label={`${lengthProductWithQuantity} item`}
                                                color="secondary"
                                                size="small"
                                            />
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Button variant="contained">
                                            <Box px={3}>
                                                Total Tk. {subTotal}
                                            </Box>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            {lengthProductWithQuantity === 0 ? (
                                <Box pt={2}>
                                    <Alert severity="error">
                                        <AlertTitle>Sorry Dear</AlertTitle>
                                        You Have No Product In Your Bag Yet —{" "}
                                        <strong>
                                            Hope You Will Add Product In Your
                                            Bag Soon!
                                        </strong>
                                    </Alert>
                                </Box>
                            ) : (
                                <ProductWithQuantityInBag
                                    myBag={myBag}
                                    setMyBag={setMyBag}
                                    setSubTotal={setSubTotal}
                                    lengthProductWithQuantity={
                                        lengthProductWithQuantity
                                    }
                                />
                            )}
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
                            <Box
                                p={2}
                                mt={2}
                                boxShadow={1}
                                borderRadius="borderRadius"
                                style={{ backgroundColor: "white" }}
                            >
                                <Box textAlign="center">
                                    <Typography variant="h5" component="h5">
                                        <strong>Checkout Please</strong>
                                    </Typography>
                                </Box>
                                <Box py={2}>
                                    <Divider variant="middle" />
                                </Box>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Grid
                                        item
                                        xs={6}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <Box px={5}>
                                            <Typography>Sub Total</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item>
                                        <Box px={5}>
                                            {" "}
                                            <Typography>
                                                {subTotal} TK.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box py={1}>
                                    <Divider variant="middle" />
                                </Box>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Grid
                                        item
                                        xs={6}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <Box px={5}>
                                            <Typography>Shipping</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item>
                                        <Box px={5}>
                                            <Typography>
                                                {subTotal ? 50 : 0} TK.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box py={1}>
                                    <Divider variant="middle" />
                                </Box>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Grid
                                        item
                                        xs={6}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <Box px={5}>
                                            <Typography>Total</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item>
                                        <Box px={5}>
                                            <Typography>
                                                {subTotal ? subTotal + 50 : 0}{" "}
                                                TK.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box py={1}>
                                    <Divider variant="middle" />
                                </Box>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Grid
                                        item
                                        xs={6}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <Box px={5}>
                                            <Typography>
                                                <strong>Total Payable</strong>
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item>
                                        <Box px={5}>
                                            <Typography>
                                                <strong>
                                                    {subTotal
                                                        ? subTotal + 50
                                                        : 0}{" "}
                                                    TK.
                                                </strong>
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box py={1}>
                                    <Divider variant="inset" />
                                </Box>
                                <Box pt={5} textAlign="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            router.push("/checkout/address")
                                        }
                                        disabled={
                                            lengthProductWithQuantity === 0
                                        }
                                    >
                                        <Box textAlign="center" px={4}>
                                            Pay For You
                                        </Box>
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
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

    const dataBags = await fetchDataForBags(config);

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

    return {
        props: {
            myBag,
            config,
        },
    };
}
