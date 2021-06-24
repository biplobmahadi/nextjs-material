import Head from "next/head";
import ButtonAppBar from "../../components/ButtonAppBar";
import MainFooter from "../../components/MainFooter";
import OrderDetails from "../../components/OrderDetails";
import ReceiverAddress from "../../components/ReceiverAddress";
import OrderedProduct from "../../components/OrderedProduct";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountOptionList from "../../components/AccountOptionList";
import parseCookies from "../../lib/parseCookies";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Hidden from "@material-ui/core/Hidden";
import TrackingStepper from "../../components/TrackingStepper";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: "16px",
    },
});

export default function MyOrderDetails({ order, myBag, user }) {
    const classes = useStyles();
    const router = useRouter();

    const fullOrderId = order.id;
    const splittedArray = fullOrderId.split("-");
    const orderId = splittedArray[0].toUpperCase();

    useEffect(() => {
        if (!Cookies.get("haha_ecom_bangla_token")) {
            router.push("/login");
        }
    }, []);

    const [value, setValue] = React.useState("0");
    let output;
    if (value === "0") {
        output = <OrderDetails order={order && order} />;
    } else if (value === "1") {
        output = <ReceiverAddress order={order && order} />;
    } else {
        output = <OrderedProduct order={order && order} />;
    }

    // console.log(order);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // where is the new value man
    return (
        <div>
            <Head>
                <title>My Order Details</title>
                <link rel="icon" href="/a.ico" />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                ></meta>
            </Head>
            <ButtonAppBar
                totalProductInBag={myBag && myBag.product_with_quantity.length}
            />
            {!order ? (
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
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={9}
                                >
                                    <Box
                                        p={2}
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
                                                <Typography
                                                    variant="h5"
                                                    component="h5"
                                                >
                                                    <strong>
                                                        My Orders Details
                                                    </strong>{" "}
                                                </Typography>
                                            </Grid>

                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                >
                                                    <Box px={1}>
                                                        Order ID: {orderId}
                                                    </Box>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box
                                        p={2}
                                        mt={2}
                                        boxShadow={1}
                                        borderRadius="borderRadius"
                                        style={{ backgroundColor: "white" }}
                                    >
                                        <TrackingStepper
                                            order={order && order}
                                        />
                                    </Box>
                                    <Paper className={classes.root}>
                                        <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            indicatorColor="primary"
                                            textColor="primary"
                                            variant="fullWidth"
                                            centered
                                        >
                                            <Tab
                                                label="Order Details"
                                                value="0"
                                            />
                                            <Tab
                                                label="Receiver Address"
                                                value="1"
                                            />
                                            <Tab
                                                label="Ordered Products"
                                                value="2"
                                            />
                                        </Tabs>
                                    </Paper>
                                    <Box>{output}</Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            )}
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

const fetchDataForOrder = async (params, config) =>
    await axios
        .get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/my-order/${params.orderCode}/`,
            config
        )
        .then((res) => ({
            order: res.data,
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

    const dataOrder = await fetchDataForOrder(params, config);

    let order = dataOrder.order ? dataOrder.order : null;

    const dataUser = await fetchDataForUser(config);
    const user = dataUser.user ? dataUser.user : null;

    return {
        props: { order, myBag, user },
    };
}
