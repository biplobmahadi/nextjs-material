import React from 'react';
import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import MensShirt from '../components/MensShirt';
import WomensPant from '../components/WomensPant';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import FormikFormDemo from '../components/FormikFormDemo';
import Receiver from '../components/forms/Receiver';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import parseCookies from '../lib/parseCookies';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

let myBagRe;
let mensShirtProductsRe;
let womensPantProductsRe;

export default function Index(props) {
    const router = useRouter();
    const [reRender, setReRender] = React.useState(false);

    const { config, trending } = props;

    let myBag = myBagRe ? myBagRe : props.myBag;
    let mensShirtProducts = mensShirtProductsRe
        ? mensShirtProductsRe
        : props.mensShirtProducts;

    let womensPantProducts = womensPantProductsRe
        ? womensPantProductsRe
        : props.womensPantProducts;

    const changeMensShirtProducts = (value) => {
        mensShirtProductsRe = value.slice(0, 6);

        // setReRender(!reRender);
    };
    const changeWomensPantProducts = (value) => {
        womensPantProductsRe = value.slice(0, 6);

        // setReRender(!reRender);
    };

    const changeMyBag = (value) => {
        myBagRe = value;
        console.log('my bag now', myBagRe);

        setReRender(!reRender);
    };

    // here useEffect -> when component mount and update myBagRe, mensShirtProductsRe will undefined
    // because, when we change route then myBagRe, mensShirtProductsRe again remain previous one which is not
    // updated one, that's why we make it undefined and bag, mensShirtProducts will server rendered

    useEffect(() => {
        myBagRe = undefined;
        mensShirtProductsRe = undefined;
        womensPantProductsRe = undefined;
    });

    // console.log('top product', topShirtProducts);
    // console.log('bottom product', bottomPantProducts);
    console.log('my bag 1st ', myBag);
    console.log('my bag Re ', myBagRe);
    return (
        <div>
            <Head>
                <title>
                    Logo - Experience Best (Only one premium e-commerce in
                    Bangladesh)
                </title>
                <link rel='icon' href='/a.ico' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar
                totalProductInBag={myBag && myBag.product_with_quantity.length}
            />
            <Box pb={8} style={{ backgroundColor: '#E6E6FA' }}>
                <Box pt={11} px={3}>
                    <Carousel />
                </Box>

                <Box mx={3} mt={8}>
                    <Box
                        p={2}
                        borderRadius='borderRadius'
                        style={{ backgroundColor: 'white' }}
                    >
                        <Grid
                            container
                            direction='row'
                            justify='space-between'
                            alignItems='center'
                        >
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <Typography variant='h5' component='h5'>
                                    <strong>Trending Now</strong>
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Button
                                    variant='contained'
                                    size='small'
                                    color='secondary'
                                    onClick={() =>
                                        router.push('/trending-season/winter')
                                    }
                                >
                                    <Box px={3}>See All</Box>
                                </Button>
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
                            <Alert severity='error'>
                                <AlertTitle>Sorry Dear</AlertTitle>
                                We Have No Trending Outfit Now —{' '}
                                <strong>Hope It Will Come Soon!</strong>
                            </Alert>
                        </Box>
                    )}
                </Box>

                <MensShirt
                    myBag={myBag}
                    changeMyBag={changeMyBag}
                    mensShirtProducts={mensShirtProducts}
                    changeMensShirtProducts={changeMensShirtProducts}
                    config={config}
                />

                <WomensPant
                    myBag={myBag}
                    changeMyBag={changeMyBag}
                    womensPantProducts={womensPantProducts}
                    changeWomensPantProducts={changeWomensPantProducts}
                    config={config}
                />
            </Box>
            <Box mx={3} mt={6}>
                <MainFooter />
            </Box>
        </div>
    );
}

const fetchDataForBag = async (config) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/`, config)
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
            error: err.response.data,
        }));

const fetchDataForWomensPant = async () =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/category/womens-pant/`)
        .then((res) => ({
            womensPant: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForTrending = async (params) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/trending/winter/`)
        .then((res) => ({
            trending: res.data,
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
    // very import comment

    const config = {
        headers: {
            Authorization: 'Token ' + haha_ecom_bangla_token,
        },
    };

    const dataBag = await fetchDataForBag(config);

    let myBag = null;
    if (dataBag.bag) {
        let allMyBag = dataBag.bag;
        let myBagNotSendToMyOrder = allMyBag.filter(
            (myBag) => myBag.is_send_to_my_order === false
        );
        // console.log(myBagNotSendToMyOrder[0])
        if (myBagNotSendToMyOrder[0]) {
            myBag = myBagNotSendToMyOrder[0];
            // We got exact bag for user
            // 1st we filter out the bags whose not send to my order
            // then there have many bags for that user because of backend, hacker can do anything!!
            // the 1st created one is selected as myBag
        }
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
