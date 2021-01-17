import Head from 'next/head';
import ButtonAppBar from '../../components/ButtonAppBar';
import BrandCard from '../../components/BrandCard';
import Card from '../../components/Card';
import MainFooter from '../../components/MainFooter';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import parseCookies from '../../lib/parseCookies';

export default function Trending({ trending, myBag }) {
    return (
        <div>
            <Head>
                <title>Trending - Logo.com</title>
                <link rel='icon' href='/a.ico' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar totalProductInBag={myBag && myBag.product.length} />
            <Box pb={8} style={{ backgroundColor: '#E6E6FA' }}>
                <Box mt={8} pt={3} px={3}>
                    <Box mb={2} borderRadius='borderRadius'>
                        <img
                            src='/aa.jpg'
                            alt=''
                            srcset=''
                            height='250'
                            width='100%'
                        />
                    </Box>
                    <Box
                        py={2}
                        borderRadius='borderRadius'
                        style={{ backgroundColor: 'white' }}
                        textAlign='center'
                    >
                        <Typography variant='h5' component='h5'>
                            <strong>{trending.trend_name}</strong>
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            {trending &&
                                trending.trending_outfit &&
                                trending.trending_outfit.map(
                                    (trending_outfit) => (
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
                                    )
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

const fetchDataForTrending = async (params) =>
    await axios
        .get(`http://localhost:8000/trending/${params.trendingSlug}/`)
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

    const dataTrending = await fetchDataForTrending(params);
    const trending = dataTrending.trending;

    return {
        props: {
            trending,
            myBag,
        },
    };
}
