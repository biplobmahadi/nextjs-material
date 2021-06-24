import Head from "next/head";
import ButtonAppBar from "../../components/ButtonAppBar";
import Receiver from "../../components/forms/Receiver";
import Box from "@material-ui/core/Box";

import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import parseCookies from "../../lib/parseCookies";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Address() {
    const router = useRouter();

    useEffect(() => {
        if (!Cookies.get("haha_ecom_bangla_token")) {
            router.push("/login");
        }
    });

    return (
        <div>
            <Head>
                <title>Receiver Details</title>
                <link rel="icon" href="/a.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                ></meta>
            </Head>
            <ButtonAppBar totalProductInBag={1111} />
            <Box mt={14} mb={10}>
                <Receiver />
            </Box>
        </div>
    );
}
