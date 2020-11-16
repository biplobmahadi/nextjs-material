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

export default function Index({ categories, error }) {
    console.log({ categories, error });

    let categoryNameTop = categories.filter(
        (category) => category.category_name === 'top'
    );
    let subCategoryNameShirt = categoryNameTop[0].sub_category.filter(
        (subCategory) => subCategory.sub_category_name === 'shirt'
    );
    let products = subCategoryNameShirt[0].product.slice(0, 6);
    console.log('product', products);
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
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Card />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Card />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Card />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Card />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Card />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Card />
                            </Grid>
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
                                    Topwear Product
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
                            {products &&
                                products.map((product) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        xl={2}
                                    >
                                        <ProductCard product={product} />
                                    </Grid>
                                ))}
                            {/*                             
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <ProductCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <ProductCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <ProductCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <ProductCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <ProductCard />
                            </Grid> */}
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
                                    Footwear Product
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
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <ProductCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <ProductCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <ProductCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <ProductCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <ProductCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <ProductCard />
                            </Grid>
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

const fetchData = async () =>
    await axios
        .get('http://localhost:8000/categories/')
        .then((res) => ({
            categories: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

export async function getStaticProps() {
    const data = await fetchData();

    return {
        props: data,
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every second
        revalidate: 1, // In seconds
    };
}
