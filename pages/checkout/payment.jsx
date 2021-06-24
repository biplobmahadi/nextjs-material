import Head from "next/head";
import ButtonAppBar from "../../components/ButtonAppBar";
import Payment from "../../components/forms/Payment";
import Box from "@material-ui/core/Box";

import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import parseCookies from "../../lib/parseCookies";
import { useRouter } from "next/router";
import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function PaymentOrder({ myBag }) {
    const router = useRouter();
    const myBagId = myBag.id;

    useEffect(() => {
        if (!Cookies.get("haha_ecom_bangla_token")) {
            router.push("/login");
        }
    });

    return (
        <div>
            {" "}
            <Head>
                <title>Payment Details</title>
                <link rel="icon" href="/a.ico" />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                ></meta>
            </Head>
            <ButtonAppBar totalProductInBag={6666} />
            <Box mt={14} mb={10}>
                <Payment myBagId={myBagId} />
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

    return {
        props: {
            myBag,
        },
    };
}
