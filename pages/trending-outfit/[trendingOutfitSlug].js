import Head from "next/head";
import ButtonAppBar from "../../components/ButtonAppBar";
import BrandCard from "../../components/BrandCard";
import Card from "../../components/Card";
import AllProductsForTrendingOutfit from "../../components/AllProductsForTrendingOutfit";
import ProductCard from "../../components/ProductCard";
import MainFooter from "../../components/MainFooter";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import axios from "axios";
import parseCookies from "../../lib/parseCookies";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Trending({ trendingOutfit, myBag, config }) {
    let products =
        trendingOutfit.product.length !== 0 ? trendingOutfit.product : [];

    // useEffect(() => {
    // });

    // console.log('my bag 1st ', myBag);
    // console.log('my bag Re ', myBagRe);

    return (
        <div>
            <Head>
                <title>Trending Outfit - Logo.com</title>
                <link rel="icon" href="/a.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                ></meta>
            </Head>
            <ButtonAppBar
                totalProductInBag={myBag && myBag.product_with_quantity.length}
            />
            {!trendingOutfit ? (
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
                        <Box mb={2} borderRadius="borderRadius">
                            <img
                                src="/aa.jpg"
                                alt="trending outfit"
                                srcset=""
                                height="250"
                                width="100%"
                            />
                        </Box>
                        <Box
                            py={2}
                            borderRadius="borderRadius"
                            style={{ backgroundColor: "white" }}
                            textAlign="center"
                        >
                            <Typography variant="h5" component="h5">
                                <strong>
                                    {trendingOutfit.trend_outfit_name}
                                </strong>
                            </Typography>
                        </Box>
                        <Box mt={2}>
                            <AllProductsForTrendingOutfit
                                products={products}
                                myBag={myBag}
                                config={config}
                            />
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

const fetchDataForBagCreate = async (config) =>
    await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bags/`, {}, config)
        .then((res) => ({
            bag: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForTrendingOutfit = async (params) =>
    await axios
        .get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/trending-outfit/${params.trendingOutfitSlug}/`
        )
        .then((res) => ({
            trendingOutfit: res.data,
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

    const dataTrendingOutfit = await fetchDataForTrendingOutfit(params);
    const trendingOutfit = dataTrendingOutfit.trendingOutfit
        ? dataTrendingOutfit.trendingOutfit
        : null;

    return {
        props: {
            trendingOutfit,
            myBag,
            config,
        },
    };
}
