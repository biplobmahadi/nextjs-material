import Head from 'next/head';
import ButtonAppBar from '../../components/ButtonAppBar';
import BrandCard from '../../components/BrandCard';
import Card from '../../components/Card';
import ProductCard from '../../components/ProductCard';
import MainFooter from '../../components/MainFooter';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import parseCookies from '../../lib/parseCookies';
import { useEffect } from 'react';


let myBagRe;

export default function Trending(props) {
    const [reRender, setReRender] = React.useState(false);
    
    const { trendingOutfit, config } = props
    let myBag = myBagRe ? myBagRe : props.myBag;

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
    });

    console.log('my bag 1st ', myBag);
    console.log('my bag Re ', myBagRe);

    return (
        <div>
            <Head>
                <title>Trending Outfit - Logo.com</title>
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
            <ButtonAppBar totalProductInBag={ myBag && myBag.product_with_quantity.length} />
            <Box pb={8} style={{ backgroundColor: '#E6E6FA' }}>
                <Box mt={8} pt={3} px={3}>
                    <Box
                        mb={2}
                        borderRadius='borderRadius'
                    >
                        <img src='/aa.jpg' alt='' srcset='' height='250' width='100%' />
                    </Box>
                    <Box
                        py={2}
                        borderRadius='borderRadius'
                        style={{ backgroundColor: 'white' }}
                        textAlign='center'
                    >
                        <Typography variant='h4' component='h4'>
                            {trendingOutfit.trend_outfit_name}
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            {trendingOutfit && trendingOutfit.product && trendingOutfit.product.map(product => 
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <ProductCard 
                                    product={product} 
                                    myBag={myBag} 
                                    config={config}
                                    changeMyBag={changeMyBag}
                                />
                            </Grid>
                                )}
                            
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

const fetchDataForTrendingOutfit = async (params) =>
    await axios
        .get(`http://localhost:8000/trending-outfit/${params.trendingOutfitSlug}/`)
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


    const dataTrendingOutfit = await fetchDataForTrendingOutfit(params);
    const trendingOutfit = dataTrendingOutfit.trendingOutfit;

    return {
        props: {
            trendingOutfit, myBag, config
        },
    };
}