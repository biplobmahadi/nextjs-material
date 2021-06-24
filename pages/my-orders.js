import Link from "next/link";
import Head from "next/head";
import ButtonAppBar from "../components/ButtonAppBar";
import Card from "../components/Card";
import OrderCard from "../components/OrderCard";
import Footer from "../components/Footer";
import MainFooter from "../components/MainFooter";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AccountOptionList from "../components/AccountOptionList";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import parseCookies from "../lib/parseCookies";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.only("xs")]: {
            textAlign: "center",
        },
    },
}));

export default function MyOrders({ orders, myBag, user }) {
    const classes = useStyles();
    const router = useRouter();

    useEffect(() => {
        if (!Cookies.get("haha_ecom_bangla_token")) {
            router.push("/login");
        }
    }, []);

    // console.log(orders);
    return (
        <div>
            <Head>
                <title>My Orders</title>
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
                    <Box
                        p={2}
                        boxShadow={1}
                        textAlign="center"
                        borderRadius="borderRadius"
                        style={{ backgroundColor: "white" }}
                    >
                        <img
                            src="/aa.jpg"
                            alt=""
                            srcset=""
                            height="60"
                            width="60"
                            style={{ borderRadius: "50%" }}
                        />
                        <Typography variant="h5">
                            <strong>
                                {user &&
                                    user.first_name.toUpperCase() +
                                        " " +
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
                                        borderRadius="borderRadius"
                                        style={{ backgroundColor: "white" }}
                                    >
                                        <AccountOptionList />
                                    </Box>
                                </Grid>
                            </Hidden>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={9}>
                                <Box
                                    p={2}
                                    boxShadow={1}
                                    borderRadius="borderRadius"
                                    style={{ backgroundColor: "white" }}
                                    className={classes.root}
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
                                            <Typography
                                                variant="h5"
                                                component="h5"
                                            >
                                                <strong>My Orders</strong>{" "}
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                size="small"
                                            >
                                                <Box px={3}>
                                                    Total:{" "}
                                                    {orders && orders.length}
                                                </Box>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box mt={2}>
                                    {orders && orders.length !== 0 ? (
                                        <Grid container spacing={3}>
                                            {orders.map((myOrder) => (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    md={6}
                                                    lg={4}
                                                    xl={4}
                                                >
                                                    <OrderCard
                                                        myOrder={myOrder}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    ) : (
                                        <Alert severity="error">
                                            <AlertTitle>Sorry Dear</AlertTitle>
                                            You Have No Order Right Now —{" "}
                                            <strong>
                                                Hope You Will Make Order Very
                                                Soon!
                                            </strong>
                                        </Alert>
                                    )}
                                </Box>
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

const fetchDataForBags = async (config) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bags/`, config)
        .then((res) => ({
            bags: res.data,
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

const fetchDataForOrder = async (config) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/my-orders/`, config)
        .then((res) => ({
            orders: res.data,
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
    // no need to create bag, if not available then null will be passed
    let myBag = null;
    if (dataBags.bags && dataBags.bags.length !== 0) {
        let allMyBag = dataBags.bags;
        myBag = allMyBag[0];
    }

    const dataOrder = await fetchDataForOrder(config);

    const orders = dataOrder.orders ? dataOrder.orders : null;

    const dataUser = await fetchDataForUser(config);
    const user = dataUser.user ? dataUser.user : null;

    return {
        props: { orders, myBag, user },
    };
}
