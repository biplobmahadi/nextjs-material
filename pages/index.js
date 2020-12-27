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
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import FormikFormDemo from '../components/FormikFormDemo';
import Receiver from '../components/forms/Receiver';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import parseCookies from '../lib/parseCookies';
import { useEffect } from 'react';


let myBagRe;
let mensShirtProductsRe;

export default function Index(props) {
    const [reRender, setReRender] = React.useState(false);
    
    const { womensPantProducts, config, trending } = props
    let myBag = myBagRe ? myBagRe : props.myBag;
    let mensShirtProducts = mensShirtProductsRe ? mensShirtProductsRe : props.mensShirtProducts;


    const changeMensShirtProducts = (value) => {
        mensShirtProductsRe = value;

        // setReRender(!reRender);
    };

    const changeMyBag = (value) => {
        myBagRe = value;
        console.log('my bag now', myBagRe);

        setReRender(!reRender);
    };
    

    // here useEffect -> when component mount and update myBagRe will undefined
    // because, when we change route then myBagRe again remain previous one which is not 
    // updated one, that's why we make it undefined and bag will server rendered

    useEffect(() => {
        myBagRe = undefined
        mensShirtProductsRe = undefined
    });

    // console.log('top product', topShirtProducts);
    // console.log('bottom product', bottomPantProducts);
    console.log('my bag 1st ', myBag);
    console.log('my bag Re ', myBagRe);
    return (
        <div>
            <Head>
                <title>Next App with Material-Ui</title>
                <link rel='icon' href='/a.ico' />
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar totalProductInBag={ myBag && myBag.product.length}/>
            <Box pb={8} style={{ backgroundColor: '#E6E6FA' }}>
                <Box mt={8} pt={3} px={3}>
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
                                <Typography variant='h4' component='h4'>
                                    Trending Now
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Button
                                    variant='contained'
                                    size='small'
                                    color='secondary'
                                >
                                    <Box px={3}>See All</Box>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            {trending && trending.trending_outfit && trending.trending_outfit.map(trending_outfit => 
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <Card trending_outfit={trending_outfit}/>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
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
                                <Typography variant='h4' component='h4'>
                                    Men's Shirt
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Button
                                    variant='contained'
                                    size='small'
                                    color='secondary'
                                >
                                    <Box px={3}>See All</Box>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            {mensShirtProducts &&
                                mensShirtProducts.map((product) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        xl={2}
                                    >
                                        <ProductCard
                                        product={product} 
                                        myBag={myBag} 
                                        config={config}
                                        changeMyBag={changeMyBag}
                                        changeCardProducts={changeMensShirtProducts}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>
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
                                <Typography variant='h4' component='h4'>
                                    Women's Pant
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Button
                                    variant='contained'
                                    size='small'
                                    color='secondary'
                                >
                                    <Box px={3}>See All</Box>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            {womensPantProducts &&
                                womensPantProducts.map((product) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        xl={2}
                                    >
                                        <ProductCard
                                        product={product} 
                                        myBag={myBag} 
                                        config={config}
                                        changeMyBag={changeMyBag} 
                                        />
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

const fetchDataForBag = async (config) =>
    await axios
        .get(`http://localhost:8000/my-bag/`, config)
        .then((res) => ({
            bag: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForMensShirt = async () =>
    await axios
        .get(`http://localhost:8000/category/mens-shirt/`)
        .then((res) => ({
            mensShirt: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForWomensPant = async () =>
await axios
    .get(`http://localhost:8000/category/womens-pant/`)
    .then((res) => ({
        womensPant: res.data,
    }))
    .catch((err) => ({
        error: err.response.data,
    }));

const fetchDataForTrending = async (params) =>
    await axios
        .get(`http://localhost:8000/trending/winter/`)
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
        }
    }


    const dataMensShirt = await fetchDataForMensShirt();
    let mensShirt = dataMensShirt.mensShirt
    let mensShirtProducts = mensShirt.product.slice(0, 6);

    const dataWomensPant = await fetchDataForWomensPant();
    let womensPant = dataWomensPant.womensPant
    let womensPantProducts = womensPant.product.slice(0, 6);

    // let categoryNameTop = categories && categories.filter(
    //     (category) => category.category_name === 'top'
    // );
    // let subCategoryNameShirt = categoryNameTop[0].sub_category.filter(
    //     (subCategory) => subCategory.sub_category_name === 'shirt'
    // );
    // let topShirtProducts = subCategoryNameShirt[0].product.slice(0, 6);

    // let categoryNameBottom = categories && categories.filter(
    //     (category) => category.category_name === 'bottom'
    // );
    // let subCategoryNamePant = categoryNameBottom[0].sub_category.filter(
    //     (subCategory) => subCategory.sub_category_name === 'pant'
    // );
    // let bottomPantProducts = subCategoryNamePant[0].product.slice(0, 6);



    const dataTrending = await fetchDataForTrending(params);
    const trending = dataTrending.trending;


    return {
        props: { mensShirtProducts, womensPantProducts, myBag, config, trending },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every second
        // revalidate: 1, // In seconds
    };
}
