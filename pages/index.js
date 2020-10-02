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

export default function Index() {
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
            <ButtonAppBar />
            <Box
                mt={11}
                mx={3}
                p={2}
                textAlign='center'
                borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <Carousel />
            </Box>
            {/* <Carousel /> */}
            <Box
                mx={3}
                mt={4}
                p={2}
                borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <Box
                    p={2}
                    display='flex'
                    alignItems='center'
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Box height='100%' flexGrow={1}>
                        <Typography variant='h3'>Tranding Now</Typography>
                    </Box>
                    <Box height='100%'>
                        <Button
                            variant='contained'
                            size='small'
                            color='secondary'
                        >
                            <Box px={3}>See All</Box>
                        </Button>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm>
                        <Box
                            style={{ backgroundColor: 'white' }}
                            p={3}
                            mt={2}
                            borderRadius='borderRadius'
                        >
                            <Card />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box
                            style={{ backgroundColor: 'white' }}
                            p={3}
                            mt={2}
                            borderRadius='borderRadius'
                        >
                            <Card />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box
                            style={{ backgroundColor: 'white' }}
                            p={3}
                            mt={2}
                            borderRadius='borderRadius'
                        >
                            <Card />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box
                            style={{ backgroundColor: 'white' }}
                            p={3}
                            mt={2}
                            borderRadius='borderRadius'
                        >
                            <Card />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box
                            style={{ backgroundColor: 'white' }}
                            p={3}
                            mt={2}
                            borderRadius='borderRadius'
                        >
                            <Card />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box
                mx={3}
                my={4}
                p={2}
                borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <Box
                    p={2}
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Typography variant='h4'>Footwear Product</Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm>
                        <Box
                            style={{ backgroundColor: 'white' }}
                            p={3}
                            mt={2}
                            borderRadius='borderRadius'
                        >
                            <ProductCard />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box
                            style={{ backgroundColor: 'white' }}
                            p={3}
                            mt={2}
                            borderRadius='borderRadius'
                        >
                            <ProductCard />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box
                            style={{ backgroundColor: 'white' }}
                            p={3}
                            mt={2}
                            borderRadius='borderRadius'
                        >
                            <ProductCard />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box
                            style={{ backgroundColor: 'white' }}
                            p={3}
                            mt={2}
                            borderRadius='borderRadius'
                        >
                            <ProductCard />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box
                            style={{ backgroundColor: 'white' }}
                            p={3}
                            mt={2}
                            borderRadius='borderRadius'
                        >
                            <ProductCard />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box
                mx={3}
                my={4}
                p={2}
                borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <Box
                    p={2}
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Typography variant='h4'>Footwear Product</Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm>
                        <Box
                            style={{ backgroundColor: 'white' }}
                            p={3}
                            mt={2}
                            borderRadius='borderRadius'
                        >
                            <ProductCard />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box
                            style={{ backgroundColor: 'white' }}
                            p={3}
                            mt={2}
                            borderRadius='borderRadius'
                        >
                            <ProductCard />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box
                            style={{ backgroundColor: 'white' }}
                            p={3}
                            mt={2}
                            borderRadius='borderRadius'
                        >
                            <ProductCard />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box
                            style={{ backgroundColor: 'white' }}
                            p={3}
                            mt={2}
                            borderRadius='borderRadius'
                        >
                            <ProductCard />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box
                            style={{ backgroundColor: 'white' }}
                            p={3}
                            mt={2}
                            borderRadius='borderRadius'
                        >
                            <ProductCard />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Footer />
            <Box style={{ backgroundColor: '#E6E6FA' }} mt={4}>
                <MainFooter />
            </Box>
        </div>
    );
}
