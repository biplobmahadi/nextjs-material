import Head from "next/head";
import ButtonAppBar from "../components/ButtonAppBar";
import BrandCard from "../components/BrandCard";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import MainFooter from "../components/MainFooter";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import axios from "axios";
import parseCookies from "../lib/parseCookies";

export default function Brands({ brands, myBag }) {
    return (
        <div>
            <Head>
                <title>Brands - Logo.com</title>
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
                        py={2}
                        borderRadius="borderRadius"
                        style={{ backgroundColor: "white" }}
                        textAlign="center"
                    >
                        <Typography variant="h5" component="h5">
                            <strong>Our Brands</strong>
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            {brands &&
                                brands.map((brand) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        xl={2}
                                    >
                                        <BrandCard brand={brand} />
                                    </Grid>
                                ))}
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

const fetchDataForBrands = async () =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/brands/`)
        .then((res) => ({
            brands: res.data,
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

    const dataBrands = await fetchDataForBrands();

    const brands = dataBrands.brands ? dataBrands.brands : null;

    return {
        props: { brands, myBag },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every second
        // revalidate: 1, // In seconds
    };
}
