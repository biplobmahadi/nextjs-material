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
import ProductCard from './ProductCard';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
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

export default function WomensPant({
    myBag,
    changeMyBag,
    womensPantProducts,
    changeWomensPantProducts,
    config,
}) {
    const router = useRouter();
    const [needDisabled, setNeedDisabled] = React.useState(false);

    return (
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
                            <strong>Women's Pant</strong>
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button
                            variant='contained'
                            size='small'
                            color='secondary'
                            onClick={() => router.push('/womens-pant')}
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
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <ProductCard
                                    product={product}
                                    myBag={myBag}
                                    config={config}
                                    changeMyBag={changeMyBag}
                                    changeCardProducts={
                                        changeWomensPantProducts
                                    }
                                    urlForChangeCardProducts={`${process.env.NEXT_PUBLIC_BASE_URL}/category/womens-pant/`}
                                    needDisabled={needDisabled}
                                    setNeedDisabled={setNeedDisabled}
                                />
                            </Grid>
                        ))}
                </Grid>
            </Box>
            {!womensPantProducts && (
                <Box mt={2}>
                    <Alert severity='error'>
                        <AlertTitle>Sorry Dear</AlertTitle>
                        We Have No Women's Pant Now —{' '}
                        <strong>Hope It Will Come Soon!</strong>
                    </Alert>
                </Box>
            )}
        </Box>
    );
}
