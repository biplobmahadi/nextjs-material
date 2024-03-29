import Link from "../src/Link";
import Head from "next/head";
import ButtonAppBar from "../components/ButtonAppBar";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import MainFooter from "../components/MainFooter";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AccountOptionList from "../components/AccountOptionList";

import Divider from "@material-ui/core/Divider";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";

const config = {
    headers: {
        Authorization: "Token " + Cookies.get("haha_ecom_bangla_token"),
    },
};

export default function OrderCard({ myOrder }) {
    const [orderStatus, setOrderStatus] = useState(myOrder.order_status);

    const fullOrderId = myOrder.id;
    const splittedArray = fullOrderId.split("-");
    const orderId = splittedArray[0].toUpperCase();

    const cancelOrder = () => {
        setOrderStatus("cancelled");
        axios
            .patch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/my-order/${fullOrderId}/`,
                {
                    order_status: "cancelled",
                },
                config
            )
            .then((res) => console.log("order cancelled"))
            .catch((err) => console.log(err));
    };

    return (
        <Box
            p={2}
            boxShadow={1}
            borderRadius="borderRadius"
            style={{
                backgroundColor: "white",
            }}
        >
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box>
                        <Typography>Order ID</Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box>
                        {" "}
                        <Typography>{orderId}</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box py={1}>
                <Divider />
            </Box>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box>
                        <Typography>Date</Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box>
                        {" "}
                        <Typography>{myOrder.created_at}</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box py={1}>
                <Divider />
            </Box>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box>
                        <Typography>No. of Product</Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box>
                        <Typography>
                            {myOrder.my_bag.product_with_quantity.length}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box py={1}>
                <Divider />
            </Box>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box>
                        <Typography>Status</Typography>
                    </Box>
                </Grid>

                <Grid item>
                    {orderStatus === "cancelled" ? (
                        <Box>
                            <Chip
                                label={`Cancelled`}
                                color="default"
                                size="small"
                            />
                        </Box>
                    ) : (
                        <Box>
                            {myOrder.is_processing ? (
                                myOrder.is_processing && myOrder.is_placed ? (
                                    myOrder.is_processing &&
                                    myOrder.is_placed &&
                                    myOrder.is_on_road ? (
                                        myOrder.is_processing &&
                                        myOrder.is_placed &&
                                        myOrder.is_on_road &&
                                        myOrder.is_completed ? (
                                            <Chip
                                                label={`Completed`}
                                                color="primary"
                                                size="small"
                                            />
                                        ) : (
                                            <Chip
                                                label={`In Road`}
                                                color="primary"
                                                size="small"
                                            />
                                        )
                                    ) : (
                                        <Chip
                                            label={`Is Placed`}
                                            color="primary"
                                            size="small"
                                        />
                                    )
                                ) : (
                                    <Chip
                                        label={`Is Processing`}
                                        color="primary"
                                        size="small"
                                    />
                                )
                            ) : (
                                <Chip
                                    label={`On Obsevation`}
                                    color="primary"
                                    size="small"
                                />
                            )}
                        </Box>
                    )}
                </Grid>
            </Grid>
            <Box py={1}>
                <Divider />
            </Box>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box>
                        <Typography>Order</Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box>
                        {myOrder.order_status === "confirmed" ? (
                            <Chip
                                label={`Confirmed`}
                                color="primary"
                                size="small"
                            />
                        ) : (
                            <Button
                                color="secondary"
                                variant="contained"
                                size="small"
                                onClick={cancelOrder}
                                disabled={orderStatus === "cancelled"}
                            >
                                {orderStatus === "cancelled"
                                    ? "Cancelled"
                                    : "Cancel Order"}
                            </Button>
                        )}
                    </Box>
                </Grid>
            </Grid>
            <Box py={1}>
                <Divider />
            </Box>
            <Box pt={2} textAlign="center">
                <Link href={`/my-order-details/${fullOrderId}`}>
                    <Button variant="contained" size="small" color="primary">
                        <Box px={3}>See Details</Box>
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}
