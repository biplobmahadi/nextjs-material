import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import SubCataCard from '../components/SubCataCard';
import ProductDetails from '../components/ProductDetails';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Chip from '@material-ui/core/Chip';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import StarHalfIcon from '@material-ui/icons/StarHalf';
import { Button } from '@material-ui/core';
export default function Product() {
    return (
        <div>
            <Head>
                <title>Product Details</title>
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
                mx={3}
                mt={12}
                mb={3}
                p={2}
                borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <Grid container>
                    <Grid container item xs={12} sm={9}>
                        <Grid item xs={12} sm={5}>
                            <Box
                                p={2}
                                mx={1}
                                height='100%'
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <img
                                    src='/aa.jpg'
                                    alt='product image'
                                    height='100%'
                                    width='100%'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm>
                            <Box
                                p={2}
                                mx={1}
                                height='100%'
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <h3>Half Ti-Shirt</h3>
                                <div>
                                    <strong>Product Code: 43rjflsjf30</strong>
                                    <br />
                                    <strong>Brand: RichMan</strong>
                                </div>
                                <Box py={2}>
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <span> | </span>
                                    <span>08 Reviews</span>
                                    <span> | </span>
                                    <span>08 Video Reviews</span>
                                    <span> | </span>
                                    <span>Give a Review</span>
                                </Box>
                                <Divider variant='middle' />
                                <Box pt={2}>
                                    <Typography variant='h4'>
                                        <strong>Tk. 500</strong>
                                    </Typography>
                                </Box>
                                <Box pt={2}>
                                    <Chip
                                        label='In Stock'
                                        color='secondary'
                                        size='small'
                                    />
                                </Box>
                                <Box mt={3}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm>
                                            <Typography variant='p'>
                                                Color
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm>
                                            <Typography variant='p'>
                                                Size
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Box mt={2}>
                                        <Typography variant='p'>
                                            Quantity
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box mt={2}>
                                    <Button variant='contained' color='primary'>
                                        <Box textAlign='center' px={4}>
                                            Add To Bag
                                        </Box>
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm>
                        <Box
                            p={2}
                            mx={1}
                            height='100%'
                            borderRadius='borderRadius'
                            style={{ backgroundColor: 'white' }}
                        >
                            <Typography variant='h4'>
                                <strong>You Will Get</strong>
                            </Typography>
                            <p>Mobile</p>
                            <p>Mobile</p>
                            <p>Mobile</p>
                            <Divider variant='middle' />
                            <Typography variant='h4'>
                                <strong>Product Info</strong>
                            </Typography>
                            <p>Mobile</p>
                            <p>Mobile</p>
                            <p>Mobile</p>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <ProductDetails />

            <Footer />
            <Box style={{ backgroundColor: '#E6E6FA' }} mt={4}>
                <MainFooter />
            </Box>
        </div>
    );
}
